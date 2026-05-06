import os
import subprocess
import yt_dlp

video_url = "https://www.youtube.com/watch?v=a_lpfG9kIfA"
out_video = "public/amperon_video.mp4"

ydl_opts = {
    'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
    'outtmpl': out_video,
    'merge_output_format': 'mp4'
}

print("Downloading video using yt-dlp...")
with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info(video_url, download=True)
    duration = info.get('duration', 60)

import imageio
from imageio_ffmpeg import get_ffmpeg_exe
ffmpeg_exe = get_ffmpeg_exe()

def make_gif(start_time, out_path):
    print(f"Creating GIF: {out_path} at start time {start_time}")
    cmd = [
        ffmpeg_exe, "-y", "-ss", str(start_time), "-t", "4",
        "-i", out_video,
        "-vf", "fps=10,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse",
        "-loop", "0",
        out_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"Created {out_path}")

# Based on typical demo structure, try to pick good frames, or just split evenly.
s1 = duration * 0.15
s2 = duration * 0.50
s3 = duration * 0.80

make_gif(s1, "public/amperon_segment1.gif")
make_gif(s2, "public/amperon_segment2.gif")
make_gif(s3, "public/amperon_segment3.gif")

# Clean up video
if os.path.exists(out_video):
    os.remove(out_video)

print("All done!")
