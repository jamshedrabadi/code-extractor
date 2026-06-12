const config = {
	ROOT_PATH: "", // root path of the project, use \\

	ROOT_FILES: [], // files directly in the root folder to extract code from

	ROOT_FOLDERS: [], // folders in the root folder to extract code from

	INCLUDED_EXTENSIONS: [], // file extensions to include, leave empty to include all extensions

	IGNORED_NAMES: [], // file/folder names to ignore, leave empty to include all names

	OUTPUT_DIRECTORY: "output",

	OUTPUT_FILENAME: "extracted_code.txt",
};

export default config;
