import { Data } from "~/types";

export default defineEventHandler(async function getWeather(lon: number, lat: number): Promise<Data> {
	const config = useRuntimeConfig();
	const id = config.clientId;
	if (!id) {
		throw new Error("API key (clientId) is not set in the runtime config");
	}

	const baseUrl = "https://map.yahooapis.jp/weather/V1/place";
	const url = `${baseUrl}?coordinates=${lon},${lat}&output=json&appid=${id}`;
	const response = await fetch(url);
	return await response.json();
});
