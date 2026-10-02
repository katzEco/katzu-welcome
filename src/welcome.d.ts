export interface WelcomeOptions {
    city?: string;
    type?: "idiom" | "quote" | "zen";
    showArt?: boolean;
    showWeather?: boolean;
    faceIndex?: number;
    useRandomColors?: boolean;
}
export declare function runWelcome(options?: WelcomeOptions): Promise<void>;
