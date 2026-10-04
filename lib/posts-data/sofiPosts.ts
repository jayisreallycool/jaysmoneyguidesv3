import { BlogPost } from '../types';

/**
 * SoFi Bank category — affiliate content.
 *
 * COMPLIANCE (per SoFi Referral Program Official Rules + FTC):
 *  - Each article carries a clear, conspicuous affiliate/material-connection
 *    disclosure stating the specific benefit the author receives.
 *  - No specific interest rates, APYs, or fees are stated — SoFi prohibits this
 *    and rates change; readers are directed to SoFi's official pages instead.
 *  - No "guaranteed approval" / "best rates" / outcome guarantees.
 *  - "See official rules" is linked wherever the referral bonus is mentioned.
 *  - External links render with rel="nofollow sponsored" automatically via the
 *    post renderer.
 *
 * Affiliate/referral links (the author's real invite links):
 *  personal loans   : https://www.sofi.com/invite/personal-loans?gcp=f694b62f-0bd0-46e4-8489-13fa4dbe2d57&isAliasGcp=false&siid=2c10d514-bead-4026-a011-aa5f1593513b
 *  student refi     : https://www.sofi.com/invite/student-loans?gcp=10cf9c52-9d29-43fe-9672-491f50ebbe13&isAliasGcp=false&siid=4986fd59-30ed-45d7-83d8-cb2f324faa87
 *  medical refi     : https://www.sofi.com/invite/medical-student-loans?gcp=15f11045-eed3-480b-816d-69a83f2cd79b&isAliasGcp=false&siid=c8eca57f-268c-44cd-85ef-f962aa1da6e1
 *  private student  : https://www.sofi.com/invite/private-student-loans?gcp=ddf331f3-ccfb-49e6-92b9-58f7877a7342&isAliasGcp=false&siid=10afddd8-1ecd-4672-9b52-5495e8eec6b7
 *  money (referral) : https://www.sofi.com/invite/money?gcp=cbb90c63-c9ec-487c-a425-bb95feac5201&isAliasGcp=false&siid=c0a81ea2-40c9-4fcc-9a3a-9a54766f7012
 */

const DISCLOSURE = `> **Advertising disclosure:** This article contains SoFi referral links. If you open an eligible SoFi product through them, I may receive a referral bonus at no extra cost to you — and in some cases you may receive a welcome bonus too. I only share products I think are worth a look, but I'm not a financial advisor and this isn't financial advice. Rates, fees, and terms change and are set by SoFi, not me — always confirm the current details on SoFi's official pages before applying.`;

const AUTHOR = {
  name: 'Jay Lopez',
  role: 'Founder & Lead Strategist',
  avatar: '',
};

const PERSONAL = 'https://www.sofi.com/invite/personal-loans?gcp=f694b62f-0bd0-46e4-8489-13fa4dbe2d57&isAliasGcp=false&siid=2c10d514-bead-4026-a011-aa5f1593513b';
const STUDENT_REFI = 'https://www.sofi.com/invite/student-loans?gcp=10cf9c52-9d29-43fe-9672-491f50ebbe13&isAliasGcp=false&siid=4986fd59-30ed-45d7-83d8-cb2f324faa87';
const MEDICAL = 'https://www.sofi.com/invite/medical-student-loans?gcp=15f11045-eed3-480b-816d-69a83f2cd79b&isAliasGcp=false&siid=c8eca57f-268c-44cd-85ef-f962aa1da6e1';
const PRIVATE = 'https://www.sofi.com/invite/private-student-loans?gcp=ddf331f3-ccfb-49e6-92b9-58f7877a7342&isAliasGcp=false&siid=10afddd8-1ecd-4672-9b52-5495e8eec6b7';
const MONEY = 'https://www.sofi.com/invite/money?gcp=cbb90c63-c9ec-487c-a425-bb95feac5201&isAliasGcp=false&siid=c0a81ea2-40c9-4fcc-9a3a-9a54766f7012';
const RULES = 'https://www.sofi.com/referral-program/?hidenav=once#official-rules';

