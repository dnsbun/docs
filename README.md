# DNSbun documentation

The source for DNSbun's documentation site, built with
[Zensical](https://zensical.org/).

## Local development

Preview the site with a pinned Zensical release:

```sh
uvx --from zensical==0.0.62 zensical serve
```

Build the static site:

```sh
uvx --from zensical==0.0.62 zensical build --clean --strict
```

The generated site is written to `site/`.

## Analytics

Production builds load PostHog through the DNSbun first-party analytics proxy.
The public project token and ingestion host are configured in the client-side
script. Analytics only initializes on `docs.dnsbun.com`, so local builds do not
send events.

