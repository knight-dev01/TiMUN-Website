import React, { useMemo, useState } from 'react';
import { Download, Trash2, Search, CheckCircle2, Clock, XCircle, BarChart3, Users, Wallet, Eye } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';
import { getAnalyticsEvents, getAnalyticsSummary, clearAnalyticsEvents } from '../lib/analytics';
import { formatMoney } from '../lib/payments';
import { RegistrationRecord } from '../types';

function toCsv(rows: RegistrationRecord[]): string {
  const header = ['id', 'createdAt', 'type', 'fullName', 'email', 'phone', 'institution', 'delegationSize', 'firstChoiceCommittee', 'secondChoiceCommittee', 'preferredCountries', 'feeUsd', 'feeCharged', 'feeCurrency', 'paymentStatus', 'paymentMethod', 'paymentReference'];
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = [header.join(',')];
  for (const r of rows) {
    lines.push([
      r.id, new Date(r.createdAt).toISOString(), r.type, r.fullName, r.email, r.phone,
      r.institution, r.delegationSize, r.firstChoiceCommittee, r.secondChoiceCommittee,
      r.preferredCountries, r.feeUsd, r.feeCharged, r.feeCurrency, r.paymentStatus,
      r.paymentMethod, r.paymentReference,
    ].map(esc).join(','));
  }
  return lines.join('\n');
}

