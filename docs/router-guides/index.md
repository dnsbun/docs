---
icon: lucide/router
---

# Router guides

Configure your router or firewall to send one dynamic DNS update to DNSbun.
DNSbun accepts the familiar DynDNS-compatible `/nic/update` request format at
`update.dnsbun.com`.

!!! info "Early preview"

    The endpoint currently validates and logs update requests but does not
    change DNS records. It returns `nochg` for valid requests while the update
    pipeline is under development.

## Available guides

- [UniFi](unifi.md)

## Generic DynDNS settings

If your device supports a custom DynDNS-compatible provider, start with these
values:

| Setting | Value |
| --- | --- |
| Protocol | HTTPS |
| Server | `update.dnsbun.com` |
| Port | `443` |
| Update path | `/nic/update` |
| Authentication | HTTP Basic |

The hostname field should contain the fully qualified DNS record you want to
update, such as `home.example.com`. It should not contain the DNSbun endpoint.

Some clients combine the server and update path into one field or require
placeholders for the hostname and address. Follow the device-specific guide
when one is available.
