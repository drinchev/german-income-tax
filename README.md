# German Income Tax

[![build status](https://img.shields.io/circleci/token/9db7564a37b0135e3a814c7db003f1a7a50f2e6c/project/drinchev/german-income-tax/master.svg)](https://circleci.com/gh/drinchev/german-income-tax)

Calculates the German income tax

## Installation

```
$ npm install german-income-tax
```

## Usage

With TypeScript

```typescript
import tax, { Year } from "german-income-tax";

const myTax = tax( 88000, Year.Y2018 );

// myTax.solidarityTax === 1558.59
// myTax.incomeTax === 28338

const ourTax = tax( 88000, Year.Y2018, { couple: true } );

// myTax.solidarityTax === 1113.42
// myTax.incomeTax === 20224
```

or with JavaScript

```typescript
import tax from "german-income-tax";

const myTax = tax( 88000, "2018" );

// myTax.solidarityTax === 1558.59
// myTax.incomeTax === 28338

const ourTax = tax( 88000, "2018", { couple: true } );

// myTax.solidarityTax === 1113.42
// myTax.incomeTax === 20224
```

## License

MIT
