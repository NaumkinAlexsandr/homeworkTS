interface IPlayer {
  play(): void;
  pause(): void;
  stop(): void;
  next(): void;
  previous(): void;
}

class AudioPlaylist {
  tracks: string[];

  constructor() {
    this.tracks = [];
  }

  add(track: string) {
    this.tracks.push(track);
  }
}

class VideoPlaylist {
  tracks: string[];

  constructor() {
    this.tracks = [];
  }

  add(track: string) {
    this.tracks.push(track);
  }
}

class AudioPlayer implements IPlayer {
  private audioElement: HTMLAudioElement;
  private playlist: AudioPlaylist;
  private currentTrackIndex: number;
  constructor(playlist: AudioPlaylist) {
    this.audioElement = document.createElement("audio");
    this.playlist = playlist;
    this.currentTrackIndex = 0;
  }
  play(): void {
    this.audioElement.play();
    console.log("Playing audio");
  }

  pause(): void {
    this.audioElement.pause();
    console.log("Pausing audio");
  }

  stop(): void {
    this.audioElement.currentTime = 0;
    this.audioElement.pause();
    console.log("Stopping audio");
  }

  next(): void {
    this.currentTrackIndex =
      (this.currentTrackIndex + 1) % this.playlist.tracks.length;
    this.audioElement.src = this.playlist.tracks[this.currentTrackIndex];
    this.play();
    console.log("Next track");
  }

  previous(): void {
    this.currentTrackIndex =
      (this.currentTrackIndex - 1) % this.playlist.tracks.length;
    this.audioElement.src = this.playlist.tracks[this.currentTrackIndex];
    this.play();
    console.log("Previous track");
  }
}

class VideoPlayer {
  private videoElement: HTMLVideoElement;
  private playlist: VideoPlaylist;
  private currentTrackIndex: number;

  constructor(playlist: VideoPlaylist) {
    this.videoElement = document.createElement("video");
    this.playlist = playlist;
    this.currentTrackIndex = 0;
  }
  play(): void {
    this.videoElement.play();
    console.log("Playing video");
  }

  pause(): void {
    this.videoElement.pause();
    console.log("Pausing video");
  }

  stop(): void {
    this.videoElement.currentTime = 0;
    this.videoElement.pause();
    console.log("Stopping video");
  }

  next(): void {
    this.currentTrackIndex =
      (this.currentTrackIndex + 1) % this.playlist.tracks.length;
    this.videoElement.src = this.playlist.tracks[this.currentTrackIndex];
    this.play();
    console.log("Next video");
  }

  previous(): void {
    this.currentTrackIndex =
      (this.currentTrackIndex - 1) % this.playlist.tracks.length;
    this.videoElement.src = this.playlist.tracks[this.currentTrackIndex];
    this.play();
    console.log("Previous video");
  }
}

class MultimediaPlayer {
  private audioPlayer: AudioPlayer;
  private videoPlayer: VideoPlayer;

  constructor(audioPlayer: AudioPlayer, videoPlayer: VideoPlayer) {
    this.audioPlayer = audioPlayer;
    this.videoPlayer = videoPlayer;
  }

  playAudio() {
    this.audioPlayer.play();
  }

  pauseAudio() {
    this.audioPlayer.pause();
  }

  stopAudio() {
    this.audioPlayer.stop();
  }

  nextAudio() {
    this.audioPlayer.next();
  }

  previousAudio() {
    this.audioPlayer.previous();
  }

  playVideo() {
    this.videoPlayer.play();
  }

  pauseVideo() {
    this.videoPlayer.pause();
  }

  stopVideo() {
    this.videoPlayer.stop();
  }

  nextVideo() {
    this.videoPlayer.next();
  }

  previousVideo() {
    this.videoPlayer.previous();
  }
}
const playlistAudio = new AudioPlaylist();
playlistAudio.add("audio1.mp3");
playlistAudio.add("audio2.mp3");
playlistAudio.add("audio3.mp3");

const playlistVideo = new VideoPlaylist();
playlistVideo.add("video1.mp4");
playlistVideo.add("video2.mp4");
playlistVideo.add("video3.mp4");

const audioPlayer = new AudioPlayer(playlistAudio);
const videoPlayer = new VideoPlayer(playlistVideo);
const multimediaPlayer = new MultimediaPlayer(audioPlayer, videoPlayer);

console.log(playlistAudio);
console.log(playlistVideo);
