export interface WotdItem {
    word: string;
    definition: string;
    category?: string;
}
export declare function wotd(type?: "idiom" | "quote" | "zen" | "random"): Promise<WotdItem>;
export default wotd;
