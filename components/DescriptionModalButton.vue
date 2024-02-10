<template>
	<button class="btn btn-circle btn-ghost btn-xs items-center" onclick="modal_explain.showModal()">
		<!-- このサイトについて -->
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
			<path
				fill-rule="evenodd"
				d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
				clip-rule="evenodd" />
		</svg>
	</button>

	<dialog id="modal_explain" class="modal">
		<div class="modal-box">
			<h2 class="font-bold text-xl">表示されるメッセージについて</h2>

			<p class="py-4 text-sm">
				現在地点の現時刻から60分先までの降水強度予測値に基づき、以下の4つのうちのいずれかのメッセージが表示されます。
			</p>

			<ol class="list-decimal list-inside text-sm">
				<li>雨はしばらく降らなさそう</li>
				<li>雨が降りそう（⚪︎分後）</li>
				<li>雨は止みそう（⚪︎分後）</li>
				<li>雨はしばらく止まなさそう</li>
			</ol>

			<div class="modal-action">
				<form method="dialog">
					<button class="btn btn-sm btn-outline">閉じる</button>
				</form>
			</div>
		</div>
	</dialog>
</template>
