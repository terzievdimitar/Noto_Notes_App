export function formatDate(date) {
	const newDateFormat = new Date(date);

	return newDateFormat.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}
