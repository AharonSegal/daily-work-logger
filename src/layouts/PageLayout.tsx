import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { PenLine, BarChart3, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { colors, spacing, typography, transitions, shadows } from '../theme';
import { media } from '../theme/breakpoints';
import type { PageName } from '../utils/types';

const navItems: { page: PageName; label: string; icon: typeof PenLine }[] = [
  { page: 'log', label: 'Log Entry', icon: PenLine },
  { page: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { page: 'schema', label: 'Schema', icon: Settings },
];

const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${colors.bg.primary};
`;

const TopNav = styled.nav`
  display: none;
  ${media.aboveMobile} {
    display: flex;
    align-items: center;
    gap: ${spacing.xxs};
    padding: ${spacing.sm} ${spacing.lg};
    background: ${colors.bg.secondary};
    border-bottom: 1px solid ${colors.border.default};
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(12px);
  }
`;

const Logo = styled.span`
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.bold};
  color: ${colors.accent.primary};
  margin-right: ${spacing.lg};
  letter-spacing: -0.5px;
`;

const BottomNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: ${spacing.xs} 0;
  padding-bottom: env(safe-area-inset-bottom, ${spacing.xs});
  background: ${colors.bg.secondary};
  border-top: 1px solid ${colors.border.default};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(12px);

  ${media.aboveMobile} { display: none; }
`;

const NavBtn = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: ${spacing.xs} ${spacing.md};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all ${transitions.normal};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  background: ${({ active }) => (active ? colors.accent.muted : 'transparent')};
  color: ${({ active }) => (active ? colors.accent.primary : colors.text.secondary)};

  &:hover {
    background: ${({ active }) => (active ? colors.accent.muted : colors.bg.hover)};
    color: ${({ active }) => (active ? colors.accent.primary : colors.text.primary)};
  }
  &:active { transform: scale(0.97); }

  svg { width: 18px; height: 18px; }

  /* Mobile: column layout, icon + label stacked */
  ${media.mobile} {
    flex-direction: column;
    gap: 2px;
    padding: ${spacing.xxs} ${spacing.sm};
    font-size: ${typography.size.xs};
    min-width: 64px;
    svg { width: 20px; height: 20px; }
  }
`;

const Content = styled.main`
  flex: 1;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: ${spacing.lg};
  padding-bottom: 100px; /* space for bottom nav on mobile */

  ${media.aboveMobile} {
    padding-bottom: ${spacing.lg};
  }
`;

interface Props { children: ReactNode; }

export default function PageLayout({ children }: Props) {
  const { state, setPage } = useApp();

  const navButtons = navItems.map(({ page, label, icon: Icon }) => (
    <NavBtn key={page} active={state.currentPage === page} onClick={() => setPage(page)}>
      <Icon />
      <span>{label}</span>
    </NavBtn>
  ));

  return (
    <Shell>
      <TopNav>
        <Logo>WorkLog</Logo>
        {navButtons}
      </TopNav>
      <Content>{children}</Content>
      <BottomNav>{navButtons}</BottomNav>
    </Shell>
  );
}
