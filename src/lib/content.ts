export const site = {
  brand: "CorpDK",
  title: "CorpDK — Debraj Kundu",
  description:
    "CorpDK is the independent software practice of Debraj Kundu. Write to hello@corpdk.com.",
  canonical: "https://corpdk.com/",
  sentence:
    "CorpDK is the independent software practice of Debraj Kundu, proprietor — full-stack and cloud work, done under one name.",
  person: {
    name: "Debraj Kundu",
    role: "Proprietor",
    place: "Kolkata, India",
    roleMark: "  ·  ",
  },
  mail: {
    address: "hello@corpdk.com",
    href: "mailto:hello@corpdk.com",
  },
  gstin: "GSTIN : 19HVOPK1815H1Z7",
  privacy:
    "This page uses Google Tag Manager to measure visits and Core Web Vitals.",
} as const;

export const proofLinks = [
  { label: "Curriculum vitae", href: "https://cv.corpdk.com" },
  { label: "GitHub", href: "https://github.com/Dave4272-Office" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/debraj-kundu/" },
] as const;

export const metadataFields = {
  title: site.title,
  description: site.description,
  alternates: {
    canonical: site.canonical,
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.canonical,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
  },
} as const;
