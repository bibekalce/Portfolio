export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} className="py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white font-semibold">Manish Adhikari</p>
          <p className="text-slate-500 text-sm">AI/ML Graduate &amp; ICT Professional</p>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-500">
          {["About", "Projects", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-accent transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm font-mono">
          <a
            href="https://www.linkedin.com/in/manish-adhikari-b5667218b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/bibekalce"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-accent transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto mt-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-700"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <p>© 2026 Manish Adhikari</p>
        <p>Built with Next.js · Tailwind CSS · Framer Motion</p>
      </div>
    </footer>
  );
}
