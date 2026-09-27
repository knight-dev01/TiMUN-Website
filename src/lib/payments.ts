/**
 * Dual-currency registration fees + Paystack checkout.
 *
 * - USD is the base price (matches existing $65 / $110+$55 / $0 copy).
 * - NGN is derived via VITE_NGN_PER_USD (default 1500) so executives can
 *   update the rate without touching code.
 * - Paystack Inline (https://js.paystack.co/v1/inline.js) handles BOTH
 *   Naira and Dollar card payments — currency is passed per-checkout.
 * - If no VITE_PAYSTACK_PUBLIC_KEY is set, checkout runs in DEMO/manual
 *   mode (bank transfer + pay-on-arrival) so the site never breaks.
 */

export type PaymentCurrency = 'NGN' | 'USD';
export type RegistrationType = 'individual' | 'delegation' | 'chair';

export const NGN_PER_USD: number = (() => {
  const raw = (import.meta as any)?.env?.VITE_NGN_PER_USD;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 1500;
})();

export function paystackPublicKey(): string {
  return (import.meta as any)?.env?.VITE_PAYSTACK_PUBLIC_KEY || '';
}

export function isPaystackConfigured(): boolean {
  return paystackPublicKey().startsWith('pk_');
}

/** Base fees in USD. */
export function feeUsd(type: RegistrationType, delegationSize = 5): number {
  if (type === 'individual') return 65;
  if (type === 'delegation') return 110 + Math.max(2, delegationSize) * 55;
  return 0; // chair — free / honorarium
}

export function convertUsdToNgn(usd: number): number {
  // Round to nearest 100 NGN for clean bank-transfer figures.
  return Math.round((usd * NGN_PER_USD) / 100) * 100;
}

export function feeFor(
  type: RegistrationType,
  currency: PaymentCurrency,
  delegationSize = 5
): { amount: number; currency: PaymentCurrency; usd: number } {
  const usd = feeUsd(type, delegationSize);
  if (currency === 'USD') return { amount: usd, currency, usd };
  return { amount: convertUsdToNgn(usd), currency, usd };
}

export function formatMoney(amount: number, currency: PaymentCurrency): string {
  try {
    return new Intl.NumberFormat(currency === 'NGN' ? 'en-NG' : 'en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: currency === 'NGN' ? 0 : amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

/** Paystack takes the SMALLEST unit: kobo for NGN, cents for USD. */
export function toSmallestUnit(amount: number, currency: PaymentCurrency): number {
  return Math.round(amount * 100);
}

// ---- Paystack Inline loader ----

declare global {
  interface Window {
    PaystackPop?: {
      setup: (opts: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

let paystackLoading: Promise<void> | null = null;

export function loadPaystackScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.PaystackPop) return Promise.resolve();
  if (paystackLoading) return paystackLoading;
  paystackLoading = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://js.paystack.co/v1/inline.js';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Could not load Paystack checkout. Check your connection.'));
    document.head.appendChild(s);
  });
  return paystackLoading;
}

export interface PaystackResult {
  reference: string;
  status?: string;
  trans?: string;
}

/**
 * Open Paystack checkout. Resolves with the transaction reference.
 * Rejects on close/failure — caller should track payment_failed.
 */
export function payWithPaystack(opts: {
  email: string;
  amount: number;
  currency: PaymentCurrency;
  reference: string;
  metadata?: Record<string, string | number>;
}): Promise<PaystackResult> {
  return (async () => {
    await loadPaystackScript();
    const key = paystackPublicKey();
    if (!key) throw new Error('Paystack is not configured (missing VITE_PAYSTACK_PUBLIC_KEY).');
    if (!window.PaystackPop) throw new Error('Paystack failed to initialise.');

    return new Promise<PaystackResult>((resolve, reject) => {
      const handler = window.PaystackPop!.setup({
        key,
        email: opts.email,
        amount: toSmallestUnit(opts.amount, opts.currency),
        currency: opts.currency,
        ref: opts.reference,
        metadata: opts.metadata || {},
        callback: (response: PaystackResult) => resolve(response),
        onClose: () => reject(new Error('Payment window closed before completion.')),
      });
      handler.openIframe();
    });
  })();
}

/** Bank-transfer / manual instructions shown when Paystack is off or as fallback. */
export function manualPaymentDetails(): {
  bank: string;
  accountName: string;
  accountNumber: string;
  note: string;
} {
  const env = (import.meta as any)?.env || {};
  return {
    bank: env.VITE_BANK_NAME || 'To be announced by the Secretariat',
    accountName: env.VITE_BANK_ACCOUNT_NAME || 'TiMUN Conference Account',
    accountNumber: env.VITE_BANK_ACCOUNT_NUMBER || '—',
    note:
      env.VITE_BANK_NOTE ||
      'Use your Registration Ref (e.g. TiMUN-2027-123456) as the transfer narration, then WhatsApp/email your receipt to secretariat@timun.org for manual confirmation.',
  };
}
