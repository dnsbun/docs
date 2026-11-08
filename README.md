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
The GitHub Pages workflow reads the public configuration from the
`POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` repository variables and renders it
into the site before building. Local builds leave analytics disabled by
default.

