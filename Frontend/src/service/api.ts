import { MusicRecord, MusicRecordList } from "@/dto";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";

export abstract class Api {
  private static resolveApiUrl(path: string = ""): string {
    return `${import.meta.env.VITE_API_URL}/${path}`;
  }

  private static instance = axios.create({
    baseURL: Api.resolveApiUrl(),
    timeout: 1000,
  });

  public static async fetchMusicRecords(): Promise<MusicRecord[]> {
    console.log("fetchMusicRecords");
    const data = await Api.instance.get("tracks");
    return MusicRecordList.parse(data.data);
  }

  public static resolveTrackUrl(trackId: string): string {
    return Api.resolveApiUrl(`tracks/${trackId}/content.mp3`);
  }

  public static resolvePosterUrl(trackId: string): string {
    return Api.resolveApiUrl(`tracks/${trackId}/poster.png`);
  }

  public static useTracks() {
    return useQuery({ queryKey: ["tracks"], queryFn: Api.fetchMusicRecords });
  }
}
