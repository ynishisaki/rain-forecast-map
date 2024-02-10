import maplibregl, { type LngLatLike, type StyleSpecification } from "maplibre-gl";
import { useGsiTerrainSource } from "maplibre-gl-gsi-terrain";

const gsiTerrainSource = useGsiTerrainSource(maplibregl.addProtocol);

export default function mapStyles() {
	const center: LngLatLike = [139.76695313862655, 35.681881089686655]; // Tokyo Station
	const zoom = 15;

	const baseMapStyle: StyleSpecification = {
		version: 8,
		glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
		sources: {
			seamlessphoto: {
				type: "raster",
				tiles: ["https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg"],
				tileSize: 256,
				maxzoom: 18,
				attribution:
					"<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			},
			terrain: gsiTerrainSource,
			terrainshade: gsiTerrainSource,
			experimental_bvmap: {
				type: "vector",
				tiles: ["https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf"],
				maxzoom: 16,
				minzoom: 4,
				attribution:
					"<a href='https://maps.gsi.go.jp/development/vt_expt.html' target='_blank'>国土地理院ベクトルタイル提供実験</a>",
			},
		},
		layers: [
			{
				id: "seamlessphoto_layer",
				source: "seamlessphoto",
				type: "raster",
			},
			{
				id: "background",
				type: "background",
				paint: {
					"background-color": "#000",
					"background-opacity": 0.3,
				},
			},
			{
				id: "building",
				source: "experimental_bvmap",
				"source-layer": "building",
				type: "fill-extrusion",
				minzoom: 13,
				maxzoom: 18,
				paint: {
					"fill-extrusion-color": "gray",
					"fill-extrusion-height": [
						"match",
						["get", "ftCode"],
						3101,
						10, // 普通建物
						3102,
						40, // 堅ろう建物
						3103,
						100, // 高層建物
						3111,
						10, // 普通無壁舎
						3112,
						40, // 堅ろう無壁舎
						10,
					], // その他
					"fill-extrusion-opacity": 0.6,
				},
			},
			{
				id: "hillshade",
				source: "terrainshade",
				type: "hillshade",
				paint: {
					"hillshade-illumination-anchor": "map",
					"hillshade-exaggeration": 0.3,
				},
			},
		],
		terrain: {
			source: "terrain",
			exaggeration: 1,
		},
	};

	return {
		initialCenter: center,
		initialZoom: zoom,
		baseMapStyle: baseMapStyle,
	};
}
