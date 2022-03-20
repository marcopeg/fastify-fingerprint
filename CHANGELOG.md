# Fastify Fingerprint Changelog

## ROADMAP

### v1.1.0

- [ ] Extend the default headers with a custom list of additional headers
- [ ] Extend the fingerprint using a list of cookies names to be included in the hash
- [ ] Set a number of randomic cookie with randomic values, then use only a few of those to decorate the fingerprint

---

## v1.0.0

- Decorate the Request object with the client's hashed fingerprint
- Use custom filtered headers or fallback on solid defaults
- Customize the Request object key
- Provide custom hashing logic
