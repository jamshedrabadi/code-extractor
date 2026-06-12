import fs from "node:fs";
import path from "node:path";

import config from "../config/config.js";
import logger from "../logger/logger.js";
import { extractCode } from "./extractor.js";
import { writeOutput } from "./outputWriter.js";

const main = () => {
	const rootPath = path.resolve(config.ROOT_PATH); // absolute path to the project root

	const outputDirectory = path.join( // absolute path to the output directory
		process.cwd(),
		config.OUTPUT_DIRECTORY,
	);

	if (!fs.existsSync(outputDirectory)) { // create output directory if it doesn't exist
		fs.mkdirSync(outputDirectory, {
			recursive: true,
		});
	}

	const outputFile = path.join( // absolute path to the output file
		outputDirectory,
		config.OUTPUT_FILENAME,
	);

	logger.log("========================================");
	logger.log("Code Extractor");
	logger.log("========================================");
	logger.log(`Project root: ${rootPath}`);
	logger.log(`Output file: ${outputFile}`);
	logger.log("");

	const result = extractCode(); // extract code from the project based on the configuration

	writeOutput( // write the extracted code to the output file
		outputFile,
		result.extractedFiles,
	);

	logger.log(`Files extracted: ${result.extractedFiles.length}`);
	logger.log(`Warnings: ${result.warnings.length}`);

	if (result.warnings.length > 0) {
		logger.log("");
		logger.log("Warnings:");

		for (const warning of result.warnings) {
			logger.log(`- ${warning}`);
		}
	}

	logger.log("");
	logger.log(`Output written to: ${outputFile}`);
	logger.log("========================================");
};

try {
	main();
} catch (error) {
	logger.error(error);
	process.exit(1);
}
