use std::path::Path;
use tokio::process::Command;

const DURATION_FFPROBE_ARGS: &[&str] = &[
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    "-i"
];

const POSTER_ARGS: &[&str] = &[
    "-vf",
    "scale=320:320",
    "-q:v",
    "2",
    "-c:v",
    "mjpeg",
    "-q:v",
    "2",
    "-an",
    "-y",
];
const AUDIO_ARGS: &[&str] = &[
    "-codec:a",
    "libmp3lame",
    "-qscale:a",
    "2",
    "-y",
];
pub const TRACKS_DIR: &'static str = "./tracks";
pub const AUDIO_NAME: &str = "content.mp3";
pub const POSTER_NAME: &str = "poster.jpg";

async fn audio_duration<P: AsRef<Path>>(path: P) -> Result<f64, anyhow::Error> {
    let result = Command::new("ffprobe")
        .args(DURATION_FFPROBE_ARGS)
        .arg(path.as_ref())
        .output()
        .await;
    if let Ok(duration) = result {
        let duration = String::from_utf8_lossy(&duration.stdout);
        let duration = duration.trim().parse::<f64>()?;
        Ok(duration)
    } else {
        Err(anyhow::anyhow!("Failed to get duration"))
    }
}

async fn poster_convert<P1: AsRef<Path>, P2: AsRef<Path>>(
    input: P1,
    output: P2,
) -> Result<(), anyhow::Error> {
    let result = Command::new("ffmpeg")
        .arg("-i")
        .arg(input.as_ref())
        .args(POSTER_ARGS)
        .arg(output.as_ref())
        .output()
        .await;

    if result.is_ok() {
        Ok(())
    } else {
        Err(anyhow::anyhow!("Failed to convert poster"))
    }
}

async fn audio_convert<P1: AsRef<Path>, P2: AsRef<Path>>(
    input: P1,
    output: P2,
) -> Result<(), anyhow::Error> {
    let result = Command::new("ffmpeg")
        .arg("-i")
        .arg(input.as_ref())
        .args(AUDIO_ARGS)
        .arg(output.as_ref())
        .output()
        .await;
    if result.is_ok() {
        Ok(())
    } else {
        Err(anyhow::anyhow!("Failed to convert audio"))
    }
}

pub async fn process_files<P1: AsRef<Path>, P2: AsRef<Path>, P3: AsRef<Path>>(
    input_audio: P1,
    input_poster: P2,
    output_dir: P3,
) -> Result<f64, anyhow::Error> {
    let audio_path = output_dir.as_ref().join(AUDIO_NAME);
    let poster_path = output_dir.as_ref().join(POSTER_NAME);

    log::info!("Processing files: {:?} {:?}", input_audio.as_ref(), input_poster.as_ref());
    let (audio_duration, _, _) = futures_util::try_join!(
        audio_duration(&input_audio),
        audio_convert(&input_audio, &audio_path),
        poster_convert(&input_poster, &poster_path)
    )?;

    log::info!("Files processed");

    Ok(audio_duration)
}
