const fs = require('fs');
const Handlebars = require('handlebars');

const outputFile = './useCases/jest.config.js';

const template = `
const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './',
});
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    "^@/actions/(.*)$": "<rootDir>/../actions/$1",
  },
  transformIgnorePatterns: [
		'node_modules/(?!(query-string|decode-uri-component|split-on-first|filter-obj)/)',
	],
	babelConfig: {
		plugins: ['@babel/plugin-proposal-private-methods'],
	},
};

module.exports = createJestConfig(customJestConfig);
`;

const compiledTemplate = Handlebars.compile(template);

const generatedCode = compiledTemplate();

fs.writeFileSync(outputFile, generatedCode);
