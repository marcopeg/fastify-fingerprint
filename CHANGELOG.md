# Fastify Fingerprint Changelog

## ROADMAP

### v2.0.0

- [ ] Change the `fingerprint` String to an object `fingerprint.value`
- [ ] Randomize the fingerprint (\*)

#### (\*) Randomize the fingerprint

NOTE: this will bring a breaking change as we will need

```json
{
  "request": {
    "fingerprint": {
      "value": "xxx",
      "next": "yyy"
    }
  }
}
```

1. Generate a randomic number
2. Calculate a "next" fingerprint that contains the current headers, plus the new randomic number
3. Set the randomic header in the reply object

---

## v1.2.0

- Add `rewriteHeaders` option

## v1.1.0

- Extend the default headers with a custom list of additional headers
- Extend the fingerprint using a list of cookies names to be included in the hash

## v1.0.0

- Decorate the Request object with the client's hashed fingerprint
- Use custom filtered headers or fallback on solid defaults
- Customize the Request object key
- Provide custom hashing logic
