import { MusicInfo } from "./dto/MusicInfo";

const apiBaseUrl = "http://localhost:5141";

export abstract class Api {
  public static async fetchMusicInfo(): Promise<MusicInfo[]> {
    const response = await fetch(`${apiBaseUrl}/music`);
    const data = await response.json();
    return data;
  }
  public static async fetchMusicText(music: { id: string }) {
    const response = await fetch(`${apiBaseUrl}/music/${music.id}/text`);
    const data = await response.text();
    return data;
  }

  public static resolveMusicUrl(music: { id: string }): string {
    const timestamp = new Date().getTime();
    return `${apiBaseUrl}/music/${music.id}?t=${timestamp}`;
  }
}
