import fs from "node:fs";
import path from "node:path";

import config from "../config/config.js";

export const extractCode = () => {
	const extractedFiles = [];
	const warnings = [];
	const extractedPaths = new Set();

	const rootPath = path.resolve(config.ROOT_PATH);

	processRootFiles( // processes files directly in the root folder
		rootPath,
		extractedFiles,
		extractedPaths,
		warnings,
	);

	processRootFolders( // processes all files/subfolders in specified root folders
		rootPath,
		extractedFiles,
		extractedPaths,
		warnings,
	);

	return {
		extractedFiles,
		warnings,
	};
};

const processRootFiles = ( // processes files directly in the root folder
	rootPath,
	extractedFiles,
	extractedPaths,
	warnings,
) => {
	const rootFiles = [...config.ROOT_FILES]
		.filter((file) => !config.IGNORED_NAMES.includes(file))
		.sort();

	for (const fileName of rootFiles) {
		const filePath = path.join(rootPath, fileName);

		if (!fs.existsSync(filePath)) {
			warnings.push(`Root file "${fileName}" was not found.`);
			continue;
		}

		if (!fs.statSync(filePath).isFile()) {
			warnings.push(`"${fileName}" exists but is not a file.`);
			continue;
		}

		addFile(
			filePath,
			rootPath,
			extractedFiles,
			extractedPaths,
		);
	}
};

const processRootFolders = ( // processes all files/subfolders in specified root folders
	rootPath,
	extractedFiles,
	extractedPaths,
	warnings,
) => {
	const rootFolders = [...config.ROOT_FOLDERS]
		.filter((folder) => !config.IGNORED_NAMES.includes(folder))
		.sort();

	for (const folderName of rootFolders) {
		const folderPath = path.join(rootPath, folderName);

		if (!fs.existsSync(folderPath)) {
			warnings.push(`Root folder "${folderName}" was not found.`);
			continue;
		}

		if (!fs.statSync(folderPath).isDirectory()) {
			warnings.push(`"${folderName}" exists but is not a directory.`);
			continue;
		}

		traverseDirectory(
			folderPath,
			rootPath,
			extractedFiles,
			extractedPaths,
		);
	}
};

const traverseDirectory = ( // traverses a directory and processes its files/subfolders
	directoryPath,
	rootPath,
	extractedFiles,
	extractedPaths,
) => {
	const directoryEntries = fs.readdirSync(directoryPath, { withFileTypes: true });

	const directories = directoryEntries
		.filter((entry) => entry.isDirectory())
		.filter((entry) => !config.IGNORED_NAMES.includes(entry.name))
		.sort((a, b) => a.name.localeCompare(b.name));

	const files = directoryEntries
		.filter((entry) => entry.isFile())
		.filter((entry) => !config.IGNORED_NAMES.includes(entry.name))
		.sort((a, b) => a.name.localeCompare(b.name));

	for (const file of files) {
		addFile(
			path.join(directoryPath, file.name),
			rootPath,
			extractedFiles,
			extractedPaths,
		);
	}

	for (const directory of directories) {
		traverseDirectory(
			path.join(directoryPath, directory.name),
			rootPath,
			extractedFiles,
			extractedPaths,
		);
	}
};

const addFile = ( // adds a file to the extracted files list
	filePath,
	rootPath,
	extractedFiles,
	extractedPaths,
) => {
	const extension = path.extname(filePath);

	if (!config.INCLUDED_EXTENSIONS.includes(extension)) {
		return;
	}

	const normalizedPath = path.normalize(filePath);

	if (extractedPaths.has(normalizedPath)) {
		return;
	}

	extractedPaths.add(normalizedPath);

	const relativePath = path
		.relative(rootPath, filePath)
		.split(path.sep)
		.join("/");

	const contents = fs.readFileSync(
		filePath,
		"utf8",
	);

	extractedFiles.push({
		relativePath: `root/${relativePath}`,
		contents,
	});
};
