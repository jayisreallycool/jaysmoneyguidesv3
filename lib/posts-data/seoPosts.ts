import { BlogPost } from '../types';

export const SEO_POSTS: BlogPost[] = [
  {
    id: 'post-seo-1',
    title: 'SEO Checklist: What to Check First and How to Check It',
    slug: '2026-practical-seo-checklist',
    excerpt: 'A prioritized SEO checklist in six groups. Every item names the free tool to check it with and says whether the advice comes from Google\'s own documentation.',
    category: 'SEO',
    tags: ['SEO Checklist', 'On-Page SEO', 'Technical SEO', 'E-E-A-T'],
    coverImage: '/images/uploads/seo-that-drives-sales.webp',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-07-21',
    updatedAt: '2026-10-03',
    readTimeMinutes: 8,
    difficulty: 'Beginner',
    featured: true,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['seo checklist', 'seo checklist for small websites', 'how to check if a page is indexed by google', 'on-page seo checklist', 'core web vitals good thresholds', 'what google says not to focus on for seo'],
    metaDescription: 'A prioritized SEO checklist in six groups, from indexing to trust. Each item says how to check it with free tools like Google Search Console.',
    keyTakeaways: [
      'Start with indexing: run a site: search, then check the Page indexing report and URL Inspection in Search Console.',
      'Search your target query and make sure your page is the same type as the results already on page one.',
      'Aim for Google\'s Core Web Vitals targets: LCP within 2.5 seconds, INP under 200 ms, CLS under 0.1. Test with PageSpeed Insights.',
      'Skip the meta keywords tag, word-count targets and crawl budget worries on a small site. Google says they don\'t matter.',
      'Give a change a few weeks before judging it, then compare clicks and impressions in the Performance report.',
    ],
    content: `
Most SEO problems on a small site trace back to one of three things: Google can't reach the page, the page doesn't answer what the searcher wanted, or the site gives nobody a reason to trust it. This checklist covers those first, then the on-page, structure and speed items that matter once the basics are in place.

Work through it top to bottom. The groups are in priority order, because a fast page with a perfect title tag still gets no traffic if it isn't indexed.

You only need free tools: Google Search Console (verify your site first), PageSpeed Insights, and Google search itself. Paid crawlers save time on big sites, but nothing below requires one.

## How to read the labels

Each item ends with one of two labels. **Google-documented** means the advice comes from Google's own documentation, mainly the [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). **Good practice** means it's sensible and widely done, but Google doesn't spell it out.

Neither label means "ranking factor". Google doesn't publish a list of those, and no item here guarantees a position. Where Google does say its ranking systems use something, I've said so in the item.

## 1. Can Google crawl and index the page?

- **Your site is in Google at all.** Search \`site:yourdomain.com\`. If you see your pages, you're indexed. It's a rough check and won't list everything. *Google-documented.*
- **The pages you care about are indexed.** In Search Console, open Indexing → Pages and read the reasons listed for pages that aren't indexed. For a single page, paste its address into URL Inspection. *Google-documented.*
- **Nothing is blocking Google by accident.** URL Inspection shows whether crawling and indexing are allowed. A leftover \`noindex\` tag or a robots.txt rule from a staging site is a common cause. *Google-documented.*
- **robots.txt isn't doing a job it can't do.** Google says robots.txt manages crawling and is not a way to keep a page out of search. If you want a page gone, use \`noindex\` or put it behind a login. *Google-documented.*
- **Google sees what visitors see.** In URL Inspection, run a live test and look at the screenshot. If the content is missing, your scripts or styles may be blocked or failing to load. *Google-documented.*
- **A sitemap is submitted.** Check Search Console → Sitemaps for errors. Google says a well-linked site of about 500 pages or fewer may not need one, but it helps a new site with few links pointing to it. Being in the sitemap doesn't guarantee indexing. *Google-documented.*
- **Each piece of content lives at one address.** If the same page loads at several URLs, redirect the extras or set a canonical. URL Inspection shows which version Google picked. *Google-documented.*

If you'd rather run these checks as one timed session, my [one-hour SEO audit walkthrough](/guide/diy-seo-audit-1-hour-guide) puts them in order.

## 2. Does the page answer the query?

- **The page type matches what searchers want.** Search your target query and look at page one. If every result is a step-by-step tutorial and yours is a product roundup, you've misread the query. *Good practice.*
- **Google is showing the page for the right searches.** In Search Console, open Performance, filter by the page, and read the queries. If they don't match what the page is about, the page is unclear or aimed at the wrong term. *Good practice.*
- **It adds something the current results don't.** Google's self-assessment asks whether content provides original information, reporting, research or analysis. A rewrite of the top five results fails that test. *Google-documented.*
- **The answer comes early.** Put the direct answer in the first few paragraphs, then explain. *Good practice.*
- **It's as long as the topic needs.** Google says it has no preferred word count, so padding a post to hit a number is wasted effort. *Google-documented.*
- **Updates are real.** Revise a page when the facts change. Google lists changing a date without substantially changing the content as a warning sign. *Google-documented.*
- **One page per topic.** If two of your posts chase the same query, merge them and redirect the weaker one. *Good practice.*

Most pages that fail this group were aimed at the wrong query from the start. That's a research problem, and I cover it in the guide to [picking keywords you can realistically rank for](/guide/zero-competition-keyword-research-guide).

Google's own questions for this group are on its [helpful content page](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). It's worth reading once in full.

## 3. On-page basics

- **Every page has a unique, accurate title.** Google uses the title element as a main source for the headline shown in results. Run a \`site:\` search to see how yours appear and spot duplicates. *Google-documented.*
- **The meta description summarizes the page.** Google sometimes uses it for the snippet and often writes its own from the page text. There's no length limit, but long ones get cut off. *Google-documented.*
- **Headings describe what's under them.** Google says the order of headings doesn't matter for Search. Clear headings still help readers and screen readers. *Good practice.*
- **URLs use readable words.** \`/internal-linking-guide\` tells people more than \`/?post=12847\`. Don't rename URLs that already get traffic unless you redirect the old ones. *Google-documented.*
- **Images have descriptive alt text and sit near the text they relate to.** *Google-documented.*
- **Structured data is valid, if you use it.** It's optional and never guarantees a rich result. Test a page with Google's Rich Results Test. My [schema markup guide](/guide/schema-markup-rich-snippets-guide) covers which types are worth adding. *Google-documented.*

## 4. Site structure and internal links

- **Every page is linked from at least one other page.** Google finds most pages by following links. In Search Console, open Links → Internal links and look for important pages with few or none. *Google-documented.*
- **Link text says where the link goes.** "How to write an affiliate disclosure" tells readers and Google what's on the other side. "Click here" doesn't. *Google-documented.*
- **Important pages are a few clicks from the home page.** *Good practice.*
- **Related pages link to each other.** A post on email funnels should point to your other email posts. *Good practice.*
- **Internal links don't hit dead ends.** The Page indexing report lists URLs returning "Not found (404)". Fix the links that point to them, and avoid long redirect chains, which Google says hurt crawling. *Google-documented.*

Internal links are the part of this list you control completely. I've written up [how to plan internal links across a whole site](/guide/internal-linking-strategy-guide) separately.

## 5. Speed and mobile

- **The mobile version has everything the desktop version has.** Google uses the mobile version of a site for indexing and ranking. Content hidden or removed on phones may as well not exist. Check by loading the page on a phone. *Google-documented.*
- **Core Web Vitals are in the "good" range.** Google's targets are a Largest Contentful Paint within 2.5 seconds, Interaction to Next Paint under 200 milliseconds, and Cumulative Layout Shift under 0.1. Test a URL in PageSpeed Insights. Search Console's Core Web Vitals report covers the whole site, though new sites often have too little visitor data to show anything. *Google-documented.*
- **The site loads over HTTPS.** Type the \`http://\` version of your address and confirm it redirects to \`https://\`. *Google-documented.*
- **Pop-ups and ads don't bury the content.** Google's page experience guidance asks whether pages avoid intrusive interstitials and excessive ads. Open the page on a phone in a private window and see what a first-time visitor gets. *Google-documented.*

Google states plainly that Core Web Vitals are used by its ranking systems. It also says it will still show the most relevant content even when page experience is poor. So fix what's failing, and don't spend a month chasing a perfect score. The [Core Web Vitals guide for non-developers](/guide/core-web-vitals-optimization-guide) covers the usual fixes.

## 6. Trust

- **It's clear who wrote the page.** Add a byline and an author or about page that says who you are. *Google-documented.*
- **You say how you know.** In a review, state whether you used the product or are working from research. Don't claim testing you didn't do. *Google-documented.*
- **Affiliate pages add something of their own.** Google's spam policies name "thin affiliation": product pages copied from the merchant with no original content. *Google-documented.*
- **Pages weren't mass-produced to catch searches.** Google calls this scaled content abuse, and the policy applies however the pages were made. *Google-documented.*
- **Links to your site are earned.** Buying links to lift rankings is link spam under Google's policies. Ads and sponsorships are allowed when the link carries \`rel="sponsored"\` or \`rel="nofollow"\`. Review Search Console → Links → Top linking sites for anything you paid for. *Google-documented.*
- **No manual action or security issue is on file.** Check both reports under Security & Manual Actions in Search Console. Both should be empty. *Google-documented.*

Google says E-E-A-T (experience, expertise, authoritativeness, trust) is not itself a ranking factor. It does say its systems give more weight to these qualities on topics that affect people's money, health or safety. If you write about finance, take this group seriously.

On links: writing for other sites is fine when the goal is reaching their readers. Guest posts placed on other sites for links with keyword-optimized anchor text are among Google's examples of link spam. My guide to [guest posting without crossing that line](/guide/guest-posting-strategy-backlinks-traffic) goes into where the boundary sits. The full list is in Google's [spam policies](https://developers.google.com/search/docs/essentials/spam-policies).

## What Google says you can skip

The Starter Guide includes a list of things not to spend time on. These come up most often:

- **The meta keywords tag.** Google Search doesn't use it.
- **Keywords in the domain name.** Google says they have hardly any effect on their own.
- **A minimum or maximum word count.** Length alone doesn't matter for ranking.
- **A "duplicate content penalty".** Having the same content at more than one URL is untidy, and Google says not to fret about it.
- **Crawl budget.** Google's crawl budget guide is aimed at sites with roughly 10,000 or more fast-changing pages, or a million or more pages. Below that, an up-to-date sitemap and the Page indexing report are enough.

## How long until changes show up?

Google says some changes take effect within hours and others take several months, and suggests waiting a few weeks before judging whether a change helped. After editing a page, you can ask for a recrawl with Request Indexing in URL Inspection. Then compare clicks and impressions in the Performance report over the following weeks.

Nothing here guarantees a ranking. What you can control is whether your pages are eligible, clear and worth choosing.

## After the checklist

Once groups 1 and 2 pass, most of the remaining gains come from covering your subject more thoroughly than the sites you compete with. Fixing tags further won't do much. That's the next thing to work on, and my piece on [how focused sites build topical authority](/guide/topical-authority-case-study) explains how.
`
  },
  {
    id: 'post-seo-2',
    title: 'Topical Authority: How to Build a Small-Site Topic Cluster',
    slug: 'topical-authority-case-study',
    excerpt: 'Topical authority is SEO shorthand, not a Google ranking factor. Here\'s how to pick a narrow topic, map a pillar and supporting articles, and check the results.',
    category: 'SEO',
    tags: ['Topical Authority', 'SEO Strategy', 'Content Clusters', 'Content Marketing'],
    coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-07-17',
    updatedAt: '2026-10-03',
    readTimeMinutes: 7,
    difficulty: 'Intermediate',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['topical authority', 'how to build a topic cluster', 'pillar page and supporting articles', 'is topical authority a google ranking factor', 'how to choose a narrow blog topic', 'measure topic cluster in search console', 'how many articles for topical authority'],
    metaDescription: 'What topical authority means, what Google actually documents, and how to scope, map, link and measure a topic cluster on a small site.',
    keyTakeaways: [
      'Topical authority is an SEO-industry term; Google documents people-first content, site-wide signals and links, not a topical authority score.',
      'Scope the topic to one audience in one situation, narrow enough that you can answer every question a beginner would ask.',
      'Write the cluster map first: one pillar overview plus supporting articles that each answer a single question.',
      'Link the pillar to every supporting article and back, with descriptive anchor text placed in the body.',
      'In Search Console, filter the Performance report to the cluster\'s URLs and watch impressions and query count before clicks.',
    ],
    content: `
If your small site publishes a bit about everything, it's hard for a reader or a search engine to tell what you're actually good at. The fix most SEO people recommend is topical authority: pick one narrow subject and cover it properly, with a main page and a set of supporting articles that link to each other.

That advice is sound, but the term is oversold. "Topical authority" is SEO-industry shorthand. Google doesn't list it as a ranking factor, there's no score for it, and nobody can tell you how many articles earn it. What follows is what Google does document, then how to pick a topic, map a cluster, link it, and check in Search Console whether it's doing anything.

## What Google actually says

Three documented things sit underneath the idea.

First, Google's guide to its ranking systems says those systems mainly work at the page level, and that site-wide signals also contribute to how pages are understood. It adds that good site-wide signals don't guarantee every page ranks well. So the rest of your site matters to some degree, but each article still has to earn its place.

Second, Google's [self-assessment questions for helpful, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) ask whether your site has a primary purpose or focus, whether the content shows first-hand expertise and depth of knowledge, and whether it describes the topic substantially and completely. A focused cluster written by someone who knows the subject answers yes to all of those.

Third, Google's link documentation says it uses links to find new pages and as a signal of what a page is about, and that every page you care about should be linked from at least one other page on your site.

None of this promises that a small site will outrank a big publisher. It does explain why one well-covered subject tends to be a better bet than forty unrelated posts, particularly for specific questions that a general site only answers in a paragraph.

## How narrow should the topic be?

Narrow enough that you could list every question a beginner would ask and realistically answer all of them. Try this:

1. Write the topic as one sentence that names an audience and a situation. "Gardening" fails. "Growing vegetables in containers on a balcony" passes.
2. List every question someone in that situation would have. Use your own knowledge first, then Google's autocomplete and "People also ask" boxes, then forums where people in that situation ask for help.
3. Count the questions that deserve their own article. If you have fewer than about eight, the topic may be too thin to build a site section around. If you have more than you could write well in the next six months, cut the topic down until the list is manageable.
4. Check that you know the subject, or are willing to learn it by doing it. Thin articles on a topic you've only read about are the weak point of most clusters.

Those numbers are my rule of thumb for scoping a project, and Google publishes no threshold. If you want help deciding which questions are worth an article, the guide to [keyword research based on realistic opportunity](/guide/zero-competition-keyword-research-guide) covers that step.

## Mapping the pillar page and supporting articles

A cluster has two kinds of page.

The pillar page is the overview. It covers the whole topic at a level a newcomer can follow, gives a short answer on each subtopic, and links out to the article that handles that subtopic in detail. It's a useful page in its own right, and it's the page you'd send a friend who asked where to start.

Supporting articles each answer one question fully. If two planned articles would answer the same search, merge them. If one article is trying to answer three different searches, split it.

Here's an illustration of a small cluster map. It's a made-up example to show the shape, with no real site or results behind it.

| Page | Question it answers | Links to |
| --- | --- | --- |
| Pillar: container vegetable gardening on a balcony | Where do I start? | Every article below |
| Choosing container sizes | How big a pot does each crop need? | Pillar, potting mix, tomatoes |
| Potting mix | What soil goes in a container? | Pillar, container sizes, watering |
| Watering | How often do I water pots? | Pillar, potting mix, low-light balconies |
| Low-light balconies | What grows with four hours of sun? | Pillar, watering |
| Tomatoes in pots | Which varieties work, and how? | Pillar, container sizes, watering |

Write the map before you write the articles. It shows you gaps, such as pests or winter care in this example, and overlaps before you've spent time on them. Then schedule the pieces; a [content calendar built from your keyword list](/guide/annual-blog-content-calendar-guide) keeps the cluster from stalling halfway.

Publishing order matters less than people think. I'd write the three or four most specific articles first, because they're easier to do well, then the pillar once you know what it has to summarize.

## How to link the cluster

Keep the rules simple:

- The pillar links to every supporting article, in the section where that subtopic comes up.
- Every supporting article links back to the pillar.
- Supporting articles link to each other only where a reader would want the other page at that point. The watering article mentions potting mix, so it links there.
- Anchor text describes the destination. "How to choose a potting mix" tells both the reader and Google what's behind the link.

Skip the block of ten "related posts" pasted under every article. Links in the body, at the moment they're relevant, do the job better. There's more on placement and anchor text in the guide to [internal linking for small sites](/guide/internal-linking-strategy-guide).

If you can, give the cluster a shared URL path or a consistent slug prefix. It isn't a ranking trick, but it makes measurement much easier.

## How to tell from Search Console whether it's working

Overall site traffic hides what a cluster is doing, so look at the cluster on its own in the Performance report.

1. Add a page filter. If the cluster shares a URL path, use "URLs containing". If it doesn't, choose "Custom (regex)" and list the slugs separated by a pipe, for example \`container-sizes|potting-mix|watering-pots\`.
2. Use the date control to compare the last three months with the three months before.
3. Look at impressions before clicks. New pages usually get shown for more queries, at low positions, before anyone clicks.
4. Open the Queries tab with the filter still on. You want to see a growing number of distinct, specific queries, and average position improving for the ones you targeted.
5. Click through to individual pages. A page with impressions for a question it doesn't answer well is telling you what to add, or what the next article should be.

Two cautions. Google notes that filtering by query or URL can change the report totals, because some rare queries are anonymized and left out, so read the trend and don't treat the numbers as exact. And be patient: Google's own SEO starter guide says some changes take effect in hours and others take several months.

If six months pass and impressions for the cluster are flat, the usual causes are a topic that's still too broad, articles that say nothing the top results don't already say, or pages that aren't indexed. A [one-hour SEO audit of your own site](/guide/diy-seo-audit-1-hour-guide) will catch the indexing and technical problems. The other two are content problems, and more articles won't fix them.

## What a cluster won't do

It won't carry weak pages. Ten shallow articles that link to each other are still ten shallow articles.

It won't make broad, competitive searches winnable for a new site. Large publishers have links and brand recognition that a cluster doesn't replace. Specific questions, where depth is what the searcher needs, are the realistic target.

It also isn't finished once published. Subjects change, and a pillar page that summarizes outdated articles stops being useful. Reread the cluster a couple of times a year and update what's stale.

## Two questions that come up

### How many articles do I need?

There's no number, and anyone quoting one is guessing. The useful test is whether a reader could arrive with any reasonable question about your topic and find it answered. For a tightly scoped topic that might be a pillar and eight articles. For a wider one it could be forty.

### Can one site cover several unrelated topics?

Yes, and plenty do. Each topic needs its own cluster and its own depth, so the work multiplies. On a small site I'd finish one cluster before starting a second, and keep them in clearly separate sections.

## Start with the map

Pick the narrowest topic you can cover fully, write the cluster map, and publish against it before adding anything outside it. If you haven't settled on a subject for the site at all yet, begin with the guide to [starting a blog that can sustain itself](/guide/how-to-start-a-profitable-blog-2026), then come back and build the first cluster.
`
  },
  {
    id: 'post-seo-3',
    title: 'Internal Linking for SEO: A How-To and 30-Minute Audit',
    slug: 'internal-linking-strategy-guide',
    excerpt: 'Link every page you care about from somewhere else on your site, and make the link text describe it. Here\'s how, with a free 30-minute audit.',
    category: 'SEO',
    tags: ['Internal Links', 'On-Page SEO', 'Site Structure'],
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-07-13',
    updatedAt: '2026-10-03',
    readTimeMinutes: 7,
    difficulty: 'Beginner',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['internal linking for SEO', 'how to write anchor text for internal links', 'how many internal links per page', 'how to find orphan pages for free', 'internal link audit', 'Search Console links report internal links', 'nofollow on internal links'],
    metaDescription: 'How to write anchor text, find orphan pages with Search Console, and add internal links to every new post, plus a 30-minute audit.',
    keyTakeaways: [
      'Every page you care about needs at least one link from another page on your site.',
      'Write anchor text that still makes sense when read on its own, and vary it between posts.',
      'Google gives no ideal link count; add a link only where a reader would want the other page.',
      'Use Search Console\'s Links report and a site: search to find under-linked pages for free.',
      'After publishing a post, add links to it from two or three older posts.',
    ],
    content: `
Internal linking comes down to two jobs: make sure every page you care about is linked from somewhere else on your site, and make the link text say what the reader will find on the other end. Do those two things consistently and you've covered most of what there is to get.

It's also one of the few parts of SEO you control completely. You don't need anyone's permission, a budget, or a tool beyond the free Google Search Console. Below is how to write the links, how to find the pages that need them, and a 30-minute audit you can run today.

## Why internal links matter to Google

Google says it plainly in its [link best practices documentation](https://developers.google.com/search/docs/crawling-indexing/links-crawlable): it "uses links as a signal when determining the relevancy of pages and to find new pages to crawl."

So links do two things. They're how Google's crawler gets from a page it knows to a page it doesn't, and the words in and around the link tell it what the destination is about. A post that nothing links to (an orphan page) can still be found through your sitemap, but it arrives with no context and no sign that you consider it important.

The same page gives the one rule I'd treat as non-negotiable: "Every page you care about should have a link from at least one other page on your site."

You'll see a lot written about "link equity" flowing through a site in measurable amounts. Pages with more good links pointing at them do tend to be treated as more important, but nobody outside Google can put a number on it, so I'd ignore any advice that does.

## How to write anchor text

Anchor text is the clickable part of a link. Google's guidance is that it should be "descriptive, reasonably concise, and relevant" to both the page it sits on and the page it points to.

A quick test, also from Google: read the anchor text on its own, with the rest of the sentence removed. If it still tells you what's behind the link, it's fine.

| Weak anchor | Better anchor |
| --- | --- |
| click here | how to find orphan pages |
| read more | our affiliate disclosure template |
| this post | keyword research for new blogs |
| a whole sentence as the link | the four or five words that name the topic |

Three more things worth knowing:

- **Vary it naturally.** If twenty posts link to the same page with the identical keyword phrase, that reads as stuffing. Describe the page in whatever words fit each sentence.
- **Keep text between links.** Google notes that when links are chained back to back, each one loses its surrounding context.
- **Image links use alt text.** If a linked image has no alt attribute, that link has no anchor text at all.

One technical point: Google can generally only follow a link that's a standard HTML link (an anchor tag with an href attribute). Standard blog editors produce these by default. Custom buttons and menus built with JavaScript sometimes don't.

## How many internal links should a post have?

There isn't a correct number. Google's own wording is that "there's no magical ideal number of links a given page should contain," followed by: "if you think it's too much, then it probably is."

The test I'd use for each link is whether a reader at that exact point in the article would plausibly want the other page. A short post might earn two links and a long tutorial might earn ten. Any rule like "one link per 200 words" is somebody's habit, and Google doesn't publish anything of the kind.

## How to find orphan pages and under-linked pages for free

**Search Console's Links report.** In the left menu, open Links, then under "Internal links" open the full "Top linked pages" table. It lists your pages by how many internal links point at them, and clicking any URL shows which pages link to it. Sort the list from fewest to most and the neglected pages rise to the top.

Two caveats. Google describes this report as a sample, and tables stop at 1,000 rows. And an orphan has no links to count, so it may be missing from the list altogether. Compare the export against your sitemap or your CMS's post list, and treat anything absent as a suspect.

**A site: search.** To find places to link *from*, search Google for **site:yourdomain.com** followed by the topic of the page you want to support, for example **site:yourdomain.com anchor text**. The results are your own pages that already mention the subject, which makes them natural homes for a link. Google warns that the operator doesn't necessarily return every indexed URL, so use it to generate ideas, never as a full inventory.

**A crawler, if you want one.** Screaming Frog's SEO Spider has a free version that crawls up to 500 URLs and lists the links pointing at each page it finds. That's plenty for most small blogs, but you can do everything in this article without it.

Which pages deserve more links is a judgment call. I'd start with pages that earn money, pages sitting on the second page of results for a search you care about, and the main guide at the centre of each subject you cover. That last group matters most if you're [building topical authority with a cluster of related posts](/guide/topical-authority-case-study), because the links are what turn separate articles into a cluster.

## A 30-minute internal link audit

1. **Export the data (5 minutes).** In Search Console, open Links, then the full internal "Top linked pages" table, and export it to a spreadsheet.
2. **Find the gaps (5 minutes).** Sort by link count, lowest first. Paste your list of published URLs next to it and mark every page that has very few links or doesn't appear.
3. **Pick five pages (5 minutes).** From the marked ones, choose the five that matter most to you. Skip thin or outdated posts; those need rewriting or removing before they need links.
4. **Add the links (10 minutes).** For each of the five, run a site: search for its topic, open two or three of the posts that come up, and add one link inside a sentence where it fits. Write the anchor so it passes the read-it-alone test.
5. **Check and note (5 minutes).** Click every link you added to confirm it goes to the right place, then write down the date and the pages you changed.

Give Google a few weeks to recrawl before judging anything, and don't expect a dramatic jump. Rankings depend on a lot more than links, and results vary from site to site. If you find broken links or redirect chains along the way, a fuller [one-hour audit of your own site](/guide/diy-seo-audit-1-hour-guide) covers those.

## A routine for every new post

An audit fixes the backlog. This habit stops a new one forming:

1. Before publishing, link out from the new post to the existing pages a reader would want next.
2. After publishing, run a site: search for the new post's topic and add a link to it from two or three older posts. This is the step most people skip, and it's how orphans get created.
3. If the post belongs to a topic with a main guide, link to the guide and add the new post to it.

It's about ten minutes per post. Keeping a simple list of your posts grouped by topic makes it faster.

On a site with hundreds of templated pages, hand-placed links can't cover everything, so the template has to do part of the work through breadcrumbs, category links and related-page blocks. That's a separate planning job, and it's one of the things to settle before [building pages programmatically](/guide/programmatic-seo-guide-for-beginners).

## Common internal linking mistakes

**The same anchor everywhere.** This goes wrong in both directions: "read more" on every link tells Google nothing, and one exact keyword phrase repeated across the whole site looks forced.

**Links only in the menu, footer or a related-posts widget.** Google can crawl those, and they're useful for getting around. But a footer link has no surrounding sentence to give it meaning, and a widget picks posts by tag or date instead of by what the paragraph is about. Use them as a backstop and put the links that matter in the body text. Where those blocks sit on the page is a design question, which I cover in the guide to [blog layout and readability](/guide/blog-layout-ux-reader-retention).

**A page linking to itself.** Auto-linking plugins often do this, turning every mention of a keyword into a link, including on the page it points to. It sends the reader nowhere. Jump links in a table of contents are a different thing and are fine.

**Nofollow on internal links.** The nofollow attribute tells Google you'd prefer it didn't follow a link, and Google says nofollowed links generally won't be followed. On a link to your own article, that's the opposite of what you want. Some themes and plugins add it without asking, so check a few links in your page source. If there are pages you don't want crawled at all, Google points to robots.txt for that.

**Never touching old posts.** Your older articles often carry most of your traffic, and they can't link to anything written after them unless you go back in.

## Where to go from here

Run the 30-minute audit once, then let the per-post routine keep things tidy. Internal links are one item among several that affect how a page performs, so once they're in order, work through the rest of the [practical SEO checklist](/guide/2026-practical-seo-checklist) to see what else is worth your time.
`
  },
  {
    id: 'post-seo-4',
    title: 'How to Find Low-Competition Keywords for a New Site',
    slug: 'zero-competition-keyword-research-guide',
    excerpt: 'Find specific queries a new site can compete for using Google\'s own suggestions and Search Console, then judge each one by reading the results page.',
    category: 'SEO',
    tags: ['Keyword Research', 'Search Intent', 'SEO Strategy', 'Content Planning'],
    coverImage: '/images/how-to-do-keyword-research-in-2026-finding-zero-competition--seo-guide.webp',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-07-09',
    updatedAt: '2026-10-03',
    readTimeMinutes: 7,
    difficulty: 'Beginner',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['how to find low competition keywords', 'long-tail keywords for a new site', 'free keyword research tools', 'how to judge keyword difficulty', 'search intent types', 'are keyword search volumes accurate'],
    metaDescription: 'A repeatable, free-tools-first process for finding long-tail keywords a new site can compete for, and judging difficulty by reading the results page.',
    keyTakeaways: [
      'Collect real phrasing from Google autocomplete, People Also Ask, related searches and forum threads before opening any keyword tool.',
      'In Search Console, look for queries with impressions where you rank low or have no dedicated page yet.',
      'Judge difficulty by opening the top results: small sites, forum threads and off-target or outdated pages suggest an opening.',
      'Treat every search-volume figure as an estimate and use it only to compare queries roughly.',
      'Give each article one primary query; phrasings that return the same results page belong in the same article.',
    ],
    content: `
A new site can't outrank established publishers for broad terms like "indoor gardening" or "best credit cards". What it can do is answer narrow, specific questions that bigger sites have covered badly or skipped. Finding those questions is most of what keyword research means for a small site.

You don't need a paid tool to start. Google shows you what people search for through autocomplete, People Also Ask and related searches, and Search Console shows you what your own site already appears for. The step most people skip is opening the results page for each candidate query and reading what ranks there. That tells you more about your chances than any difficulty score.

One caveat before the process: no keyword worth having has zero competition. Something always ranks. The useful goal is a query where the current results are weak enough that a focused, well-made page has a fair shot. Nothing here guarantees a ranking.

## Step 1: Collect the phrases people really type

Start with one seed topic your site covers and gather wording from four free places.

**Google autocomplete.** Type the seed and note the suggestions, then add a letter or a question word ("how", "why", "can", "without", "for") and note those too. Google says its [autocomplete predictions reflect real searches](https://support.google.com/websearch/answer/7368877?hl=en), and that they're also shaped by your language, location and past searches. Use a private window so your own history doesn't skew the list.

**People Also Ask.** Search the seed and expand the question boxes. Each one you open loads more. These are often good article topics or section headings as written.

**Related searches.** The suggestions at the bottom of the results page tend to show the neighbouring angles people take on the same topic.

**Forums and Reddit.** Search your topic plus "reddit" or "forum" and read the thread titles. People describe problems in their own words there ("my basil keeps dying" rather than "basil care troubleshooting"), and that wording is often what they later type into Google. Threads with a lot of replies and no clear answer are worth noting.

Put everything in a spreadsheet. Don't filter yet.

## Step 2: Check Search Console for queries you already appear for

If your site has been live for a while, Search Console is the best source you have, because it's data about your pages specifically. In the Performance report, open the Queries table and sort by impressions.

Look for queries where you get impressions but sit low on page one or on page two, and queries you appear for without having written a page about them. The first group may only need a better section or a clearer heading on an existing article. The second group is a list of articles Google already half-associates with your site.

Two limits to know about. A brand-new site will have little or nothing here, so come back after a couple of months of publishing. And Google [leaves some queries out of the report to protect privacy](https://support.google.com/webmasters/answer/17011259?hl=en), so the list is never complete.

If you haven't published anything yet, set up the site first. My guide to [starting a blog that can sustain itself](/guide/how-to-start-a-profitable-blog-2026) covers that, and you can add Search Console the same day.

## Step 3: Work out what the searcher wants

Search intent is the reason behind the query. Most queries fall into one of these:

- **Informational:** they want to learn or fix something ("why is my basil wilting")
- **Commercial:** they're comparing before buying ("best grow light for herbs")
- **Transactional:** they're ready to buy or sign up ("buy basil seeds online")
- **Navigational:** they want a specific site or brand

The fastest way to tell is to look at what ranks. If the first page is all product roundups, Google has learned that searchers want a roundup, and a how-to won't fit there however good it is. Match the format that's already winning, then do it better. For commercial queries, that usually means the approach in my guide to [writing buyer's guides that help readers decide](/guide/write-buyers-guides-that-convert).

## Step 4: Judge difficulty by reading the results page

Difficulty scores are a rough filter. Each tool calculates its own, and the formula is usually narrower than the name suggests. Ahrefs, for example, [bases its Keyword Difficulty on the referring domains pointing to the top 10 pages](https://ahrefs.com/keyword-difficulty) and says the score doesn't account for on-page factors. So a score can't tell you whether the ranking pages answer the question well.

Search each shortlisted query in a private window and open the top five or six results.

| What you see | What it suggests |
| --- | --- |
| Small blogs or sites like yours on page one | Reachable |
| Forum or Reddit threads ranking high | Often no strong dedicated page exists |
| Results that answer a broader or different question | A gap for a page on the exact query |
| Old, thin or clearly outdated pages | Room for a better one |
| Only big brands, each with a page on this exact query | Leave it for later |

Then read the pages themselves. Check whether they answer the question directly, whether the information is current, and whether you could add something they lack: clearer steps, a comparison, real photos, a worked example. If you can't name what your page would do better, pick a different query.

Also check how much of the answer appears on the results page itself. If Google already shows a full answer at the top, a number-one ranking may bring fewer clicks than you'd expect.

## What search volume numbers can and can't tell you

Every volume figure is an estimate, including Google's. Keyword Planner describes its own monthly search numbers as estimates, and third-party tools model theirs from their own data, which is why two tools often disagree about the same phrase.

Use volume to compare queries roughly, more versus less, and don't plan around the exact figure. Long, specific queries frequently show as zero or "no data" in tools and still bring visitors. Appearing in autocomplete or People Also Ask is decent evidence that people do search for something. The opposite risk is real as well: a phrase you invented that shows up nowhere in Google's suggestions may have nobody searching for it.

There's no minimum volume that makes a query worth writing about. A handful of visitors a month to one page isn't much, but thirty related pages on one subject add up, and covering a subject thoroughly is how [smaller sites build topical authority](/guide/topical-authority-case-study) over time.

## Pick one primary query per article

Each article gets one primary query: the exact question the page exists to answer. It shapes the title, the opening paragraphs and the URL.

Close variations belong in the same article. If two phrasings return nearly the same results page, Google treats them as one intent, and one page should cover both. If the results differ noticeably, they're separate articles. Use related questions from People Also Ask as subheadings where they fit the topic, and leave out the ones that don't.

## A worked example

This is an illustration of the process. The phrases below are examples I've written to show the steps, and I haven't measured their volume or rankings. Yours will come from what Google shows you.

1. **Seed topic:** indoor herb garden. Far too broad for a new site; the results are retailers and large publishers.
2. **Autocomplete:** adding words surfaces narrower versions such as "indoor herb garden without sunlight" and "indoor herb garden for beginners".
3. **People Also Ask:** under the "without sunlight" search, a question like "Can herbs grow with only a grow light?" appears. Narrower, but still likely to be well covered.
4. **Forums:** searching the topic plus "reddit" turns up repeated threads from people whose basil is wilting or going leggy under a grow light.
5. **Candidate query:** "why is my basil dying under a grow light". The intent is informational and the searcher has a specific problem to fix.
6. **Results check:** search it. If page one is mostly forum threads and general basil care articles that mention grow lights in passing, that's a gap. If three specialist gardening sites each have a full article on exactly this, go back to step 4 and pick another problem.

The article that comes out of this answers one question for one type of reader, which is the kind of page a new site can realistically compete with.

## Where paid tools fit

Semrush and Ahrefs are the best-known paid options. They speed up work you can otherwise do by hand: pulling hundreds of related phrases at once, showing which queries a competitor's pages rank for, and tracking positions over time. They're optional. Check each company's site for current plans and free tiers, since those change.

I'd hold off until you're publishing regularly and the manual process has become the bottleneck. A tool gives you a longer list, and you still have to read the results page for each query on it.

## Turn the list into a plan

Group the queries you've kept by topic, mark the primary query for each planned article, and note which articles should link to each other. Then put dates on them. My guide to [building a content calendar around your keyword research](/guide/annual-blog-content-calendar-guide) covers the scheduling. Recheck the results pages for your main queries every few months, because what ranks changes.
`
  },
  {
    id: 'post-seo-5',
    title: 'Programmatic SEO: How to Do It Without Creating Spam',
    slug: 'programmatic-seo-guide-for-beginners',
    excerpt: 'Programmatic SEO works when every page is built on real, distinct data. Here\'s where Google draws the spam line and how to build pages that stay on the right side of it.',
    category: 'SEO',
    tags: ['Programmatic SEO', 'Scalable Growth', 'Automation', 'Advanced SEO'],
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-07-05',
    updatedAt: '2026-10-03',
    readTimeMinutes: 7,
    difficulty: 'Intermediate',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['programmatic seo', 'what is programmatic seo', 'is programmatic seo spam', 'scaled content abuse', 'doorway pages vs programmatic pages', 'how to build programmatic seo pages', 'programmatic seo dataset'],
    metaDescription: 'What programmatic SEO is, where Google\'s spam policies draw the line, and the steps to build template pages on real data that deserve to be indexed.',
    keyTakeaways: [
      'Google\'s spam policies name scaled content abuse and doorway abuse; a template with one keyword swapped per page fits both descriptions.',
      'Start from a dataset with several real, verifiable fields per row. If the data is thin, the pages will be too.',
      'Publish a small batch in its own sitemap and check the Page indexing report in Search Console before expanding.',
      'Improve, merge, noindex or delete pages that never get indexed or visited.',
      'Skip programmatic SEO for content whose value is judgment or explanation.',
    ],
    content: `
Programmatic SEO means building many pages from one template and one dataset, so each row in a spreadsheet becomes its own page. It works when every page carries real, distinct information that answers a specific search. It fails, sometimes badly, when the pages are the same paragraph with a city or product name swapped in.

That second version is what Google calls spam. So before the how-to, here's the line you can't cross.

## The risk: Google's spam policies describe the lazy version exactly

Two of [Google's spam policies](https://developers.google.com/search/docs/essentials/spam-policies) apply directly to this technique.

**Scaled content abuse.** Google's definition: "when many pages are generated for the primary purpose of manipulating search rankings and not helping users." The policy is about purpose and value, and it applies however the pages were made. Its examples include generating many pages with AI tools that add nothing for users, and scraping feeds or search results and republishing them with little added.

**Doorway abuse.** Google's definition: "when sites or pages are created to rank for specific, similar search queries. They lead users to intermediate pages that aren't as useful as the final destination." The classic case is a set of near-identical city pages that all funnel visitors to the same sales page.

The same document says sites that violate these policies "may rank lower in results or not appear in results at all." If you're using AI to fill the template, Google's [guidance on generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) repeats the point: generating many pages without adding value for users may violate the scaled content abuse policy.

None of this bans templates or databases. Plenty of well-known sites are built this way: app directories with a page for each integration, currency converters with a page per currency pair, travel sites with a page per destination. What they share is a real dataset underneath.

## What separates a legitimate programmatic page from a doorway page

| | Legitimate page | Doorway or thin page |
| --- | --- | --- |
| What changes per page | Several real data points | One keyword |
| Where the content comes from | A dataset you can verify | Boilerplate, spun or generated text |
| Who it serves | Someone searching that exact thing | Nobody; it exists to rank |

A quick test I'd use: delete the place or product name from two of your pages and compare them. If you can't tell which is which, you have one page published many times.

A second test: would the page still be worth having if search engines didn't exist? A page comparing two specific tools on price, features and limits passes. A page titled "best plumber in [city]" with no information about plumbers in that city doesn't.

## How to build a programmatic SEO project step by step

### 1. Find a repeatable query pattern

You're looking for a search that people make in many variations with the same structure: "[tool A] vs [tool B]", "[service] in [city]", "[app] integration with [app]", "[unit] to [unit]". The pattern has to be real, so check that people search several of the variations and look at what currently ranks. If the results are forum threads and thin pages, there's room. If they're all official product pages, your template probably won't beat them.

The process is the same as [keyword research built around realistic opportunity](/guide/zero-competition-keyword-research-guide); you're just evaluating a pattern instead of a single phrase.

### 2. Get a real dataset

This is the hard part, and it decides whether the project is worth doing. The dataset needs enough specific fields per row to fill a useful page. A name and a category won't do it.

Good sources, roughly in order of how defensible they are:

- Data you already own: product specs, service areas, pricing, your own test results or measurements.
- Research you do yourself, row by row.
- Public or licensed datasets, such as government statistics, where you have the right to use them and can add something on top.

Scraping someone else's content and republishing it is one of Google's own examples of scaled content abuse, and it may also break the source's terms. Data everyone can copy is also a weak foundation; [what you have that others can't cheaply reproduce](/guide/building-a-moat-in-the-age-of-ai) matters more here than anywhere.

Before going further, pull ten rows at random and ask whether each one could support a page you'd be comfortable putting your name on. If half of them are mostly empty, fix the data or shrink the project to the rows that are complete.

### 3. Design a template where the data does the talking

Put the unique information first: the comparison table, the local details, the specific numbers. Keep shared boilerplate short and push it down the page.

Build in conditional logic. If a row has no pricing data, drop the pricing section for that page instead of printing a vague sentence. If an entry has something unusual about it, give the template a field for a short written note. A page that adapts to its data reads like it was made for that entry.

Each page also needs its own title, meta description and heading built from the data, plus sensible links to related entries and back to a browsable index page. Google's doorway examples specifically mention similar pages that sit outside a clear, browsable hierarchy, so [a deliberate internal linking structure](/guide/internal-linking-strategy-guide) is part of staying on the right side of the policy as well as helping readers.

For location pages, be especially strict. If you don't serve a city or have nothing specific to say about it, don't make the page. For a real local business, [a Google Business Profile and local SEO basics](/guide/local-seo-map-pack-mastery-guide) will usually do more than fifty city pages.

### 4. Pick tooling that matches your skills

The stack is less important than people make it sound. You need somewhere to keep the data (a spreadsheet or a database) and something that turns rows into pages. That can be a CMS with custom fields or collections, a bulk-import plugin, a no-code site builder with a database feature, or a static site generator if you're comfortable with code. Choose whichever you can maintain; the data and template decide the outcome.

### 5. Publish a small batch first

Publish a small sample, a few dozen pages at most, drawn from your most complete rows. Read every one of them as a visitor would. Template bugs, empty fields and awkward generated sentences show up immediately at this scale and are cheap to fix.

### 6. Check indexing in Search Console

Add the batch to its own sitemap and submit it in Google Search Console. The Page indexing report can be filtered by sitemap, so you can see how many of those specific pages were indexed.

Indexing can take anywhere from days to weeks, so wait before judging, then look at the reasons given for anything left out. A large share of the batch sitting under "Crawled - currently not indexed" or "Duplicate without user-selected canonical" often means the pages are too thin or too similar to each other. Treat that as feedback on the template and data. Publishing more of the same pages won't change the answer.

For the pages that did get indexed, check the Performance report for impressions and clicks on the queries you targeted. There's no number that counts as a pass, and results vary a lot by niche and site.

### 7. Prune what doesn't earn its place

If the batch holds up, expand in stages and keep checking. For pages that stay unindexed or never get visits, improve the data, merge them into a stronger page, add a noindex tag, or delete them. A smaller set of useful pages is safer than a large set of marginal ones, because Google's spam policies talk about consequences for sites, and a pile of thin pages puts more than those pages at risk.

Plan for upkeep too. Prices change, businesses close, products get discontinued. One wrong value in the dataset is wrong on every page that uses it, so schedule a regular review of a sample of pages against their sources, the same way you'd run [a periodic audit of the rest of your site](/guide/diy-seo-audit-1-hour-guide).

## When programmatic SEO is the wrong tool

Skip it when the value of the content is judgment or explanation. Tutorials, opinionated reviews and anything where the reader wants your reasoning don't fit a template, and forcing them into one produces weaker pages than writing them by hand.

Skip it as well if you don't have the data yet. "I'll generate the text to fill the gaps" is how a legitimate idea turns into scaled content abuse.

## Common questions

### How many pages should a programmatic SEO project have?

As many as you have complete, distinct data for, and no more. The number of useful rows sets the size of the project. A set of forty solid pages is a perfectly good outcome.

### Can programmatic pages and hand-written articles live on the same site?

Yes. Many sites use templates for structured reference pages and write their guides individually. Link between the two where it helps a reader, and hold both to the same standard.

## Start with ten rows

Before choosing tools or building a template, fill in ten rows of your dataset by hand and write one page from them manually. If that page is useful and the next nine would be different in ways that matter, you have a project. If the next nine would all say roughly the same thing, the topic is better served by a handful of hand-written articles, and [building depth on one focused topic](/guide/topical-authority-case-study) is the better route.
`
  },
  {
    id: 'post-seo-6',
    title: 'Schema Markup for Blogs: What to Add and How to Test It',
    slug: 'schema-markup-rich-snippets-guide',
    excerpt: 'Schema markup makes a page eligible for rich results; it doesn\'t guarantee them. Here\'s what to add on a small site, and what to leave alone.',
    category: 'SEO',
    tags: ['Schema Markup', 'JSON-LD', 'Rich Snippets', 'Technical SEO'],
    coverImage: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-07-01',
    updatedAt: '2026-10-03',
    readTimeMinutes: 6,
    difficulty: 'Intermediate',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['schema markup for blogs', 'how to add JSON-LD structured data', 'which schema types should a blog use', 'does schema markup help rankings', 'Google review snippet star rating rules', 'is FAQ schema still worth adding', 'how to test schema markup'],
    metaDescription: 'Which schema types a small content site needs, a JSON-LD example to copy, Google\'s rules on star ratings, and how to test your markup.',
    keyTakeaways: [
      'Schema markup makes a page eligible for rich results. Google doesn\'t guarantee them, and it isn\'t a ranking boost.',
      'On a content site, add Article and BreadcrumbList to posts and one Organization or Person block on your home or about page.',
      'Don\'t add rating markup unless real user ratings are collected and shown on that page. Fake or self-serving ratings can cost you rich results.',
      'Skip FAQ and HowTo markup: Google no longer shows either as a rich result.',
      'Check pages in the Rich Results Test before publishing, then confirm in Search Console.',
    ],
    content: `
Schema markup is a block of code that labels what's on a page: this is an article, this is its author, this is the date it was published. Google reads it to understand the page and, for some content types, to show a richer search listing.

It won't get you star ratings just because you added it, and it doesn't push a page up the rankings. What it does is make a page *eligible* for certain rich results. Google decides whether to show them, and its [structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) say plainly that correct markup is no guarantee.

For a small content site the useful work is short: Article markup on posts, breadcrumbs, and an Organization or Person block on your home or about page. Product markup only belongs on pages about a single product. The rest of this guide covers what each one does, how to add it, and the star-rating rules that get people in trouble.

## What schema markup can and can't do

A search engine can read your text, but it has to guess what a given number or name means. Structured data removes the guess. You use the shared vocabulary from schema.org, usually written as JSON-LD, to state it outright.

In return, Google may use that information in the listing: a breadcrumb trail in place of a raw URL, a correct date and author on an article, price and availability on a product.

What it can't do:

- **Raise your rankings on its own.** Google's documentation describes structured data in terms of understanding a page and eligibility for rich results. It doesn't describe it as a ranking boost, and I wouldn't add markup expecting one.
- **Force a rich result.** Valid markup makes you a candidate. Google still chooses.
- **Describe things that aren't on the page.** Google's rules say not to mark up content readers can't see.

## Which types are worth adding on a small site

| Type | Where it goes | What Google may do with it |
| --- | --- | --- |
| Article | Every post | Better title, image and date in results |
| BreadcrumbList | Every post and category page | Breadcrumb trail on desktop results |
| Organization or Person | Home or about page | Helps Google identify who runs the site |
| Product | Pages about one product | Price, availability, review details |

**Article** is the one to start with. Google lists no required properties for it, only recommended ones: headline, image, publish date, modified date, and author. Give the author a name and a URL that points to a page about them, and keep job titles out of the name field.

**BreadcrumbList** describes where a page sits in your site. It works best when the trail matches a real structure, which is one more reason to [sort out your internal links and categories](/guide/internal-linking-strategy-guide) first. Google's docs currently list this feature as available on desktop.

**Organization** belongs on one page, usually the home page. Name, URL, logo, and links to your social profiles are enough for most blogs. If the site is really one person, describe yourself as the author with a Person block and link it to your about page.

**Product** is for a page focused on a single product. Google requires a name plus at least one of an offer, a review, or an aggregate rating. If you sell your own ebook or course, mark up the name and price. If you publish a hands-on review of someone else's product, the same docs cover editorial review pages, including pros and cons. A roundup of ten products is not a Product page. If you run a business with a physical location, LocalBusiness markup matters too, and it fits into the wider work of [showing up in local results](/guide/local-seo-map-pack-mastery-guide).

## What about FAQ and HowTo markup?

Skip both. Google removed HowTo rich results in 2023. It restricted FAQ rich results to well-known government and health sites that same year, then retired the feature completely: Google's documentation changelog says FAQ rich results stopped appearing in search in May 2026, and the FAQ documentation was removed in June 2026.

A lot of older tutorials still tell you to add FAQPage markup for an expandable listing. That listing no longer exists. Leaving old FAQ markup in place does no harm, but there's no reason to add it now. An FAQ section can still help readers. Write it for them.

## The rules on star ratings

This is where most bad advice lives, so here is what Google's [review snippet documentation](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) says.

Stars are only available for certain kinds of things, including products, recipes, books, movies, courses, events, software, and local businesses. A blog post isn't on that list. Putting rating markup on an ordinary article won't produce stars.

A business can't award itself stars. If you control the reviews about your own business, pages using LocalBusiness or Organization markup aren't eligible for the star feature. Google calls these self-serving reviews.

Ratings have to be real and on the page. They must come directly from users, a visitor has to be able to see them on the page you've marked up, and you can't pull ratings in from other websites.

Made-up ratings are a policy violation. Google names fake reviews as an example of misleading markup. The penalty is a manual action, which removes the page's eligibility for rich results. Google says that action doesn't change how the page ranks, but you lose the feature you were chasing and you have to fix the markup and request a review to get it back.

So if your site has no working review system, leave rating markup alone.

## How to add JSON-LD to a page

Google supports three formats and recommends JSON-LD. It sits in its own script tag, in the head or the body, separate from your visible HTML, which makes it the easiest to maintain.

Here's a complete Article example. Swap in your own values:

\`\`\`
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Choose a Web Host for a New Blog",
  "image": "https://example.com/images/web-host.jpg",
  "datePublished": "2026-03-04",
  "dateModified": "2026-09-12",
  "author": {
    "@type": "Person",
    "name": "Your Name",
    "url": "https://example.com/about"
  }
}
</script>
\`\`\`

You rarely need to write this by hand for every post. Most platforms and SEO plugins generate Article and breadcrumb markup automatically, and a custom site can build it from the same data that fills the page template. How much you get for free is one of the practical differences [between WordPress, Ghost and a custom build](/guide/wordpress-vs-ghost-vs-custom-react-cms-2026).

Generating it from the page's own data also solves the main maintenance problem. A hand-typed date or price goes stale the first time you edit the page. A templated one can't drift.

Before you add anything, check what your site already outputs. Two plugins both emitting Article markup, or a theme and a plugin doing the same job, is a common mess.

## How to test your markup

1. Paste the page URL or the code into Google's [Rich Results Test](https://search.google.com/test/rich-results). It shows which rich result types the page is eligible for and lists errors and warnings.
2. Fix errors first. A missing required property makes the item ineligible. Warnings are for recommended properties and are worth fixing where the information exists.
3. After publishing, run the page through URL Inspection in Search Console to confirm Google found the structured data.
4. Check Search Console's rich result reports over the following weeks. They show valid and invalid items across the site for the types Google has detected.

Two things trip people up. The test only tells you the markup is valid, not that a rich result will appear. And Google can't read markup on a page it can't crawl, so make sure the page isn't blocked by robots.txt or set to noindex.

## Where to start

Add Article and breadcrumb markup through your platform, put one Organization or Person block on your home or about page, run a few URLs through the Rich Results Test, and stop there unless you sell a product. That's an afternoon of work, and it's a sensible item to fold into [a one-hour audit of your own site](/guide/diy-seo-audit-1-hour-guide), where you'll usually find problems that matter more.
`
  },
  {
    id: 'post-seo-7',
    title: 'How to Improve Core Web Vitals on a Small Blog',
    slug: 'core-web-vitals-optimization-guide',
    excerpt: 'How to check your Core Web Vitals and fix the usual causes of a slow blog: images, fonts, third-party scripts, ads and layout shift.',
    category: 'SEO',
    tags: ['Page Speed', 'Core Web Vitals', 'Technical SEO', 'Performance'],
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-06-26',
    updatedAt: '2026-10-03',
    readTimeMinutes: 8,
    difficulty: 'Beginner',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['how to improve core web vitals', 'core web vitals for bloggers', 'lab data vs field data pagespeed insights', 'how to fix lcp on a blog', 'how to reduce cumulative layout shift', 'do core web vitals affect rankings'],
    metaDescription: 'What LCP, INP and CLS measure, how to check them with free Google tools, and the image, font, script and ad fixes that matter most on a blog.',
    keyTakeaways: [
      'Aim for LCP of 2.5 seconds or less, INP of 200 ms or less and CLS of 0.1 or less, measured on real visits at the 75th percentile.',
      'Trust field data over the lab score; new blogs may have no field data yet and have to work from lab results.',
      'Resize and compress images, give them width and height, and never lazy-load the main image at the top of the page.',
      'Remove third-party scripts you don\'t need and reserve space for ads and embeds so the page doesn\'t jump.',
      'Good scores don\'t guarantee rankings; Google says relevance comes first.',
    ],
    content: `
Core Web Vitals are three measurements Google takes from real visitors to your pages: how fast the main content shows up, how quickly the page reacts when someone taps or clicks, and how much the layout jumps around while loading. If your site feels slow, one of those three is usually the reason.

For a small blog, most of the problem tends to come from a short list of things: oversized images, too many fonts, third-party scripts and ads, and content that loads without space reserved for it. Most of that is fixable without writing code. Measure first, then work down the list below in order.

## The three metrics and the numbers to aim for

| Metric | What it measures | "Good" |
|---|---|---|
| LCP (Largest Contentful Paint) | Time until the biggest thing on screen appears, usually the top image or headline | 2.5 seconds or less |
| INP (Interaction to Next Paint) | Delay between a tap or click and the page visibly responding | 200 milliseconds or less |
| CLS (Cumulative Layout Shift) | How much content moves unexpectedly while loading | 0.1 or less |

Google judges each one at the 75th percentile of real visits, which means three out of four visits need to hit the "good" number. Phones and desktops are assessed separately, and phones are almost always the harder test.

If you've read older guides that talk about FID (First Input Delay), ignore that part. INP replaced FID as a Core Web Vital in March 2024.

## How much do Core Web Vitals affect rankings?

Less than most speed-tool marketing suggests. Google's [page experience documentation](https://developers.google.com/search/docs/appearance/page-experience) says Core Web Vitals are used by its ranking systems, and in the same breath says good results in these reports don't guarantee your pages will rank at the top. It also says Search tries to show the most relevant content even when the page experience is sub-par.

So a fast page with a thin answer won't outrank a slower page with a better one. Speed can help when several pages answer the query about equally well. I'd treat it as a reader-experience job first: people leave pages that load slowly or jump under their thumb, whatever the rankings say.

## How to check your Core Web Vitals

Two free tools cover it.

**PageSpeed Insights** (pagespeed.web.dev). Paste in a URL and you get two different kinds of result on one page, which is where most confusion starts:

- **Field data**, at the top. This comes from real Chrome users over the previous 28 days, and it's what the Core Web Vitals assessment is based on.
- **Lab data**, underneath, with the 0–100 performance score. This is one simulated page load. It's useful for finding causes, and it updates the moment you change something.

The two often disagree, because one is a single test under fixed conditions and the other is real visits on every kind of phone and connection. When they conflict, trust the field data. A lab test also can't measure INP, because nobody is tapping on a simulated page.

Small sites often see no field data at all. If a page doesn't get enough Chrome traffic, PageSpeed Insights falls back to data for your whole site, and if there isn't enough of that either, you only get the lab test. That's normal for a new blog. Use the lab results to find problems and check again as traffic grows.

**Search Console's Core Web Vitals report** uses the same real-user data across your whole site. It sorts URLs into Good, Need improvement and Poor for mobile and desktop, and groups similar pages together, so a template problem shows up as one issue affecting many URLs. It's the better tool for deciding which type of page to fix first. If you haven't set up Search Console yet, that's step one of [a one-hour SEO audit](/guide/diy-seo-audit-1-hour-guide).

Test a typical article page as well as your homepage. Articles are where search visitors land.

## Symptom, likely cause, fix

| What you see | Likely cause | Fix |
|---|---|---|
| Slow LCP | Huge or lazy-loaded top image | Resize, compress, load it first |
| Slow LCP on every page | Slow server response | Caching, CDN, better hosting |
| Poor INP | Too much JavaScript: ads, widgets, plugins | Remove or delay scripts |
| High CLS | Images, ads or embeds with no reserved space | Set dimensions, reserve slots |
| Text flickers or jumps | Web fonts loading late | Fewer fonts, self-host them |

## Fix images first

Images are the biggest payoff on most blogs, because the LCP element is so often the featured image at the top of the post. Five habits cover it:

1. **Resize before you upload.** A photo straight from a phone or a stock site can be 4,000 pixels wide. Your content column is probably under 800. Export at roughly the largest size it will display (up to double for sharp screens).
2. **Use a modern format.** WebP or AVIF files are much smaller than the JPEG or PNG equivalent at similar quality. Many platforms and image plugins convert on upload.
3. **Give every image a width and height.** With those two attributes in place, the browser reserves the right amount of space before the image arrives and nothing below it jumps. Most editors add them automatically; older themes and hand-pasted HTML often don't.
4. **Lazy-load images further down the page.** Lazy-loading means an image isn't downloaded until the reader scrolls near it. Many platforms do this by default.
5. **Never lazy-load the main image.** If your theme or an optimization plugin lazy-loads everything, the image at the top of the page gets delayed along with the rest, and LCP suffers. Look for a setting to exclude the first image or the featured image. If you can edit the HTML, adding \`fetchpriority="high"\` to that one image tells the browser to fetch it early.

If you're still choosing how to make post images, the guide to [creating blog graphics on a small budget](/guide/free-blog-graphics-and-photography-guide) covers sizing and export settings.

## Cut back on fonts

Every font family and every weight (regular, bold, italic) is a separate file to download. Two families with a couple of weights each is plenty for a blog. A system font stack, which uses the fonts already on the reader's device, costs nothing at all.

If you do use web fonts, host the files on your own site if your platform allows it, so the browser doesn't have to open a connection to another server first. Text that's drawn in a fallback font and then redrawn when the web font arrives can also shift the layout. Picking a fallback that's close in size to your web font reduces that, and so does the \`font-display: optional\` setting, if your theme exposes it.

## Audit third-party scripts and ads

Analytics, chat widgets, share buttons, embedded videos, pop-up tools and ad networks each add JavaScript that the phone has to download and run. That work is the usual cause of poor INP, and it slows loading too.

Go through what's installed and ask of each item whether you'd notice if it vanished. Remove what you wouldn't. For the rest:

- Replace video embeds with a thumbnail that loads the real player only when clicked. Many platforms and plugins offer this as a "lite" or "facade" embed.
- Delay non-essential scripts (chat, pop-ups) until after the page has loaded, if your platform has that option.
- On WordPress, deactivate and delete plugins you no longer use. Each active plugin can add its own scripts to every page.

Ads are a real trade-off: they earn money and they're heavy. More ad units usually means worse scores, so know what each placement earns before deciding it stays. The comparison of [ads, affiliate links and digital products](/guide/blog-monetization-model-comparison) is useful background for that decision.

## Stop the page jumping around

Layout shift almost always comes from something arriving late into a space nobody saved for it.

- **Images:** width and height, as above.
- **Ads:** reserve a slot with a fixed minimum height, so the text doesn't get pushed down when the ad fills in. Ad networks and ad plugins usually have a setting for this. Avoid ads that insert themselves above content the reader is already looking at.
- **Embeds:** videos, social posts and iframes need a container with a set size or aspect ratio.
- **Banners:** cookie notices and newsletter bars that push the page down count as shifts. Have them overlay the page instead.

The same choices affect how readable the page is, which the guide to [blog layout and readability](/guide/blog-layout-ux-reader-retention) covers.

## Hosting and caching

If the lab report flags slow server response, or every page has poor LCP even after you've fixed images, look at the server. Nothing can appear on screen until the server sends the first byte.

Turn on page caching, which serves a saved copy of each page instead of rebuilding it for every visitor. On WordPress that's a caching plugin or a host feature. A CDN, which keeps copies of your site on servers closer to your readers, helps if your audience is spread across countries. If you're on very cheap shared hosting and caching doesn't help, moving hosts may be the fix. Hosted platforms handle this layer for you, which is one of the trade-offs in [choosing a CMS](/guide/wordpress-vs-ghost-vs-custom-react-cms-2026).

## Don't chase a perfect 100

The 0–100 performance score is a lab number. It isn't what the Core Web Vitals assessment uses, and it varies between runs on the same page. A page can get a mediocre lab score and still pass on real-user data, and the reverse happens too.

The goal is "good" on all three metrics for real visitors. Past that point, extra hours spent on speed are usually better spent on the content.

## Common questions

### How long until my fixes show up?

Lab results change immediately. Field data is a rolling 28-day window, so real-user numbers improve gradually over about four weeks. In Search Console you can start a validation on a fixed issue, which begins a 28-day monitoring period.

### Do I need a developer?

Usually not for images, fonts, removing scripts or caching. Persistent INP problems caused by a theme's own code are harder, and switching to a lighter theme is often cheaper than paying someone to repair a heavy one.

## Change one thing, then re-test

Make one change, run PageSpeed Insights again, and note what moved. Once images and scripts are under control, page speed is one line on a longer list, and the [SEO checklist](/guide/2026-practical-seo-checklist) shows what to look at next.
`
  },
  {
    id: 'post-seo-8',
    title: 'How to Do an SEO Audit Yourself in About an Hour (Free)',
    slug: 'diy-seo-audit-1-hour-guide',
    excerpt: 'A one-hour, first-pass SEO audit for small sites using free Google tools, ending with a short list of what to fix this week and what to ignore.',
    category: 'SEO',
    tags: ['SEO Audit', 'Technical SEO', 'Optimization', 'Site Maintenance'],
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-06-22',
    updatedAt: '2026-10-03',
    readTimeMinutes: 8,
    difficulty: 'Beginner',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['how to do an seo audit yourself', 'diy seo audit', 'free seo audit with google search console', 'crawled currently not indexed what to do', 'how to read the page indexing report', 'how to prioritise seo audit fixes', 'seo audit for a small website'],
    metaDescription: 'A timed, free SEO audit for a small site: where to click in Search Console and PageSpeed Insights, what a problem looks like, and what to fix first.',
    keyTakeaways: [
      'An hour is enough for a first-pass audit of a small site (dozens to a few hundred pages); bigger sites need the same steps and more time.',
      'In the Page indexing report, switch the filter to All submitted pages so you only see non-indexed URLs you actually wanted indexed.',
      'In the Performance report, compare the last three months with the previous period and sort the Pages tab by clicks difference to find what\'s slipping.',
      'If Core Web Vitals shows no data, test your homepage and one article in PageSpeed Insights and note the top two or three issues.',
      'Sort every finding into Fix this week, Schedule or Ignore, and keep the first list to five items.',
    ],
    content: `
You can audit your own site in about an hour with free tools, as long as the site is small: somewhere between a few dozen and a few hundred pages. All you need is Google Search Console, PageSpeed Insights and a Google search.

What you get from that hour is a first pass. It catches the problems that stop pages being indexed, found or usable, and it ends with a short list of fixes in priority order. It won't review every article for quality, and on a site with thousands of URLs the same steps take a day or more.

Before the timer starts, check that your site is verified in Search Console and has been for a few weeks, because a brand-new property has almost nothing to show. Then open a blank note with three headings: **Fix this week**, **Schedule**, **Ignore**. Everything you find goes under one of them.

## The hour at a glance

| Minutes | Where | What you're checking |
| --- | --- | --- |
| 0–5 | Google site: search | What Google shows for your domain |
| 5–20 | Page indexing report | Pages that aren't indexed, and why |
| 20–30 | Performance report | Pages losing clicks, near-miss rankings |
| 30–40 | Core Web Vitals, PageSpeed Insights | Speed on real phones |
| 40–45 | Links report | Important pages with few internal links |
| 45–50 | Five pages, by hand | Titles, headings, dead links |
| 50–60 | Your note | The fix list |

The times are rough. If one step runs over, write down where you stopped and move on, because the last ten minutes matter more than any single check.

## Minutes 0–5: search Google for your own site

Type site:yourdomain.com into Google and scroll through a few pages of results.

Look for things that shouldn't be public. Tag and archive pages, internal search results, test posts, a staging copy of the site, URLs with tracking parameters on the end, or pages in a language you never wrote (a common sign of a hacked site). Note each kind once, without listing every URL.

Then read your titles and descriptions the way a searcher would. Truncated titles, the same title on several pages, and results that show only your site name are all worth a line in the note.

Don't rely on the result count. It's an estimate, and the next report gives you the real numbers.

## Minutes 5–20: the Page indexing report

In Search Console's left menu, open **Pages** under the Indexing heading. Google's help calls this the Page indexing report. It shows how many URLs are indexed, how many aren't, and a table headed "Why pages aren't indexed" with a row per reason.

A big "not indexed" number isn't a problem by itself. [Google's guide to the report](https://support.google.com/webmasters/answer/7440203) says you shouldn't expect every URL to be indexed, only your canonical pages. So the useful move is to change the filter at the top from all known pages to **All submitted pages**. Now you're only looking at URLs from your sitemap, which are the pages you asked Google to index. Anything not indexed in that view deserves a look.

Click each reason to see example URLs, then sort them:

| Reason shown | What it means | What to do |
| --- | --- | --- |
| Server error (5xx) | Your server failed when Google asked | Fix this week |
| URL marked 'noindex', or blocked by robots.txt | You told Google to stay out | Urgent if it's a page you want ranked; otherwise ignore |
| Not found (404) | The URL is gone | Redirect it if other pages link to it or it used to get visits; otherwise ignore |
| Soft 404 | The page loads but looks empty or like an error | Add real content, or return a proper 404 |
| Crawled - currently not indexed | Google fetched it and left it out | Check for thin or overlapping content |
| Discovered - currently not indexed | Google knows the URL but hasn't fetched it | Link to it from related pages, then wait |
| Duplicate without user-selected canonical | Google picked another URL as the main one | Set a canonical tag or redirect |
| Alternate page with proper canonical tag, or Page with redirect | Working as intended | Ignore |

"Crawled - currently not indexed" is the one people misread. Google doesn't give a reason for it and says there's no need to resubmit the URL. If the examples are feeds and paginated archives, leave them. If they're articles you care about, open two or three and compare them with what ranks for the same topic. Short pages and pages that repeat another post on your site are the usual suspects.

While you're in this part of the menu, open **Sitemaps** and confirm your sitemap is listed and was read without errors.

## Minutes 20–30: the Performance report

Open the Performance report. By default it shows clicks and impressions for the last three months. Tick **Average CTR** and **Average position** above the chart so all four metrics appear.

First, find what's slipping. Click the date filter, choose the Compare tab, and compare the last three months with the previous period. Go to the **Pages** tab and sort by clicks difference. The pages at the top of the losses are your candidates for an update. A seasonal topic will show a drop that isn't a fault, so check the 16-month view before blaming the page.

Second, find near misses. On the **Queries** tab, sort by impressions and look for searches where your average position sits just off the first page. Those pages already have Google's attention, so improving them usually pays back faster than writing something new. Write down three at most.

Third, click any query that matters to you and switch to the Pages tab. If two of your URLs show up for the same search, they may be competing with each other. Note the pair so you can merge them or make each one clearly about a different thing, which is the same thinking behind [grouping a small site's articles into topic clusters](/guide/topical-authority-case-study).

## Minutes 30–40: Core Web Vitals and PageSpeed Insights

Open **Core Web Vitals** in Search Console and look at the mobile chart. URLs are grouped as Poor, Need improvement or Good, based on data from real Chrome users. Google's "good" thresholds are an LCP of 2.5 seconds or less, an INP of 200 milliseconds or less, and a CLS of 0.1 or less.

Small sites often see "No data available" here because there aren't enough visitors to measure. That isn't a failure. Go to PageSpeed Insights instead and test two URLs: your homepage and one typical article. Most sites use one template for every post, so one article tells you about all of them.

At the top of the PageSpeed result is real-user data from the last 28 days, if Google has any for your site. Below it is a lab test with a performance score, where 90 or above counts as good and under 50 as poor. The score matters less than the list underneath it. Copy the top two or three items into your note, such as oversized images or a slow server response, and stop there. Fixing them is a separate job, covered in my guide to [improving Core Web Vitals without a developer](/guide/core-web-vitals-optimization-guide).

## Minutes 40–45: the Links report

Open **Links** and find the internal links table, "Top linked pages". Open the full list and sort it so the least-linked pages come first.

You're looking for pages that earn money or bring in subscribers and have only one or two internal links. Also check whether any important page is missing from the list altogether. Each one goes under "Schedule" with a note to add links from related posts. There's a fuller method in the [30-minute internal linking audit](/guide/internal-linking-strategy-guide).

Skip the external links tables during this pass. Strange sites linking to you are normal, and there's nothing here you can fix in an hour.

## Minutes 45–50: check five pages by hand

Pick your homepage and your four most-clicked pages from the Performance report. On each one, check four things:

- The title says what the page is about and isn't shared with another page.
- There's one main heading, and it matches the title's promise.
- The first few links in the body go somewhere that still exists.
- Dates, prices and product names are current.

Five pages is a sample. If you want every URL checked for broken links and duplicate titles, a desktop crawler will do it. Screaming Frog's SEO Spider is the best known, and [its free version crawls up to 500 URLs](https://www.screamingfrog.co.uk/seo-spider/pricing/), which covers most small sites. That's optional and adds time beyond the hour.

## Minutes 50–60: turn the findings into a fix list

This is the step that makes the hour worth it. Go through your note and move every item under one of the three headings, using one test: does this stop a page I care about from being indexed, found or used?

**Fix this week** if the answer is yes. Typical examples:

- A page you want ranked is set to noindex, blocked in robots.txt or returning a server error.
- The sitemap is missing or failing.
- A deleted URL that other pages still link to has no redirect.
- A top page has a wrong price, a dead main link or out-of-date instructions.
- The site shows hacked or spam pages in the site: search.

**Schedule** the things that help but aren't breaking anything: near-miss pages to improve, two posts to merge, internal links to add, the image and speed items from PageSpeed Insights.

**Ignore** the rest, and write down that you chose to. That covers 404s for URLs nobody links to, "Alternate page with proper canonical tag", "Page with redirect", non-indexed feeds and tag pages, and a lab score in the 80s on a site whose real-user data is fine.

Keep "Fix this week" to five items. If it's longer, the bottom of it belongs under "Schedule".

When you've fixed an indexing problem, go back to that reason in the Page indexing report and click **Validate fix**. Google says validation typically takes up to about two weeks, and sometimes much longer.

## What to do after the first audit

Save the note with today's date and the indexed-page count from Search Console. Next time you'll have something to compare against, and the whole pass goes faster. For a small site I'd repeat it every three months or so, and straight after any redesign, theme change or move to a new host.

This hour tells you what's broken. For the wider list of things worth getting right on every page, work through the [SEO checklist of what to check first](/guide/2026-practical-seo-checklist) once the week's fixes are done.
`
  },
  {
    id: 'post-seo-9',
    title: 'Local SEO Basics: How to Show Up in the Google Map Pack',
    slug: 'local-seo-map-pack-mastery-guide',
    excerpt: 'How Google picks map pack listings, and the profile, review and website work a local business can do about it. No ranking guarantees.',
    category: 'SEO',
    tags: ['Local SEO', 'Google Business Profile', 'Map Pack', 'Small Business'],
    coverImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-06-18',
    updatedAt: '2026-10-03',
    readTimeMinutes: 8,
    difficulty: 'Beginner',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['local seo basics', 'how to rank in the google map pack', 'google business profile optimization', 'how to choose a google business profile category', 'can you offer incentives for google reviews', 'service area business hide address', 'localbusiness structured data'],
    metaDescription: 'Google ranks local results on relevance, distance and prominence. Here is how to set up your Business Profile, earn reviews by the rules and fix your site.',
    keyTakeaways: [
      'Google bases local results mainly on relevance, distance and prominence, and you can\'t pay or ask for a better ranking.',
      'Verify your Business Profile, use your real business name, and pick the most specific primary category that describes what you are.',
      'Ask every customer for an honest review, but never offer incentives or ask only the happy ones.',
      'If you travel to customers, hide your address and list up to 20 service areas instead.',
      'A purely online business with no local customers can skip local SEO.',
    ],
    content: `
If you run a business that serves customers in a particular area, the map pack is the block of business listings with a map that Google shows for searches like "plumber near me" or "coffee shop in Tucson". Those listings come from Google Business Profiles, so that's where most of the work happens. Your website plays a supporting role.

Google says local results are based mainly on three things: relevance, distance and prominence. You can improve relevance and prominence. You can't change how far you are from the person searching. Nobody can promise you a top spot, and Google states plainly that there's no way to request or pay for a better local ranking.

So the realistic goal is a profile that's verified, complete and accurate, a steady flow of honest reviews, and a website that confirms the same details. Here's how to do each part.

## How Google decides which businesses show up

Google's own help page, [Tips to improve your local ranking on Google](https://support.google.com/business/answer/7091?hl=en), defines the three factors in a sentence each:

- **Relevance** is how well a Business Profile matches what someone is searching for.
- **Distance** is how far each business is from the customer who's searching.
- **Prominence** is how well-known a business is.

Google doesn't publish the details of how these are weighed, and it says so. You'll find charts online that assign a percentage to each "ranking factor". Those come from surveys of SEO practitioners, so treat them as opinion.

Distance explains most of the confusion people have about local rankings. A dentist can rank first for someone standing two blocks away and not appear at all for someone across town. Checking your ranking from your own office tells you very little about what customers elsewhere in the city see.

## Claim and verify your Business Profile

Search for your business name on Google Maps first. A listing may already exist, in which case you claim it. If you create a second one you'll end up with a duplicate, and Google's guidelines allow one profile per location.

Then verify it. Verification is the first tip on Google's list. Google picks the verification method for you (phone or text, email, a video recording, a live video call, or a mailed postcard), and you can't swap it for another. Its [verification help page](https://support.google.com/business/answer/7107242?hl=en) says reviews of a verification take up to five business days, sometimes longer.

## Fill in every field, accurately

Google's advice here is plain: keep your business information complete and up to date so it can match you to the right searches. In practice, these are the fields that matter:

- **Name.** Use your real-world business name, the one on your sign and your website. Adding keywords or a city ("Smith Plumbing Best Emergency Plumber Austin") breaks Google's [guidelines for representing your business](https://support.google.com/business/answer/3038177?hl=en) and puts the profile at risk of suspension.
- **Primary category.** This is the field I'd spend the most time on, because it tells Google what you are. The guidelines say to pick the fewest categories that describe your core business, and to choose ones that complete the sentence "This business IS a", as opposed to "this business HAS a". Be specific: "Family law attorney" beats "Lawyer" if that's what you do.
- **Address or service area.** Covered in the next section.
- **Phone and website.** Use a number that reaches the business directly.
- **Hours.** Set regular hours, then add special hours for holidays. Wrong holiday hours send customers to a locked door.
- **Attributes, services and description.** Fill in what applies. Write the description for customers and skip the keyword list.
- **Photos.** Google lists adding photos and videos among its tips. Show the storefront, the inside, your team and finished work. Use real pictures of your business in place of stock images.

## Service-area businesses hide their address

If you travel to customers and don't serve them at your own address (a mobile mechanic, a house cleaner, a plumber working from home), Google treats you as a service-area business. You remove the address from the profile and list the areas you cover instead.

Google's [service-area rules](https://support.google.com/business/answer/9157481?hl=en) allow up to 20 service areas, set by city or postal code, and the total area shouldn't stretch more than about two hours' drive from where you're based. A business that does both, like a bakery that also delivers, is a hybrid and can show its address along with a service area.

P.O. boxes and virtual offices you don't actually work from aren't acceptable addresses.

## Keep your name, address and phone identical everywhere

Your business name, address and phone number (often shortened to NAP) should match on your profile, your website, your social accounts and any directories that list you, such as Yelp, Apple Maps, Bing Places or an industry association.

I'll be straight about what's documented here. Google's guidelines ask that your name match the one used on your storefront and website. Google doesn't spell out how much weight directory listings carry in local ranking. The practical case for consistency is strong anyway: a customer who finds an old phone number on one site and a different address on another may give up before calling.

This matters most if you've moved, changed numbers or rebranded. Search for your old details and fix each listing you find. It's dull work, and you only have to do it once.

## Ask for reviews, within Google's rules

Google says more reviews and positive ratings can help your local ranking. They also decide whether a searcher picks you over the listing beside yours.

You're allowed to ask customers for reviews. Your profile gives you a review link and a QR code for exactly that. What Google's [policy on fake engagement](https://support.google.com/contributionpolicy/answer/7400114?hl=en) prohibits is the following:

- Offering incentives for a review, including payment, discounts or free goods and services. This also covers rewards for changing or removing a negative review.
- Review gating: asking only happy customers, or discouraging unhappy ones from posting.
- Fake reviews: anything not based on a real customer experience, and posts on a competitor's listing meant to damage it.

That rules out the "leave us five stars for 10% off" card, and the survey that sends satisfied customers to Google and everyone else to a private form.

What works is simple. Ask every customer, soon after the job is done, with the link in a text or email or the QR code on a receipt. Ask for an honest review and leave the star rating out of the request.

Then reply. Responding to reviews is on Google's tips list. Thank people briefly. For a negative review, respond calmly, address the specific complaint and offer a way to sort it out offline. Future customers read those replies closely. Skip the advice to pack keywords into your responses; nothing in Google's documentation supports it, and it reads oddly to customers.

## What to fix on your own website

Your site backs up the profile. Three things are worth doing.

**Build a real location or service page.** It should state the business name, address or service area, phone and hours in plain text, describe what you do there, and answer the questions local customers ask (parking, areas covered, call-out fees). If you serve several towns, only make separate pages when you have something different to say about each one. Pages that swap the city name and nothing else are thin content.

**Add LocalBusiness structured data.** This is a block of code that states your name, address, phone and hours in a format Google can read. Google's [LocalBusiness documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business) lists name and address as the required properties and recommends JSON-LD. Test it with the Rich Results Test. Google doesn't guarantee that structured data changes what appears in results. If the term is new to you, start with [how schema markup works and what it can show in results](/guide/schema-markup-rich-snippets-guide).

**Cover the basics every site needs.** The page should load quickly on a phone. Checking [your Core Web Vitals and page speed](/guide/core-web-vitals-optimization-guide) is a good use of an afternoon, and a [one-hour audit of your own site](/guide/diy-seo-audit-1-hour-guide) will catch broken pages and missing titles.

An embedded Google Map on your contact page is handy for visitors. Google doesn't list it as something that improves local ranking, so add one if it helps people find you and don't worry if you leave it out.

## How to tell whether it's working

Your Business Profile reports how many people called, asked for directions or clicked through to your website from the listing. Watch those numbers month to month. They're closer to actual business than a ranking position is, and the position changes with every searcher's location anyway.

There's no fixed timeline. How you rank against competitors depends on how many nearby businesses want the same searches, and in a crowded category in a big city you should expect it to be slow.

## Who local SEO isn't for

Most readers of this site run blogs, affiliate sites or online stores. If that's you and your customers could be anywhere, you can skip nearly all of this. Google's guidelines limit Business Profiles to businesses that have a location customers can visit or that travel to customers. That leaves out a purely online business, and a virtual office you don't work from doesn't count as a location.

Your time is better spent on ordinary search work: [finding low-competition keywords for a new site](/guide/zero-competition-keyword-research-guide) and writing pages that answer them.

The exception is a blogger who also sells a local service, such as in-person photography, tutoring or consulting for businesses in one city. That part of your business does qualify, and everything above applies to it.

## Where to start this week

Verify the profile, get the primary category right, and fix your hours. Then set up one repeatable way to ask every customer for an honest review. Those four tasks cover most of what Google itself recommends, and none of them costs anything. After that, work through [the wider SEO checklist](/guide/2026-practical-seo-checklist) for your website.
`
  },
  {
    id: 'post-seo-10',
    title: 'International SEO: When You Need Hreflang and How to Add It',
    slug: 'international-seo-hreflang-guide',
    excerpt: 'Hreflang only matters once you publish translated or region-specific pages. Here\'s when you need it, how to set it up correctly, and what breaks it.',
    category: 'SEO',
    tags: ['International SEO', 'Hreflang', 'Global Growth', 'Technical SEO'],
    coverImage: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-06-12',
    updatedAt: '2026-10-03',
    readTimeMinutes: 7,
    difficulty: 'Advanced',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['international seo', 'how does hreflang work', 'do I need hreflang on a single-language blog', 'cctld vs subdomain vs subdirectory for international seo', 'hreflang en-GB vs en-UK', 'hreflang return links and x-default', 'is machine translated content bad for seo'],
    metaDescription: 'Most single-language blogs don\'t need hreflang. Learn when you do, which URL structure to pick, the rules Google enforces, and the mistakes that break it.',
    keyTakeaways: [
      'A single-language site needs no hreflang; add it only when you publish translated or region-specific versions of the same page.',
      'Every version must list itself and all other versions with full https:// URLs. If two pages don\'t link to each other, Google ignores the tags.',
      'Use an ISO 639-1 language code with an optional ISO 3166-1 region: en-GB is valid, en-UK is not.',
      'Don\'t auto-redirect by IP or browser language; link to the other versions and let readers choose.',
      'Give each language version a canonical that points to itself, never to another language.',
    ],
    content: `
Most blogs don't need international SEO. If your site is in one language and you have no plans to translate it, there's nothing to set up. Google works out a page's language from the text on it and can show that page to people searching in that language anywhere in the world. Readers in other countries finding your English articles is normal and needs no hreflang. Your time is better spent on [the basic SEO checks that apply to every site](/guide/2026-practical-seo-checklist).

You need it once you publish real alternate versions of the same page: a Spanish translation of an English guide, say, or separate US and UK editions with different prices and spelling. From then on you have two jobs. Give every version its own URL, and tell Google which URLs are versions of each other. The second job is what hreflang is for.

Keep one distinction in mind throughout: language and country are different targets. Spanish is a language spoken in many countries; Mexico is a country. You can target either or both, and the choices below depend on which one you mean.

## Choosing a URL structure for other languages or countries

Google recommends a separate URL for each language version, and advises against swapping the language on a single URL with cookies or browser settings. Its guide to [managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) lists three workable structures. It also lists URL parameters such as \`?loc=de\` and says it doesn't recommend them.

| Structure | In its favor | Trade-offs |
| --- | --- | --- |
| Country domain: \`example.de\` | Clearest country signal; server location doesn't matter | Costs more, needs more infrastructure, some country domains have registration rules, targets one country only |
| Subdomain: \`de.example.com\` | Easy to set up; easy to keep the sites separate | A reader can't tell whether "de" means the German language or Germany |
| Subdirectory: \`example.com/de/\` | Easy to set up; low maintenance on one host | Same ambiguity in the URL; one server location; harder to separate the sites later |

A country domain targets a country, so it's a poor fit for a language spoken in many places. There's no single country domain for "Spanish speakers".

For a blog adding one or two languages, I'd use subdirectories. It's one site, one host and one analytics property to look after. You'll often read that subdirectories also "share authority" with the main site while subdomains start from nothing. Google's documentation doesn't say that, so I wouldn't treat it as settled. Pick the structure you can maintain, because moving later means redirecting every URL.

## How hreflang works

Hreflang tells Google that a set of URLs are localized versions of the same content, so it can show a searcher the version that matches their language or region. That's all it does. Google's page on [telling it about localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions) describes it as a way to choose between your versions and says nothing about ranking any of them higher. A Spanish page still has to earn its place in Spanish results.

Google may find your alternate versions without it, but it says explicit annotation is usually best. The rules are short:

- **Language code first.** Use an ISO 639-1 language code, such as \`es\` or \`de\`. You can add an ISO 3166-1 Alpha 2 region code after a hyphen, as in \`es-MX\`. Language on its own is valid. Region on its own isn't.
- **Every version lists itself and all the others.** The English page carries the full set, and so does the Spanish page.
- **Links must go both ways.** Google's wording is blunt: if two pages don't both point to each other, the tags will be ignored.
- **Use full URLs,** including \`https://\`. The versions can sit on different domains.
- **\`x-default\` is the fallback.** It names the page to use when none of your versions matches the searcher's browser language. A language-picker page or your main version both work.

Here's a correct set for an English guide with a general Spanish version and a Mexico-specific one:

\`\`\`html
<link rel="alternate" hreflang="en" href="https://example.com/guide/" />
<link rel="alternate" hreflang="es" href="https://example.com/es/guide/" />
<link rel="alternate" hreflang="es-MX" href="https://example.com/es-mx/guide/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/guide/" />
\`\`\`

The identical four lines go in the \`<head>\` of all three pages. That takes care of the self-reference and the return links in one go.

### The three ways to add it

1. **HTML link tags** in the \`<head>\`, as above. Simplest when you control the page template.
2. **HTTP headers.** A \`Link:\` header sent with the page. Google suggests this for files that have no HTML head, such as PDFs.
3. **XML sitemap.** Each URL entry lists all its alternates. This keeps the annotations in one file, which is easier to manage on a large site or one where you can't edit the templates.

Google says the three are equivalent from its side, so choose whichever is easiest to keep accurate. I'd pick one and stick with it, because two methods that disagree are harder to debug than one.

## What Google ignores, and what it tells you not to do

**The \`lang\` attribute doesn't set your page's language for Google.** Google states that it uses neither hreflang nor the HTML \`lang\` attribute to detect language. It reads the visible content. So keep each page in one language, navigation included, and don't put translations side by side on the same URL. Still set \`lang\` correctly, since browsers and screen readers rely on it.

**Don't redirect visitors automatically by IP address or browser language.** Google's guidance is to avoid it, because those redirects can stop both users and search engines from seeing all your versions. Googlebot crawls mostly from US addresses and doesn't send an \`Accept-Language\` header. A site that pushes US visitors to the English page may never show Google its other versions. Put a visible link to the other languages on every page and let the reader choose.

**Search Console no longer has a hreflang report.** Google deprecated the International Targeting report, although hreflang itself is still supported. Older tutorials still send you there. To check your tags now, view the source of each version and confirm the sets match, or run a crawler that validates hreflang. It's worth adding to [a regular self-audit of your site](/guide/diy-seo-audit-1-hour-guide), since a template change can drop the tags without any warning.

## Is machine translation a problem?

Machine translation isn't banned, and Google says translated pages are only treated as duplicates when the main content is left untranslated. The risk is volume without value. Google's [spam policy on scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies) covers pages generated in bulk mainly to manipulate rankings. Its examples include generating many pages with AI tools without adding value for users, and running scraped content through automated transformations such as translating.

Pushing an entire site through a translation tool and publishing the result unread fits that description closely. It's the same trap as [publishing templated pages at scale](/guide/programmatic-seo-guide-for-beginners): the more pages you produce without checking them, the lower the average quality gets.

A safer approach is to translate a small number of your best pages and have someone fluent read each one before it goes live. Then localize the content, and not only the words. Currency, date formats and examples need changing. For money topics, so do the facts. An article about US tax rules or FTC disclosure requirements is wrong for a reader in Spain no matter how well it's translated.

## Common hreflang mistakes

**Missing return links.** The English page points to the Spanish one, but the Spanish page doesn't point back, often because it was added later and the older pages were never updated. Google ignores the pair.

**Invalid codes.** \`en-UK\` is the classic one. The ISO code for the United Kingdom is \`GB\`, so the correct value is \`en-GB\`. Google also calls out \`EU\` and \`UN\`, which aren't countries. A region code alone fails too: \`be\` is read as the Belarusian language, not as Belgium.

**A canonical that points to another language.** If your Spanish page has a canonical tag pointing at the English page, you've told Google the Spanish page is a copy. That contradicts your hreflang. Google asks for a canonical in the same language, which in practice means each version points to itself.

**Relative or protocol-less URLs.** \`/es/guide/\` and \`//example.com/es/guide/\` don't count. Use the full address.

## Check for demand before you translate anything

Open the Performance report in Search Console and look at the Countries tab. If a non-English-speaking country already sends impressions to your English pages, that's the best evidence you'll get that a translation has an audience. Confirm it by [researching what people search for in that language](/guide/zero-competition-keyword-research-guide), because direct translations of your English keywords are often not the phrases people use. Then translate one page, validate the hreflang on it, and expand only if it gets traction.
`
  }
];
