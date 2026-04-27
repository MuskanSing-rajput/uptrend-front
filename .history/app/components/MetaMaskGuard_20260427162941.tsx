"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    connectMetaMask?: () => Promise<string[] | null>;
  }
}

export default function MetaMaskGuard() {
  useEffect(() => {
    const handler = (e: PromiseRejectionEvent) => {
      try {
        const reason: any = (e && (e.reason || (e as any).detail)) || '';
        const msg = typeof reason === 'string' ? reason : reason?.message || '';
        if (msg && msg.toLowerCase().includes('failed to connect to metamask')) {
          e.preventDefault();
          console.warn('MetaMask connection attempt failed (suppressed):', reason);
        }
      } catch (err) {
        // ignore
      }
    };

    window.addEventListener('unhandledrejection', handler as any);

    window.connectMetaMask = async () => {
      if (typeof window === 'undefined') return null;
      const anyWin: any = window;
      if (!anyWin.ethereum) {
        // Graceful UI action: return null so caller can show install prompt
        return null;
      }
      try {
        const accounts: string[] = await anyWin.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts;
      } catch (err) {
        console.warn('MetaMask connect aborted or failed:', err);
        return null;
      }
    };

    return () => {
      window.removeEventListener('unhandledrejection', handler as any);
      try { delete (window as any).connectMetaMask; } catch (e) {}
    };
  }, []);

  return null;
}
