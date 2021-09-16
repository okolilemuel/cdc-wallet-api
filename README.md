# CDC Bitcoin Wallet API Server

Wallet API for generating segwit wallet and multisignature P2SH address

## Routes

|Route| Method  | Params  | Description|
|----------------|--|--|--|
| $base_url/api/generate/segwit|POST | seed, path |generates segwit address with seed and path |
| $base_url/api/generate/segwit | POST| m, n, pubkeys[]|generate multisignature address

## Postman Collection

[get the postman collection](https://documenter.getpostman.com/view/2412192/U16opjGL)

## Local development

- Fork/Clone
- Install dependencies - ``npm install``
- Compile - ``npm run build``
- Run the development server - ``npm run dev``
- Test - ``npm run test``
