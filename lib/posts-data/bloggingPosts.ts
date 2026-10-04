import { BlogPost } from '../types';

export const BLOGGING_POSTS: BlogPost[] = [
  {
    id: 'post-blog-1',
    title: 'How to Start a Blog That Can Make Money, Step by Step',
    slug: 'how-to-start-a-profitable-blog-2026',
    excerpt: 'The steps to start a blog in order, from topic and platform to your first 15 articles, with an honest look at how long traffic and income take.',
    category: 'Blogging',
    tags: ['Blogging', 'Content Strategy', 'SEO Fundamentals', 'Blog Monetization'],
    coverImage: '/images/uploads/launch-your-store-with-confidence.webp',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-07-25',
    updatedAt: '2026-10-03',
    readTimeMinutes: 8,
    difficulty: 'Beginner',
    featured: true,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['how to start a blog', 'how to start a blog that makes money', 'best blogging platform for beginners', 'self-hosted WordPress vs WordPress.com', 'how much does it cost to start a blog', 'what to write first on a new blog', 'how do blogs make money'],
    metaDescription: 'The steps in order: pick a topic with buyers, choose a platform, set up a domain, write your first 15 articles, and what to expect on traffic and income.',
    keyTakeaways: [
      'Pick a narrow topic you can list 20 article ideas for and where readers already spend money.',
      'Use self-hosted WordPress for ads and affiliate income; Ghost or Substack if readers will pay you directly.',
      'Buy your own domain on any platform, and check renewal prices before paying for a domain or hosting.',
      'Publish 10 to 15 articles on one narrow topic, each answering a specific search question.',
      'Expect search traffic to take months and income to take longer; most new blogs earn little at first.',
    ],
    content: `
Starting a blog takes an afternoon. Starting one that earns money takes much longer, and most of that time goes into writing, not setup.

Here's the short version. Pick a narrow topic where readers spend money. Put the blog on a platform you can run without help, on a domain you own. Publish 10 to 15 articles that answer specific questions inside that topic. Then keep going while search engines catch up, which usually takes months. Add ways to earn once people are reading.

Most new blogs earn little or nothing for many months, and plenty never earn much at all. The steps below are in the order I'd do them, with links to the deeper guides on this site for each one.

## Step 1: Pick a topic you can sustain and that has buyers

A good blog topic passes two tests.

The first is whether you can keep writing about it. Try listing 20 specific article ideas in ten minutes. If you stall at six, the topic is too thin or you don't know it well enough yet. You don't need credentials, but you do need real knowledge from work, practice or serious research, because readers can tell when a post is a summary of other posts.

The second is whether anyone spends money around it. Look for products people compare before buying, software or services with affiliate programs, and problems people already pay to solve. "Productivity" is too broad to say anything about. "Budget home espresso" has gear, accessories, beans and repairs, and a clear set of readers who are about to buy something.

Narrow beats broad for a new site. You can widen later, and a tight topic tells you what to write next. If you want a quick way to test demand before committing months to it, the guide to [validating an idea before you build it](/guide/validate-digital-business-idea-48-hours) covers that.

## Step 2: Choose a platform

There are four realistic options. The differences that matter are who handles the technical upkeep and how freely you can earn money.

| Platform | Best for | Main trade-off |
| --- | --- | --- |
| Self-hosted WordPress | Blogs meant to earn from ads and affiliate links | You handle updates, backups and security |
| WordPress.com | Wanting WordPress without running a server | Features depend on which plan you pay for |
| Ghost | Writing plus paid memberships | Fewer themes and add-ons; paid hosting |
| Substack | Newsletter-first writing | Little control over design, search setup or ads |

**Self-hosted WordPress** is the free, open-source WordPress software installed on hosting you rent. It has the biggest library of themes and plugins and no restrictions on how you monetize. The cost is maintenance: updates, backups and security are your job, and a site loaded with plugins gets slow.

**WordPress.com** is the hosted version run by Automattic. It has a free plan, but free sites show WordPress.com's own ads to your visitors, and things like plugins and earning from ads depend on the plan. Plan features have changed over time, so read the [current WordPress.com plan comparison](https://wordpress.com/pricing/) before you pay.

**Ghost** is open-source publishing software with memberships and newsletters built in. You can self-host it or pay for Ghost(Pro), which has a free trial but no free plan. Ghost says it takes no cut of your subscription revenue beyond payment processor fees. Check the plan details, since the lowest tier limits which themes you can use.

**Substack** is free to publish on, and [Substack keeps 10% of paid subscription revenue](https://support.substack.com/hc/en-us/articles/360037607131-How-much-does-Substack-cost) on top of payment processing fees. It's the fastest way to start writing, but it's built around email subscriptions. You get limited control over layout and on-page SEO, and it isn't designed for display ads.

My recommendation by situation:

- If the goal is search traffic with ads and affiliate income, use self-hosted WordPress.
- If you want that but don't want to manage a server, use a paid WordPress.com plan that includes the features you need.
- If you plan to charge readers directly, use Ghost, or Substack if you want zero setup.
- If you only want to find out whether you like writing, start on a free option and move later. Just know that moving a site is real work.

For a longer look at the trade-offs, see the [WordPress vs Ghost vs custom-built comparison](/guide/wordpress-vs-ghost-vs-custom-react-cms-2026).

## Step 3: Get a domain and hosting

Buy your own domain whichever platform you choose. It's the one part of the blog you can take with you if you switch platforms. Keep the name short, easy to spell, and broad enough that it still fits if your topic shifts a little.

Prices vary by registrar and change often, so treat these as rough ranges. A .com is usually in the low tens of dollars per year. Check the renewal price, since first-year discounts are common, and check whether WHOIS privacy is included.

Hosting only applies if you self-host. Shared hosting from companies such as Bluehost, SiteGround or DreamHost is typically advertised at a few dollars a month for the first term, then renews at a noticeably higher rate. The discounted price often requires paying for a year or more upfront. Read the renewal price, the refund window, and whether backups and an SSL certificate are included.

A new blog doesn't need more than a basic plan. The main cost for the first year is your time.

## Step 4: Set up the few pages and settings that matter

You can lose weeks to theme tweaking. This is the list worth finishing before your first article:

- An About page that says who writes the blog and why a reader should trust it.
- A Contact page or a visible email address.
- A privacy policy. You'll need one before using analytics, ads or an email signup form.
- An affiliate disclosure, if you'll use affiliate links. The FTC expects it to be clear and close to the recommendation. This site's guide to [writing an affiliate disclosure](/guide/affiliate-disclosure-ftc-compliance-guide) shows how.
- HTTPS turned on, and clean URLs that use the post name instead of dates or ID numbers.
- A light, readable theme. Good defaults matter more than features, and the guide to [blog layout and readability](/guide/blog-layout-ux-reader-retention) covers the choices that affect whether people stay.
- Google Search Console, with your sitemap submitted. It shows which searches bring people to your site, which ordinary analytics doesn't.
- A basic analytics tool and an email signup form. Early traffic will be tiny, but subscribers you collect now are an audience you can reach without depending on search.

Skip logo design, custom fonts and plugin shopping for now.

## Step 5: Write your first 10 to 15 articles around one narrow topic

A new site with three posts on three unrelated subjects gives readers and search engines nothing to go on. Ten to fifteen articles covering one narrow topic from different angles does. Each article should answer one specific question someone types into a search box.

For the espresso example, that could be how to dial in a grinder, why shots taste sour, which machines suit a small kitchen, and how often to descale. Specific, lower-competition questions are where a new site has a chance. Broad terms like "best espresso machine" are held by large publishers. The guide to [keyword research for realistic opportunities](/guide/zero-competition-keyword-research-guide) explains how to find those questions.

For each article:

1. Answer the question in the first few lines.
2. Add detail a reader can't get from a generic summary: exact steps, measurements, what goes wrong and how to fix it.
3. Use plain headings so someone scanning can find their section.
4. Link to your related articles wherever a reader would want the next step.

Set a pace you can hold alongside the rest of your life. One solid article a week, or every two weeks, kept up for a year will get you further than a month of daily posts followed by silence.

## How traffic actually arrives

Slowly. Google's own [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) says some changes take effect in hours and others take several months, and that there's no guarantee any site gets indexed at all. A brand-new domain has no history, so expect the first few months to look almost empty.

Search is still the main source for most blogs because it keeps sending readers to old articles. You don't need advanced tactics at this stage. Descriptive titles, one clear topic per page, fast loading and internal links cover most of it, and the [practical SEO checklist](/guide/2026-practical-seo-checklist) goes through each of those.

While you wait, you can bring in early readers yourself. Answer questions in communities where your readers already are, and link to your article only when it's the best answer. Share with your email list. Pinterest and YouTube suit some topics well. None of this replaces search, but it gets real people reading while your pages age.

Don't judge the blog in month two against sites that have been publishing for five years.

## How blogs earn money

There are four main ways, and most blogs that last use more than one.

**Display ads** pay per visit, and the amount per visitor is small, so they only add up with a lot of traffic. Google AdSense doesn't list a minimum traffic number in its [eligibility requirements](https://support.google.com/adsense/answer/9724), though it does require original content and policy compliance. Some other ad networks set their own traffic minimums.

**Affiliate links** pay a commission when a reader buys through your link. They work best on articles that help with a buying decision, such as comparisons and reviews, and they can earn on modest traffic if the readers are close to purchasing.

**Your own products**, such as ebooks, templates or courses, keep more of each sale but take time to make and need readers who already trust you.

**Services**, such as freelance work, consulting or coaching, are often the first income a blog produces, because a handful of the right readers is enough.

How much any of these earns depends on your topic, your traffic and how well you execute, and results vary widely. The [comparison of ads, affiliate marketing and digital products](/guide/blog-monetization-model-comparison) goes through which model fits which kind of blog.

## How much does it cost to start a blog?

On a free platform, nothing except the domain. For self-hosted WordPress, expect a domain plus a basic hosting plan, which usually comes to a modest yearly total at introductory prices and more once those prices renew. Paid themes, plugins and tools are optional in year one.

## Your first week

Choose the topic, buy the domain, set up the pages in Step 4, and write down your first 15 article ideas. Then put dates next to them. A [content calendar built on keyword research](/guide/annual-blog-content-calendar-guide) turns that list into a schedule you can keep.
`
  },
  {
    id: 'post-blog-2',
    title: 'How to Write Blog Posts Faster Without Making Them Worse',
    slug: 'fast-article-writing-framework-2026',
    excerpt: 'Slow writing comes from planning, drafting and polishing all at once. Here\'s a five-step process, an outline template and a pre-publish checklist.',
    category: 'Blogging',
    tags: ['Content Writing', 'Writing Process', 'Productivity', 'Blogging System'],
    coverImage: '/images/content-writing-framework-featured.webp',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-07-26',
    updatedAt: '2026-10-03',
    readTimeMinutes: 5,
    difficulty: 'Intermediate',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['how to write blog posts faster', 'blog post outline template', 'how to edit a blog post', 'write the first draft without editing', 'can you use AI to write blog posts', 'blog post pre-publish checklist'],
    metaDescription: 'A repeatable process for writing blog posts faster: pick one question, outline from it, draft without editing, then edit in three passes.',
    keyTakeaways: [
      'Write one sentence naming the question the article answers and who\'s asking before you outline.',
      'Build the outline from the reader\'s questions, and list every fact you\'ll need to check.',
      'Put the answer in the opening, then draft the rest without stopping to edit.',
      'Edit in three separate passes: cut, check facts, read aloud.',
      'AI can speed up outlines and rough drafts, but you still supply the knowledge and verify every fact.',
    ],
    content: `
Slow writing usually comes from doing three jobs at once: working out what to say, saying it, and polishing it. Each one interrupts the other two, so you end up rewriting the same paragraph while the rest of the page stays blank.

The fix is to do those jobs in order. Decide the one question the article answers, outline it, write the answer first, draft the rest without stopping to edit, then edit in separate passes. None of this takes talent, and it gets quicker each time you repeat it.

## 1. Decide the one question and who's asking

Before you outline, write one sentence: "This article answers [question] for [reader]." For example: "This article answers 'how do I write an affiliate disclosure?' for a blogger who just joined their first program."

That sentence does most of your cutting for you. Anything that doesn't help that reader with that question belongs in a different article. If you can't write the sentence, the topic is still too vague to draft, and more time spent on [choosing a specific keyword](/guide/zero-competition-keyword-research-guide) will pay off more than time spent typing.

## 2. Outline from the reader's questions

List what that reader would ask, in the order they'd ask it. Those questions become your headings. Under each one, write a single line saying what you'll tell them.

Here's a template you can copy:

- **Question and reader:** one sentence, from step 1
- **The answer in two or three sentences:** this becomes your opening
- **What they need before they start:** tools, accounts, costs (skip it if there's nothing)
- **The steps or the explanation:** one heading per reader question, one line of notes under each
- **What goes wrong:** the mistakes or exceptions you actually know about
- **What to do next:** one action, one link
- **Facts to check:** every number, price, rule or quote, with a source next to each

The last line keeps research under control. Look up what the outline needs and stop there. Paste each source next to the fact as you go, so you aren't searching for it again during editing.

Formats repeat, too. A how-to, a comparison and a review each have a predictable shape, so save your outlines and reuse them. If you write product roundups, there's a ready-made [buyer's guide outline](/guide/write-buyers-guides-that-convert) to start from.

## 3. Write the answer first

Take the two-or-three-sentence answer from your outline and make it the opening. A reader who arrived from search wants to know right away whether they're in the right place, and background can wait until they've decided to stay.

It also helps you. Once the answer is on the page, every later section has a clear job: support it, explain it, or cover an exception.

## 4. Draft without editing

Write the whole draft in one go if you can, and leave it rough. Don't fix sentences or reorder sections yet. When you need a fact you don't have, type a marker like TK and keep moving.

If a section won't come, skip it and write the next one. A stuck section usually means you're missing something: a fact, an example, or a clear idea of what the section is for. That often becomes obvious once the sections around it exist. If it's still stuck at the end, go back to research for that section only.

## 5. Edit in three passes

One read-through that tries to catch everything catches very little. Give each pass a single job.

1. **Cut.** Delete the warm-up before each point, anything said twice, and every sentence the reader wouldn't miss. Check each section against your step 1 sentence.
2. **Check facts.** Go through the "facts to check" list and every TK. Open the source for each one. If you can't confirm a number, take it out.
3. **Read it aloud.** You'll hear the sentences that run too long and the ones nobody would say in conversation. Fix those, then proofread.

Keep a short list of your own habits, such as words you overuse or the way you format numbers and headings. Checking a draft against a list is faster than rereading it and hoping you notice.

## What the cut pass looks like

This is an illustration I wrote for this article, not a quote from a real post.

**Before (63 words):**

> In order to be able to write more quickly, it is very important that writers take the time to think carefully about creating an outline before they begin the actual process of writing. This is because an outline can really help to make sure that you do not end up having to go back and restructure large parts of your article later on.

**After (15 words):**

> Outline before you write. It stops you from restructuring the article halfway through the draft.

Nothing was lost. The first version says the same thing with a run-up in front of it.

## Where AI drafting helps, and where it doesn't

AI tools are useful for the mechanical parts: turning a list of reader questions into an outline, suggesting questions you missed, or producing a rough draft to react to. That can save real time in steps 2 and 4.

They can't supply what you know. A model will state an invented price or rule as confidently as a real one, and its default prose is the padded "before" paragraph above. So an AI draft needs all three editing passes, with extra care on the second.

Google's position is worth reading in its own words. Its [guidance on using generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) doesn't prohibit AI-assisted writing. It warns that AI output can be inaccurate, and that generating many pages without adding value for users may violate its spam policy on scaled content abuse. Publishing unedited AI text in bulk is the pattern that policy describes. If you're wondering what's left for a human writer to offer, I've covered that in the guide on [building a moat when content is cheap](/guide/building-a-moat-in-the-age-of-ai).

## Pre-publish checklist

- The opening answers the question from step 1.
- Every number, price, rule and quote has a source you opened yourself.
- No TK markers are left.
- Each heading tells a skimmer what the section covers.
- You've read it aloud once, start to finish.
- It links to the next thing the reader needs, and those links work.

For titles, meta descriptions and the other on-page details, run through the [SEO checklist](/guide/2026-practical-seo-checklist) before you hit publish.

## Speed comes from repeating the process

There's no trick that makes one article fast. What gets faster is the tenth article written the same way, because the outline is half-built and you've stopped making the same decisions from scratch. The remaining delay is usually deciding what to write, and a [content calendar planned from keyword research](/guide/annual-blog-content-calendar-guide) takes care of that ahead of time.
`
  },
  {
    id: 'post-blog-3',
    title: 'How to Start a Paid Newsletter (and Whether It\'s Worth It)',
    slug: 'build-paid-newsletter-recurring-income',
    excerpt: 'A paid newsletter is a small layer on top of a free list that already trusts you. Here\'s how to judge if yours is ready, what platforms take, and how to run the numbers.',
    category: 'Blogging',
    tags: ['Newsletter', 'Recurring Revenue', 'Monetization', 'Substack'],
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-07-16',
    updatedAt: '2026-10-03',
    readTimeMinutes: 7,
    difficulty: 'Intermediate',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['how to start a paid newsletter', 'is a paid newsletter worth it', 'what to put behind a newsletter paywall', 'Substack vs beehiiv vs Kit vs Ghost fees', 'how to price a paid newsletter', 'reduce paid newsletter churn'],
    metaDescription: 'A paid newsletter only works on top of a free list that trusts you. See what to put behind the paywall, what platforms charge, and the fee math.',
    keyTakeaways: [
      'Build an engaged free list first; a paywall doesn\'t create an audience.',
      'Put something specific behind the paywall (depth, specifics, access or the archive) and say exactly what it is on your subscribe page.',
      'Compare platforms by how they charge: a percentage of subscriptions or a flat monthly fee, plus payment-processor fees either way.',
      'Before launching, multiply subscribers × conversion × price and subtract fees using your own numbers.',
      'Watch churn and paid-subscriber open rates, and check sales tax or VAT rules for digital subscriptions where your readers live.',
    ],
    content: `
A paid newsletter works when you already have a free audience that trusts you on one specific topic, or you're willing to build one first. If you don't have that yet, turning on a paywall won't create it. Almost nobody pays a stranger for email.

So most of the work is the free list. The paid tier is a small layer on top: a share of your free readers decide your writing is worth a few dollars a month, and you keep earning that only as long as you keep showing up.

Whether it's worth it comes down to arithmetic you can do before you launch, plus an honest look at whether you want a publishing deadline that paying customers hold you to. Results vary a lot, and plenty of paid newsletters never cover the time put into them.

## Is your free list ready for a paid tier?

There's no subscriber number that makes you ready. A small list that opens, replies and forwards your emails is a better base than a big list that ignores them.

I'd look for three things before charging:

- You've published on a steady schedule for a few months and know you can keep it up.
- Readers reply or ask follow-up questions without being prompted.
- You can name, in one sentence, something those readers want that your free issues don't give them.

If the third one is fuzzy, wait. You can test it cheaply by asking your list what they'd pay for, the same way you'd [check demand for any digital product before building it](/guide/validate-digital-business-idea-48-hours).

If you don't have a list at all, start there. A blog that ranks for a focused topic is one of the steadier ways to feed one, and [a short welcome sequence for new subscribers](/guide/build-automated-affiliate-email-funnel) does a lot of the early trust-building for you.

## What goes behind the paywall

Keep the free tier good. It's how new readers find you and decide whether you're worth paying, so thinning it out to push upgrades tends to cost you both audiences.

The paid tier should add something a reader can describe, not just "more". Things that usually hold up:

- **Depth:** the full analysis, data, templates or step-by-step version of what the free issue summarises.
- **Specifics:** the exact numbers, tools or examples that are too detailed for a general audience.
- **Access:** a Q&A thread, the chance to submit questions, or a small community.
- **The archive:** recent issues free, older ones paid.

Spell out the difference on your subscribe page. "Free: one essay a week. Paid: the essay plus a monthly teardown and the template library" is easier to say yes to than a vague promise of premium content, and it also tells you what you've committed to delivering.

Mention the paid option at the end of free issues that show what you can do. An upgrade prompt in the middle of every email makes the free edition read like a sales pitch.

## Which platform, and what each one takes

The main difference between platforms is how they charge. Some are free until you earn and then take a percentage. Others charge a monthly fee and take nothing from your subscriptions. A percentage is cheaper when you're small; a flat fee usually wins once paid revenue grows.

These are the terms each platform published at the time of writing. Plans and fees change, so check the linked pages before you commit.

| Platform | Suits | How it charges |
| --- | --- | --- |
| Substack | Starting with no upfront cost | Free to publish; 10% of paid subscriptions, plus Stripe fees |
| Kit | Email marketers who also sell products | Paid newsletters on every plan, including free; 3.5% + 30¢ per transaction |
| beehiiv | Growth-focused newsletters | Paid subscriptions need a paid plan; 0% take, Stripe fees apply |
| Ghost | Writers who want their own site | Monthly plan; 0% take on its paid-subscription plans, processor fees apply |

Sources: [Substack's own breakdown of its costs](https://support.substack.com/hc/en-us/articles/360037607131-How-much-does-Substack-cost), [Kit's pricing page](https://kit.com/pricing), [beehiiv's pricing page](https://www.beehiiv.com/pricing) and [Ghost's pricing page](https://ghost.org/pricing/).

On top of any platform cut, the payment processor takes its share. Stripe's standard US rate is 2.9% + 30¢ per successful card payment, and Substack says an extra 0.7% Stripe billing fee applies to recurring subscriptions. International cards and currency conversion cost more.

Ghost is also a full publishing platform, so if you're weighing it as your main site, the [comparison of WordPress, Ghost and a custom build](/guide/wordpress-vs-ghost-vs-custom-react-cms-2026) covers that side of the decision.

## How to price a paid newsletter

Look at what paid newsletters in your own niche charge and start near them. Newsletters that help readers make or save money at work can charge more than general-interest writing, because the reader can see a payback.

Offer monthly and annual billing. An annual plan at a modest discount gives you cash up front and one renewal decision a year instead of twelve. The fixed 30¢ per charge also hurts less: on a $5 monthly plan it's 6% of every payment before any percentage fee.

Don't agonise over the first price. You can change it later; check how your platform treats existing subscribers when you do. The same logic applies here as in [pricing any digital product](/guide/pricing-strategy-digital-products-why-97-outsells-19): too cheap can signal low value and makes the fees bite harder.

## A worked example (made-up numbers)

I'm not going to quote a "typical" free-to-paid conversion rate. The percentages passed around online rarely come with a source, and the real figure depends on your niche, price and how warm your list is. The numbers below are invented to show the arithmetic. Swap in your own.

Say you have 2,000 free subscribers, 3% of them go paid, and you charge $8 a month.

| Step | Calculation | Result |
| --- | --- | --- |
| Paid subscribers | 2,000 × 3% | 60 |
| Gross per month | 60 × $8 | $480.00 |
| Platform cut at 10% | $480 × 10% | −$48.00 |
| Card fees | $480 × 2.9% + 60 × $0.30 | −$31.92 |
| Billing fee | $480 × 0.7% | −$3.36 |
| Left before tax | | $396.72 |

That's about 17% gone before income tax. On a platform with no percentage cut you'd keep roughly $448 of the $480, then subtract the monthly plan fee. Run both versions with your own numbers, because the break-even point moves with your list size.

Notice which lever matters most. Doubling the price or the conversion rate is hard. Doubling the free list is slow but doable, and that's where the growth comes from.

## Churn: the number that decides whether it lasts

Churn is the share of paying subscribers who cancel in a given period. Some is normal. Cards expire, budgets tighten, people lose interest.

It matters because you have to replace cancellations before you grow. Using the made-up example again: if 5% of 60 paid subscribers leave each month, that's 3 people, so you need 3 new paid subscribers a month just to stand still.

What keeps churn down is mostly unglamorous:

- Publish when you said you would. Missed issues are the fastest way to lose a paying reader.
- Watch open rates among paid subscribers. A drop there usually shows up before the cancellations do.
- Ask people who cancel why, and read the answers.
- Answer billing and access questions quickly, and state your refund policy up front.
- Keep the paid tier focused on one clear thing instead of piling on extras.

## Tax and legal basics

Subscription income is business income, so set part of it aside for tax from the first payment. Separately, sales tax, VAT or GST on digital subscriptions varies by country and US state, and can depend on where your readers live. Check what your platform collects for you and confirm the rest with an accountant; this guide isn't tax advice.

In the US, the [CAN-SPAM Act](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) also requires commercial email to include a working way to opt out and a valid physical postal address. Newsletter platforms normally build both into the footer, but look before your first send.

## Start with the free issue

If your list is small or quiet, the best move is to keep publishing free and grow it; a paid tier can wait. If readers are already asking for more, pick one specific paid benefit, run the fee arithmetic above, and launch to your existing list first.

A newsletter is also only one way to earn from an audience. If you're not sure it's the right one, compare it with [ads, affiliate links and digital products](/guide/blog-monetization-model-comparison) before you commit to a publishing schedule people are paying for.
`
  },
  {
    id: 'post-blog-4',
    title: 'Blog Layout Best Practices: Font Size, Line Length, Contrast',
    slug: 'blog-layout-ux-reader-retention',
    excerpt: 'Body text size, line length, line height, contrast, tap targets and ad density: the values to use, which ones are real standards, and a 10-minute phone check.',
    category: 'Blogging',
    tags: ['UX Design', 'Readability', 'Blog Layout', 'Accessibility'],
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-07-12',
    updatedAt: '2026-10-03',
    readTimeMinutes: 8,
    difficulty: 'Beginner',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['blog layout best practices', 'best font size for blog body text', 'ideal line length for readability', 'blog line height and spacing', 'WCAG contrast ratio for text', 'mobile tap target size', 'how many ads is too many on a blog post'],
    metaDescription: 'The blog layout settings worth getting right, with the values to use and where each comes from: text size, line length, contrast, tap targets and ads.',
    keyTakeaways: [
      'Set body text to at least 16px (17–18px is common) with a line height of 1.5.',
      'Cap the article column at about 45–75 characters per line; WCAG\'s ceiling is 80.',
      'Check every text and background colour pair for a contrast ratio of 4.5:1 or higher, 3:1 for large text.',
      'Give images width and height attributes and ad slots a minimum height so the page doesn\'t jump as it loads.',
      'Remove full-screen pop-ups on arrival and keep mobile ads well under 30% of the article\'s height.',
    ],
    content: `
Most blog readability problems come down to a handful of settings: text size, line length, line spacing, contrast, tap targets, and how much is competing with the article for space. Set those sensibly and almost any theme becomes comfortable to read.

The short version: body text at 16px or larger, lines of roughly 45–75 characters, a line height of 1.5, text contrast of at least 4.5:1, and nothing covering the article when someone arrives. The table gives the values. The sections after it explain where each number comes from, because some are published standards and some are only convention, and it helps to know which is which.

## The settings, the values, and the reasons

| Setting | Recommended value | Why |
| --- | --- | --- |
| Body text size | 16px minimum; 17–18px is common | Readable on a phone without zooming |
| Line length | About 45–75 characters, never over 80 | The eye finds the next line easily |
| Line height | 1.5 × font size | Lines stop blurring into each other |
| Text contrast | 4.5:1 or higher (3:1 for large text) | Readable with low vision or in sunlight |
| Tap targets | 24×24px at the very least; 44–48px is better | Fewer mis-taps |
| Images and ad slots | Space reserved before they load | The page doesn't jump while you read |
| Pop-ups | No full-screen overlay on arrival | Readers and Google can reach the content |
| Mobile ads | Well under 30% of the article's height | Past that, ads crowd out the article |

## Text size, line length and line height

**Text size.** There's no official minimum. WCAG, the web accessibility standard published by the W3C, doesn't set one. The 16px figure is convention: it's the default size in every major browser, and it's the floor most designers work from. Plenty of blogs use 17 or 18px for body text, and I'd pick 18px for anything long. If your theme sets body text at 14px, that's the first thing to change.

**Line length.** This one does have a published number. WCAG's Visual Presentation criterion (1.4.8) says a line should be no more than 80 characters wide. It's a Level AAA criterion, the strictest of WCAG's three tiers, so treat it as a sensible ceiling more than a requirement. Typographers go further and commonly recommend about 45–75 characters. That range is long-standing convention, and no standard sets it.

On a phone the screen does this for you. The problem shows up on laptops and tablets, where a theme lets text run the full width of the window. The fix is a maximum width on the article column: around 65ch in CSS, or somewhere near 600–700px at an 18px font size depending on the typeface.

The same criterion says text shouldn't be justified, so leave body text left-aligned.

**Line height.** WCAG 1.4.8 asks for line spacing of at least "space-and-a-half", meaning 1.5. A second criterion, Text Spacing (1.4.12, Level AA), uses the same 1.5 figure in a different way: your page must not break when a reader overrides the spacing to that value. So 1.5 is both a good default and the value your layout has to survive. Anything from 1.5 to about 1.7 reads well for body text. Headings can be tighter.

## Contrast: the one with a hard number

WCAG's Contrast (Minimum) criterion, which is Level AA, requires a contrast ratio of at least 4.5:1 between text and its background. Large text, defined as 18pt (about 24px) or 14pt bold (about 18.5px), only needs 3:1. The full wording is in the [WCAG 2.2 specification on w3.org](https://www.w3.org/TR/WCAG22/).

Black on white passes with a huge margin. The usual failures are elsewhere: light grey body text, pale link colours, grey dates and author lines, and white text on a brand-coloured button. Put each text and background pair into a free contrast checker (WebAIM has a well-known one) and fix whatever comes in under 4.5:1.

If your site has a dark mode, check those colours too. The ratio applies to every colour scheme you ship.

## Tap targets on a phone

WCAG 2.2 added Target Size (Minimum), which asks for targets of at least 24 by 24 CSS pixels. That's a floor. Google's web.dev guidance recommends about 48px with roughly 8px between targets, and Apple tells app designers to make controls at least 44 by 44 points.

Links inside a sentence are exempt from the WCAG rule, so you don't need to restyle your paragraphs. Look at menu items, the search icon, share buttons, pagination, footer links stacked close together, and the close button on any banner, which is often the smallest target on the page.

## Headings and paragraphs

Many readers scan the headings before deciding whether to read. A heading should say what its section covers. "Contrast: the one with a hard number" tells you something. "Things to consider" doesn't.

Keep the levels in order: the title, then H2 for sections, then H3 inside them. People using screen readers often jump from heading to heading, and skipped levels make that harder.

Short paragraphs help on a phone, where four sentences can fill the screen. Two to four sentences is a reasonable habit. Don't chop everything into single lines, though, because an explanation that needs five sentences reads worse as five fragments. The [article structure I'd use for drafting](/guide/fast-article-writing-framework-2026) covers this from the writing side.

## Stop the page from jumping

Text that moves while you're reading it is one of the most irritating layout faults, and it's usually caused by an image or an ad loading late and pushing everything down.

The fix is to reserve the space in advance. Give every image width and height attributes (or a CSS aspect-ratio) so the browser holds the right-sized gap. For ad slots, set a minimum height on the container so the slot is already there when the ad arrives. Google measures this as Cumulative Layout Shift and treats a score of 0.1 or less as good. The [Core Web Vitals walkthrough](/guide/core-web-vitals-optimization-guide) explains how to find your score and what else moves it, and the [guide to blog images](/guide/free-blog-graphics-and-photography-guide) is useful if oversized images are part of the problem.

## Pop-ups and ads

Google's documentation on [intrusive interstitials and dialogs](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials) is direct about this: don't cover the whole page with an overlay, and don't redirect visitors to a separate page for sign-up or consent. It warns that intrusive dialogs can make content harder for Google to understand, which may lead to poor search performance. Its suggested alternative is a banner that takes up a small fraction of the screen. Interstitials you're legally required to show, such as age gates, are exempt.

So a newsletter form inside the article or a slim banner is fine. A full-screen sign-up box that appears the moment someone lands from search is the thing to remove.

For ads, two published limits are worth knowing. Google's publisher policies don't allow its ads on [screens with more ads than publisher content](https://support.google.com/publisherpolicies/answer/11169917?hl=en). And the Coalition for Better Ads lists [ad density above 30% on mobile](https://www.betterads.org/mobile-ad-density-higher-than-30/) as an experience that falls below its standard. It measures that by adding up the heights of the ads within the main content and dividing by the content's total height. The same list includes pop-up ads, large sticky ads and auto-playing video with sound.

I'd stay well below 30%. If ads are your main income and the layout feels crowded, it may be worth looking at [how ads compare with affiliate links and digital products](/guide/blog-monetization-model-comparison) before adding another slot.

## What these settings won't tell you

I'm not going to quote a percentage for how much longer people stay after you fix your typography, because I haven't seen a number that holds across sites. These settings remove reasons to leave; whether readers stay still depends on the article.

If you want evidence from your own site, note your scroll depth and engagement figures before a change, then compare a few weeks later. Treat the result as a rough signal, since traffic mix and seasonality move those numbers too.

Font choice and dark mode matter less than the table above. Any plain typeface designed for screens works for body text, and two fonts on a page is plenty.

## A 10-minute check on your own phone

Use your phone on mobile data, in a private tab, and open one of your posts the way a stranger would.

1. Watch the first five seconds. Note anything that covers the article: a pop-up, a full-screen ad, a consent box with a tiny close button.
2. Keep watching as it loads. If the text jumps when an image or ad appears, that slot needs reserved space.
3. Read three paragraphs at arm's length without zooming. If you want to zoom, the text is too small.
4. Turn the brightness down or step outside. Check the body text, links, captions and the grey date line.
5. Tap the menu, the search icon, a share button and two footer links that sit close together. Count the mis-taps.
6. Scroll the whole article and estimate how much of its length is ads. If it looks like a third or more, cut some.
7. Scroll back up quickly, reading only the headings. You should be able to tell what each section covers.
8. Look for sideways scrolling. A wide table or image is the usual cause.
9. Later, on a laptop, count the characters in one full line of body text, spaces included. Over 80 means the column needs a maximum width.

Fix whatever failed first, starting with anything that blocks the article. Contrast is the one item you can't judge by eye, so run your colours through a checker afterwards.

## After the layout is fixed

Layout takes an afternoon to sort out and then mostly stays sorted. Once a post is comfortable to read, the next useful job is giving readers somewhere to go when they finish it, which is what [a simple internal linking audit](/guide/internal-linking-strategy-guide) is for.
`
  },
  {
    id: 'post-blog-5',
    title: 'How to Repurpose a Blog Post for Social Media and Email',
    slug: 'repurpose-blog-posts-social-media',
    excerpt: 'A three-step workflow for turning one blog post into short videos, carousels, pins and emails, with a format table and a worked example.',
    category: 'Blogging',
    tags: ['Content Repurposing', 'Social Media', 'Content Strategy'],
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-07-07',
    updatedAt: '2026-10-03',
    readTimeMinutes: 6,
    difficulty: 'Beginner',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['repurpose blog post for social media', 'how to turn a blog post into social media content', 'blog post to carousel or short video', 'does republishing a blog post cause duplicate content', 'canonical link for syndicated content', 'track social media traffic with utm parameters'],
    metaDescription: 'Pick the right post, pull out its standalone ideas, and match each to a video, carousel, pin or email. Includes a format table and example.',
    keyTakeaways: [
      'Repurpose posts that answer one clear question; fix outdated posts before reusing them.',
      'Pull out three to five ideas that make sense without the rest of the article, one idea per piece.',
      'For each format, change the hook, the length and where the link goes.',
      'If you republish a full article elsewhere, a summary plus a link is the safest way to avoid competing with your original.',
      'Tag shared links with UTM parameters and drop formats that cost time but send no visitors.',
    ],
    content: `
Repurposing a blog post doesn't mean pasting the link on five platforms. It means pulling the three to five ideas in the post that make sense on their own, then rebuilding each one in the format a platform is made for: a short video script, a carousel, a single post or thread, a Pinterest pin, an email.

A post with several distinct points can supply a handful of pieces this way. The work is in three steps: choose the right post, extract the ideas, then match each idea to a format.

## Step 1: Pick a post that answers one clear question

Start with a post whose title you could turn into a question and answer in two sentences. "How do I pick a blog name?" works. A long, heavily qualified opinion piece usually doesn't, because every short version drops the qualifiers and ends up saying something the post never said.

Good candidates tend to have numbered steps, a comparison, a checklist or a clear before-and-after. If your analytics show a post that already gets steady search traffic, I'd start there, since you know people want that answer.

Skip posts that are out of date. Fix the post first, then repurpose it.

## Step 2: Pull out three to five ideas that stand alone

Read the post once and copy out anything that still makes sense with the rest of the article deleted. You're looking for:

- A single step that people get wrong
- A rule of thumb or a quick test
- A comparison between two options
- A mistake and its fix
- The answer to the title question, in one or two sentences

Write each one as a plain sentence in a notes file. If an idea needs two paragraphs of setup before it makes sense, leave it in the post.

This gets much easier when the post was built in clear sections to begin with. If yours tend to run as one long block of prose, [outlining the article in separate sections before you write](/guide/fast-article-writing-framework-2026) fixes that at the source.

## Step 3: Match each idea to a format

Don't push every idea into every format. A sequence of steps suits a carousel. A single surprising point suits a short video or one post. The whole answer, condensed, suits an email.

| Format | Take from the post | What changes |
| --- | --- | --- |
| Short video (30–60 sec) | One idea | Hook in the first line, spoken wording, one example. Link in your profile or the description. |
| Carousel or slides | A sequence of steps or a list | One point per slide, few words, the title question on slide one. Link wherever the platform allows it. |
| Single post or thread | One opinion or rule of thumb | Lead with the claim, then two or three lines of reasoning. Link at the end or in a reply. |
| Pinterest pin | The title question | A vertical image with the question as text, a description written as a search phrase. The pin itself links to the post. |
| Email to your list | The answer plus one idea | Conversational, a few short paragraphs, one link to the full post. |

Three things change in every row.

**The hook.** A blog post can open with context because the reader already clicked a headline. On a feed, the first line has to be the point.

**The length.** Each piece carries one idea. If you catch yourself summarizing the whole article, you're writing a second blog post in the wrong place.

**The link.** Every platform handles links differently, and the rules change. Before you plan around one, check whether a link in a caption is clickable there, or whether it has to live in your profile. Pinterest is the simple case: [its pin builder has a link field](https://help.pinterest.com/en/article/create-a-pin-from-an-image-or-video) for the page you want people to visit. My guide to [getting blog traffic from Pinterest](/guide/pinterest-affiliate-marketing-traffic-guide) covers pin design and descriptions in more detail.

You'll read a lot of advice about how algorithms treat posts that contain links, or content that's been posted elsewhere first. I haven't found platform documentation that settles either question, so treat those claims as working assumptions and test them on your own account rather than building a routine around them.

## A worked example

This is an illustration. The post is made up.

Say the post is "How to pick a blog name you won't regret." The standalone ideas in it:

1. Say the name out loud to someone. If they can't spell it back, it fails.
2. Check the domain and the social handles before you get attached.
3. Don't put a narrow topic in the name if you might widen the blog later.
4. Avoid hyphens and numbers, because you'll have to explain them every time you say the name.

Here are the first lines of three pieces built from that list.

**Short video, from idea 1:**

> "Before you buy that domain, say your blog name out loud to a friend and ask them to type it. If they get it wrong, so will everyone who hears about you."

**Carousel, from all four ideas:**

> Slide 1: "4 checks before you name your blog." Slide 2: "1. Say it out loud. Can someone spell it back?"

**Email, from idea 3:**

> "Quick one today. If you're naming a blog, leave the topic out of the name. Here's why that gives you room later, and the three other checks I'd run before paying for a domain."

Each piece opens on the idea itself, none of them tries to cover the whole post, and only the email depends on the link to finish the thought.

## Will repurposing cause a duplicate content problem?

Social posts, pins and emails won't. They're short, they're new wording, and they aren't competing with your article in search.

The risk is republishing the *full article* on another site, such as Medium, LinkedIn articles or a partner blog. Google then has two copies and picks one to show, and it may not pick yours. Google's documentation says that [some duplicate content is normal and isn't a spam violation](https://developers.google.com/search/docs/crawling-indexing/canonicalization), so you're not facing a penalty. What's at stake is which copy ranks.

You have three ways to handle it, from safest to least safe:

- **Publish a summary and link to the original.** There's no second full copy, so there's nothing to compete with.
- **Ask the other site to keep its copy out of Google's index.** For syndication, this is what Google recommends. Its [canonicalization troubleshooting page](https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting) says the most effective fix is for partners to block indexing of your content.
- **Use a canonical link pointing to your post.** Some platforms add this for you. Medium's [import tool](https://help.medium.com/hc/en-us/articles/214550207-Import-a-post-to-Medium) sets a canonical URL referencing the original. It helps, but Google treats a canonical as a hint, and the same troubleshooting page says it doesn't recommend relying on one for syndicated copies.

For most small blogs, I'd go with the summary and link.

## How to tell whether it's working

Likes on a platform don't tell you whether anyone reached your site. Add UTM parameters to the links you share so each visit is labelled with where it came from. Google Analytics [expects source, medium and campaign together](https://support.google.com/analytics/answer/10917952), for example \`utm_source=pinterest\`, \`utm_medium=social\` and \`utm_campaign=blog-name-post\`. Many other analytics tools read the same tags, and if you'd rather not use Google's, there are [privacy-focused analytics options](/guide/privacy-friendly-web-analytics-fathom-plausible) to consider.

After a month or two, look at which formats sent visitors. Then compare that with the time each one took. If a platform takes hours a week and sends almost nobody, drop it and put the time into the one that does. Results vary a lot by niche and audience, so your own numbers matter more than anyone's general advice.

## Make it part of publishing

The easiest time to do Step 2 is while the post is still fresh. Add a line to your publishing routine: before you hit publish, list the standalone ideas at the bottom of your draft notes. If you plan posts ahead, give each one a row for its repurposed pieces in your [content calendar](/guide/annual-blog-content-calendar-guide).

Start with one post and two formats. If the email version is the one you enjoy writing, a [welcome sequence for new subscribers](/guide/build-automated-affiliate-email-funnel) is a good place to reuse your best posts next.
`
  },
  {
    id: 'post-blog-6',
    title: 'Blog Monetization: Ads vs Affiliate vs Digital Products',
    slug: 'blog-monetization-model-comparison',
    excerpt: 'Display ads, affiliate links and digital products each suit a different kind of blog. Here\'s how to pick by traffic, topic, trust and time.',
    category: 'Blogging',
    tags: ['Monetization', 'Display Ads', 'Digital Products', 'Affiliate Marketing'],
    coverImage: '/images/uploads/design-a-funnel-that-sells.webp',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-07-03',
    updatedAt: '2026-10-03',
    readTimeMinutes: 6,
    difficulty: 'Intermediate',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['best way to monetize a blog', 'display ads vs affiliate marketing', 'blog monetization models compared', 'how much traffic do you need for AdSense', 'Mediavine and Raptive traffic requirements', 'when to add display ads to a blog', 'should a small blog sell a digital product'],
    metaDescription: 'Which way to monetize a blog fits your traffic, topic and time: how display ads, affiliate links and digital products compare, and the order to add them.',
    keyTakeaways: [
      'If your topic has products readers shop for, add affiliate links from your first relevant article; they can earn at low traffic.',
      'Hold off on display ads until traffic is steady: AdSense has no published traffic minimum, but low traffic earns little and ads cost readers a cleaner page.',
      'Check Mediavine\'s and Raptive\'s own requirement pages before planning around a premium network, because their thresholds change.',
      'Build a digital product only after readers have shown demand, and test it with a small paid version first.',
      'Add models in order (affiliate, then ads, then a product) and keep ads light on pages that earn from affiliate links.',
    ],
    content: `
The best way to monetize a blog depends on four things: how much traffic you have, how much readers trust you, how much time you can spare, and whether your topic involves products people buy.

Here's the short version. If your topic has products readers are already shopping for, start with affiliate links, because they can earn at low traffic. If your traffic is large and your topic isn't commercial, display ads are the natural fit. If you have a small audience that trusts you and keeps asking for the same help, a digital product can earn more per reader than either, but it costs the most time before it pays anything.

Most small sites end up using all three, added in roughly that order. The rest of this guide explains why, and where each model goes wrong.

## The three models side by side

| | Display ads | Affiliate links | Digital products |
| --- | --- | --- | --- |
| What it needs | Lots of pageviews | Readers close to buying something | Trust, plus a problem people pay to solve |
| When it starts paying | Once traffic is large | From the first sale, even at low traffic | After you build and launch it |
| Effort | Low once set up | Medium: the content has to help a buying decision | High up front, plus support |
| Main risk | Worse reading experience; policy problems | Programs change rates and terms | You build something nobody buys |

## Display ads pay for volume

Ads pay a small amount per pageview, so the only way to earn much is to have a lot of pageviews. That makes them a poor first choice for a new blog and a sensible one for a busy site.

To show the shape of it, here's some made-up arithmetic. These are not typical figures. Suppose a site earned $10 for every 1,000 pageviews. At 5,000 pageviews a month, that's $50. At 200,000, it's $2,000. Real rates swing widely by topic, season, reader location and ad network, and yours could be far lower or higher. Whatever the rate, income rises and falls with traffic.

Getting in is easier than most people assume. Google AdSense publishes no minimum traffic number. Its [eligibility requirements](https://support.google.com/adsense/answer/9724) ask for original, high-quality content, compliance with its program policies, and an applicant who is at least 18. Those policies are strict about things like encouraging clicks or building pages mainly to show ads, and Google can disable an account that breaks them.

The premium networks do set thresholds. At the time of writing (October 2026), [Raptive's eligibility page](https://help.raptive.com/hc/en-us/articles/360032840891-Who-is-eligible-for-Raptive) lists a minimum of 25,000 monthly pageviews, along with conditions on where the traffic comes from and a domain at least six months old. [Mediavine's requirements page](https://www.mediavine.com/mediavine-requirements/) asks for at least $5,000 in annual ad revenue, while its entry-level program, Journey, asks for 1,000 sessions in a 30-day period from the US, Canada, the UK or Australia. These numbers have changed before, so check each page before you plan around them.

The cost of ads is paid by your readers. Ads slow pages down, push content around as they load, and interrupt reading, and a page crowded with them looks less trustworthy. At low traffic you'd be accepting all of that for very little money. If you do run ads, keep them light and pay attention to [layout and readability choices](/guide/blog-layout-ux-reader-retention) so the article is still pleasant to read.

## Affiliate links pay for relevance

An affiliate link earns a commission when a reader buys through it. Income depends on how many readers are close to a purchase, which is why a small site with the right articles can out-earn a much bigger one with the wrong ones.

This model only works if your topic has products people buy and your articles help with the decision. Comparisons, reviews and "which one should I get" articles do the work here. An affiliate link dropped into a general-interest post rarely earns anything. If you want to do this well, start with [buyer's guides that help a reader choose](/guide/write-buyers-guides-that-convert).

The catch is that you don't control the terms. A program can cut its commission rate, shorten its cookie window or close altogether, and your income changes overnight. Spreading links across several programs softens that. You also have to tell readers about the relationship, clearly and near the link. The guide to [affiliate disclosures that meet FTC rules](/guide/affiliate-disclosure-ftc-compliance-guide) covers the wording.

Adding a relevant link costs your reader nothing, so there's no reason to wait for traffic. It just won't earn much until people arrive and trust what you recommend.

## Digital products pay for trust

An ebook, template, course or paid newsletter is something you make once and sell yourself. You set the price and keep the sale, minus payment fees, so a small audience can go a long way. Nobody else's commission table or ad rate affects it.

It's also the most work and the easiest to get wrong. You build the whole thing before earning anything, then you handle refunds, questions and updates. The common failure is making a product nobody asked for.

So wait for evidence. Repeated reader questions on one problem, emails asking whether you offer something, or one article that draws far more engagement than the rest are all decent signs. Then [test the idea before you build it](/guide/validate-digital-business-idea-48-hours), ideally with a small paid version. When you get to pricing, don't assume cheap is safe. The guide on [pricing digital products](/guide/pricing-strategy-digital-products-why-97-outsells-19) explains why.

## Which model fits your situation

**Low traffic, commercial topic.** Affiliate links first. Write the articles that help people choose.

**Low traffic, no obvious products.** Skip monetizing for now and build an email list. Ads would earn pennies, and you don't know yet what readers would pay for.

**High traffic, general-interest topic.** Display ads, and it's worth applying to a premium network once you qualify.

**Small audience that trusts you.** A digital product or paid newsletter, once readers have shown you what they want.

**Very little time.** Ads and affiliate links need the least upkeep. A product creates customer support, and that doesn't stop.

Your topic can rule a model out entirely. With no relevant products, affiliate income stays near zero however good the writing is. And if free content already covers everything readers need, a paid product is a hard sell. In either case, shifting your angle toward a more commercial corner of the topic usually works better than forcing the model.

## Combining models, and the order most small sites add them

Using more than one model protects you when one of them changes. The usual order looks like this:

1. **Affiliate links from the first relevant article.** There's no traffic requirement and no cost to the reader.
2. **Display ads once traffic is steady.** Add them when the income is worth the hit to the reading experience. Many sites start with AdSense and move to a premium network later.
3. **A digital product once demand is clear.** By then you have traffic to launch to and questions to build around.

Don't stack everything on every page. A buyer's guide earns from its affiliate links, and heavy ads on that page only pull readers away from them. Many sites keep ads light or off on their best-converting pages and run them on general articles instead.

Sponsored posts and paid communities exist too, but both need an established audience, so they come later.

Revisit the mix about once a year. A site with more traffic, a bigger email list and a clearer idea of what readers value has options it didn't have at launch.

## Where to go from here

Pick the one model that matches the traffic and topic you have today, and give it a few months before adding a second. Income from any of these varies a lot between sites and usually builds slowly. If you're still setting up, the guide on [starting a blog that can sustain itself](/guide/how-to-start-a-profitable-blog-2026) covers choosing a topic with monetization in mind.
`
  },
  {
    id: 'post-blog-7',
    title: 'How to Create a Blog Content Calendar From Keyword Research',
    slug: 'annual-blog-content-calendar-guide',
    excerpt: 'A step-by-step way to turn a keyword list into a publishing calendar you can keep up with, including a four-column template to copy.',
    category: 'Blogging',
    tags: ['Content Calendar', 'Keyword Research', 'SEO Strategy', 'Blogging System'],
    coverImage: '/images/uploads/plan-seo-content-that-compounds.webp',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-06-28',
    updatedAt: '2026-10-03',
    readTimeMinutes: 6,
    difficulty: 'Intermediate',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['blog content calendar', 'how to create a content calendar for a blog', 'content calendar template for bloggers', 'how often should I publish blog posts', 'pillar page or supporting posts first', 'Google Trends for seasonal content'],
    metaDescription: 'Turn a keyword list into a blog content calendar: set a pace one person can keep, order your clusters, plan for seasonality, and copy the template.',
    keyTakeaways: [
      'Merge keywords that return the same search results into one article, then tag each article with its cluster.',
      'Set your pace from real hours: weekly hours divided by hours per article, then plan for about three quarters of that.',
      'Finish one cluster before starting the next, and schedule the internal links when each post goes live.',
      'Use Google Trends for timing only; it shows relative interest on a 0-100 scale, not search volume.',
      'Keep one slot a month for updating an older post, and plan in detail only about three months ahead.',
    ],
    content: `
A keyword list tells you what you could write. It doesn't tell you what to write this week, and that gap is where most blogs stall.

A content calendar closes it. Group your keywords into clusters, work out how many articles you can finish in a month, put the clusters in order, and write each slot into a spreadsheet with four columns. That takes an afternoon, and it covers the next three months.

This guide assumes you already have a keyword list. If you don't, start with [finding low-competition keywords for a new site](/guide/zero-competition-keyword-research-guide) and come back.

## Step 1: Turn the keyword list into articles, then clusters

A raw keyword list overstates how much you have to write, because several phrases usually belong to one article. "How often to water a snake plant" and "snake plant watering schedule" are the same question. Search both: if the results are mostly the same pages, treat them as one article and pick the clearer phrase as the target query.

Once the list is down to one row per article, tag each row with its parent topic. Rows that share a parent are a cluster: one broad pillar article and the narrower posts that support it. I won't re-teach clustering here, since the guide on [building a topic cluster on a small site](/guide/topical-authority-case-study) covers how to choose and size one.

For the calendar, you only need two things from this step: a list of articles, and a cluster name next to each.

## Step 2: Set a pace you can keep for six months

Google documents no posting-frequency requirement. Its guidance on [creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) goes the other way: it asks whether you're adding a lot of new content mainly because you think it'll make the site seem "fresh", and answers that it won't help. So "publish three times a week to rank" isn't a rule you need to plan around.

My opinion is that a pace you can sustain beats a higher one you abandon. A calendar that assumes four posts a week and collapses in month two leaves you with a few half-finished clusters and nothing to show for the planning.

Work the number out from your hours instead of picking one that sounds ambitious:

1. Estimate how long one finished article takes you, including research, editing, images and publishing. Time your next one if you don't know.
2. Count the hours a week you can reliably give the blog.
3. Divide, then plan for about three quarters of the result. The spare quarter covers the weeks that go wrong.

As an illustration, six hours a week and about five hours per article works out to roughly one article a week, so the plan would be three new articles a month with the fourth slot left open. If the hours themselves are the problem, sort that out before you plan anything: a [weekly schedule with protected writing blocks](/guide/solopreneur-operating-system-deep-work-schedule) will do more for your pace than a tighter calendar.

## Step 3: Decide the order

Finish one cluster before starting the next. Five articles on one topic that link to each other are more useful to a reader than five articles on five topics, and they're easier to write while the research is still in your head.

### Pillar first, or supporting posts first?

Either order works, because internal links can be added after the fact. Google publishes no guidance preferring one.

On a new site I'd publish two or three supporting posts first. They target narrower queries, they're quicker to finish, and writing them shows you what the pillar needs to cover. Then publish the pillar and go back to add links in both directions. The one thing to avoid is leaving supporting posts orphaned for months, so put the pillar no later than the fourth or fifth slot in the cluster.

If you already know the topic well, writing the pillar first is fine too. Put a "links to add" task on the calendar for the week each new post goes live. [Internal linking](/guide/internal-linking-strategy-guide) is the step that gets skipped when it isn't scheduled.

## Step 4: Move seasonal articles ahead of their season

Some queries peak at the same time every year, and an article published during the peak has often missed it. A new page needs time to be crawled, indexed and to settle in the results, and nobody can tell you exactly how long that takes for your site.

Google Trends is the free way to check. Enter the query, set the time range to the past five years, and look for a repeating shape. Note the month interest starts to climb, which matters more than the month it peaks.

Be clear about what the chart shows. According to [Google's explanation of Trends data](https://support.google.com/trends/answer/4365533), each point is search interest relative to all searches in that place and time, scaled from 0 to 100. It's a proportion drawn from a sample of searches, so a score of 100 marks the query's own high point and says nothing about how many people searched. Use Trends for timing, and your keyword tool for size.

As a rule of thumb (mine, with no official figure behind it), schedule a seasonal article a month or two before interest starts rising. That can mean pulling one article out of its cluster order, which is fine.

## Step 5: Reserve slots for updating old posts

Once you have a dozen or so articles, some will be out of date or sitting just off the first page. Fixing them often takes less time than writing a new one, so give updates a recurring slot. One a month is a reasonable start.

An update means changing the content: correcting facts, filling gaps, replacing stale examples. Google's helpful content guidance specifically lists changing a page's date to make it seem fresh, when the content hasn't substantially changed, as a warning sign.

## The calendar template

A spreadsheet is enough. A project board or notes app works too if you already use one, but you don't need a dedicated tool. Four columns cover it:

- **Week:** the publishing week, or an exact date if you prefer.
- **Article and target query:** the working title plus the one query the article has to answer.
- **Cluster:** the parent topic from step 1.
- **Status:** Idea, Outlined, Drafting, Scheduled, Published, or Update.

Here's one month filled in. It's an illustrative example for a made-up houseplant blog at one article a week, with no real search data behind it.

| Week | Article and target query | Cluster | Status |
| --- | --- | --- | --- |
| 1 | How often to water a snake plant ("snake plant watering schedule") | Snake plants | Published |
| 2 | Why snake plant leaves turn yellow ("snake plant yellow leaves") | Snake plants | Drafting |
| 3 | Snake plant care for beginners, the pillar ("snake plant care") | Snake plants | Outlined |
| 4 | Update: refresh the oldest post and add links to the pillar | Snake plants | Update |

If you work on a wider screen, two extra columns earn their place: "links to add" and "notes". Keep everything else, such as search volume and competitor URLs, in your keyword sheet so the calendar stays readable.

## How far ahead to plan

Plan about three months in detail and keep the rest as an ordered backlog. A year-long plan is useful only as a rough sequence of clusters, because the specifics will change once you can see which articles get impressions in Google Search Console.

At the end of each quarter, spend an hour on it. Move unfinished rows forward, drop topics that no longer fit, and check whether you hit your pace. If you missed it two months running, lower the pace before you add anything new.

## Start with one cluster

Don't schedule the whole keyword list. Pick the cluster with the easiest queries, fill in four to six weeks using the template above, and publish the first row. When you sit down to write it, a [repeatable framework for drafting articles](/guide/fast-article-writing-framework-2026) will help you keep the pace you just set.
`
  },
  {
    id: 'post-blog-8',
    title: 'Imposter Syndrome as a New Blogger: What Actually Helps',
    slug: 'overcome-imposter-syndrome-creators',
    excerpt: 'You don\'t need to feel like an expert to publish. Write from what you\'ve done, say what you haven\'t tested, and let the evidence build.',
    category: 'Blogging',
    tags: ['Creator Mindset', 'Imposter Syndrome', 'Publishing Confidence'],
    coverImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-06-24',
    updatedAt: '2026-10-03',
    readTimeMinutes: 5,
    difficulty: 'Beginner',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['imposter syndrome as a new blogger', 'imposter syndrome for creators', 'who am I to write about this', 'is imposter syndrome a diagnosis', 'how to blog when you\'re not an expert', 'fear of publishing blog posts'],
    metaDescription: 'Feel like a fraud publishing your first posts? What imposter syndrome is, how to tell useful doubt from noise, and honest ways to write anyway.',
    keyTakeaways: [
      'Ask what specifically would make the post ready. If you can name a gap, fix it; if you can\'t, publish.',
      'Claim only what\'s true: write from what you\'ve done or learned and say what you haven\'t tested.',
      'Narrow the topic until it\'s something you know completely, and publish small posts.',
      'Save reader replies and compare new posts with your own earlier ones, not with established creators.',
      'Persistent anxiety or low mood that affects daily life is worth raising with a doctor or mental-health professional.',
    ],
    content: `
If you've got a draft sitting unpublished because a voice keeps asking "who am I to write about this?", you're dealing with what most people call imposter syndrome. It's a normal reaction to putting your name on something public, and it doesn't mean you should stop.

The short answer: you don't have to feel like an expert before you publish, and you shouldn't pretend to be one. Write about what you've actually done or learned, say plainly what you have and haven't tested, and let the feeling shrink as your published work and your readers' replies pile up. Trying to argue yourself into confidence first rarely works, because there's nothing yet for the confidence to rest on.

## What imposter syndrome is, and what it isn't

The idea has a specific origin. Psychologists Pauline Clance and Suzanne Imes described the "impostor phenomenon" in a 1978 paper about high-achieving women who, despite real accomplishments, believed they weren't actually capable and had fooled the people around them. The term has since been used far more broadly than that original group.

Two things are worth knowing about it. First, it isn't a clinical diagnosis. It's [not listed as a disorder in the DSM-5 or the ICD-10](https://link.springer.com/article/10.1186/s43045-025-00512-2), the manuals clinicians use; it's a name for a pattern of thoughts. Second, the original idea describes people whose doubt doesn't match their track record. A new blogger is in a slightly different spot: you don't have a track record yet, so some of your doubt is simply accurate. That's fine, and it changes what you should do about it.

## Check whether the doubt is pointing at something real

Before you treat the feeling as noise, ask what, specifically, you'd need to do to feel ready to publish this post.

If you can name it, do it. Maybe there's a claim you haven't checked, a step you described but never tried, or a section you paraphrased from someone else without really understanding it. That kind of doubt is useful. It's your judgment telling you the post isn't finished.

If you can't name anything, and the post is accurate and honest about what you know, then more research won't help. You'll just keep polishing a draft that was ready a week ago. Publish it.

## "Who am I to write about this?" has a practical answer

Most advice treats this question as a confidence problem. I think it's better treated as a question about what you're claiming.

You feel like a fraud when the post implies more than you can back up. So close that gap from the other side: claim only what's true.

- **Write from what you've done or learned.** "Here's how I set up my first blog and what confused me" is a post you're fully qualified to write. "The definitive guide to blogging" isn't, yet.
- **Say what you have and haven't tested.** If you compared two tools by reading their documentation rather than using both, say so. Readers can work with that. What they can't work with is a confident recommendation that turns out to be a guess.
- **Document instead of posing.** A record of what you tried, what happened and what you'd do differently is useful to the person one step behind you, and it doesn't require you to be an authority.
- **Be honest about your level.** One line is enough: how long you've been doing this and where your information comes from. Don't inflate it, and don't bury the post in apologies either.

This is the ethical way to write, and it also lines up with what Google asks for. Its [guidance on helpful, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) asks whether a page shows "first-hand expertise and a depth of knowledge", giving the example of having actually used a product or visited a place, and says that of experience, expertise, authoritativeness and trust, "trust is most important." A modest post that's accurate about its own limits fits that better than one that performs expertise. It's also harder to copy, which matters more now that generic articles are cheap to produce; the guide to [what makes a site hard to replace with AI-written content](/guide/building-a-moat-in-the-age-of-ai) goes into that.

## Habits that make the feeling quieter over time

None of these make the doubt disappear. They give you evidence, and evidence is what the feeling responds to.

**Publish small.** A 600-word post answering one narrow question is easier to get right and easier to stand behind than a giant guide. If structure is what slows you down, a [repeatable writing framework](/guide/fast-article-writing-framework-2026) takes some of the decisions off your plate.

**Narrow the topic until you do know it.** "Email marketing" is too big for anyone to feel sure about. "How I set up a welcome email for a brand-new list" is something you can know completely. Narrow topics are also where a new site has a realistic chance of being found, so this pairs well with [looking for low-competition keywords](/guide/zero-competition-keyword-research-guide).

**Keep a record of reader replies.** Save the comments, emails and messages where someone says a post helped, in a folder or a note. It's easy to wave these off when they arrive and forget them a week later. Reading back through actual words from actual readers is more convincing than telling yourself you're doing fine.

**Compare yourself to your own earlier work.** The creators you follow are showing you their best work from years in. Your first ten posts next to their last ten isn't a fair comparison. Your tenth post next to your first one is, and it usually shows progress you hadn't noticed.

**Fix mistakes in the open.** You will get something wrong eventually. Correct it, note the update, and move on. Knowing you'll handle errors that way takes some of the pressure off getting every post perfect.

Expect the feeling to come back when you try something new, such as a different topic, a first video or a first paid product. The same approach applies there.

## When it's more than nerves about publishing

Ordinary self-doubt about a new blog is uncomfortable but manageable. If anxiety or low mood is persistent, or it's getting in the way of sleep, work or daily life beyond your blog, please talk to a doctor or a mental-health professional. That's a sensible thing to do, and an article about blogging can't stand in for it.

## Start with one small, honest post

You don't need to settle whether you're "qualified" in general. Pick one narrow thing you've done or learned, write it up with your limits stated, and publish it. If you haven't set up a site yet, the [step-by-step guide to starting a blog](/guide/how-to-start-a-profitable-blog-2026) covers that part.
`
  },
  {
    id: 'post-blog-9',
    title: 'Guest Posting for Backlinks: What Still Works Safely',
    slug: 'guest-posting-strategy-backlinks-traffic',
    excerpt: 'Guest posting still works for reaching readers, not for collecting links. Where Google draws the line, how to vet a site, and a pitch email you can copy.',
    category: 'Blogging',
    tags: ['Guest Posting', 'Link Building', 'Backlinks', 'Outreach'],
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-06-19',
    updatedAt: '2026-10-03',
    readTimeMinutes: 8,
    difficulty: 'Intermediate',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['guest posting for backlinks', 'does guest posting still work', 'is guest posting against Google\'s guidelines', 'how to find sites that accept guest posts', 'guest post pitch email template', 'is it OK to pay for a guest post'],
    metaDescription: 'What Google\'s link spam policy says about guest posts, how to pick sites worth writing for, a short pitch email to copy, and what results to expect.',
    keyTakeaways: [
      'Guest post to reach a relevant audience; treat any link as a byproduct, not the goal.',
      'Don\'t pay for followed links or trade links for publication. Paid or exchanged links need rel="sponsored" or rel="nofollow".',
      'Use your name or site name as anchor text and keep the main link in an honest author bio.',
      'Vet a site by reading it: one topic, real editing, signs of readers, no price list for links. Ignore DA/DR cut-offs.',
      'Expect referral visitors and editor relationships more than a ranking change.',
    ],
    content: `
Guest posting still works if what you want is readers. Writing a useful article for a site your audience already reads puts your name in front of them, sends some of them your way, and can start a working relationship with an editor.

It doesn't work as a link machine. Placing lots of articles on other sites mainly to collect keyword-anchored links is link spam under Google's rules, and so is paying for a link that passes ranking credit. If you treat the link as a small byproduct and the audience as the goal, you stay on the right side of the line.

## Where Google draws the line

[Google's spam policies](https://developers.google.com/search/docs/essentials/spam-policies) define link spam as creating links "primarily for the purpose of manipulating search rankings." The examples on that page that touch guest posting are:

- Exchanging money, goods or services for links, or for posts that contain links.
- Excessive link exchanges ("Link to me and I'll link to you").
- Advertorials or native advertising where payment is received for articles with links that pass ranking credit.
- Links with optimized anchor text in articles, guest posts or press releases distributed on other sites.

Paid placements aren't banned. The same page says buying and selling links is a normal part of advertising and sponsorship, and that it isn't a violation as long as those links carry a rel="sponsored" or rel="nofollow" attribute. Google's guide to [qualifying outbound links](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links) explains the attributes. So a sponsored post is fine when it's labelled as one and its links are qualified. A paid post dressed up as an editorial one, with a normal followed link, is the violation.

There's a second policy that matters more to the site hosting you. "Site reputation abuse" covers third-party content published on a host site mainly because of that host's already-established ranking signals. Google lists ordinary editorial pieces and properly disclosed native advertising as things that are not abuse. A real publication running your article for its own readers is fine. A site that rents out its domain to anyone with a keyword to rank is the target of that policy, and it isn't somewhere you want your name.

Google says sites that violate these policies may rank lower or not appear at all, and that it enforces them through automated systems and human review, which can end in a manual action.

In practice that leaves a short list of rules:

1. Write only for sites whose readers overlap with yours.
2. Don't pay for a followed link, and don't trade links as the price of publication.
3. Link to yourself the way you'd link to anyone: your name or site name in the bio, and a plain descriptive link in the body only if it helps the host's reader.
4. Accept whatever link attribute the host uses. Many sites nofollow contributor links, and people can still click them.
5. Keep it occasional. A handful of good articles a year is a writing habit. Dozens of near-identical ones is a campaign.

## How to find sites worth writing for

Start with the sites you already read in your niche and the newsletters you actually open. You know their audience and tone, and you can tell whether your idea would fit.

Then look at where people in your field have been published. Search a writer's name in quotes along with a phrase like "guest post" or "contributor", and check the "as seen in" lines on their about pages. That gives you a list of sites that take outside writers and already publish your subject.

Check for a contributor or submissions page, usually linked in the footer. If there isn't one, an email to the editor is still reasonable for a site that clearly runs bylined outside pieces.

I'd skip searching for "write for us" plus your keyword. Those results lean heavily towards sites that exist to publish guest posts, and that's the group you're trying to avoid.

## How to judge a site before you pitch

Ten minutes of reading the site is enough. These are the things to look for.

| Check | Good sign | Walk away if |
| --- | --- | --- |
| Topic focus | One subject area, covered consistently | Casino, crypto, plumbing and pet posts side by side |
| Who writes | Named staff or regular authors, with bios | Nearly every post is by a different one-off guest |
| Editing | Guidelines that ask for quality; editors request changes | "Publish within 24 hours", no edits |
| Audience | Comments, a newsletter, active social accounts | No sign anyone reads it |
| Money | No fee, or a clearly labelled sponsored option | A price list for "dofollow" links |
| Outbound links | Links that help the reader | Keyword-anchored links to unrelated businesses in most posts |

A note on authority scores. Domain Authority, Domain Rating and similar numbers are estimates made by SEO tool companies, and Google doesn't use them. There's no score that makes a site worth writing for, and link sellers like to quote them, and they can be gamed. Use them as a rough hint at most, and trust what you see on the site.

One more test I find useful: if this site put a nofollow on your link, would you still want to write for it? If yes, it's a good target. If the answer is no, the link was the only reason you were there.

## A pitch email you can copy

Editors get a lot of pitches, and most are obviously mass-mailed. Yours needs to show that you read the site, offer one specific idea, and be easy to answer. Keep it under 150 words or so.

> Subject: Pitch: [working headline]

> Hi [editor's first name],

> I've been reading [site] for a while, and your piece on [specific article] made me think about [the gap or follow-up question it left open].

> I'd like to write "[working headline]" for your readers. It would cover [point one], [point two] and [point three], with [a worked example, screenshots or data you actually have].

> I write about [topic] at [your site]. Two recent pieces: [link] and [link].

> If it's not a fit, no problem. I can send an outline or a full draft, whichever you prefer.

> Thanks, [your name]

Before you send it, read the site's guidelines and follow them to the letter, including word count and format. Confirm they haven't already published your idea. Send one polite follow-up after a week or so, then let it go. If you pitch brands as well as editors, the same structure works for [asking a company for a direct affiliate deal](/guide/find-direct-brand-affiliate-deals).

## What to write once you get a yes

Write the article for their readers, at the depth and in the tone the site already uses. Bring something they don't have yet: a process you can explain step by step, an example, or a point of view on a question their existing posts leave open. If you tend to stall on drafts, a [repeatable structure for writing articles](/guide/fast-article-writing-framework-2026) helps you deliver on time, and editors notice who does.

Give them original work. Don't send the same article to several sites, and don't hand over a reworded copy of something already on your blog.

Link to their relevant articles and to good outside sources. Link to your own site in the body only if a reader would want that page at that moment, and use plain anchor text such as your site name or a description of what's there. Exact-match keyword anchors are the pattern Google's policy names.

Your author bio is where the honest link goes: who you are, what you write about, and where to find you. Point it at the page a new reader should see first, which is often a strong guide or your newsletter signup, not your homepage.

If money, a free product or a link swap is part of the arrangement, tell the editor it should be labelled and the links qualified. On your own site, paid relationships also need a clear disclosure for readers, which is covered in the guide to [writing an affiliate disclosure that meets FTC rules](/guide/affiliate-disclosure-ftc-compliance-guide).

## What to expect from a guest post

Expect a burst of visitors from that site in the first days, and then a trickle for as long as the article keeps getting read. How many depends on the host's audience and how well your topic matches it. Some posts send very few. Check your analytics for referral visits from that domain, and look at what those visitors did after they arrived.

Don't expect a ranking jump. Google doesn't say how much weight any single link carries, a nofollowed link is one you've asked it not to count, and no one can promise a result from one article. If your pages aren't ranking, the work on your own site matters far more: covering your topic thoroughly enough to [build topical authority](/guide/topical-authority-case-study) and fixing the basics in the [SEO checklist](/guide/2026-practical-seo-checklist).

The benefit that lasts is the relationship. Share the piece, answer the comments, and thank the editor. A second article for the same site is easier to land than the first, and editors who trust you tend to mention you to others.

### Is it OK to pay for a guest post?

You can pay for a sponsored post, but it has to be labelled as sponsored and its links need rel="sponsored" or rel="nofollow". Paying for a followed link breaks Google's policy, and both sites carry the risk. A site that sells followed links to you is selling them to everyone else too.

### Should I accept guest posts on my own site?

Only ones you'd have been glad to publish with no link in them. Edit them like your own work, qualify any link that involves payment or a swap, and turn down the "we'll pay for a dofollow post" emails. Once your site is filling up with unrelated third-party articles, it's the kind of host the site reputation abuse policy describes.

## Start with one site

Pick one site you already read, find the gap in what it has published, and send one specific pitch this week. If the readers who come back with you land on a blog that's thin, fix that first with the [step-by-step guide to starting a blog that can make money](/guide/how-to-start-a-profitable-blog-2026).
`
  },
  {
    id: 'post-blog-10',
    title: 'Free Blog Images: Where to Get Them and Stay Legal',
    slug: 'free-blog-graphics-and-photography-guide',
    excerpt: 'Where to find free images you can legally use on a blog that earns money, how to make simple graphics of your own, and how to keep images from slowing your pages.',
    category: 'Blogging',
    tags: ['Visual Design', 'Graphics', 'Canva', 'Blogging Tools'],
    coverImage: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fm=webp&fit=crop&w=1200&q=80',
    author: {
      name: 'Jay Lopez',
      role: 'Founder & Lead Strategist',
      avatar: '',
    },
    publishedAt: '2026-06-14',
    updatedAt: '2026-10-03',
    readTimeMinutes: 8,
    difficulty: 'Beginner',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['free images for blog', 'can I use Unsplash photos on a commercial blog', 'Pexels and Pixabay license restrictions', 'Creative Commons licenses explained for bloggers', 'can I use images from Google Images on my blog', 'can I use AI-generated images on my blog', 'blog image alt text and WebP optimisation'],
    metaDescription: 'What the Unsplash, Pexels, Pixabay and Creative Commons licenses allow on a monetised blog, plus how to make your own graphics and optimize images.',
    keyTakeaways: [
      'Unsplash, Pexels and Pixabay allow commercial use without attribution, but each has limits, so read the license page before relying on it.',
      'A free-photo license doesn\'t clear the people, logos or trademarks shown in the picture, so avoid using them in ways that imply endorsement.',
      'Don\'t copy images from Google Images or other sites, and skip Creative Commons NC images on a blog that earns money.',
      'Charts, annotated screenshots and simple diagrams you make yourself add more to a post than generic stock photos.',
      'Use descriptive file names and alt text, resize and compress, export WebP or AVIF, set width and height, and lazy-load only images below the fold.',
    ],
    content: `
You can illustrate a blog for nothing. Unsplash, Pexels and Pixabay all let you use their photos on a commercial site without paying or crediting anyone, and a free design tool plus your own screenshots will cover most of the rest.

The part people get wrong is the license. "Free to download" and "free to use on a blog that earns money" are different things, and an image copied from a Google search is usually neither. So this guide starts with what each free source actually allows, then covers how to make simple graphics of your own and how to stop images slowing your pages down.

One caveat first: this is a plain-English summary, not legal advice, and licenses change. Everything below reflects each site's own license page at the time of writing. Read the page yourself before you rely on it.

## Where free blog images are safe to get

Three big libraries have similar terms. All three allow commercial use and none requires attribution, though each says credit is appreciated.

| Source | What's allowed | Main limits |
| --- | --- | --- |
| Unsplash | Download, modify and use, including commercially | No compiling its images into a similar or competing service |
| Pexels | Use and modify for free | No selling unaltered copies, no reselling on other stock sites |
| Pixabay | Use and modify for free | No selling or distributing the content on its own, unchanged |

The [Unsplash license](https://unsplash.com/license) is the shortest. It grants a broad right to use images for free, commercial purposes included, and carves out one thing: building a competing image service from them. Unsplash's help pages add that it doesn't offer a license for selling prints or products with its images printed on them. Images marked Unsplash+ are a paid tier with a separate license.

The [Pexels license](https://www.pexels.com/license/) spells out more. You can't sell unaltered copies (as a poster or print, say), you can't redistribute the photos on other stock or wallpaper platforms, identifiable people can't be shown in a bad light or offensively, and you can't imply that the people or brands in a photo endorse your product.

Pixabay's [content license summary](https://pixabay.com/service/license-summary/) is similar: no selling the content standalone, no misleading use, and no commercial use of images showing recognizable trademarks, logos or brands in connection with goods and services.

### What these licenses don't cover

They cover the photographer's copyright. They don't clear the rights of whoever or whatever is in the picture.

Unsplash says this directly in its help centre: recognizable people have rights over commercial use of their likeness, a logo on someone's T-shirt may be trademarked, and it can't guarantee every upload has a model release. For a blog, that means a photo of a stranger is fine as general illustration and a bad choice next to "this is who uses our product" or a sensitive topic like debt or illness. If a photo features a visible brand, pick a different one.

It's also worth saving the image's page URL and the download date somewhere. If a photo is later removed or the terms change, you'll have a record of where it came from.

## Creative Commons in one minute

Plenty of images on Wikimedia Commons, Flickr and elsewhere carry a [Creative Commons license](https://creativecommons.org/share-your-work/cclicenses/). The letters tell you what you can do:

- **CC0:** the creator has waived their rights. No credit needed.
- **BY:** you must credit the creator. CC BY allows commercial use and editing.
- **SA:** if you adapt it, you share your version under the same terms.
- **NC:** non-commercial use only. Creative Commons defines that as not primarily intended for commercial advantage or monetary compensation.
- **ND:** no adaptations. Use it as it is.

For a blog that runs ads or affiliate links, I'd avoid NC images altogether. Whether a monetised blog counts as non-commercial is exactly the argument you don't want to have. ND is a problem too if you plan to add text or combine the image into a graphic, because that goes beyond using it unchanged.

When credit is required, give it properly: title, creator, source link and the license name.

## Three things that aren't as safe as they look

**Images from Google Images or someone else's site.** Google shows you images; it doesn't license them. Most are copyrighted by default, and adding a "source" credit doesn't change that. The usage-rights filter helps you find licensed images, but check the license on the page that hosts the image.

**"Royalty-free."** This means you don't pay a royalty each time you use the image. It usually still means paying once for a license, and that license has its own terms.

**Screenshots of software and websites.** Tutorial and review screenshots are common practice, and in the US they're often defended as fair use. Fair use isn't a rule you can look up, though. The US Copyright Office notes that courts decide it case by case. Keep the risk low by capturing only what the reader needs, adding your own commentary, checking whether the company publishes brand or press guidelines, and blurring anyone's personal data.

## Using AI-generated images

AI image tools are a reasonable option for abstract or decorative images, with three checks.

Read the tool's terms for commercial use. Some plans allow it and some don't, and the terms differ between tools and between free and paid tiers.

Don't generate real people or brand logos. A convincing image of a real person raises likeness and deception problems, and a generated logo is still someone's trademark.

Don't assume you own the result. The US Copyright Office's [2025 report on AI and copyrightability](https://www.copyright.gov/ai/) concluded that AI output can be protected only where a human author has determined enough of the expressive elements, and that prompts alone don't get you there. In practice, you may not be able to stop someone copying a purely AI-generated image. Other countries treat this differently, and the law is still moving.

I'd also be honest with yourself about value. A generated "person at laptop" adds as little to an article as the stock version does.

## Make your own graphics instead of decorating with stock

The most useful image in a post is usually one nobody else has. It explains something, and it can't turn up on another site.

- **Charts from your own data.** Any spreadsheet app can produce a clean bar or line chart. Label the axes, cut the gridlines, and say where the numbers came from.
- **Annotated screenshots.** An arrow and a short label on the exact button beats a paragraph describing where to click.
- **Simple diagrams.** Boxes and arrows for a process, or a two-column comparison. Sketch it on paper first so you know what it needs to say before you open a tool.
- **Your own photos.** For reviews and hands-on tutorials, a phone photo taken near a window against a plain background is more convincing than a studio shot from a library.

For tools, Canva has a free plan with templates sized for blog and social formats, and Figma has a free Starter plan if you want more control. Both limit some features and content to paid plans, so check what's included before you build a workflow around one.

Whatever you use, pick two or three colors and one or two fonts, save a template, and reuse it. A site where the graphics share a style looks more considered than one with a different look on every post, and a template means you aren't redesigning each time. This is part of the wider set of [layout and readability choices](/guide/blog-layout-ux-reader-retention) that decide whether people keep reading.

If you share posts on Pinterest, a vertical graphic with a readable headline is worth making from the same template. The [Pinterest traffic guide](/guide/pinterest-affiliate-marketing-traffic-guide) covers pin design in more detail.

## Image SEO and page speed basics

Large, unoptimized images are one of the easiest ways to slow a page down. These steps cover most of the fix.

1. **Name the file for what it shows.** Google's own example is that \`my-new-black-kitten.jpg\` beats \`IMG00023.JPG\`.
2. **Write alt text that describes the image.** It's read aloud by screen readers and used by search engines. "Bar chart comparing monthly page views before and after a redesign" is useful. A string of keywords isn't, and [Google's image guidelines](https://developers.google.com/search/docs/appearance/google-images) warn that stuffing alt text can get a site treated as spam.
3. **Resize before you upload.** If your content column is 800 pixels wide, a 4,000-pixel photo is wasted bandwidth. Export at roughly the largest size it will display, or up to double that for sharp screens.
4. **Use a modern format.** WebP is smaller than JPEG or PNG at similar quality, and AVIF is often smaller again. Google Search indexes both.
5. **Compress.** Most design tools have a quality slider on export. Lower it until you can see the difference, then go back a step.
6. **Set width and height.** With both attributes on the image, the browser reserves the space and the text doesn't jump when the image arrives.
7. **Lazy-load images further down the page.** \`loading="lazy"\` delays off-screen images. Don't put it on the image at the top of the post, because that slows down the thing readers see first.

Many blog platforms handle some of this for you, such as resizing and lazy-loading, so check what yours already does. If the terms here are new, the [Core Web Vitals guide](/guide/core-web-vitals-optimization-guide) explains how images affect loading and layout-shift scores.

## Start with the images you already have

Go through your five most-visited posts and check where each image came from. Replace anything you can't trace to a license, swap one decorative stock photo for a chart or annotated screenshot, and fix the file names and alt text while you're there. To look at the rest of the page at the same time, the [one-hour SEO audit](/guide/diy-seo-audit-1-hour-guide) is the natural next step.
`
  }
];
