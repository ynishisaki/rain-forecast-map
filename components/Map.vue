<script setup lang="ts">
import "maplibre-gl/dist/maplibre-gl.css";
// import { onMounted, ref } from "vue";
// import createMap from "@/functions/createMap";
import RainLayer from "mapbox-gl-rain-layer";

const store = useLonLat();
let map: maplibregl.Map;
const mapElement = ref<HTMLDivElement>();

onMounted(() => {
	map = createMap(mapElement.value!, store.setLngLat);

	map.on("load", () => {
		const rainLayer = new RainLayer({
			id: "rain",
			source: "rainviewer",
			scale: "noaa",
		});
		map.addLayer(rainLayer);

		// You can get the HTML text for the legend
		const legendHTML = rainLayer.getLegendHTML();

		// You can receive radar data refresh events
		// data.timestamp - Unix timestamp in seconds (UTC) when the data was generated
		rainLayer.on("refresh", (data) => {
			console.log(data.timestamp);
		});
	});
});
</script>

<template>
	<div class="relative w-full h-full">
		<div class="absolute top-3 left-3 bg-white/90 z-10 rounded-lg shadow-xl"></div>
		<div id="mapContainer" class="w-full h-full" ref="mapElement" />
	</div>
</template>
