---
icon: lucide/rabbit
---

# DNSbun documentation

DNSbun is a dynamic DNS (DDNS) fan-out relay. Send your IP update to DNSbun
once, and it updates every DNS service you have configured. Instead of setting
up your router or update client separately for every provider, you only need to
point it at DNSbun.

## One update, every destination

Your router, firewall, NAS, or update client only needs to know about DNSbun.
When your public IP address changes:

1. Your device sends the new IP address to DNSbun.
2. DNSbun validates the request and identifies the destinations in your update
   group.
3. DNSbun updates the configured DNS records at each provider.
4. You can see whether every destination was updated successfully.

``` mermaid
flowchart LR
  A[Router or DDNS client] -->|One IP update| B[DNSbun]
  B --> C[DNS provider A]
  B --> D[DNS provider B]
  B --> E[DNS provider C]
```

## Why use DNSbun?

- **Configure your updater once.** Point it at DNSbun instead of maintaining a
  separate setup for every provider.
- **Update multiple services together.** One request can update records across
  all of your configured DNS services.
- **Keep providers independent.** A problem with one destination does not stop
  DNSbun from updating the others.
- **See what happened.** Each destination has its own update result, making
  failures easier to find and fix.

## Supported outbound services

DNSbun can relay updates to more than 50 DNS services, including Cloudflare,
DigitalOcean, DuckDNS, Gandi, Hetzner, Namecheap, Porkbun, Route 53, and many
more. See the [full list of supported services](supported-services.md).

!!! note

    DNSbun does not host your DNS zone. It connects your DDNS client to the DNS
    providers that remain authoritative for your domains.
