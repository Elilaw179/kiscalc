'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Calculator, Replace, FunctionSquare, LineChart, BookText, BeakerIcon, PanelLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '../ui/button';

const navItems = [
  { href: '/', label: 'Calculator', icon: Calculator },
  { href: '/unit-converter', label: 'Unit Converter', icon: Replace },
  { href: '/equation-solver', label: 'Equation Solver', icon: FunctionSquare },
  { href: '/graph-plotter', label: 'Graph Plotter', icon: LineChart },
  { href: '/formula-library', label: 'Formula Library', icon: BookText },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <BeakerIcon className="h-8 w-8 text-accent" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tighter">KourklysCalc</span>
              <span className="text-xs text-muted-foreground">Kourklys International School</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, side: 'right', align: 'center', className: isMobile ? 'hidden': '' }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
          <SidebarTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <PanelLeft />
            </Button>
          </SidebarTrigger>
          <h1 className="text-lg font-semibold">KourklysCalc</h1>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
