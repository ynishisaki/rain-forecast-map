// import { defineStore } from "pinia";

export const useLonLat = defineStore("lonLat", {
	state: () => ({ lon: 0, lat: 0 }),
	actions: {
		setLngLat(lon: number, lat: number) {
			this.lon = lon;
			this.lat = lat;
		},
	},
});
