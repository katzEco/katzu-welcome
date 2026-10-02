export interface PromptOptions {
    city?: string;
    type: "idiom" | "quote" | "zen";
    faceIndex?: number;
}
export declare function askInteractiveOptions(defaults?: {
    city?: string;
    type?: "idiom" | "quote" | "zen";
}): Promise<PromptOptions>;
