# Content & SEO playbook: publish, get crawled, rank

Goal: every new article is live within minutes, discoverable by search engines straight away, and built to rank.

## 1. Publish an article (no coding)

1. On GitHub, open `projects/ngb-ventures-website/content/insights/`.
2. Open `_TEMPLATE.md`, copy its contents, then click **Add file → Create new file**.
3. Name the file after the search phrase you want to rank for, for example `importing-spices-into-the-uk.md`. The file name becomes the page address: `/insights/importing-spices-into-the-uk`.
4. Fill in the front matter (title, description, date, category, keywords, related links), write the body, and remove `draft: true`.
5. Click **Commit changes**.

The **NGB website → GitHub Pages** workflow then rebuilds and publishes the site in about 2–3 minutes. The new article automatically gets:
- its own page, with Article structured data, canonical URL and Open Graph tags
- an entry in `sitemap.xml` (with `lastmod`) and in the RSS feed `/insights/feed.xml`
- a place on `/insights`, the homepage journal (if newest), the **footer of every page** (the 3 newest articles), site search and "More from Insights"
- an **IndexNow** ping to Bing and other IndexNow engines, listing only new or changed URLs

To update an article later, edit the file and set `updated:` to today's date. The sitemap `lastmod` and `dateModified` change, which signals freshness.

## 2. How each search engine finds new content

| Engine | How it learns about new pages | What we've set up |
|---|---|---|
| Google | Sitemaps, RSS/Atom feeds, links from known pages, Search Console | `sitemap.xml` with accurate `lastmod`; RSS feed; footer links to new articles from every page; homepage journal |
| Bing, Yandex, Seznam, Naver | IndexNow push, sitemaps | Automatic IndexNow submission on every deploy (key file `public/<key>.txt`) |

Google doesn't support IndexNow, and its Indexing API is only for job posts and livestreams, so no tool can force instant indexing on Google. The setup above is what Google itself recommends.

## 3. One-time setup (owner)

1. **Google Search Console:** add a URL-prefix property for `https://omkar8787.github.io/claude-skills/`, verify it with the HTML-file method (upload the file to `gh-pages`; deploys preserve it), then submit **both** `sitemap.xml` **and** `insights/feed.xml` under *Sitemaps*. The feed carries the newest URLs, which helps fresh content get crawled sooner.
2. **Bing Webmaster Tools:** import the site from Search Console in one click. IndexNow submissions then appear there.
3. After publishing an important article, use Search Console's **URL Inspection → Request indexing** for that URL.
4. **Custom domain (strongly recommended):** a `github.io/claude-skills/` sub-path ranks worse than your own domain and can't hold its own Search Console domain property. Point a domain to GitHub Pages, set `NGB_SITE_URL` and `NGB_BASE_PATH` (as repository variables), and everything (canonicals, sitemap, feed) follows.

## 4. Writing articles that rank

- **One search intent per article.** Choose the exact phrase a buyer types (for example "how to import spices from India to the UK") and answer it fully.
- **Title** 50–65 characters with the phrase near the start. **Description** 120–158 characters that promises a specific outcome.
- **Structure:** 4–8 `##` sections that each answer a sub-question. Use bullet lists for steps and checklists.
- **Internal links:** link to 2–4 relevant site pages in the body (an industry, a tool, `/quote`), and list 2–3 under `related:`.
- **Evidence:** name official sources (FSSAI, Spices Board, FDA, EU regulations). Never invent statistics, clients or certifications.
- **Freshness:** revisit regulatory content quarterly and bump `updated:`.
- **Cadence:** 2–4 well-researched articles a month beats daily thin posts.

## 5. Ideas backlog (high intent, low competition)

- Importing spices from India to the UK / EU / US: step by step
- Private-label tea from India: grades, MOQs and packaging
- Makhana wholesale: grades, moisture and shelf life
- Diwali corporate gifts for global teams: timelines and customs
- Brass barware: food-safe linings and testing for EU/US
- Jute vs cotton tote bags: cost, durability and claims
- Choosing an Incoterm for your first shipment from India
- Hand block print vs screen print: how buyers can tell
- What "exporter of record" means for your supplier-diversity reporting
