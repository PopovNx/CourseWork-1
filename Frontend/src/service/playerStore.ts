import { MusicRecord } from "@/dto";
import { create } from "zustand";
import { HistoryRecord } from "@/dto/HistoryRecord";
import moment from "moment";
import { Api } from "./api";

interface MusicPlayerState {
  playing: boolean;
  currentTrackId: string | null;
  tracks: MusicRecord[];
  progress: number;

  history: HistoryRecord[];
  addId: (id: string) => void;
  clearHistory: () => void;
  setHistory: (history: HistoryRecord[]) => void;
  updateMediaMetadata: () => void;

  pausePlay: (id?: string) => void;
  next: () => void;
  previous: () => void;
  setTracks: (tracks: MusicRecord[]) => void;
  updateProgress: (progress: number) => void;
  setPlaying: (playing: boolean) => void;
  setCurrentTrackId: (id: string) => void;
}

export const useMusicPlayer = create<MusicPlayerState>((set, get) => ({
  playing: false,
  currentTrackId: null,
  tracks: [],
  progress: 0,

  history: localStorage.getItem("history")
    ? JSON.parse(localStorage.getItem("history") || "[]")
    : [],

  clearHistory: () => set({ history: [] }),
  setHistory: (history) => {
    set({ history });
    localStorage.setItem("history", JSON.stringify(history));
  },

  addId: (id) => {
    const state = get();
    const lastRecord = state.history[0];
    if (lastRecord?.id === id) return;
    const currentTrack = state.tracks.find((track) => track.id === id);
    if (!currentTrack) return;
    const record: HistoryRecord = {
      id,
      title: currentTrack.title,
      timeUnix: moment().unix(),
    };
    const history = [record, ...state.history];
    state.setHistory(history);
  },
  updateMediaMetadata: () => {
    const state = get();
    const track = state.tracks.find(
      (track) => track.id === state.currentTrackId
    );
    if (!track) return;
    const posterUrl = Api.resolvePosterUrl(track.id);
    const mediaSession = navigator.mediaSession;
    if (!mediaSession) return;
    mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artwork: [{ src: posterUrl, sizes: "96x96", type: "image/png" }],
    });
    mediaSession.setActionHandler("play", () => state.pausePlay());
    mediaSession.setActionHandler("pause", () => state.pausePlay());
    mediaSession.setActionHandler("previoustrack", () => state.previous());
    mediaSession.setActionHandler("nexttrack", () => state.next());
    
  },
  setCurrentTrackId: (id) => {
    get().addId(id);
    set({ currentTrackId: id });
    get().updateMediaMetadata();
  },

  pausePlay: (id?: string) => {
    if (!id) {
      set((state) => ({ playing: !state.playing }));
      return;
    }
    const state = get();
    const playing = state.currentTrackId === id ? !state.playing : true;
    console.log("pausePlay", playing);
    state.setCurrentTrackId(id);
    set({ playing });
  },

  next: () => {
    const state = get();
    const currentIndex = state.tracks.findIndex(
      (track) => track.id === state.currentTrackId
    );
    const nextIndex = (currentIndex + 1) % state.tracks.length;
    const id = state.tracks[nextIndex].id;
    state.pausePlay(id);
  },

  previous: () => {
    const state = get();
    const currentIndex = state.tracks.findIndex(
      (track) => track.id === state.currentTrackId
    );
    const nextIndex =
      (currentIndex - 1 + state.tracks.length) % state.tracks.length;
    const id = state.tracks[nextIndex].id;
    state.pausePlay(id);
  },

  setTracks: (tracks) => set({ tracks }),
  updateProgress: (progress) => set({ progress }),
  setPlaying: (playing: boolean) => set({ playing }),
}));
