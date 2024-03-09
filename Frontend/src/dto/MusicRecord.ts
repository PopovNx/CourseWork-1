import { z } from "zod";

export const MusicRecord = z.object({
    id: z.string().uuid(),
    title: z.string().min(1),
    duration: z.string().min(1),
});

export const MusicRecordList = z.array(MusicRecord);
export type MusicRecord = z.infer<typeof MusicRecord>;
