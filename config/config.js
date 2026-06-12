const config = {
	ROOT_PATH: "",

	ROOT_FILES: [],

	ROOT_FOLDERS: [],

	INCLUDED_EXTENSIONS: [
		".js",
		".ts",
		".tsx",
	],

	IGNORED_NAMES: [
		".git",
		".gitignore",
		".editorconfig",
		"eslint.config.js",
		"package.json",
		"package-lock.json",
		"node_modules",
	],

	OUTPUT_DIRECTORY: "output",

	OUTPUT_FILENAME: "extracted_code.txt",
};

export default config;
