export const isEmpty = (obj) => {
	return Object.keys(obj).length === 0;
};
export const formatCurrency = (initalValue, currency) => {
	if (typeof initalValue === "string") {
		initalValue = initalValue.replace(new RegExp(/[.,]/g), "");
	}

	if (
		initalValue === undefined ||
		initalValue === null ||
		initalValue === "" ||
		isNaN(initalValue)
	) {
		initalValue = 0;
	}

	const value = parseInt(initalValue).toString();
	const prefix = `${currency} $`;

	if (value.length === 0) return "";

	const prefixValue = value
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return `${prefix} ${prefixValue}`;
};
