---
icon: lucide/arrow-down-to-line
---

# Inbound API formats

An inbound API format defines how a router, firewall, NAS, or DDNS client sends
an IP address update to DNSbun. DNSbun receives that single request and relays
the update to the DNS providers configured in your account.

## First supported format: DNS-O-Matic

Our first supported format follows the
[DNS-O-Matic](https://dnsomatic.com/) API format. DNS-O-Matic has announced to
its users that the service will be discontinued soon. Supporting its familiar
request format first should give existing users, routers, and update clients a
straightforward migration path to DNSbun.

DNS-O-Matic's format is also a natural fit for DNSbun: both services accept one
DDNS update and distribute it to multiple configured destinations.

## Current request shape

DNSbun implements the core behavior described in the
[DNS-O-Matic API documentation](https://dnsomatic.com/docs/api):

- Updates sent over HTTPS.
- HTTP Basic authentication using DNSbun-issued credentials.
- `GET` and `POST` update requests.
- The familiar `/nic/update` path.
- A `hostname` parameter identifying what should be updated.
- The `all.dnsbun.com` target for all configured destinations, with
  `all.dnsomatic.com` retained as a compatibility alias.
- An optional `myip` parameter containing the new IP address. When it is
  omitted, DNSbun should detect the address from the request where possible.
- Short text responses familiar to existing DDNS clients, such as `good`,
  `nochg`, `badauth`, `nohost`, and `abuse`.

A compatible request will follow this general shape:

``` http
GET /nic/update?hostname=home.example.com&myip=192.0.2.10 HTTP/1.1
Host: update.dnsbun.com
Authorization: Basic <credentials>
User-Agent: ExampleRouter/1.0
```

The endpoint is available at `https://update.dnsbun.com/nic/update`. See the
[DNS-O-Matic migration guide](migrate-from-dns-o-matic.md) when moving an
existing client, or the [router guides](router-guides/index.md) for
device-specific setup instructions.

## Future formats

We expect to add more inbound formats after DNS-O-Matic compatibility. Their
priority will be guided by the devices and clients people need to connect. If a
particular format matters to you, [join the waitlist](https://dnsbun.com/#waitlist)
and tell us about your setup.
