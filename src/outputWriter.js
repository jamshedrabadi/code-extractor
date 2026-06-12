import fs from "node:fs";

export const writeOutput = (
	outputFile,
	extractedFiles,
) => {
	let output = "";

	for (const extractedFile of extractedFiles) {
		output += "==================================================\n";
		output += `${extractedFile.relativePath}\n`;
		output += "==================================================\n\n";
		output += extractedFile.contents;

		if (!extractedFile.contents.endsWith("\n")) {
			output += "\n";
		}

		output += "\n\n";
	}

	fs.writeFileSync(
		outputFile,
		output,
		"utf8",
	);
};
