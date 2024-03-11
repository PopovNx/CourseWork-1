import { MusicRecord, MusicRecordList } from "@/dto";
import axios from "axios";

import { useSuspenseQuery, useQuery } from "@tanstack/react-query";

export abstract class Api {
  private static resolveApiUrl(path: string = ""): string {
    return `${import.meta.env.VITE_API_URL}/${path}`;
  }

  private static instance = axios.create({
    baseURL: Api.resolveApiUrl(),
    timeout: 1000,
  });

  public static async fetchMusicRecords(): Promise<MusicRecord[]> {
 //   await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("fetchMusicRecords");
    const data = await Api.instance.get("tracks");
    try {
      return MusicRecordList.parse(data.data);
    }catch (e) {
      console.error(e);
      throw e;
    }
  }

  public static resolveTrackUrl(trackId: string): string {
    return Api.resolveApiUrl(`tracks/${trackId}/content`);
  }

  public static resolvePosterUrl(trackId: string): string {
    return Api.resolveApiUrl(`tracks/${trackId}/poster`);
  }

  private static useTracksConfig = { queryKey: ["tracks"], queryFn: Api.fetchMusicRecords };
  public static useTracks = () => useQuery(this.useTracksConfig);
  public static useTracksSuspense = () => useSuspenseQuery(this.useTracksConfig);


}
