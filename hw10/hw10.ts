interface IPlayer {
  play(): void;
  pause(): void;
  stop(): void;
  next(): void;
  previous(): void;
}

interface IPlaylist {
  add(track: string): void;
  remove(track: string): void;
}

class AudioPlaylist implements IPlaylist {
  tracks: string[];

  constructor() {
    this.tracks = [];
  }

  add(track: string) {
    this.tracks.push(track);
  }

  remove(track: string) {
    const index = this.tracks.indexOf(track);
    if (index !== -1) {
      this.tracks.splice(index, 1);
    }
  }
}

class VideoPlaylist implements IPlaylist {
  tracks: string[];

  constructor() {
    this.tracks = [];
  }

  add(track: string) {
    this.tracks.push(track);
  }

  remove(track: string) {
    const index = this.tracks.indexOf(track);
    if (index !== -1) {
      this.tracks.splice(index, 1);
    }
  }
}

class AudioPlayer implements IPlayer {
  private audioTrack: HTMLAudioElement;
  private playlist: AudioPlaylist;
  private currentTrackIndex: number;
  constructor(playlist: AudioPlaylist) {
    this.audioTrack = document.createElement("audio");
    this.playlist = playlist;
    this.currentTrackIndex = 0;
  }
  play(): void {
    this.audioTrack.play();
    console.log("Playing audio");
  }

  pause(): void {
    this.audioTrack.pause();
    console.log("Pausing audio");
  }

  stop(): void {
    this.audioTrack.currentTime = 0;
    this.audioTrack.pause();
    console.log("Stopping audio");
  }

  next(): void {
    this.currentTrackIndex =
      (this.currentTrackIndex + 1) % this.playlist.tracks.length;
    this.audioTrack.src = this.playlist.tracks[this.currentTrackIndex];
    this.play();
    console.log("Next audio track");
  }

  previous(): void {
    this.currentTrackIndex =
      (this.currentTrackIndex - 1) % this.playlist.tracks.length;
    this.audioTrack.src = this.playlist.tracks[this.currentTrackIndex];
    this.play();
    console.log("Previous audio track");
  }
}

class VideoPlayer {
  private videoTrack: HTMLVideoElement;
  private playlist: VideoPlaylist;
  private currentTrackIndex: number;

  constructor(playlist: VideoPlaylist) {
    this.videoTrack = document.createElement("video");
    this.playlist = playlist;
    this.currentTrackIndex = 0;
  }
  play(): void {
    this.videoTrack.play();
    console.log("Playing video");
  }

  pause(): void {
    this.videoTrack.pause();
    console.log("Pausing video");
  }

  stop(): void {
    this.videoTrack.currentTime = 0;
    this.videoTrack.pause();
    console.log("Stopping video");
  }

  next(): void {
    this.currentTrackIndex =
      (this.currentTrackIndex + 1) % this.playlist.tracks.length;
    this.videoTrack.src = this.playlist.tracks[this.currentTrackIndex];
    this.play();
    console.log("Next video track");
  }

  previous(): void {
    this.currentTrackIndex =
      (this.currentTrackIndex - 1) % this.playlist.tracks.length;
    this.videoTrack.src = this.playlist.tracks[this.currentTrackIndex];
    this.play();
    console.log("Previous video track");
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
console.log(playlistVideo.tracks[1]);
