import { MusicRecord } from "../dto";

export class MockApi {
  public static async fetchMusicRecords(): Promise<MusicRecord[]> {
    const data = await fetch("/music/index.json");
    const json = await data.json();
    console.log("Fetched music records", json);
    return json.playlist;
  }

  public static resolveMusicUrl(id: string): string {
    return `/music/${id}/content.mp3`;
  }

  public static resolveMusicCover(id: string): string {
    return `/music/${id}/poster.png`;
  }
}
