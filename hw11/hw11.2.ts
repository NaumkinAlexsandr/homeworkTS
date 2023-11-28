interface IPlaylist {
  add(track: string): void;
  remove(track: string): void;
  play(): void;
  pause(): void;
  stop(): void;
}

interface IPlayer {
  play(): void;
  pause(): void;
  stop(): void;
}

abstract class Playlist implements IPlaylist {
  tracks: string[];
  constructor() {
    this.tracks = [];
  }

  abstract add(track: string): void;
  abstract remove(track: string): void;
  abstract play(): void;
  abstract pause(): void;
  abstract stop(): void;
}

class MP3Playlist extends Playlist {
  tracks: string[];

  constructor(
    protected audioTrack = document.createElement("audio"),
    protected currentTrackIndex = 0
  ) {
    super();
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

  play(): void {
    this.audioTrack.play();
    console.log("Playing mp3 audio");
  }
  pause(): void {
    this.audioTrack.pause();
    console.log("Pausing mp3 audio");
  }
  stop(): void {
    this.currentTrackIndex = 0;
    this.audioTrack.pause();
    console.log("Stopping mp3 audio");
  }
}

class WAVPlaylist extends Playlist {
  tracks: string[];

  constructor(
    protected audioTrack = document.createElement("audio"),
    protected currentTrackIndex = 0
  ) {
    super();
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

  play(): void {
    this.audioTrack.play();
    console.log("Playing wav audio");
  }
  pause(): void {
    this.audioTrack.pause();
    console.log("Pausing wav audio");
  }
  stop(): void {
    this.currentTrackIndex = 0;
    this.audioTrack.pause();
    console.log("Stopping wav audio");
  }
}

abstract class Player implements IPlayer {
  protected audioTrack: Playlist;

  constructor(audioTrack: Playlist) {
    this.audioTrack = audioTrack;
  }
  abstract play(): void;
  abstract pause(): void;
  abstract stop(): void;
}

class MP3Player extends Player {
  protected currentTrackIndex: number;

  constructor(audioTrack: MP3Playlist) {
    super(audioTrack);
    this.currentTrackIndex = 0;
  }
  play(): void {
    this.audioTrack.play();
  }
  pause(): void {
    this.audioTrack.pause();
  }
  stop(): void {
    this.currentTrackIndex = 0;
    this.audioTrack.pause();
  }
}

class WAVPlayer extends Player {
  protected currentTrackIndex: number;

  constructor(audioTrack: WAVPlaylist) {
    super(audioTrack);
    this.currentTrackIndex = 0;
  }
  play(): void {
    this.audioTrack.play();
  }
  pause(): void {
    this.audioTrack.pause();
  }
  stop(): void {
    this.currentTrackIndex = 0;
    this.audioTrack.pause();
  }
}

const playlistMP3 = new MP3Playlist();
playlistMP3.add("audio1.wav");
playlistMP3.add("audio2.wav");
playlistMP3.add("audio3.wav");

const playlistWAV = new WAVPlaylist();
playlistMP3.add("audio1.mp3");
playlistMP3.add("audio2.mp3");
playlistMP3.add("audio3.mp3");

const mp3Player = new MP3Player(playlistMP3);
mp3Player.play();
mp3Player.pause();
mp3Player.stop();

const wavPlayer = new WAVPlayer(new WAVPlaylist());
wavPlayer.play();
wavPlayer.pause();
wavPlayer.stop();
