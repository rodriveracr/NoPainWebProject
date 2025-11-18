# compress-videos.ps1
# Compress large videos in public/videos to target ~48 MB using local ffmpeg in ./tools
Set-StrictMode -Version Latest

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$toolsDir = Join-Path $scriptRoot 'tools'

$ffmpegExe = Get-ChildItem -Path $toolsDir -Recurse -Filter 'ffmpeg.exe' -ErrorAction SilentlyContinue | Select-Object -First 1
$ffprobeExe = Get-ChildItem -Path $toolsDir -Recurse -Filter 'ffprobe.exe' -ErrorAction SilentlyContinue | Select-Object -First 1

if (-not $ffmpegExe -or -not $ffprobeExe) {
  Write-Error "ffmpeg/ffprobe not found under $toolsDir. Make sure tools were extracted."
  exit 1
}

$ffmpeg = $ffmpegExe.FullName
$ffprobe = $ffprobeExe.FullName

$files = @(
  'public/videos/video2.mp4',
  'public/videos/video4.webm',
  'public/videos/video10.mp4'
)

$backupDir = Join-Path $scriptRoot 'backups/videos-compressed-backup'
New-Item -ItemType Directory -Force -Path $backupDir | Out-Null

foreach ($rel in $files) {
  $f = Join-Path $scriptRoot $rel
  if (-not (Test-Path $f)) {
    Write-Output "SKIP: $rel not found"
    continue
  }

  $base = Split-Path $f -Leaf
  $backupPath = Join-Path $backupDir $base
  Write-Output "Backing up $rel -> backups/videos-compressed-backup/$base"
  Copy-Item $f $backupPath -Force

  # get duration in seconds using ffprobe
  $durationRaw = & $ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 `"$f`"
  $duration = [double]::Parse(($durationRaw.Trim()), [System.Globalization.CultureInfo]::InvariantCulture)
  if (-not $duration -or $duration -le 0) {
    Write-Output "Could not read duration for $rel, skipping"
    continue
  }

  $targetMB = 48
  $bits = $targetMB * 8 * 1024 * 1024
  $bitrate_kbps = [math]::Floor(($bits / $duration) / 1000)
  $audio_kbps = 128
  $video_kbps = [math]::Max(300, $bitrate_kbps - $audio_kbps)

  Write-Output "Encoding $rel — duration: $([math]::Round($duration,1)) s — target total kbps: $bitrate_kbps kbps — video: $video_kbps kbps"

  $outTmp = "$f.tmp.mp4"

  # Ensure any zero-length originals are restored from backup before proceeding
  if ((Get-Item $f).Length -eq 0) {
    Write-Output "Detected zero-length original for $rel — restoring from backup before re-encoding"
    Copy-Item -Force $backupPath $f
  }

  # First pass: scale down while preserving aspect ratio and pad to even dimensions (libx264 requires even width/height)
  $vf = "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2"
  & $ffmpeg -y -i `"$f`" -c:v libx264 -b:v ${video_kbps}k -pass 1 -an -preset slow -vf $vf -f mp4 NUL

  # Second pass
  & $ffmpeg -y -i `"$f`" -c:v libx264 -b:v ${video_kbps}k -pass 2 -c:a aac -b:a 128k -preset slow -vf $vf `"$outTmp`"

  # Consider conversion successful only if the output file exists and is non-trivial in size
  if (Test-Path $outTmp) {
    $outSize = (Get-Item $outTmp).Length
    if ($outSize -gt 1024) {
      Write-Output "Replacing original with compressed file: $rel (size: $([math]::Round($outSize/1MB,2)) MB)"
      Move-Item -Force $outTmp $f
    } else {
      Write-Output "Encoding appears to have failed (output size $outSize). Restoring original from backup: $rel"
      Remove-Item -Force -ErrorAction SilentlyContinue $outTmp
      Copy-Item -Force $backupPath $f
    }
  } else {
    Write-Output "Encoding failed for $rel — leaving original in place"
  }

  # cleanup pass log files
  Remove-Item -ErrorAction SilentlyContinue -Path "ffmpeg2pass-0.log","ffmpeg2pass-0.log.mbtree"
}

Write-Output "New sizes in public/videos:"
Get-ChildItem (Join-Path $scriptRoot 'public/videos') | Sort-Object Length -Descending | Select-Object Name,@{Name='MB';Expression={[math]::Round($_.Length/1MB,2)}} | Format-Table -AutoSize

Write-Output "Staging and committing changes..."
git add public/videos/*
$null = git commit -m "chore(videos): compress large videos to <50MB"
if ($LASTEXITCODE -ne 0) {
  Write-Output "No changes to commit or commit failed"
} else {
  git push
}
