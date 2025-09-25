"use client";
import { useEffect, useMemo, useState } from "react";
import { getCurrentLanguage, setLanguage, subscribeToLanguageChange } from "@/i18n/i18n";

const LANGS = [
  { code: "en", name: "English",   flag: "fi-us" },
  { code: "vi", name: "Tiếng Việt", flag: "fi-vn" },
  { code: "ko", name: "한국어",      flag: "fi-kr" },
];

export default function LanguageSelector() {
  const [isOpen, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [lang, setLang] = useState(getCurrentLanguage());

  useEffect(() => {
    const unsub = subscribeToLanguageChange(() => setLang(getCurrentLanguage()));
    return () => unsub?.();
  }, []);

  const current = useMemo(() => LANGS.find(l => l.code === lang) || LANGS[0], [lang]);

  const onChange = async (code) => {
    if (code === lang) return setOpen(false);
    setBusy(true);
    try {
      await setLanguage(code);
    } finally {
      setBusy(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 text-sm text-white border rounded-lg hover:bg-white/10 lg:hover:bg-gray-50 lg:text-gray-800 border-white/40 lg:border-gray-300"
        onClick={() => setOpen(!isOpen)}
        disabled={busy}
        aria-label={`Current language: ${current.name}`}
      >
        <span className={`fi ${current.flag} w-5 h-5 rounded-sm`} />
        <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-50 min-w-[160px] p-1">
          {LANGS.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 ${active ? "bg-blue-50 text-blue-600" : ""}`}
                onClick={() => onChange(l.code)}
                disabled={busy}
              >
                <span className={`fi ${l.flag} w-5 h-5 rounded-sm`} />
                <span>{l.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}
    </div>
  );
}
