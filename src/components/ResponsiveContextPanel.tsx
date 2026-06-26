import React, { RefObject } from 'react';
import {
  DESKTOP_TOP_PANE_CLASS,
  MOBILE_CONTEXT_PANEL_CLASS,
} from '@/lib/pageLayout';

/* ─── Desktop-only top pane (fixed height in split pane) ──────── */
type DesktopTopPaneProps = {
  children: React.ReactNode;
  topPaneRef?: RefObject<HTMLDivElement>;
  topHeight?: number;
  className?: string;
  innerClassName?: string;
};

export function DesktopTopPane({
  children,
  topPaneRef,
  topHeight,
  className = '',
  innerClassName = '',
}: DesktopTopPaneProps) {
  return (
    <div
      ref={topPaneRef}
      style={topHeight != null ? { height: `${topHeight}px` } : undefined}
      className={`${DESKTOP_TOP_PANE_CLASS} ${className}`.trim()}
    >
      {innerClassName ? <div className={innerClassName}>{children}</div> : children}
    </div>
  );
}

/* ─── Mobile-only inline section ─────────────────────────────── */
type MobileContextSectionProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  show?: boolean;
};

export function MobileContextSection({
  children,
  className = '',
  innerClassName = '',
  show = true,
}: MobileContextSectionProps) {
  if (!show) return null;
  return (
    <div className={`${MOBILE_CONTEXT_PANEL_CLASS} ${className}`.trim()}>
      {innerClassName ? <div className={innerClassName}>{children}</div> : children}
    </div>
  );
}

/** @deprecated Use DesktopTopPane + MobileContextSection directly */
export default function ResponsiveContextPanel(
  props: DesktopTopPaneProps & { showMobile?: boolean }
) {
  const { showMobile = true, ...desktopProps } = props;
  return (
    <>
      <DesktopTopPane {...desktopProps} />
      {showMobile && (
        <MobileContextSection innerClassName={desktopProps.innerClassName}>
          {desktopProps.children}
        </MobileContextSection>
      )}
    </>
  );
}
