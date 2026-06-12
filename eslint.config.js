import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs}"],
		plugins: {
			"js": js,
			"@stylistic": stylistic,
		},
		extends: ["js/recommended"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			"camelcase": ["error", {
				properties: "never",
			}],
			"no-console": ["error", {
				allow: ["error"],
			}],
			"prefer-const": ["error"],
			"func-names": ["error", "always"],
			"curly": ["error", "all"],
			"require-await": ["error"],
			"no-else-return": ["error"],
			"@stylistic/max-len": ["error", {
				code: 100,
				ignoreUrls: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
			}],
			"@stylistic/brace-style": ["error"],
			"@stylistic/indent": ["error", "tab"],
			"@stylistic/comma-dangle": ["error", "always-multiline"],
			"@stylistic/object-curly-spacing": ["error", "always"],
			"@stylistic/array-bracket-spacing": ["error", "never"],
			"@stylistic/quote-props": ["error", "consistent-as-needed"],
			"@stylistic/multiline-comment-style": ["error", "starred-block"],
			"@stylistic/semi": ["error", "always"],
		},
	},
]);
