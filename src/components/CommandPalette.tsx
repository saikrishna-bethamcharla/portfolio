import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowDown,
  ArrowUp,
  Check,
  CornerDownLeft,
  Film,
  Layers,
  Mail,
  Search,
  X,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

/**
 * CommandPalette — ⌘K / Ctrl+K "mainframe" command surface.
 * Jumps between the three sections of the page and straight into any case on
 * the 3D shelf, with a couple of contact shortcuts.
 */

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onSelectProject: (projectId: string) => void;
}

type PaletteItem = {
  key: string;
  label: string;
  hint: string;
  group: 'SECTIONS' | 'PROJECTS' | 'ACTIONS';
  icon: LucideIcon;
  run: () => void;
  /** Keep the palette open so the command can report back */
  keepOpen?: boolean;
};

const SECTIONS = [
  { id: 'hero', label: 'Sai Krishna — Opening Frame', hint: '01 / HERO' },
  { id: 'contact', label: 'Direct Channels & Contact', hint: '02 / CONTACT' },
  { id: 'shelf', label: 'The Filmography Shelf', hint: '03 / 12 CASES' },
];

// Mirrors the case ids in public/projects.html
const PROJECTS = [
  { id: 'valley', title: 'Vasudha Pharma Chem Limited', category: 'WEBSITES' },
  { id: 'bluehour', title: 'Zai Labs AI Platform', category: 'WEBSITES' },
  { id: 'river', title: 'Pranic Healing Portal', category: 'WEBSITES' },
  { id: 'war', title: 'Virupaksha Wellness', category: 'WEBSITES' },
  { id: 'summer', title: 'The Door at 11:47', category: 'CINEMATIC' },
  { id: 'green', title: 'Odyssey Narrative', category: 'CINEMATIC' },
  { id: 'gmcks', title: 'GMCKS Documentary', category: 'MOTION & POST' },
  { id: 'birds', title: 'Neo Belva Commercial', category: 'MOTION & POST' },
  { id: 'godavari', title: 'Godavari Ghee Heritage Ad', category: 'MOTION & POST' },
  { id: 'storm', title: 'Green Field School International', category: 'MOTION & POST' },
  { id: 'tide', title: 'Aura Organics Luxury', category: 'BRAND SYSTEMS' },
  { id: 'door', title: 'Abacus Campus Brain Gym', category: 'BRAND SYSTEMS' },
];

const GROUP_ORDER: PaletteItem['group'][] = ['SECTIONS', 'PROJECTS', 'ACTIONS'];

export function CommandPalette({
  isOpen,
  onClose,
  onNavigateSection,
  onSelectProject,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const email = PORTFOLIO_DATA.profile.email;

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [email]);

  const items = useMemo<PaletteItem[]>(() => {
    const sectionItems: PaletteItem[] = SECTIONS.map((section) => ({
      key: `section-${section.id}`,
      label: section.label,
      hint: section.hint,
      group: 'SECTIONS',
      icon: Layers,
      run: () => onNavigateSection(section.id),
    }));

    const projectItems: PaletteItem[] = PROJECTS.map((project) => ({
      key: `project-${project.id}`,
      label: project.title,
      hint: project.category,
      group: 'PROJECTS',
      icon: Film,
      run: () => onSelectProject(project.id),
    }));

    const actionItems: PaletteItem[] = [
      {
        key: 'action-copy-email',
        label: copied ? 'Email copied to clipboard' : 'Copy direct email',
        hint: copied ? 'DONE' : email,
        group: 'ACTIONS',
        icon: copied ? Check : Mail,
        run: handleCopyEmail,
        keepOpen: true,
      },
      {
        key: 'action-mail',
        label: 'Start an email',
        hint: 'MAILTO',
        group: 'ACTIONS',
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${email}?subject=Project%20Inquiry%20%E2%80%94%20Sai%20Krishna`;
        },
      },
    ];

    return [...sectionItems, ...projectItems, ...actionItems];
  }, [copied, email, handleCopyEmail, onNavigateSection, onSelectProject]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      `${item.label} ${item.hint} ${item.group}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  // Reset the cursor whenever the result set changes shape
  useEffect(() => {
    setCursor(0);
  }, [query, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }
    setCopied(false);
    const id = window.setTimeout(() => inputRef.current?.focus(), 40);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const choose = useCallback(
    (item: PaletteItem | undefined) => {
      if (!item) return;
      if (item.keepOpen) {
        item.run();
        return;
      }
      onClose();
      // Let the overlay unmount before the page starts moving
      window.setTimeout(() => item.run(), 0);
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setCursor((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setCursor((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0,
        );
      } else if (event.key === 'Enter') {
        event.preventDefault();
        choose(filtered[cursor]);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [choose, cursor, filtered, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mainframe command palette"
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh] bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-sm border border-white/10 bg-[#08090b]/95 shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
          <Search className="h-4 w-4 shrink-0 text-[#a89c8a]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Jump to a section or a case…"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-results"
            aria-autocomplete="list"
            className="w-full bg-transparent font-mono text-[13px] tracking-wide text-[#f2ead9] placeholder:text-white/25 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="rounded-sm p-1 text-white/35 transition-colors hover:bg-white/5 hover:text-white/80"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Results */}
        <div
          id="command-palette-results"
          role="listbox"
          aria-label="Command results"
          className="max-h-[54vh] overflow-y-auto px-2 py-2"
        >
          {GROUP_ORDER.map((group) => {
            const groupItems = filtered.filter((item) => item.group === group);
            if (!groupItems.length) return null;
            return (
              <div key={group} className="mb-1">
                <p className="px-3 pb-1 pt-2 font-mono text-[9px] uppercase tracking-[0.32em] text-white/25">
                  {group}
                </p>
                {groupItems.map((item) => {
                  const index = filtered.indexOf(item);
                  const active = index === cursor;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setCursor(index)}
                      onClick={() => choose(item)}
                      className={`group flex w-full items-center justify-between gap-4 rounded-sm px-3 py-2.5 text-left transition-colors ${
                        active ? 'bg-white/[0.07]' : 'bg-transparent'
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon
                          className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                            active ? 'text-red-400' : 'text-[#8a8074]'
                          }`}
                          aria-hidden="true"
                        />
                        <span
                          className={`truncate text-[13.5px] transition-colors ${
                            active ? 'text-[#f6efe0]' : 'text-[#c9c0b1]'
                          }`}
                        >
                          {item.label}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="max-w-[16rem] truncate font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/30">
                          {item.hint}
                        </span>
                        {active && (
                          <CornerDownLeft
                            className="h-3 w-3 text-white/30"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <p className="px-3 py-6 font-mono text-[11px] tracking-wide text-white/30">
              No target matched “{query.trim()}”.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-black/40 px-4 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/30">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3" aria-hidden="true" />
              <ArrowDown className="h-3 w-3" aria-hidden="true" />
              MOVE
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" aria-hidden="true" />
              OPEN
            </span>
            <span>ESC CLOSE</span>
          </span>
          <span className="text-[#a89c8a]/60">MAINFRAME</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
