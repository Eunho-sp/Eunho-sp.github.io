import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border py-6 px-4 text-center text-sm text-muted">
      <p>
        &copy; {new Date().getFullYear()} {SITE.author} &middot;{" "}
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
