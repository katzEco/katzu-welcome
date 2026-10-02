export async function weather(city?: string): Promise<string> {
  const query = city && city.trim() ? encodeURIComponent(city.trim()) : "";
  const link = `https://wttr.in/${query}?format=3`;

  try {
    const response = await fetch(link, {
      signal: AbortSignal.timeout(4000),
      headers: {
        "User-Agent": "curl/7.88.1",
      },
    });

    if (!response.ok) {
      return city ? `${city} (weather service unavailable)` : "Weather service unavailable";
    }

    const data = (await response.text()).trim();
    return data;
  } catch {
    return city ? `${city} (offline / unavailable)` : "Weather offline / unavailable";
  }
}

export default weather;
