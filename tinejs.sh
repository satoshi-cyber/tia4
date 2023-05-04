node ./tinejs-cli/use-case-output.js
node ./tinejs-cli/tine-output-json.js
node ./tinejs-cli/create-jest-config.js

jest --config=./useCases/jest.config.js 

rm ./useCases/.types.ts
rm ./useCases/jest.config.js
rm ./useCases/useCases.test.ts
rm -fr ./pages/api/tine

mkdir ./pages/api
mkdir ./pages/api/tine

node ./tinejs-cli/use-case-types.js
node ./tinejs-cli/tine-types.js
node ./tinejs-cli/tine-apis.js

rm ./useCases/useCases.json

prettier --write ./useCases/index.ts
prettier --write ./useCases/types.ts
prettier --write ./pages/api/tine/*
