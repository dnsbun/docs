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

