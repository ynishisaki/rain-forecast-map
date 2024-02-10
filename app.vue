<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

import "/assets/index.css";
import type { Data } from "~/types";

// サイトの説明
const isInitialDescriptionOpen = ref(true);
function handleInitialDescriptionOpen() {
	isInitialDescriptionOpen.value = !isInitialDescriptionOpen.value;
}

const store = useLonLat();
const { lon, lat } = storeToRefs(store);
const enabled = computed(() => lon.value !== 0 && lat.value !== 0);

// 天気情報を取得
function getWeather(): Promise<Data> {
	console.log("getWeather");
	return $fetch(`/api/weather?lon=${store.lon}&lat=${store.lat}`);
}

const { data } = useQuery({
	queryKey: ["weather", lon, lat],
	queryFn: getWeather,
	enabled,
});

const weathers = computed(() => {
	if (!data.value) return;
	return data.value.Feature[0].Property.WeatherList.Weather;
});

const currentDate = new Date();

const message = computed(() => {
	if (!weathers.value) return;

	const allZero = weathers.value.every((weather) => weather.Rainfall === 0);
	if (allZero) return "雨はしばらく降らなさそう";

	// 現在降っているかどうか
	const isRaining = weathers.value[0].Rainfall > 0;

	const currentDatetime = new Date();

	if (isRaining) {
		const stopRainIndex = weathers.value.findIndex((weather) => weather.Rainfall === 0);
		if (stopRainIndex === -1) return "しばらく雨は止まなさそう";

		const stopRainDate = datestringToDate(weathers.value[stopRainIndex].Date);
		return `雨は止みそう（${Math.floor((stopRainDate.getTime() - currentDate.getTime()) / 60000)}分後）`;
	} else {
		const startRainIndex = weathers.value.findIndex((weather) => weather.Rainfall > 0);
		const startRainDate = datestringToDate(weathers.value[startRainIndex].Date);
		return `雨が降りそう（${Math.floor((startRainDate.getTime() - currentDatetime.getTime()) / 60000)}分後）`;
	}
});
</script>

<template>
	<div
		v-if="isInitialDescriptionOpen && !enabled"
		class="card absolute top-[30%] left-[calc(50%-300px)] w-[600px] z-10 bg-base-100 rounded-lg shadow-xl">
		<div class="p-8 space-y-4">
			<div class="flex justify-between items-center">
				<h2 class="font-bold text-2xl">雨が降りそうかがわかるサイト</h2>
				<button @click="handleInitialDescriptionOpen" class="btn btn-xs btn-circle btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<p class="text-sm">現在地で1時間以内に雨が降り始めるかどうか、または止むかどうかを知ることができます。</p>
			<p class="text-xs text-glay-500">※当サイトのご利用には、位置情報の利用の許可が必要です。</p>
		</div>
	</div>

	<div v-if="data" class="card absolute top-3 left-3 z-10 bg-base-100 rounded-lg shadow-xl">
		<div class="px-3 py-5 space-y-4">
			<div class="flex justify-center items-center gap-x-1">
				<p class="text-xl text-center">{{ message }}</p>
				<DescriptionModalButton />
			</div>

			<div>
				<div class="text-xs text-right mr-3">単位: mm/h</div>
				<ul class="steps">
					<li
						v-for="(weather, index) in weathers"
						:key="index"
						class="step text-sm"
						:class="weather.Rainfall > 0 && 'step-secondary'"
						:data-content="`${roundOff(weather.Rainfall)}`">
						{{ formatTime(weather.Date) }}
					</li>
				</ul>
			</div>

			<div class="text-right mr-3">
				<ThemeController />
			</div>
		</div>
	</div>

	<Map />

	<YahooAttribution />
</template>
