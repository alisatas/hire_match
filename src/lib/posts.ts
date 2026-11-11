// Blog articles. Plain data so pages, sitemap, llms.txt and structured data all read
// from one place. Claims are kept to what is verifiable — no invented statistics.

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; text: string };

export interface Post {
  slug: string;
  title: string;
  description: string;
  published: string; // ISO date
  updated: string;
  minutes: number;
  sections: { heading: string; blocks: Block[] }[];
  relatedRoles: string[];
}

export const POSTS: Post[] = [
  {
    slug: "how-ats-reads-your-cv",
    title: "How applicant tracking systems (ATS) actually read your CV",
    description:
      "What an ATS really does with your CV, why the \"75% of CVs are auto-rejected\" claim is a myth, and the formatting and keyword habits that make sure a recruiter finds you.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 6,
    relatedRoles: ["software-engineer", "account-executive", "recruiter"],
    sections: [
      {
        heading: "What an ATS is",
        blocks: [
          { type: "p", text: "An applicant tracking system is the software a company uses to collect applications, move candidates through interview stages and keep a record of every hire. Greenhouse, Workday, Lever, SmartRecruiters and many others all do broadly the same job: they turn a pile of CVs into a searchable database." },
          { type: "p", text: "When you apply, the ATS stores your CV and usually tries to parse it — pulling your name, contact details, job titles, employers, dates, education and skills into structured fields. Recruiters then review applications, filter them and, crucially, search them." },
        ],
      },
      {
        heading: "The \"auto-rejection\" myth",
        blocks: [
          { type: "p", text: "You will often read that \"75% of CVs are rejected by the ATS before a human sees them.\" There is no published study behind that number, and it misdescribes how most systems work. In most companies the ATS does not read your CV and decide; people do." },
          { type: "p", text: "What does filter candidates automatically are knock-out questions the employer configures — for example \"Do you have the right to work in the Netherlands?\" or \"Do you hold a driving licence?\" Answer those honestly and carefully, because a wrong click there is a real reason for rejection." },
          { type: "tip", text: "The real risk isn't a robot rejecting you. It's a recruiter searching for \"Salesforce\" or \"React\" and your CV not appearing in the results because the word isn't on it." },
        ],
      },
      {
        heading: "Why keywords still matter",
        blocks: [
          { type: "p", text: "Recruiters search the ATS the way you search the web: by typing the skills and titles the hiring manager asked for. If the posting says \"Next.js\" and your CV says \"NextJS\", or the posting says \"stakeholder management\" and you wrote \"worked with business teams\", a simple search can miss you." },
          { type: "ul", items: [
            "Use the exact names the posting uses for tools, methods and certifications.",
            "Write a term in full once with its abbreviation: \"Search engine optimisation (SEO)\".",
            "Put your most important skills both in a Skills section and in the bullets that prove them.",
            "Only include skills you can talk about in an interview — the keyword gets you found, the interview checks it.",
          ] },
        ],
      },
      {
        heading: "Formatting that parses cleanly",
        blocks: [
          { type: "p", text: "Parsing is where design-heavy CVs lose information. If the ATS can't read a section, the recruiter's search can't find what's in it." },
          { type: "ul", items: [
            "Use a single-column layout. Multi-column designs can be read in the wrong order.",
            "Keep text as text — not inside images, icons, text boxes or complex tables.",
            "Use standard headings: Experience, Education, Skills, Projects.",
            "Export a text-based PDF from Word or Google Docs (not a scan or a photo). If you can select and copy the text, a parser can usually read it.",
            "Put dates in a consistent format, such as \"Mar 2021 – Present\".",
          ] },
        ],
      },
      {
        heading: "How to check your own CV",
        blocks: [
          { type: "ol", items: [
            "Copy all the text out of your PDF and paste it into a plain text editor. If it comes out jumbled or empty, the layout needs simplifying.",
            "Paste the job description next to it and highlight the tools, skills and titles it repeats.",
            "Check which of those appear on your CV, in the same wording.",
          ] },
          { type: "p", text: "CVXray automates steps two and three: it reads your CV the way a parser does, compares it with the posting and lists the missing skills by priority, with the line in the job post that asks for each one." },
        ],
      },
    ],
  },
  {
    slug: "tailor-cv-to-job-description",
    title: "How to tailor your CV to a job description in 15 minutes",
    description:
      "A practical, step-by-step method to adapt your CV to a specific job posting — without rewriting it from scratch or stuffing it with keywords.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 5,
    relatedRoles: ["frontend-developer", "product-manager", "digital-marketing-specialist"],
    sections: [
      {
        heading: "Why tailoring works",
        blocks: [
          { type: "p", text: "A hiring manager reading your CV is asking one question: does this person do what our job needs? A general CV makes them work out the answer. A tailored one answers it in the first ten seconds — the same experience, ordered and worded around their posting." },
          { type: "p", text: "Tailoring is not rewriting your history. It's choosing which true things to put first, and using the employer's words for them." },
        ],
      },
      {
        heading: "Step 1 — Read the posting for priorities (3 minutes)",
        blocks: [
          { type: "ul", items: [
            "Underline every tool, skill, method and certification.",
            "Mark the ones that appear more than once or in the job title — those are the priorities.",
            "Note the seniority signals: years of experience, team size, budget, scope.",
          ] },
        ],
      },
      {
        heading: "Step 2 — Find your gaps (2 minutes)",
        blocks: [
          { type: "p", text: "Compare that list with your CV. Some skills will be missing because you don't have them — leave those out. Others will be missing only because you never wrote them down, or used different words. Those are the quick wins." },
          { type: "tip", text: "CVXray does this comparison for you: paste the posting and your CV and it lists the missing skills, highest priority first, with the line in the posting that asks for each." },
        ],
      },
      {
        heading: "Step 3 — Rewrite your summary (3 minutes)",
        blocks: [
          { type: "p", text: "Your two-line summary should echo the job title and the top two or three priorities: \"Frontend developer with 5 years building React and TypeScript products, focused on accessibility and performance.\" If the posting's title differs slightly from yours, use theirs where it's honest to do so." },
        ],
      },
      {
        heading: "Step 4 — Reorder and reword your bullets (5 minutes)",
        blocks: [
          { type: "ul", items: [
            "Move the bullets that prove the posting's priorities to the top of each role.",
            "Use the posting's names for tools and methods.",
            "Add a number to every bullet you can: scale, time saved, revenue, users, accuracy.",
            "Cut bullets that don't support this job. Shorter and relevant beats long and complete.",
          ] },
        ],
      },
      {
        heading: "Step 5 — Update your Skills section (2 minutes)",
        blocks: [
          { type: "p", text: "List the posting's priority skills that you genuinely have, in its wording, near the top of the section. Then run one last check: every skill in the list should be backed by at least one bullet above it." },
        ],
      },
      {
        heading: "What not to do",
        blocks: [
          { type: "ul", items: [
            "Don't paste the job description into your CV, visibly or in white text. Recruiters notice, and modern systems display the text.",
            "Don't add skills you haven't used to raise a match score — the interview will find them.",
            "Don't send the same \"tailored\" CV to every posting. Fifteen minutes per application is the point.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "what-is-a-good-cv-match-score",
    title: "What is a good CV match score — and what to do with yours",
    description:
      "How CV match scores are calculated, what 45%, 70% or 90% actually mean, and the next step to take at each level before you apply.",
    published: "2026-11-11",
    updated: "2026-11-11",
    minutes: 4,
    relatedRoles: ["data-analyst", "ai-engineer", "financial-analyst"],
    sections: [
      {
        heading: "What a match score measures",
        blocks: [
          { type: "p", text: "A CV match score estimates how much of what a job posting asks for is visible on your CV. It is not a prediction of whether you will be hired — it measures overlap, and overlap is what decides whether a recruiter finds and shortlists you." },
          { type: "p", text: "CVXray's score is a weighted comparison with three parts: skills the job names that appear on your CV (50%), the posting's own wording shared by your CV (35%), and your years of experience against what is asked (15%). Skills the posting repeats, or puts in its title, weigh more." },
        ],
      },
      {
        heading: "Reading your score",
        blocks: [
          { type: "ul", items: [
            "70% and above — a strong match. Your CV already shows most of what the job needs. Polish the top third and apply.",
            "45–69% — competitive. You likely have the experience but aren't showing all of it. Close one or two high-priority gaps first.",
            "Below 45% — significant gaps. Either the role is a stretch, or your CV is written for a different kind of job. Tailor heavily or consider whether it's the right role.",
          ] },
          { type: "tip", text: "Scores are capped at 95%. A perfect 100% would mean copying the posting — which is neither the goal nor a good idea." },
        ],
      },
      {
        heading: "Why your score might be lower than you expect",
        blocks: [
          { type: "ul", items: [
            "Different wording: \"customer retention\" on your CV, \"churn reduction\" in the posting.",
            "Skills only implied: you used Docker every day but never wrote the word.",
            "A very short CV or a very short job post, which makes any comparison less reliable.",
            "Experience not dated: years are read from phrases like \"5 years of experience\" or date ranges such as \"2019 – present\".",
          ] },
        ],
      },
      {
        heading: "How to raise it honestly",
        blocks: [
          { type: "ol", items: [
            "Start with the high-priority missing skills you actually have, and add them where they're proven — in a bullet, not just the skills list.",
            "Use the posting's names for tools and methods.",
            "Add the dates to your roles so your experience can be counted.",
            "Re-run the check. A jump from the 50s into the 70s from rewording alone is common.",
          ] },
          { type: "p", text: "If the remaining gaps are skills you don't have, a higher score isn't the answer — the recommended courses are, or a role that fits better." },
        ],
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
