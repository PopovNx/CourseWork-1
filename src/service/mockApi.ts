import { MusicRecord } from "../dto";

export class MockApi {
    private static MOCK_URLS= [
        '/1.m4a',
        '/2.m4a']
    public static async fetchMusicRecords(): Promise<MusicRecord[]> {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const generateMockRecord = (name: string) => ({
            id: Math.random().toString(),
            name,
            size: "5MB",
            duration: "3:00",
            poster: "https://via.placeholder.com/150",
            playUrl: this.MOCK_URLS[Math.floor(Math.random() * this.MOCK_URLS.length)]
        });
        return [
            generateMockRecord("Music 1"),
            generateMockRecord("Music 2"),
            generateMockRecord("Music 3"),
            generateMockRecord("Music 4"),
            generateMockRecord("Music 5"),
            generateMockRecord("Music 6"),
            generateMockRecord("Music 7"),
            generateMockRecord("Music 8"),
            generateMockRecord("Music 9"),
            generateMockRecord("Music 10"),
        ];
    }
}