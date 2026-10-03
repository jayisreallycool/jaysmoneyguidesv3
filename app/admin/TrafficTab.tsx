'use client';

import { useMemo, useState } from 'react';
import { Activity, Eye, Users, FileText, BarChart2, Table2 } from 'lucide-react';
import { Card, SectionHeader, StatCard } from './ui';

export interface TrafficDay {
  date: string; // YYYY-MM-DD (UTC)
  views: number;
  visits: number;
  pages: Record<string, number>;
  referrers: Record<string, number>;
  devices: Record<string, number>;
  countries: Record<string, number>;
}

type Metric = 'views' | 'visits';
const METRIC_LABEL: Record<Metric, string> = { views: 'Page views', visits: 'Visits' };

const dayLabel = (iso: string, long = false) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', timeZone: 'UTC', ...(long ? { weekday: 'short' } : {}),
  });

/** Round the top of the axis up to a tidy number. */
function niceMax(n: number): number {
  if (n <= 4) return 4;
  const pow = 10 ** Math.floor(Math.log10(n));
  for (const m of [1, 2, 4, 5, 10]) if (n <= m * pow) return m * pow;
  return 10 * pow;
}

function sumMaps(days: TrafficDay[], key: 'pages' | 'referrers' | 'devices' | 'countries') {
  const out: Record<string, number> = {};
  for (const d of days) for (const [k, n] of Object.entries(d[key])) out[k] = (out[k] || 0) + n;
  return Object.entries(out).sort((a, b) => b[1] - a[1]);
}

let regionNames: Intl.DisplayNames | null = null;
function countryName(code: string) {
  try {
    regionNames ??= new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(code) || code;
  } catch {
    return code;
  }
}

