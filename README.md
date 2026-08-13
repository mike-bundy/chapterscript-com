# chapterscript.com

The home of two open source projects by [Implement](https://implement.studio):
the **ChapterScript** format and the **ChapterPlayer** runtime.

Pure static site. No build step, no framework, no package.json. The only
external dependency is Google Fonts (Space Grotesk, Inter, JetBrains Mono).

## Structure

```
index.html          Single-page site (anchors: #format #model #guarantees #player #spec #repos)
404.html            Themed not-found page, links home
assets/css/site.css All design tokens and styles
assets/js/site.js   Progressive enhancement: reveal-on-scroll, nav state, hero typing
CNAME               chapterscript.com (GitHub Pages custom domain)
.nojekyll           Tells GitHub Pages to skip Jekyll processing
```

All links are root-relative, so the site must be served from a domain root.

## Local development

Served by Laravel Herd at http://chapterscript.test. No other setup: edit a
file, reload the browser.

## Deploy

Push to the GitHub Pages branch of the site repository. Pages serves the
directory as-is; `CNAME` binds the custom domain and `.nojekyll` disables
Jekyll. Configure Pages to use `404.html` for not-found routes (it does this
automatically for a file with that name).
