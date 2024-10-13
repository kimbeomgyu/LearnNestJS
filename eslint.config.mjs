import typescriptEslintEslintPlugin from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "*.js",
        "**/*.d.ts",
        "**/dist",
        "**/node_modules",
        "**/coverage",
        "**/*.config.mjs",
    ],
}, ...compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"), {
    plugins: {
        "@typescript-eslint": typescriptEslintEslintPlugin,
        "unused-imports": unusedImports,
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
        },
    },

    rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-unsafe-assignment": ["warn"],
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/prefer-includes": ["warn"],
        "prettier/prettier": "warn",
        "prefer-spread": "warn",
        eqeqeq: ["error"],
        "no-param-reassign": ["error"],
        "prefer-template": ["warn"],
        "lines-between-class-members": ["error"],
        curly: [2, "all"],
        "no-return-await": ["error"],
        "unused-imports/no-unused-imports": "error",

        "@typescript-eslint/naming-convention": ["warn", {
            selector: ["classProperty", "classMethod", "variable", "parameter"],
            format: ["camelCase", "UPPER_CASE", "PascalCase"],
        }, {
            selector: ["class", "interface", "typeAlias", "enum"],
            format: ["PascalCase"],
        }],

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
        }],
    },
}];