function Segmented<T extends string>({ value, onChange, options, label }: {
  value: T; onChange: (v: T) => void; options: { id: T; label: React.ReactNode }[]; label: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex gap-1 rounded-lg border border-slate-800 bg-slate-950/60 p-0.5">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
          className={`min-h-0! inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
            value === o.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ── Daily bar chart: one series, one axis ─────────────────────────────────────
function DailyBars({ days, metric }: { days: TrafficDay[]; metric: Metric }) {
  const [active, setActive] = useState<number | null>(null);
  const max = niceMax(Math.max(...days.map((d) => d[metric]), 0));
  const ticks = [max, max / 2, 0];
  const every = days.length > 10 ? 7 : 1;

  return (
    <div className="flex gap-2" onMouseLeave={() => setActive(null)}>
      {/* y axis */}
      <div className="relative h-48 w-8 shrink-0 text-[10px] tabular-nums text-slate-500" aria-hidden="true">
        {ticks.map((t, i) => (
          <span key={t} className="absolute right-0 -translate-y-1/2" style={{ top: `${(i / 2) * 100}%` }}>
            {t.toLocaleString()}
          </span>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <div className="relative h-48">
          {ticks.map((t, i) => (
            <span key={t} className={`absolute inset-x-0 h-px ${t === 0 ? 'bg-slate-700' : 'bg-slate-800/70'}`} style={{ top: `${(i / 2) * 100}%` }} aria-hidden="true" />
          ))}
          <ul className="absolute inset-0 flex items-end gap-[2px]" aria-label={`${METRIC_LABEL[metric]} per day`}>
            {days.map((d, i) => {
              const v = d[metric];
              const on = active === i;
              const edge = i < days.length * 0.25 ? 'left-0' : i > days.length * 0.75 ? 'right-0' : 'left-1/2 -translate-x-1/2';
              return (
                <li
                  key={d.date}
                  tabIndex={0}
                  aria-label={`${dayLabel(d.date, true)}: ${v.toLocaleString()} ${METRIC_LABEL[metric].toLowerCase()}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(i)}
                  className="relative flex h-full min-w-0 flex-1 items-end justify-center outline-none"
                >
                  {on && <span className="absolute inset-0 rounded-sm bg-slate-800/50" aria-hidden="true" />}
                  <span
                    className={`relative w-full max-w-6 rounded-t-[4px] transition-colors ${on ? 'bg-emerald-300' : 'bg-emerald-500'}`}
                    style={{ height: v > 0 ? `max(2px, ${(v / max) * 100}%)` : 0 }}
                  />
                  {on && (
                    <span role="tooltip" className={`pointer-events-none absolute bottom-full z-10 mb-1 whitespace-nowrap rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-left shadow-xl ${edge}`}>
                      <span className="block text-[11px] text-slate-400">{dayLabel(d.date, true)}</span>
                      <span className="block text-sm font-bold text-white tabular-nums">
                        {v.toLocaleString()} <span className="text-[11px] font-medium text-slate-400">{METRIC_LABEL[metric].toLowerCase()}</span>
                      </span>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        {/* x axis */}
        <div className="mt-1.5 flex gap-[2px] text-[10px] text-slate-500" aria-hidden="true">
          {days.map((d, i) => (
            <span key={d.date} className="relative h-4 min-w-0 flex-1">
              {(days.length - 1 - i) % every === 0 && (
                <span className={`absolute whitespace-nowrap ${i === days.length - 1 ? 'right-0' : 'left-1/2 -translate-x-1/2'}`}>
                  {dayLabel(d.date)}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Ranked list with share bars ───────────────────────────────────────────────
function Ranked({ title, sub, rows, empty, format }: {
  title: string; sub?: string; rows: [string, number][]; empty: string; format?: (k: string) => React.ReactNode;
}) {
  const total = rows.reduce((s, [, n]) => s + n, 0);
  return (
    <Card className="min-w-0">
      <SectionHeader title={title} sub={sub} />
      {rows.length === 0 ? (
        <p className="text-sm text-slate-500">{empty}</p>
      ) : (
        <ol className="space-y-2.5">
          {rows.slice(0, 8).map(([k, n]) => (
            <li key={k}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="min-w-0 truncate text-slate-200">{format ? format(k) : k}</span>
                <span className="shrink-0 tabular-nums text-white font-semibold">
                  {n.toLocaleString()}
                  <span className="ml-1.5 text-[11px] font-normal text-slate-500">{total ? Math.round((n / total) * 100) : 0}%</span>
                </span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-slate-800" aria-hidden="true">
                <div className="h-full rounded-full bg-emerald-500/70" style={{ width: `${total ? (n / rows[0][1]) * 100 : 0}%` }} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}

// ── Tab ───────────────────────────────────────────────────────────────────────
export function TrafficTab({ traffic }: { traffic: TrafficDay[] | null }) {
  const [range, setRange] = useState<'7' | '30'>('30');
  const [metric, setMetric] = useState<Metric>('views');
  const [view, setView] = useState<'chart' | 'table'>('chart');

  const days = useMemo(() => (traffic ?? []).slice(-Number(range)), [traffic, range]);
  const totals = useMemo(() => ({
    views: days.reduce((s, d) => s + d.views, 0),
    visits: days.reduce((s, d) => s + d.visits, 0),
    pages: sumMaps(days, 'pages'),
    referrers: sumMaps(days, 'referrers'),
    devices: sumMaps(days, 'devices'),
    countries: sumMaps(days, 'countries'),
  }), [days]);

  if (!traffic) return <p className="text-slate-500 text-sm">Loading…</p>;
  if (traffic.length === 0) {
    return <Card><p className="text-slate-400 text-sm">Traffic data could not be loaded. Use the refresh button at the top to try again.</p></Card>;
  }

  const today = traffic[traffic.length - 1];
  const perVisit = totals.visits ? (totals.views / totals.visits).toFixed(1) : '—';
  const hasData = traffic.some((d) => d.views > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">Counted by your own site — no cookies, no visitor ids. Days are in UTC.</p>
        <Segmented label="Date range" value={range} onChange={setRange} options={[{ id: '7', label: 'Last 7 days' }, { id: '30', label: 'Last 30 days' }]} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today" value={today.views.toLocaleString()} sub={`page views · ${today.visits.toLocaleString()} visits`} icon={Activity} accent="emerald" />
        <StatCard label="Page views" value={totals.views.toLocaleString()} sub={`last ${range} days`} icon={Eye} accent="sky" />
        <StatCard label="Visits" value={totals.visits.toLocaleString()} sub="arrivals from outside the site" icon={Users} accent="amber" />
        <StatCard label="Pages per visit" value={perVisit} sub={`last ${range} days`} icon={FileText} accent="violet" />
      </div>

      {!hasData && (
        <Card>
          <p className="text-sm text-slate-300">No visits recorded yet.</p>
          <p className="mt-1 text-xs text-slate-500">Counting starts from the moment this version of the site went live — earlier traffic is not included. Your own visits to this admin page are never counted.</p>
        </Card>
      )}

      <Card>
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <SectionHeader title={`${METRIC_LABEL[metric]} per day`} sub={`Last ${range} days`} />
          <div className="flex flex-wrap gap-2">
            <Segmented label="Measure" value={metric} onChange={setMetric} options={[{ id: 'views', label: 'Page views' }, { id: 'visits', label: 'Visits' }]} />
            <Segmented label="Display" value={view} onChange={setView} options={[
              { id: 'chart', label: <><BarChart2 size={12} aria-hidden="true" /> Chart</> },
              { id: 'table', label: <><Table2 size={12} aria-hidden="true" /> Table</> },
            ]} />
          </div>
        </div>
        {view === 'chart' ? (
          <DailyBars days={days} metric={metric} />
        ) : (
          <div className="max-h-80 overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-900">
                <tr className="border-b border-slate-800 text-xs text-slate-500">
                  <th className="pb-2 pr-4 text-left font-medium">Day</th>
                  <th className="pb-2 pr-4 text-right font-medium">Page views</th>
                  <th className="pb-2 text-right font-medium">Visits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {[...days].reverse().map((d) => (
                  <tr key={d.date}>
                    <td className="py-2 pr-4 text-slate-300">{dayLabel(d.date, true)}</td>
                    <td className="py-2 pr-4 text-right tabular-nums text-white">{d.views.toLocaleString()}</td>
                    <td className="py-2 text-right tabular-nums text-white">{d.visits.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Ranked
          title="Top pages" sub="Page views by page" rows={totals.pages} empty="No page views in this period."
          format={(k) => (k.startsWith('/') ? <a href={k} target="_blank" rel="noopener" className="hover:text-emerald-400">{k === '/' ? 'Home page' : k}</a> : 'Other pages')}
        />
        <Ranked
          title="Where visitors come from" sub="The site that sent each visit" rows={totals.referrers} empty="No visits in this period."
          format={(k) => (k === 'direct' ? 'Direct / typed in / apps' : k)}
        />
        <Ranked title="Devices" sub="By screen size at arrival" rows={totals.devices} empty="No visits in this period." />
        <Ranked title="Countries" sub="Where visits arrive from" rows={totals.countries} empty="No visits in this period." format={countryName} />
      </div>
    </div>
  );
}
