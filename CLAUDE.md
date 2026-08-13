# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

**chapterscript.com**, the developer-facing home of two open source projects by
the studio **Implement**: the **ChapterScript** format (an open JSON format for
immersive, interactive spatial experiences) and the **ChapterPlayer** runtime
(the open source Swift runtime that plays them on Apple Vision Pro).

Pure static HTML/CSS/JS. No build step, no framework, no package.json. Google
Fonts is the only external dependency. Deploys to GitHub Pages (`CNAME` +
`.nojekyll` are load-bearing). Served locally by Laravel Herd at
http://chapterscript.test. All links are root-relative.

Sister sites, each with its own look (do not borrow their themes):
maestrostud.io (dark indigo storybook, Fraunces) and implement.studio (warm
ivory editorial).

## Design tokens (in `:root` of `assets/css/site.css`)

Dark slate terminal aesthetic:

- Backgrounds: `--bg #0b0e14`, `--panel #11161f`, `--panel-2 #151b26`
- Borders: `--border rgba(255,255,255,.08)`, `--border-strong rgba(255,255,255,.14)`
- Text: `--ink #e6edf3`, `--dim #8b98a9`, `--faint #5b6675`
- Accents: `--mint #56d4a0` (primary: links, CTAs), `--blue #7aa2f7` (secondary)
- Syntax colors for code panels: `--syn-key` (blue), `--syn-str` (mint),
  `--syn-num` (amber), `--syn-comment` (faint)
- Fonts: `--font-display` Space Grotesk, `--font-body` Inter, `--font-mono`
  JetBrains Mono (used prominently: eyebrows, labels, nav wordmark, buttons)

Use the CSS variables, not literal hex, for anything new. The brand is
type-only: the wordmark is "chapterscript" in JetBrains Mono with ".com" in
mint (`<span class="accent">`). There is no logo image.

## Naming rules (strict)

- **ChapterScript** and **ChapterPlayer** are exactly-cased, always.
- **Maestro appears in exactly one place**: the homepage footer link "Maestro,
  the authoring suite" → maestrostud.io (restored 2026-08-12 by request). No
  other Maestro mentions or maestrostud.io links anywhere; page copy stands
  alone as the open source home, with the footer "An Implement project"
  linking implement.studio.
- NEVER use these strings anywhere: "Chapter Vision", "Chapter Studio",
  "Vision Studio", "SharedVisions", "Afterburn", "MaestroKit", "chapterengine".
- Do not invent APIs, license names, version numbers, or benchmark claims.
- GitHub links point at https://github.com/mike-bundy/ChapterScript and
  .../ChapterPlayer (live repos, exact casing).
- Reference content on /format.html and /player.html was verified against the
  actual packages in ~/code/ChapterScript and ~/code/ChapterPlayer (2026-08-12).
  When the format or runtime changes, re-verify against the source before
  editing claims; don't extend the reference from memory.

## Copy style

Developer-voiced, confident, precise. No hype-words. At most 1 to 3 em dashes
across the whole page; prefer periods, commas, colons. No "isn't just X, it's
Y" constructions. Title pattern: "ChapterScript — an open format for spatial
stories".

## Behavior rules

- The page must look right with JS disabled: `.reveal` content is visible by
  default; JS adds `html.reveal-enabled` (only when motion is allowed) before
  anything is hidden. Keep that true for anything new.
- `prefers-reduced-motion` is honored everywhere: no reveals, no smooth
  scroll. Keep it that way.
- Wide code blocks scroll horizontally inside their panel (`overflow-x: auto`);
  the page body never scrolls sideways.

## Verification (run after any change)

```bash
cd ~/Herd/chapterscript

# no forbidden strings (must print nothing)
grep -rni "chapter vision\|chapter studio\|vision studio\|sharedvisions\|afterburn\|maestrokit\|chapterengine" \
  index.html format.html player.html 404.html README.md assets/css/*.css assets/js/*.js

# exact casing of the two project names (must print nothing)
grep -rn "Chapterscript\|chapterScript\|ChapterScript\b" index.html | grep -v "ChapterScript" ; \
grep -rn "Chapterplayer\|chapterPlayer" index.html 404.html README.md

# every internal href resolves
grep -rhoE 'href="/[^"#]*"' index.html format.html player.html 404.html | sed 's/href="//;s/"//' | sort -u | \
  while read u; do [ "$u" = "/" ] || [ -f ".$u" ] || echo "MISSING: $u"; done

# every anchor href has a matching id
grep -oE 'href="#[^"]*"' index.html | sed 's/href="#//;s/"//' | sort -u | \
  while read a; do grep -q "id=\"$a\"" index.html || echo "MISSING ANCHOR: #$a"; done

# pages actually serve
curl -s -o /dev/null -w "%{http_code}\n" http://chapterscript.test/
```
