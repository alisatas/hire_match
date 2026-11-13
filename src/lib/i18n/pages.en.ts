// English strings for the pages around the analyzer: keyword guides, articles and the
// legal pages. Same idea as en.ts (the home page): this file is the source and the shape
// (`PageStrings`); pages.<lang>.ts files translate it. {placeholders} are filled with fmt().

export const pagesEn = {
  // English writes the role in lower case inside a sentence ("a frontend developer CV").
  // Other languages use the role name exactly as their guides spell it.
  lowercaseRole: true,
  breadcrumbLabel: "Breadcrumb",
  guides: {
    // <title> without the " | CVXray" suffix: at most 56 characters
    title: "Resume Keywords by Job Role — Free Lists & CV Check",
    // meta description: 70–160 characters
    description:
      "Resume keywords employers ask for in tech, AI, data, product, sales, marketing, finance and HR jobs. Then check your CV against any job post, free.",
    eyebrow: "Resume keywords",
    h1: "Resume keywords by job role",
    lead: "The skills and terms job postings ask for most, role by role. Use them as a checklist — then run your own CV against a real posting to see exactly which ones you're missing.",
    breadcrumb: "Resume keywords by role",
    breadcrumbShort: "Resume keywords",
    cardTitle: "{role} resume keywords",
    cardMore: "{keywords} and more.",
    notListedTitle: "Role not listed?",
    notListedText: "The checker works with any job description, in any field. Paste the posting and it pulls out the keywords for you.",
    notListedCta: "Check my CV against a job",
  },
  role: {
    // Candidates for <title>, longest first; the first one of at most 51 characters
    // (after {role} is filled in) is used. The last must be short enough for any role.
    titles: [
      "{role} Resume Keywords — Skills Employers Look For",
      "{role} Resume Keywords & Skills",
      "{role} Resume Keywords",
    ],
    h1: "{role} resume keywords",
    alsoCalled: "Also advertised as: {names}",
    keywordsTitle: "Keywords {role} job postings ask for",
    keywordsNote: "A checklist, not a shopping list: include the ones you have real experience with, in the wording the posting uses.",
    ctaQuestion: "Have a specific {role} job in mind?",
    ctaText: "See which of its keywords your CV is missing — free, no sign-up.",
    ctaButton: "Check my CV",
    howTitle: "How to use these keywords on a {role} CV",
    faqTitle: "Common questions",
    finalTitle: "Check your CV against a real {role} job",
    finalText: "Upload your CV, paste the job link, and get a match score with the missing keywords ranked by priority. Your CV is never stored.",
    finalButton: "Get my match score",
    othersLabel: "Other roles",
    othersTitle: "Keywords for other roles",
  },
  blog: {
    // <title> without the " | CVXray" suffix: at most 56 characters
    title: "CV & Job Search Guides — How to Get Past the ATS",
    // meta description: 70–160 characters
    description: "Practical guides on how applicant tracking systems read your CV, how to tailor a CV to a job description, and what your CV match score means.",
    name: "CVXray guides",
    eyebrow: "Guides",
    h1: "CV and job search guides",
    lead: "How CVs are screened, and what to change so the right recruiter finds yours.",
    breadcrumb: "Guides",
    minRead: "{n} min read",
    ctaTitle: "Check your CV against a real job",
    ctaText: "Upload your CV, paste the job link and see your match score, missing skills and where to add them. Free, and your CV is never stored.",
    ctaButton: "Check my CV",
    relatedLabel: "Related keyword guides",
    relatedTitle: "Resume keywords by role",
    moreTitle: "More guides",
  },
  legal: {
    updated: "Last updated: {date}",
    questions: "Questions about this page?",
    // followed by the e-mail address as a link, then a full stop
    email: "Email",
    receipt: "For anything about a payment, reply to your Lemon Squeezy receipt email — it reaches us directly.",
    // Shown at the top of a translated legal page; empty in English
    translationNotice: "",
  },
};

export type PageStrings = typeof pagesEn;
