---
icon: lucide/arrow-right-left
---

# Migrate from DNS-O-Matic

DNSbun is compatible with the DNS-O-Matic update API. Clients that already
send DynDNS-style updates to DNS-O-Matic can use the same request format with
DNSbun by changing the update endpoint and credentials.

!!! info "Early preview"

    Compatibility currently covers receiving, authenticating, validating, and
    logging update requests. DNSbun does not forward updates to DNS providers
    yet, so do not replace a production DNS-O-Matic configuration at this
    stage. Valid requests receive a `nochg` response while the update pipeline
    is under development.

## Compatible request behavior

DNSbun supports the DNS-O-Matic conventions used by existing update clients:

- HTTPS requests using HTTP Basic authentication.
- `GET` and form-encoded `POST` requests to `/nic/update`.
- An `all.dnsomatic.com` hostname target for all configured destinations.
- An omitted hostname as another way to target all configured destinations.
- A comma-separated hostname list for clients that update specific records.
- DynDNS-compatible response codes.

## Settings to change

Keep the existing DNS-O-Matic request format and replace its connection
settings with the following values:

| Setting | DNSbun value |
| --- | --- |
| Update endpoint | `https://update.dnsbun.com/nic/update` |
| Hostname for all destinations | `all.dnsomatic.com` |
| Username | Your DNSbun username |
| Password | Your DNSbun password |

Some clients have separate server and path fields, while others require the
path and parameter placeholders in a single field. See the
[router guides](router-guides/index.md) for the exact fields supported by your
device.

## Verify compatibility

Send a test update and check the client's status or logs. During the early
preview, a successfully parsed request receives:

``` text
nochg <address>
```

This confirms that DNSbun accepted the credentials, target, and IP address. It
does not yet confirm that a DNS provider was updated.

## Roll back

Until DNS provider updates are available, keep the original DNS-O-Matic
settings recorded. To roll back a test, restore the previous update server and
DNS-O-Matic credentials in your client.
