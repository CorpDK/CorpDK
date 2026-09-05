import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Providers } from "./app/providers";
import { DoorwayPage } from "./components/doorway-page";
import { metadataFields, proofLinks, site } from "./lib/content";
import nextConfig from "../next.config";
import sitemap from "./app/sitemap";

vi.mock("next/font/google", () => ({
  Rochester: () => ({ variable: "--font-wordmark", className: "" }),
  Carter_One: () => ({ variable: "--font-name", className: "" }),
  Noto_Sans: () => ({ variable: "--font-sans", className: "" }),
  Noto_Sans_Mono: () => ({ variable: "--font-mono", className: "" }),
}));

vi.mock("@next/third-parties/google", () => ({
  GoogleTagManager: () => null,
}));

function renderDoorway() {
  return render(
    <Providers>
      <DoorwayPage />
    </Providers>,
  );
}

test("renders one h1 named CorpDK", () => {
  renderDoorway();

  const headings = screen.getAllByRole("heading", { level: 1 });
  expect(headings).toHaveLength(1);
  expect(headings[0]).toHaveTextContent("CorpDK");
});

test("hello@corpdk.com is the only mailbox and mailto href is exact", () => {
  const { container } = renderDoorway();

  const mail = screen.getByRole("link", { name: "hello@corpdk.com" });
  expect(mail).toHaveAttribute("href", "mailto:hello@corpdk.com");

  const hrefs = [...container.querySelectorAll("a")].map((anchor) =>
    anchor.getAttribute("href"),
  );
  const mailtos = hrefs.filter((href) => href?.startsWith("mailto:"));
  expect(mailtos).toEqual(["mailto:hello@corpdk.com"]);
  expect(screen.getAllByRole("link", { name: /@corpdk\.com/i })).toHaveLength(1);

  const unpublished = [
    "info@",
    "feedback@",
    "dave.blogs@",
    "acctrials@",
    "dir.dave001@",
    "catchall@",
    "domain.contact@",
    "blog@",
    "writing@",
  ];
  const text = container.textContent ?? "";
  for (const local of unpublished) {
    expect(text).not.toContain(`${local}corpdk.com`);
  }
});

test("proof links match the spec and stay in the same tab", () => {
  renderDoorway();

  for (const link of proofLinks) {
    const anchor = screen.getByRole("link", { name: link.label });
    expect(anchor).toHaveAttribute("href", link.href);
    expect(anchor).not.toHaveAttribute("target");
  }
});

test("GSTIN string is exact selectable text", () => {
  renderDoorway();

  expect(screen.getByText("GSTIN : 19HVOPK1815H1Z7")).toBeInTheDocument();
});

test("has no form, no /work or /blog links, and no Bengali", () => {
  const { container } = renderDoorway();

  expect(container.querySelector("form")).toBeNull();
  expect(screen.queryByRole("link", { name: /work|blog/i })).not.toBeInTheDocument();

  const hrefs = [...container.querySelectorAll("a")].map((anchor) =>
    anchor.getAttribute("href"),
  );
  expect(hrefs.some((href) => href === "/work" || href === "/blog")).toBe(false);
  expect(container.textContent).not.toMatch(/[\u0980-\u09FF]/);
  expect(container.textContent).not.toContain("কর্পডিকে");
});

test("theme toggle is present with an accessible name", () => {
  renderDoorway();

  expect(
    screen.getByRole("button", { name: /theme:/i }),
  ).toBeInTheDocument();
});

test("metadata title, description, and canonical match the spec", async () => {
  const { metadata } = await import("./app/layout");

  expect(metadata.title).toBe("CorpDK — Debraj Kundu");
  expect(metadata.description).toBe(site.description);
  expect(metadata.alternates?.canonical).toBe("https://corpdk.com/");
  expect(metadata).toEqual(metadataFields);
  expect(metadata.openGraph).not.toHaveProperty("images");
  expect(metadata.twitter).not.toHaveProperty("images");
});

test("CSP has no unpkg and fonts stay self-hosted", async () => {
  const headers = nextConfig.headers ? await nextConfig.headers() : [];
  const csp =
    headers
      .flatMap((entry) => entry.headers)
      .find((header) => header.key === "Content-Security-Policy")?.value ?? "";

  expect(csp).toContain("font-src 'self'");
  expect(csp).not.toContain("unpkg");
  expect(csp).not.toContain("fonts.googleapis.com");
  expect(csp).not.toContain("fonts.gstatic.com");
  expect(csp).toContain("www.googletagmanager.com");
});

test("does not add a catch-all redirect module", () => {
  expect(existsSync(join(process.cwd(), "src/app/[...slug]"))).toBe(false);
  expect(existsSync(join(process.cwd(), "src/app/[...slug]/page.tsx"))).toBe(
    false,
  );
});

test("sitemap lists only the apex URL", () => {
  expect(sitemap()).toEqual([{ url: "https://corpdk.com/" }]);
});

test("robots.txt allows /", () => {
  const robots = readFileSync(join(process.cwd(), "public/robots.txt"), "utf8");
  expect(robots).toMatch(/Allow:\s*\/\s*$/m);
  expect(robots).not.toMatch(/Disallow:\s*\/\s*$/m);
});
