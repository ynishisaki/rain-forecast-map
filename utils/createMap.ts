// import mapStyles from "@/functions/mapStyles";
import maplibregl, { GeolocateControl } from "maplibre-gl";

let map: maplibregl.Map;
const { initialCenter, initialZoom, baseMapStyle } = mapStyles();

export default function createMap(mapElement: HTMLDivElement, setLngLat: (lon: number, lat: number) => void) {
	map = new maplibregl.Map({
		container: mapElement,
		style: baseMapStyle,
		center: initialCenter,
		zoom: initialZoom,
		minZoom: 5,
		maxZoom: 18,
		pitch: 60,
	});

	map.addControl(
		new maplibregl.NavigationControl({
			showCompass: true,
		}),
		"top-right"
	);

	let geolocate = new GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true,
		},
		trackUserLocation: true,
	});

	map.addControl(geolocate);
	map.on("load", function () {
		geolocate.trigger();
	});
	geolocate.on("geolocate", function (e) {
		setLngLat(e.coords.longitude, e.coords.latitude);
	});

	map.addControl(
		new maplibregl.TerrainControl({
			source: "terrain",
		}),
		"top-right"
	);
	const terrainComtrol = document.querySelector(".maplibregl-ctrl-terrain");
	terrainComtrol?.addEventListener("click", () => {
		map.getTerrain() ? map.easeTo({ pitch: 60 }) : map.easeTo({ pitch: 0 });
	});

	return map;
}
