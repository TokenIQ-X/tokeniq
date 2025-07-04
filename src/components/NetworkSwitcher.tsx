'use client';

import { useNetwork } from '@/hooks/useNetwork';
import { SUPPORTED_CHAINS, CHAIN_ICONS } from '@/utils/networks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export function NetworkSwitcher() {
  const { chain, switchChain } = useNetwork();

  if (!chain) {
    return (
      <Button variant="outline" disabled>
        <span>Loading...</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span>{CHAIN_ICONS[chain.id] || '🌐'}</span>
          <span className="hidden sm:inline">{chain.name}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {SUPPORTED_CHAINS.map((supportedChain) => (
          <DropdownMenuItem
            key={supportedChain.id}
            onClick={() => switchChain(supportedChain.id)}
            className={`flex items-center gap-2 cursor-pointer ${
              chain.id === supportedChain.id ? 'bg-accent' : ''
            }`}
          >
            <span>{CHAIN_ICONS[supportedChain.id] || '🔗'}</span>
            <span>{supportedChain.name}</span>
            {chain.id === supportedChain.id && (
              <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
