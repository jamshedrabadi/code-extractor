/* eslint-disable no-console */

const logger = {
	log(...args) {
		console.log(...args);
	},

	warn(...args) {
		console.warn(...args);
	},

	error(...args) {
		console.error(...args);
	},
};

export default logger;
