import { expect, test } from "vitest";
import { metadataFields, proofLinks, site } from "./content";

test("hello@corpdk.com is the only mailbox and mailto is exact", () => {
  expect(site.mail.address).toBe("hello@corpdk.com");
  expect(site.mail.href).toBe("mailto:hello@corpdk.com");

  const serialized = JSON.stringify({ site, proofLinks, metadataFields });
  const mailboxes = serialized.match(/[a-z0-9._%+-]+@corpdk\.com/gi) ?? [];
  expect(new Set(mailboxes)).toEqual(new Set(["hello@corpdk.com"]));
});

test("proof link hrefs match the spec", () => {
  expect(proofLinks).toEqual([
    { label: "Curriculum vitae", href: "https://cv.corpdk.com" },
    { label: "GitHub", href: "https://github.com/Dave4272-Office" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/debraj-kundu/" },
  ]);
});

test("GSTIN string is exact, with letter O in HVOPK", () => {
  expect(site.gstin).toBe("GSTIN : 19HVOPK1815H1Z7");
  expect(site.gstin).toContain("HVOPK");
  expect(site.gstin).not.toContain("HV0PK");
});

test("metadata title, description, and canonical match the spec", () => {
  expect(metadataFields.title).toBe("CorpDK — Debraj Kundu");
  expect(metadataFields.description).toContain("independent software practice");
  expect(metadataFields.description).toContain("hello@corpdk.com");
  expect(metadataFields.alternates.canonical).toBe("https://corpdk.com/");
  expect(metadataFields.openGraph).not.toHaveProperty("images");
  expect(metadataFields.twitter).not.toHaveProperty("images");
});

test("place is Kolkata, India without a state", () => {
  expect(site.person.place).toBe("Kolkata, India");
  expect(site.person.place).not.toMatch(/West Bengal|WB/i);
});
