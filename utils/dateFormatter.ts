// "202402041600" -> Date
export function parseDate(date: string) {
	const year = parseInt(date.slice(0, 4));
	const month = parseInt(date.slice(4, 6)) - 1;
	const day = parseInt(date.slice(6, 8));
	const hour = parseInt(date.slice(8, 10));
	const minute = parseInt(date.slice(10, 12));
	return new Date(year, month, day, hour, minute);
}

// "202402041600" -> "16:00"
export function formatTime(date: string) {
	const parsedDate = parseDate(date);
	return parsedDate.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
}

// "202402041600" -> Date
export function datestringToDate(date: string) {
	const year = parseInt(date.slice(0, 4));
	const month = parseInt(date.slice(4, 6)) - 1;
	const day = parseInt(date.slice(6, 8));
	const hour = parseInt(date.slice(8, 10));
	const minute = parseInt(date.slice(10, 12));
	return new Date(year, month, day, hour, minute);
}
