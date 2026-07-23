"use client";

export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    if (root.getAttribute("data-theme") === "dark") {
      root.removeAttribute("data-theme");
      localStorage.setItem("golc-theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("golc-theme", "dark");
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light or dark theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel text-ink transition-colors duration-[120ms] ease-out hover:border-accent"
    >
      <span className="theme-ic theme-ic-moon">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 14.2A8 8 0 1 1 9.8 4 6.4 6.4 0 0 0 20 14.2z" />
        </svg>
      </span>
      <span className="theme-ic theme-ic-sun">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M4.4 12H2.2M21.8 12h-2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
        </svg>
      </span>
    </button>
  );
}
