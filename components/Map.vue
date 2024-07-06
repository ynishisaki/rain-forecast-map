<script setup lang="ts">
import "maplibre-gl/dist/maplibre-gl.css";
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
	});
});
</script>

<template>
	<div class="relative w-full h-full">
		<div class="absolute top-3 left-3 bg-white/90 z-10 rounded-lg shadow-xl"></div>
		<div id="mapContainer" class="w-full h-full" ref="mapElement" />
	</div>
</template>