function download(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const ExecutiveOverview: React.FC = () => {
  const { registrations } = useConferenceData();
  const [, force] = useState(0);
  const summary = useMemo(() => getAnalyticsSummary(), [registrations]);

  const paid = registrations.filter(r => r.paymentStatus === 'paid');
  const pending = registrations.filter(r => r.paymentStatus === 'pending');
  const revenueNgn = paid.filter(r => r.feeCurrency === 'NGN').reduce((s, r) => s + r.feeCharged, 0);
  const revenueUsd = paid.filter(r => r.feeCurrency === 'USD').reduce((s, r) => s + r.feeCharged, 0);
  const pendingNgn = pending.filter(r => r.feeCurrency === 'NGN').reduce((s, r) => s + r.feeCharged, 0);
  const pendingUsd = pending.filter(r => r.feeCurrency === 'USD').reduce((s, r) => s + r.feeCharged, 0);

  const byCommittee = useMemo(() => {
    const m = new Map<string, { total: number; paid: number }>();
    for (const r of registrations) {
      const k = r.firstChoiceCommittee || '—';
      const cur = m.get(k) || { total: 0, paid: 0 };
      cur.total += 1;
      if (r.paymentStatus === 'paid') cur.paid += 1;
      m.set(k, cur);
    }
    return [...m.entries()].sort((a, b) => b[1].total - a[1].total);
  }, [registrations]);

  const maxDay = Math.max(1, ...summary.byDay.map(d => d.count));

  const cards = [
    { icon: Users, label: 'Registrations', value: String(registrations.length), sub: `${paid.length} paid • ${pending.length} pending` },
    { icon: Wallet, label: 'Collected', value: `${formatMoney(revenueNgn, 'NGN')} + $${revenueUsd.toLocaleString()}`, sub: `Pending: ${formatMoney(pendingNgn, 'NGN')} + $${pendingUsd.toLocaleString()}` },
    { icon: Eye, label: 'Page views', value: String(summary.pageViews), sub: `${summary.totalEvents} total events tracked` },
    { icon: BarChart3, label: 'Funnel', value: `${summary.registrationCompleted}/${summary.registrationStarted}`, sub: `Completed / started • ${summary.paymentSuccess} payments ok` },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-[#5f3a00] text-xs font-bold uppercase tracking-wider">
              <c.icon className="w-4 h-4" />
              <span>{c.label}</span>
            </div>
            <div className="text-xl font-extrabold text-slate-800 mt-2 break-words">{c.value}</div>
            <div className="text-[11px] text-slate-500 mt-1">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#5f3a00] mb-3">Registrations by committee</h4>
          {byCommittee.length === 0 && <p className="text-xs text-slate-500">No registrations yet. Share the registration link to start filling committees.</p>}
          <div className="space-y-2">
            {byCommittee.map(([name, v]) => (
              <div key={name} className="flex items-center gap-3 text-xs">
                <span className="w-32 truncate text-slate-700 font-bold">{name}</span>
                <div className="flex-1 h-2 rounded-xl bg-slate-200 overflow-hidden">
                  <div className="h-full bg-[#f4a024]" style={{ width: `${Math.max(4, (v.total / Math.max(1, registrations.length)) * 100)}%` }} />
                </div>
                <span className="text-slate-500 w-20 text-right">{v.total} total • {v.paid} paid</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5f3a00]">Site activity (last 14 days)</h4>
            <button
              onClick={() => { clearAnalyticsEvents(); force(x => x + 1); }}
              className="text-[11px] text-slate-500 hover:text-rose-300 cursor-pointer"
            >
              Reset stats
            </button>
          </div>
          {summary.byDay.length === 0 && <p className="text-xs text-slate-500">No tracked events yet.</p>}
          <div className="flex items-end gap-1.5 h-24">
            {summary.byDay.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1" title={`${d.day}: ${d.count}`}>
                <div className="w-full rounded-t bg-[#eef4fa]0/70" style={{ height: `${Math.max(4, (d.count / maxDay) * 80)}px` }} />
                <span className="text-[9px] text-slate-500">{d.day.slice(5)}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            Events tracked locally: page_view, registration_started/completed, payment_initiated/success/failed, resolution_builder_opened.
            { ' '}Set VITE_GA_MEASUREMENT_ID to also forward to Google Analytics 4.
          </p>
        </div>
      </div>
    </div>
  );
};

export const RegistrationsManager: React.FC<{ notify: (t: 'success' | 'error', m: string) => void }> = ({ notify }) => {
  const { registrations, updateRegistrationPayment, deleteRegistration } = useConferenceData();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | 'paid' | 'pending' | 'failed' | 'waived'>('all');

  const filtered = registrations.filter(r => {
    if (status !== 'all' && r.paymentStatus !== status) return false;
    if (!q) return true;
    const s = `${r.fullName} ${r.email} ${r.institution} ${r.id} ${r.firstChoiceCommittee}`.toLowerCase();
    return s.includes(q.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search name, email, institution, ref, committee…"
            className="w-full bg-white border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 outline-none focus:border-[#f4a024]"
          />
        </div>
        <select
          value={status}
          onChange={e => setStatus(e.target.value as any)}
          className="bg-white border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none"
        >
          <option value="all">All statuses ({registrations.length})</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="waived">Waived</option>
        </select>
        <button
          onClick={() => { download(`timun-registrations-${new Date().toISOString().slice(0,10)}.csv`, toCsv(filtered)); notify('success', `Exported ${filtered.length} registrations to CSV.`); }}
          className="px-4 py-2 bg-[#f4a024] hover:bg-[#f4a024] text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {filtered.length === 0 && (
        <p className="text-xs text-slate-500 bg-slate-100 border border-slate-200 rounded-xl p-4 text-center">
          No registrations match. New sign-ups from the Registration modal appear here instantly (with fee, currency, payment status + reference).
        </p>
      )}

      <div className="space-y-2">
        {filtered.map(r => (
          <div key={r.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap gap-3 items-center text-xs">
            <div className="min-w-[200px] flex-1">
              <div className="font-bold text-slate-800">{r.fullName} <span className="text-slate-500">• {r.id}</span></div>
              <div className="text-slate-500">{r.email} • {r.institution} • {r.type} • {r.firstChoiceCommittee}</div>
              <div className="text-slate-500 mt-0.5">
                {formatMoney(r.feeCharged, r.feeCurrency)} ({r.feeCurrency}) • {r.paymentMethod} • {new Date(r.createdAt).toLocaleString()}
              </div>
            </div>
            <span className={`px-2 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
              r.paymentStatus === 'paid' ? 'bg-[#1f4a32]/60 text-[#9adbb5] border border-[#35794f]'
              : r.paymentStatus === 'pending' ? 'bg-[#5f3a00]/40 text-[#5f3a00] border border-[#5f3a00]'
              : r.paymentStatus === 'waived' ? 'bg-[#00387d]/50 text-[#8fb0d8] border border-blue-700'
              : 'bg-[#fde2e2] text-rose-300 border border-[#f8bcbc]'
            }`}>
              {r.paymentStatus === 'paid' ? <CheckCircle2 className="w-3 h-3" /> : r.paymentStatus === 'pending' ? <Clock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
              {r.paymentStatus}
            </span>
            <div className="flex gap-1.5">
              <button onClick={() => { updateRegistrationPayment(r.id, { paymentStatus: 'paid' }); notify('success', `${r.id} marked as paid.`); }} className="px-2.5 py-1.5 rounded-xl bg-[#2c6543] hover:bg-[#35794f] text-[#dcf3e5] font-bold cursor-pointer">Mark paid</button>
              <button onClick={() => { updateRegistrationPayment(r.id, { paymentStatus: 'pending' }); notify('success', `${r.id} marked as pending.`); }} className="px-2.5 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold cursor-pointer">Pending</button>
              <button onClick={() => { if (window.confirm(`Delete registration ${r.id}?`)) { deleteRegistration(r.id); notify('success', 'Registration deleted.'); } }} className="px-2.5 py-1.5 rounded-xl bg-[#fde2e2] hover:bg-[#f8bcbc] text-[#a80e0e] cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function exportRegistrationsCsv(all: RegistrationRecord[]) {
  download(`timun-registrations-${new Date().toISOString().slice(0,10)}.csv`, toCsv(all));
}

export function logAnalyticsSnapshot(): number {
  return getAnalyticsEvents().length;
}
