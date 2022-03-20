# fastify-fingerprint

<div align="center">

[![NPM](https://img.shields.io/npm/v/fastify-fingerprint?color=red)](https://www.npmjs.com/package/fastify-fingerprint)
[![MIT License](https://img.shields.io/github/license/marcopeg/fastify-fingerprint.svg?color=blue)](https://github.com/marcopeg/fastify-fingerprint/blob/master/LICENSE)
![CI/CD](https://github.com/marcopeg/fastify-fingerprint/actions/workflows/npm-publish.yml/badge.svg)

</div>

Generate a header-based fingerprint of the request.

## Usage

```js
const fingerprint = require("fastify-fingerprint");

fastify.register(fingerprint, { ...options });
```

## Options

### requestKey

Let you customize the request key that gets the fingerprint value.

```
type:    String
default: "fingerprint"
```

### acceptHeaders

Let you customize which headers to accept in the fingerprint.

> Default values comes [from here](https://privacycheck.sec.lrz.de/passive/fp_hs/fp_header_signature.php).

```
type:    Array
default: see src/filter-headers.js
```

### hashFn

Let you customize the hash function.

> By default we use Crypto.

```
type:    Function
default: see src/hash.js
```