export const SOFI_POSTS: BlogPost[] = [
  // ============================ 1. PERSONAL LOANS ============================
  {
    id: 'post-sofi-1',
    title: 'SoFi Personal Loans: Who They Suit and What to Compare',
    slug: 'sofi-personal-loans-guide',
    excerpt: 'Who a personal loan suits, when consolidating card debt saves money, and how to compare a SoFi offer with other lenders before you apply.',
    category: 'SoFi Bank',
    tags: ['SoFi', 'Personal Loans', 'Debt Consolidation', 'Personal Finance'],
    coverImage: '/images/sofi/personal-loans.svg',
    author: AUTHOR,
    publishedAt: '2026-08-30',
    updatedAt: '2026-10-03',
    readTimeMinutes: 7,
    difficulty: 'Beginner',
    featured: true,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['sofi personal loans', 'is a sofi personal loan a good idea', 'should i get a personal loan to consolidate debt', 'does checking your rate with sofi affect your credit', 'what to compare between personal loan lenders', 'alternatives to a debt consolidation loan'],
    metaDescription: 'When a SoFi personal loan makes sense for consolidating card debt, when it backfires, and what to compare with other lenders before you apply.',
    keyTakeaways: [
      'A personal loan fits a one-time need and a stable income. It doesn\'t fix spending that runs ahead of income.',
      'Consolidation only saves money if the APR is lower than your cards\' and the term doesn\'t stretch the total cost.',
      'Compare lenders on APR, fees, term and total cost, using the same amount and term for each quote.',
      'Checking your rate with SoFi is a soft credit pull; continuing with the application triggers a hard pull.',
      'Decide what happens to the paid-off cards before you sign, so the balances don\'t come back.',
    ],
    content: `
${DISCLOSURE}

A personal loan is worth considering if you have a specific, one-time need and a steady income that covers the payment with room to spare. The most common case is paying off credit card balances at a lower rate. It's a poor fit if your monthly spending already runs ahead of your income, because the loan adds a fixed bill without changing why the balances built up.

SoFi is one lender worth getting a quote from. It offers fixed-rate, unsecured personal loans from $5,000 to $100,000, and you can see an estimated rate before you apply without affecting your credit score. Whether its offer is a good one depends on how it compares with what you're paying now and with what other lenders quote you. Most of this guide is about making that comparison.

I'm not going to quote rates or fees. They change, they depend on your credit and income, and SoFi's affiliate rules don't allow it. [SoFi's personal loan page](${PERSONAL}) has the current terms.

## Who a personal loan suits, and who it doesn't

With a personal loan you get a lump sum up front and repay it in fixed monthly payments over a set number of years. The Consumer Financial Protection Bureau describes it as a [closed-end loan](https://www.consumerfinance.gov/ask-cfpb/what-is-a-personal-installment-loan-en-2114/): unlike a credit card, you can't borrow against it again as you pay it down. That fixed end date is the main thing it has going for it.

It tends to suit you if:

- You're carrying card balances at a high rate and can qualify for a loan rate that's clearly lower.
- You have a large, necessary expense, such as a repair or a medical bill, that would otherwise go on a card.
- Your income is stable enough that the payment is manageable even in a tight month.

It tends not to suit you if:

- You'd be borrowing to cover ordinary monthly bills. The shortfall will still be there next month, plus a loan payment.
- The rate you're offered isn't lower than what your cards charge. Then you're paying for tidiness, and one due date isn't worth much on its own.
- You need less than $5,000, which is SoFi's minimum. A credit union or a smaller lender is the place to look.
- The debt you want to deal with is student loans. That's a different product with its own trade-offs, especially for federal loans, and I cover it in the [guide to refinancing student loans with SoFi](/guide/sofi-student-loan-refinancing-guide).

## When consolidating card debt helps

Consolidation saves money when two things are true. The loan's APR is lower than the rate you're paying across your cards, and the term isn't so long that the extra months of interest cancel out the lower rate.

The second one is easy to miss. The CFPB's [page on consolidating credit card debt](https://www.consumerfinance.gov/ask-cfpb/what-do-i-need-to-know-if-im-thinking-about-consolidating-my-credit-card-debt-en-1861/) puts it this way: "Although your monthly payment might be lower, it may be because you're paying over a longer time." A smaller payment can still mean a bigger total.

So do the arithmetic before you compare anything else. Add up your card balances and note each card's APR. For any loan offer, multiply the monthly payment by the number of months and add any fee. Then compare that with what you'd pay if you put the same monthly amount toward the cards. If the loan total isn't clearly lower, the loan isn't doing much for you.

SoFi can also send loan money straight to your card issuers rather than to your bank account. If you know you'd be tempted to spend part of a lump sum, that's a useful option to pick.

## When it backfires

The usual way a consolidation loan goes wrong: the loan pays off the cards, the cards now show zero balances and full credit lines, and over the next year the balances creep back. Now there's a loan payment and card debt.

The CFPB is blunt about this: "Taking on new debt to pay off old debt may just be kicking the can down the road." A loan changes the interest rate and the schedule. It doesn't change the spending that produced the balances.

If you consolidate, decide what happens to the cards before you sign. Take them out of your wallet and delete them from the shopping sites where they're saved. I'd also work out what was going on the cards in the first place, because if it was groceries and gas, the fix is in the budget and the loan is only a cheaper way to carry the old balance.

The other ways it backfires are in the loan itself: a fee large enough to eat the interest savings, or a long term chosen for the low payment.

## What to compare between lenders

Get quotes from at least two or three lenders, and include a credit union if you belong to one. Compare the same loan amount and the same term across all of them.

| What to compare | Why it matters |
| --- | --- |
| APR | The yearly cost including the interest rate and any origination fee. Compare APRs, not interest rates. |
| Fees | Origination and late fees. Also ask whether paying early costs anything. |
| Term | Longer means a lower payment and more interest overall. |
| Total cost | Payment times months, plus fees. This is the number to decide on. |

One SoFi detail to check on your own offer. SoFi's disclosures describe an origination fee that depends on the offer you choose. It can be zero, and when there is one it's deducted from the money you receive. That matters for consolidation: if you need a specific amount to clear your cards and a fee comes out of the proceeds, you'll land short unless you borrow a little more. Read the offer screen and the loan agreement for the fee, the late-payment terms and the prepayment terms before you accept.

On term, I'd take the shortest one with a payment you can make comfortably in a bad month, and no shorter.

## Checking your rate is different from applying

These are two steps, and only the second one touches your credit.

When you check your rate, SoFi does a soft credit pull, which doesn't affect your credit score. You see estimated rates and terms based on what you entered. If you pick one of those options and continue with the application, SoFi requests your full credit report. That's a hard pull, and SoFi says it may affect your credit.

That means you can collect estimates from several lenders at no cost to your score, as long as each one uses a soft pull for its rate check. Confirm that on each lender's site before you enter anything. An estimate also isn't an approval. The final offer comes after the full application.

**[Check your rate on a SoFi personal loan](${PERSONAL})**

A side note, since it comes up: SoFi runs a referral program on some of its products. It shouldn't be a reason to borrow. If you're curious anyway, I explain it in the [guide to how SoFi referral bonuses work](/guide/sofi-referral-bonus-guide), and the [official rules](${RULES}) have the current terms.

## Alternatives worth a look first

A personal loan is one of several ways to deal with card debt, and for some people another one is cheaper.

- **A balance transfer card.** These offer a low or zero promotional rate. The CFPB notes the promotional rate lasts a limited time and that you'll usually pay a transfer fee. It works if you can clear the balance inside the promotional window.
- **Calling your card issuers.** Ask for a lower rate or a payment plan. It costs a phone call.
- **Nonprofit credit counseling.** A counselor can set up a debt management plan, which the CFPB says typically lowers your monthly payments, interest charges and fees. Ask for the fees in writing first.
- **A home equity loan.** The rate may be lower, but the debt is then secured by your house and you could lose it in foreclosure if you can't pay. Closing costs add up too.
- **No new loan at all.** If the balances are small enough to clear in a year or so, putting every spare dollar on the highest-rate card first may cost less than a loan with a fee.

Be wary of companies advertising consolidation that turn out to be debt settlement firms charging upfront fees. The CFPB warns about these specifically.

## Start with numbers you already have

Before you ask any lender for a quote, write down your card balances, their APRs and the payment you could make every month without strain. With those three things in front of you, a loan offer is easy to judge: either its total cost beats what you have now, or it doesn't. If you're not sure what payment is realistic, set up a budget first, and the [50/30/20 approach to managing cash flow](/guide/manage-cash-flow-solo-founder-50-30-20-rule) is a simple place to begin.

*This article is general education, not personal financial advice. Approval and terms depend on your own credit, income and other factors the lender reviews.*
`,
  },

  // ========================= 2. STUDENT LOAN REFINANCE ======================
  {
    id: 'post-sofi-2',
    title: 'Should You Refinance Student Loans With SoFi?',
    slug: 'sofi-student-loan-refinancing-guide',
    excerpt: 'Refinancing private loans is mostly a math question. Refinancing federal loans means giving up federal protections for good. Here\'s how to decide.',
    category: 'SoFi Bank',
    tags: ['SoFi', 'Student Loans', 'Refinancing', 'Personal Finance'],
    coverImage: '/images/sofi/student-refi.svg',
    author: AUTHOR,
    publishedAt: '2026-08-30',
    updatedAt: '2026-10-03',
    readTimeMinutes: 5,
    difficulty: 'Beginner',
    featured: true,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['sofi student loan refinance', 'should I refinance my student loans', 'refinance federal student loans into private loan', 'what do you lose when you refinance federal student loans', 'is now a good time to refinance student loans', 'how to compare student loan refinance offers'],
    metaDescription: 'What refinancing student loans with SoFi involves, the federal benefits you permanently give up, and how to tell whether it fits your situation.',
    keyTakeaways: [
      'Check which of your loans are federal and which are private before anything else; your studentaid.gov account lists the federal ones.',
      'Refinancing a federal loan into a private loan permanently ends access to income-driven repayment, forgiveness programs such as PSLF, and federal deferment and forbearance.',
      'Federal repayment plans are changing, so look up the plans available on your own loans at studentaid.gov before comparing a private offer.',
      'Compare total cost over the loan, rate type, fees and hardship options, and get a quote from more than one lender.',
      'If you only want one payment on federal loans, a federal Direct Consolidation Loan does that without leaving the federal system.',
    ],
    content: `
${DISCLOSURE}

Refinancing student loans means a private lender pays off your current loans and gives you one new private loan. Whether that's a good move depends far more on what kind of loans you have than on what interest rates are doing this month.

If your loans are **private**, refinancing is mostly a math question: can you get a lower rate or a term that suits you better? If your loans are **federal**, it's a much bigger decision, because you'd be leaving the federal system for good.

This is general education, not personal financial advice. I also won't quote SoFi's rates or fees here. They change, and they depend on your credit and income, so the only numbers worth looking at are the ones SoFi shows you.

## What you give up when you refinance federal loans

Federal Student Aid puts it bluntly: refinancing federal loans with a private lender ["would take your student loans out of the federal student aid system and would result in a loss of benefits"](https://studentaid.gov/articles/financial-aid-dictionary/). The Consumer Financial Protection Bureau adds that [the switch can't be reversed](https://www.consumerfinance.gov/ask-cfpb/should-i-consolidate-refinance-student-loans-en-561/). Once a federal loan becomes a private loan, it stays private.

Here's what goes away:

- **Income-driven repayment.** Federal plans can set your payment based on your income and family size. A private loan has a fixed schedule, whatever you earn.
- **Forgiveness programs.** Public Service Loan Forgiveness, teacher loan forgiveness and the forgiveness built into income-driven plans only apply to federal loans. Payments you've already made toward them stop counting.
- **Federal deferment and forbearance.** These let eligible borrowers pause or reduce payments during unemployment, hardship or a return to school. Private lenders set their own hardship policies, and they're usually narrower.
- **Discharge protections.** Federal loans are discharged if the borrower dies or becomes totally and permanently disabled. Many private lenders don't offer the same thing, so read the loan agreement.

Two smaller points from the CFPB are worth knowing. Most federal loans carry fixed rates, so moving to a variable-rate private loan means your rate could climb above what you started with. And active-duty servicemembers who refinance while serving lose the interest-rate cap that applies to loans taken out before service.

## Federal repayment rules are changing

Federal repayment has been rewritten over the past year, which makes it harder to know exactly what you'd be giving up. As of Federal Student Aid's [August 2026 income-driven repayment FAQ](https://studentaid.gov/articles/faqs-idr-plan/), the SAVE plan has ended under a court order, a new Repayment Assistance Plan (RAP) is available, Income-Based Repayment continues, and the PAYE and ICR plans are set to be retired by July 1, 2028.

More details may shift, and which plans you can use depends partly on when you borrowed. Before you compare a private offer against "staying federal", log in to studentaid.gov and look at the plans and estimated payments available on your actual loans today. Don't rely on an article, including this one, for that part.

## Who refinancing tends to fit

Refinancing private loans is the simple case. They never had federal protections, so if a new loan costs less overall and you're comfortable with the lender, there's little to lose.

For federal loans, I'd only consider it if all of these are true:

- Your income is stable and you could keep paying through a few rough months from savings.
- You don't work for a government or nonprofit employer and aren't counting on any forgiveness program.
- The payment on a standard plan is comfortable, so you aren't relying on an income-based payment.
- The new rate is lower by enough to matter over the life of the loan.

If you're unsure about any of them, keep the federal loans federal. You can also split the decision: refinance your private loans and leave the federal ones alone.

Some borrowers fall into special cases. Doctors and dentists in residency have a different set of trade-offs, covered in the guide to [refinancing medical and dental school loans](/guide/sofi-medical-dental-student-loan-refinancing). And if your income swings from month to month, sort out [a cash-flow plan for irregular income](/guide/manage-cash-flow-solo-founder-50-30-20-rule) before you commit to a payment that can't flex.

## So is now the right time?

Nobody can tell you where rates are heading, and I wouldn't plan around a guess. The timing that matters is your own. Refinancing is worth a look when your credit score or income has improved since you borrowed, when you're paying a rate well above what lenders will offer you today, or when you have private loans scattered across several servicers.

It's usually a poor time if your job feels shaky, if you're working toward forgiveness, or if you have only a year or two of payments left. With a small remaining balance, the savings are often too slim to justify the paperwork.

Refinancing isn't a one-time choice either. If your finances improve later, you can generally apply again, with the same lender or a different one.

## How to compare an offer

Start by finding out which loans you have. Your studentaid.gov account lists every federal loan. Anything that isn't there, such as a loan from a bank, a credit union or SoFi itself, is private.

Then get a real quote. **[SoFi's student loan refinancing page](${STUDENT_REFI})** shows current eligibility rules and terms. Most refinance lenders show an estimated rate using a soft credit check, with a hard inquiry only when you submit a full application. Confirm that on the form before you enter your details, and get quotes from at least one other lender so you have something to compare.

When you compare, look at these four things:

| What to compare | Why it matters |
| --- | --- |
| Total cost over the loan | A longer term can lower the payment and still cost more |
| Fixed or variable rate | Fixed is predictable; variable can rise |
| Fees | Check for origination, late and prepayment fees |
| Hardship options | Ask what happens if you lose your job |

If a parent or relative cosigned your original loans, ask whether you can refinance in your own name. Qualifying alone takes them off the debt, which is a good reason to refinance even when the rate improvement is modest.

## If your loans are federal and you just want one payment

You don't need a private lender for that. A federal Direct Consolidation Loan combines federal loans into one loan with a fixed rate and a single payment, and it keeps them in the federal system. It has drawbacks of its own, so read Federal Student Aid's [five things to know before consolidating](https://studentaid.gov/articles/5-things-before-consolidating-student-loans/) first.

## Where to go from here

Check your loan types, decide whether you'd miss the federal protections, and only then look at rates. If the trade-offs work for you, you can **[see what SoFi would offer on a refinance](${STUDENT_REFI})** and weigh it against your current loans. If you're still in school and deciding how to borrow, the guide to [when private student loans make sense](/guide/sofi-private-student-loans-guide) is the better starting point.

*SoFi also runs a [referral program for some of its other products](/guide/sofi-referral-bonus-guide). The current terms are in the [official rules](${RULES}).*
`,
  },

  // ===================== 3. MEDICAL/DENTAL REFINANCING ======================
  {
    id: 'post-sofi-3',
    title: 'Student Loan Refinancing for Doctors and Dentists',
    slug: 'sofi-medical-dental-student-loan-refinancing',
    excerpt: 'For doctors and dentists, refinancing can mean giving up Public Service Loan Forgiveness. Here\'s how to tell which side of that trade-off you\'re on.',
    category: 'SoFi Bank',
    tags: ['SoFi', 'Student Loans', 'Medical School', 'Refinancing'],
    coverImage: '/images/sofi/medical-refi.svg',
    author: AUTHOR,
    publishedAt: '2026-08-30',
    updatedAt: '2026-10-03',
    readTimeMinutes: 7,
    difficulty: 'Intermediate',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['student loan refinancing for doctors', 'should medical residents refinance student loans', 'does refinancing student loans affect PSLF', 'PSLF for physicians', 'SoFi medical resident refinance', 'dentist student loan refinancing'],
    metaDescription: 'Refinancing federal loans ends PSLF eligibility, a big deal for physicians. When to keep loans federal and when a refinance is worth pricing.',
    keyTakeaways: [
      'Refinancing federal loans into a private loan permanently ends eligibility for Public Service Loan Forgiveness and income-driven repayment.',
      'Use the employer search on studentaid.gov to confirm whether your actual employer qualifies for PSLF before deciding anything.',
      'If you don\'t yet know whether you\'ll work for a non-profit or a private group, wait. You can refinance later but you can\'t undo it.',
      'SoFi\'s resident refinance has a small fixed payment during training, and unpaid interest is added to your balance when the residency period ends.',
      'Private loans never qualify for PSLF, so you can price a refinance on those without touching your federal loans.',
    ],
    content: `
${DISCLOSURE}

If you're a doctor or dentist with federal student loans and there's a real chance you'll work for a non-profit or public employer, refinancing is usually the wrong first move. It turns federal loans into a private loan, and that permanently ends your eligibility for Public Service Loan Forgiveness (PSLF).

If you're headed for private practice, or the loans in question are already private, it's a different story. Then refinancing is mostly a question of whether a lender will give you a better rate than you have now, and that's worth pricing.

The rest of this guide explains why the decision is harder for physicians and dentists than for most borrowers, what SoFi offers residents, and how to sort yourself into one group or the other. It's general education. I'm not a financial advisor and I don't know your loans.

## Why this decision is different for doctors and dentists

Three things set you apart from the typical borrower.

**The balances are very large.** Medical and dental school debt often runs well into six figures. At that size, a small change in interest rate adds up to real money over the life of the loan, and so does a mistake.

**Your income arrives late.** Residency and fellowship pay is modest compared with what follows. For several years you carry a large balance on a trainee's salary, then your income jumps. Any plan has to work in both phases.

**A lot of you work for employers that qualify for PSLF.** Many hospitals, academic medical centers, public health agencies and community clinics are non-profit or government-run. That puts forgiveness within reach for a large share of physicians, in a way it isn't for most high earners.

Put those together and you can see the problem. The same big balance that makes a lower rate attractive is also what makes forgiveness so valuable.

## What you give up: Public Service Loan Forgiveness

PSLF forgives the remaining balance on your federal Direct Loans after you've made 120 qualifying monthly payments while working full-time for a qualifying employer. The government's own [Public Service Loan Forgiveness page](https://studentaid.gov/manage-loans/forgiveness-cancellation/public-service) has the full rules. The basics:

- **Employer:** a U.S. government organization at any level, a 501(c)(3) non-profit, or certain other non-profits that provide public services. What matters is who employs you, and your job title doesn't come into it.
- **Hours:** full-time, which for PSLF means averaging at least 30 hours a week.
- **Loans:** federal Direct Loans only. Private loans never qualify.
- **Payments:** 120 of them under a qualifying plan, which includes the income-driven plans and the 10-year Standard plan. They don't have to be consecutive.

Here's why that matters so much for physicians. If your residency is at a qualifying hospital and you're on an income-driven plan, your payments during training are based on a resident's salary, and each one can still count toward the 120. By the time you're an attending, you may already be several years in. Someone who then stays in non-profit or public employment could have a large balance forgiven.

Refinance those loans with any private lender and that's over. The new loan is private, the payments you've already made stop counting toward anything, and you can't convert it back. SoFi says the same thing in its own disclosures: refinancing federal loans means giving up federal benefits, including PSLF and income-driven repayment.

You also lose the federal safety net more broadly: income-driven payments if your income drops, and federal deferment and forbearance options. Private lenders have their own hardship policies, but they're not the same thing.

Two cautions before you count on PSLF:

1. **Check the employer, not the building.** Some physicians work at a non-profit hospital but are employed by a private group that contracts with it. Use the employer search tool on studentaid.gov to confirm that your actual employer qualifies.
2. **The rules have been changing.** Federal repayment plans were overhauled starting in July 2026, with a new Repayment Assistance Plan and older income-driven plans being wound down, and the rules on which employers qualify were revised too. Some of this is still being phased in. Check studentaid.gov or your loan servicer for what applies to your loans today, and don't rely on an article, including this one, for the details.

## What SoFi offers residents and fellows

SoFi has a refinancing product aimed at medical and dental residents and fellows, separate from its standard student loan refinancing. As of October 2026, SoFi's site describes it this way:

- It's for people who've graduated with an MD, DO, DMD or DDS and are in an approved residency or fellowship program with up to seven years left.
- During the residency period you make a small fixed monthly payment. SoFi's page gives the current amount. There's a cap on how many years that reduced payment lasts.
- That payment may not cover the interest building up each month. SoFi's disclosure says any unpaid interest left at the end of the residency period gets added to your principal. So your balance can be larger when full payments start than it was when you refinanced.
- After the residency period, you move to regular payments over the term you chose.

I'm not quoting rates. They change, and what you'd be offered depends on your credit and income. Current terms and eligibility are on [SoFi's medical and dental refinancing page](${MEDICAL}).

The low payment is the appeal, but be clear about what it's replacing. A resident on a federal income-driven plan also has a low payment, and that payment can count toward PSLF. The resident refinance makes the most sense for someone who has already ruled out forgiveness and wants a lower rate during training, or who is refinancing private loans that were never eligible anyway.

## A way to sort yourself

This isn't advice for your situation, just the general shape of the decision.

| Your situation | General direction |
| --- | --- |
| Federal loans, working toward PSLF or might be | Keep them federal |
| Federal loans, unsure where you'll work | Wait until you know |
| Federal loans, private practice, stable high income | Worth pricing a refinance |
| Private loans, any employer | Worth pricing a refinance |

The "unsure" row is the one people get wrong. Refinancing can be done later, at any point. Undoing it can't be done at all. If you're a resident who hasn't picked between an academic job and a private group, waiting costs you some interest. Refinancing too early could cost you forgiveness on the whole balance.

You also don't have to treat your loans as one block. Plenty of borrowers have a mix, and it's reasonable to refinance the private ones while leaving the federal ones alone. That mix is likely to become more common, since new federal borrowing limits for graduate and professional students took effect in July 2026 and may push more medical and dental students toward [private student loans](/guide/sofi-private-student-loans-guide) to cover the gap.

## If refinancing does fit, how to price it

Once forgiveness is off the table for the loans in question, the comparison is fairly mechanical.

1. Pull your full loan list from studentaid.gov and from your credit report so you know exactly which loans are federal and which are private.
2. Get quotes from more than one lender. Many let you check a rate with a soft credit pull that doesn't affect your score, but confirm that before you submit anything.
3. Compare the total you'd repay over the life of the loan, not the monthly payment. A longer term lowers the payment and raises the total.
4. Read the hardship terms. Ask what happens if you're out of work or your income drops, because you won't have the federal options to fall back on.

Timing matters too. An attending's income will usually qualify for better terms than a resident's, so if you're close to finishing training, a quote now and another after you start your attending job will tell you what waiting is worth.

The [general SoFi refinancing guide](/guide/sofi-student-loan-refinancing-guide) goes through fixed versus variable rates and term length in more detail.

## Where to start

Find out whether your employer, or the one you expect to have, qualifies for PSLF. That single answer decides most of this. If it does, keep your federal loans federal and learn the forgiveness rules. If it doesn't, or your loans are private, [see what SoFi would offer you](${MEDICAL}) and compare it against at least one other lender.

*SoFi also runs a referral program on some of its products. I cover how it works in the [referral bonus guide](/guide/sofi-referral-bonus-guide), and the [official rules are here](${RULES}).*
`,
  },

  // ======================= 4. PRIVATE STUDENT LOANS =========================
  {
    id: 'post-sofi-4',
    title: 'SoFi Private Student Loans: When One Makes Sense',
    slug: 'sofi-private-student-loans-guide',
    excerpt: 'Private student loans are for the gap left after grants, scholarships and federal loans. Here\'s how they work, what a cosigner takes on, and what SoFi offers.',
    category: 'SoFi Bank',
    tags: ['SoFi', 'Student Loans', 'Private Student Loans', 'College Funding'],
    coverImage: '/images/sofi/private-student.svg',
    author: AUTHOR,
    publishedAt: '2026-08-30',
    updatedAt: '2026-10-03',
    readTimeMinutes: 7,
    difficulty: 'Beginner',
    featured: false,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['sofi private student loans', 'are private student loans a good idea', 'when to take out a private student loan', 'private vs federal student loans', 'student loan cosigner release', 'fixed vs variable student loan rate'],
    metaDescription: 'Use federal aid first, then a private loan for the gap. How SoFi private student loans work, what cosigners take on, and what to compare.',
    keyTakeaways: [
      'Complete the FAFSA and use grants, scholarships, work-study and federal loans before any private loan.',
      'Private loans are credit-based, usually need a cosigner, and don\'t come with federal repayment protections or forgiveness.',
      'A cosigner is legally responsible for the full loan; cosigner release has to be applied for and isn\'t guaranteed.',
      'Paying at least the interest during school keeps the balance from growing.',
      'Compare the same term, rate type and in-school payment option across lenders, and check SoFi\'s page for current terms.',
    ],
    content: `
${DISCLOSURE}

A private student loan is a reasonable way to cover the last part of a college bill. It's a poor way to cover the first part. Before you apply for one from SoFi or anyone else, complete the FAFSA and use up grants, scholarships, work-study and federal student loans. Then borrow privately only for whatever gap is left.

That order isn't just my opinion. The Consumer Financial Protection Bureau says federal loans [almost always cost less and are easier to repay](https://www.consumerfinance.gov/paying-for-college/choose-a-student-loan/), and it recommends looking at private loans only after federal options run out.

This guide is education, not personal financial advice. I won't quote rates, because they change and depend on your credit.

## Why federal aid comes first

The FAFSA is the application for federal grants, work-study and federal loans, and many states and colleges use it for their own aid too. Fill it out even if you expect to get little. Skipping it means skipping money you may not have to repay.

Federal loans come before private ones for a few concrete reasons:

- Most federal loans for students don't depend on your credit history and don't need a cosigner.
- The interest rate is fixed for the life of the loan.
- On subsidized loans, the government pays the interest while you're in school.
- Federal loans come with income-based repayment, deferment and forbearance, and forgiveness programs such as Public Service Loan Forgiveness. Private loans generally don't.

If your aid offer falls short, there are still steps to try before a private loan: more scholarship applications, asking the financial aid office to review your offer if your family's finances have changed, a tuition payment plan, and part-time work.

One caution for this year. Federal loan rules changed for loans made on or after July 1, 2026. Grad PLUS loans are closed to new borrowers, Parent PLUS loans now have borrowing caps, graduate and professional limits were reset, and new loans get a different set of repayment plans. Some students who borrowed before that date can keep the old limits for a while. The details are still being rolled out, so check [studentaid.gov](https://studentaid.gov/) or your school's aid office for the limits that apply to you. Tighter federal limits mean more families, especially grad students and parents, will end up with a gap to fill.

## How a private student loan is different

A private student loan comes from a bank or lender instead of the government, and the lender decides who qualifies and at what price.

| | Federal loan | Private loan |
| --- | --- | --- |
| Approval | Mostly not credit-based | Based on credit and income |
| Cosigner | Usually not needed | Often needed |
| Rate | Fixed | Fixed or variable |
| Hardship help | Set by law | Up to the lender |
| Forgiveness | Federal programs exist | No federal forgiveness |

The last two rows matter most. If you lose a job or earn less than you planned, a federal loan gives you rights. With a private loan you're relying on whatever relief the lender chooses to offer.

## What a cosigner is agreeing to

Most undergraduates don't have the credit history or income to qualify alone, so a parent or other adult cosigns. A cosigner with good credit can also mean a lower rate.

Parents should be clear about what that signature means. A cosigner is legally responsible for the whole loan if the student doesn't pay. The loan shows up on the cosigner's credit report, and a late payment can hurt both people's credit scores. It can also affect the cosigner's ability to borrow for a house or car.

Some lenders offer cosigner release, which removes the cosigner after the student has made a set number of on-time payments and qualifies alone. It's never automatic. SoFi's site says a borrower can apply for release after 24 consecutive on-time payments of full principal and interest, and still has to pass a credit review. Going by that wording, interest-only or partial payments made during school wouldn't count. Plan as if the cosigner will be on the loan until it's paid off.

## Fixed or variable rate

A fixed rate stays the same for the life of the loan, so the payment is predictable. A variable rate is tied to a market index and can rise or fall, which means your payment can too.

Variable rates often start lower, which is the temptation. For a loan you'll carry for ten years or more, I'd lean fixed unless you expect to pay it off quickly. If you do consider a variable rate, check whether the loan disclosure sets a maximum rate and work out what the payment would be at that maximum.

## Paying while you're in school

Private lenders usually let you choose how much to pay during school. SoFi lists four options:

- **Deferred:** no payments until six months after you leave school.
- **Partial:** a small fixed payment each month during school.
- **Interest-only:** you pay the interest each month during school.
- **Immediate:** full principal and interest payments from the start.

Interest builds from the day the money is sent to your school, whichever option you pick. With deferred payments, four years of unpaid interest gets added to what you owe, so you finish school owing more than you borrowed. Paying at least the interest during school keeps the balance from growing. If the budget allows only a small monthly payment, that still helps.

## What to compare between lenders

Compare at least two or three lenders. Most, including SoFi, let you check an estimated rate with a soft credit pull that doesn't affect your score. The full application is a hard pull. The CFPB suggests doing your applications within about two weeks to limit the effect on your credit.

Look at these:

- **APR for the same loan.** Compare the same term, rate type and in-school payment option at each lender.
- **Fees.** Check for origination, late and prepayment charges.
- **Total cost.** A longer term lowers the payment and raises the total interest.
- **Cosigner release rules.** How many payments, and what the borrower has to show.
- **Hardship options.** How long payments can pause, and whether interest keeps building.
- **Death or disability.** Whether the loan is cancelled or the cosigner still owes it.

## What SoFi offers

Here's what I could confirm on SoFi's own pages when I checked. Terms change, so read the current version before you apply.

- Loans for undergraduates, graduate students (including law, MBA and health professions) and parents.
- Fixed and variable rates, with several repayment terms.
- The student generally has to be enrolled at least half-time in a degree program at a school SoFi works with.
- Your school certifies the loan amount, so you may receive less than you asked for.
- An interest rate discount for autopay.

**[See current rates and terms on SoFi's private student loan page](${PRIVATE})**

A lender with no fees isn't automatically the cheapest. The rate you're offered decides most of the cost, and that depends on your credit or your cosigner's.

## How much to borrow

Start with the school's cost of attendance, subtract every grant, scholarship and federal loan, and subtract what the family can pay from income and savings. What's left is the gap. Borrow that and no more.

A rough check many advisers use is to keep total student debt below what you expect to earn in your first year after school. It's a rule of thumb and won't fit every career, but if your number is far above it, look hard at cheaper options first.

You can also shrink the loan later by paying extra when you have it. Confirm in the loan disclosure that there's no prepayment penalty before you sign.

## After graduation

Private loans can be refinanced later if your credit and income improve, sometimes without a cosigner. My guide to [when refinancing student loans makes sense](/guide/sofi-student-loan-refinancing-guide) explains how that works, including why refinancing federal loans means giving up their protections for good. Doctors and dentists have a few extra things to weigh, which I cover in the guide to [refinancing medical and dental school debt](/guide/sofi-medical-dental-student-loan-refinancing).

## Next step

Finish the FAFSA, read your aid offer, and work out your gap. If there's still one, compare a few lenders on the points above. You can [check what SoFi would offer](${PRIVATE}) as one of them.

*SoFi also runs a referral program for some of its products. Here's [how the SoFi referral bonus works](/guide/sofi-referral-bonus-guide), and the [official rules](${RULES}).*
`,
  },

  // ===================== 5. REFERRAL / MONEY BONUS ==========================
  {
    id: 'post-sofi-5',
    title: 'How the SoFi Referral Bonus Works: Who Gets Paid and When',
    slug: 'sofi-referral-bonus-guide',
    excerpt: 'SoFi\'s referral offer pays a new Checking and Savings customer and the member who referred them. Here\'s who gets what, what you have to do, and how long it takes.',
    category: 'SoFi Bank',
    tags: ['SoFi', 'Referral Bonus', 'Bank Bonus', 'Personal Finance'],
    coverImage: '/images/sofi/referral-money.svg',
    author: AUTHOR,
    publishedAt: '2026-08-30',
    updatedAt: '2026-10-03',
    readTimeMinutes: 4,
    difficulty: 'Beginner',
    featured: true,
    views: 0,
    likes: 0,
    rating: 0,
    ratingCount: 0,
    seoKeywords: ['sofi referral bonus', 'how does the sofi referral bonus work', 'sofi referral bonus requirements', 'how long does the sofi referral bonus take', 'sofi referral bonus not received', 'are sofi referral bonuses taxable'],
    metaDescription: 'What SoFi\'s referral bonus pays the new customer and the referrer, the deposit and timing rules, why bonuses fail to pay, and how they\'re taxed.',
    keyTakeaways: [
      'Open the account through a referral link as your first SoFi product, or the bonus won\'t apply.',
      'As of October 2026 the new customer\'s bonus requires $50 or more in deposits started within 25 days; no direct deposit is needed.',
      'The referrer earns more than the new customer, and the extra SoFi Plus bonus requires a paid subscription.',
      'SoFi says bonuses post within seven business days of validation and no later than 74 days after you qualify.',
      'Bonuses are miscellaneous income and may be reported on Form 1099-MISC.',
    ],
    content: `
${DISCLOSURE}

SoFi's bank referral program pays both sides. A new customer opens a SoFi Checking and Savings account through an existing member's referral link, deposits a small amount within a few weeks, and each of them gets a cash bonus. The new customer's bonus is the smaller one. The member who referred them gets more.

That includes me. If you open an account through a link on this page, SoFi pays me a referral bonus and pays you the welcome bonus. Nothing here changes what you qualify for, and SoFi decides who gets paid.

## Who gets what

As of October 2026, SoFi's [official rules](${RULES}) list these amounts for the Checking and Savings referral offer:

| Who | Bonus | What triggers it |
| --- | --- | --- |
| New customer | $25 | Opens through a referral link and deposits $50 or more within 25 days |
| New customer, extra | $25 | Also subscribes to SoFi Plus within 25 days |
| Referrer | $75 or $100 | The new customer qualifies for their $25 |
| Referrer, extra | $25 | The new customer subscribes to SoFi Plus |

The referrer gets the higher $100 figure if they're a SoFi Plus member, receive a qualifying direct deposit, or have put $5,000 or more into their account within a 31-day period. Otherwise it's $75. That's where SoFi's "up to $125" headline comes from: it's the most the referrer can earn per referral. The most a new customer can get from the referral offer is $50.

The current terms cover accounts opened from October 1 through October 21, 2026. SoFi runs the offer in short promotion periods and can change the amounts from one to the next, so read the rules on the day you sign up instead of trusting any article, including this one.

## What the new customer has to do

1. Open the account through a referral link. Signing up directly on SoFi's site doesn't connect you to a referrer.
2. Make it your first SoFi product. The offer is for people who are new to SoFi, so if you already have a SoFi loan, Invest account or credit card, you're not eligible.
3. Deposit $50 or more in total, started within 25 calendar days of opening.

A direct deposit isn't required for the new customer's $25. Any deposits adding up to $50 count.

[Open a SoFi Checking and Savings account with my referral link](${MONEY})

## Is the SoFi Plus bonus worth it?

SoFi Plus is a paid monthly subscription, and the extra $25 requires subscribing within the same 25-day window. Check the current price before you do, because a few months of fees will use up the bonus. I'd only take it if you want what the subscription includes. Signing up purely for the $25 and forgetting to cancel is the easy way to lose money on a bonus.

## How long the bonus takes

SoFi's terms say a bonus is credited to your SoFi Checking account within seven business days after the qualifying steps are completed and validated, and no later than 74 days after you complete them. In practice that means you may wait a while before it's worth contacting support. Keep a note of the date you opened the account and the date of your deposit so you have them if you need to ask.

## Why a bonus doesn't pay out

Nearly every missed bonus traces back to one of these:

- The account wasn't opened through a referral link.
- The new customer already had another SoFi product.
- The deposits came to less than $50, or started after the 25 days.
- The account was opened after the promotion period ended.
- The referrer's own Checking and Savings account was closed or not in good standing when the bonus was due.
- The referrer hit SoFi's yearly cap, which is $10,000 across all its referral and direct deposit bonuses.

Each new customer can receive the referral bonus only once.

## Are SoFi referral bonuses taxable?

Yes, treat them as income. SoFi's terms describe the bonuses as miscellaneous income that may be reported to the IRS on Form 1099-MISC, and say you're responsible for any tax owed. Whether SoFi sends you a form depends on how much you received in the year, but the income is reportable either way. If you refer a lot of people, keep your own running total and ask a tax professional how to report it.

## Should you open an account just for the bonus?

I wouldn't. $25 is a fair thank-you for opening an account you already wanted, and a poor reason to add one you'll never use. Compare the account itself first: fees, the interest it pays, and whether you'd move your paycheck there. SoFi also runs a separate direct deposit bonus for new accounts, so check its site to see whether that offer or the referral offer fits you better, and whether you can get both.

Once you have an account you'll get your own link to share. If you post it anywhere public, say plainly that you get paid, which is what the [FTC's disclosure rules](/guide/affiliate-disclosure-ftc-compliance-guide) require of anyone sharing a referral link.

## Other SoFi products have their own referral terms

The amounts above apply to Checking and Savings only. SoFi lists its other products, loans included, separately in its referral program, each with its own terms, and a loan is a much bigger decision than a bank account. If that's what you came for, start with my guides to [deciding whether a SoFi personal loan fits](/guide/sofi-personal-loans-guide) and [what you give up by refinancing federal student loans](/guide/sofi-student-loan-refinancing-guide).

For the bank bonus, read the [current official rules](${RULES}), then [open the account through a referral link](${MONEY}) and make your $50 deposit within the 25 days.
`,
  },
];
