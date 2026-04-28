"use client";

import { useEffect } from "react";

export default function UnhandledRejectionGuard() {
  useEffect(() => {
    const handler = (e: PromiseRejectionEvent) => {
      try {
        const reason: any = (e && (e.reason || (e as any).detail)) || '';
        const msg = typeof reason === 'string' ? reason : reason?.message || '';
        if (msg && msg.toLowerCase().includes('failed to connect to metamask')) {
          e.preventDefault();
          if (process.env.NODE_ENV === "development") {
            console.warn('Suppressed MetaMask unhandledRejection:', reason);
          }
        }
      } catch (err) {
        // ignore
      }
    };

    window.addEventListener('unhandledrejection', handler as any);
    return () => window.removeEventListener('unhandledrejection', handler as any);
  }, []);

  return null;
}
