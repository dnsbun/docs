---
icon: simple/ubiquiti
---

# UniFi

UniFi gateways use Inadyn as their dynamic DNS client. The UniFi form combines
the update server, path, and Inadyn placeholders into its **Server** field.

## Configure Dynamic DNS

In the UniFi Network application, open your Internet connection's settings and
create a new Dynamic DNS entry. Enter these values:

| Field | Value |
| --- | --- |
| Service | `Dyndns` |
| Hostname | `all.dnsomatic.com` to update all configured destinations |
| Username | Your DNSbun username |
| Password | Your DNSbun password |
| Server | `update.dnsbun.com/nic/update?hostname=%h&myip=%i` |

Save the entry after checking that:

- **Hostname** is `all.dnsomatic.com` to target all destinations, or contains a
  specific fully qualified DNS record. It must not contain
  `https://update.dnsbun.com`.
- **Server** does not include an `https://` prefix.
- The `%h` and `%i` placeholders are entered literally. Inadyn replaces them
  with the configured hostname and the gateway's detected WAN address.

Inadyn uses HTTPS by default, so credentials are sent to
`update.dnsbun.com` over port 443.

## Verify the request

After saving, UniFi should send an update when it detects a WAN address change.
During DNSbun's early preview, a valid request is logged and receives:

``` text
nochg <address>
```

This response currently confirms that DNSbun received and parsed the request;
DNS records are not changed yet.

## Troubleshooting

### The update request does not arrive

Confirm that the **Server** value includes the complete path and query template:

``` text
update.dnsbun.com/nic/update?hostname=%h&myip=%i
```

Also confirm that the username, password, and hostname fields are not empty.

### The wrong hostname is sent

Use `all.dnsomatic.com` to target all destinations. To target a specific
record, enter its fully qualified DNS name, such as `home.example.com`. Do not
enter the DNSbun API address in that field.

### The gateway is behind CGNAT

DNSbun can still observe the public address presented to the Internet, but a
DDNS record alone cannot make inbound connections work through carrier-grade
NAT. Ask your ISP for a public address or use a tunnel-based access method.

## References

- [UniFi Gateway — Dynamic DNS](https://help.ui.com/hc/en-us/articles/9203184738583-UniFi-Gateway-Dynamic-DNS)
- [Inadyn custom DDNS providers](https://github.com/troglobit/inadyn#custom-ddns-providers)
