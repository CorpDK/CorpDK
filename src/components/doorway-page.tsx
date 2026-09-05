import { proofLinks, site } from "../lib/content";
import { ThemeToggle } from "./theme-toggle";

export function DoorwayPage() {
  return (
    <div className="doorway">
      <header className="doorway__header">
        <ThemeToggle />
        <h1 className="doorway__wordmark">{site.brand}</h1>
      </header>

      <main className="doorway__main">
        <p className="doorway__sentence">{site.sentence}</p>

        <p className="doorway__person">
          <span className="doorway__name">{site.person.name}</span>
          <span className="doorway__role">
            {site.person.roleMark}
            {site.person.role}
          </span>
          <span className="doorway__place">
            {site.person.roleMark}
            {site.person.place}
          </span>
        </p>

        <ul className="doorway__proof">
          {proofLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <p className="doorway__mail">
          <a href={site.mail.href}>{site.mail.address}</a>
        </p>
      </main>

      <footer className="doorway__footer">
        <p className="doorway__gstin">{site.gstin}</p>
        <p className="doorway__privacy">{site.privacy}</p>
      </footer>
    </div>
  );
}
