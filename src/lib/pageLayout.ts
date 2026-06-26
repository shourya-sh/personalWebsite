export function pageRootClass(isOpen: boolean, extra = '') {
  return `min-h-full flex flex-col xl:h-full xl:grid transition-all duration-300 ease-in-out bg-[#0a0a0a] ${
    isOpen ? 'xl:grid-cols-[1fr_260px]' : 'xl:grid-cols-[1fr_0px]'
  } ${extra}`.trim();
}

/** On mobile: full-height column. On desktop: fixed height in grid. */
export const TERMINAL_COLUMN_CLASS =
  'flex flex-col xl:h-full w-full overflow-hidden border-r border-[#1f1f1f] shrink-0';

export const DESKTOP_TOP_PANE_CLASS =
  'hidden xl:block w-full shrink-0 overflow-hidden bg-[#0a0a0a]';

export const MOBILE_CONTEXT_PANEL_CLASS =
  'xl:hidden w-full border-t border-[#1f1f1f] bg-[#0a0a0a]';

export const DESKTOP_RESIZER_CLASS =
  'hidden xl:flex w-full h-1.5 bg-[#1f1f1f] cursor-row-resize hover:bg-[#333] transition-colors shrink-0 z-50 items-center justify-center opacity-80 pointer-events-auto';
