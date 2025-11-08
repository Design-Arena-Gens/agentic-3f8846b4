import type { ScoredCompany } from "@/lib/types";
import { ScoreBadge } from "./score-badge";

type CompanyInsightPanelProps = {
  company: ScoredCompany;
};

export const CompanyInsightPanel = ({ company }: CompanyInsightPanelProps) => {
  return (
    <div className="grid gap-6 rounded-3xl border border-emerald-200/60 bg-emerald-50/40 p-6 shadow-inner shadow-emerald-100 lg:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-600">
              Featured candidate
            </p>
            <h3 className="text-2xl font-semibold text-emerald-950">
              {company.name}
            </h3>
            <p className="text-sm uppercase tracking-wide text-emerald-500">
              {company.ticker} · {company.sector}
            </p>
          </div>
          <ScoreBadge score={company.score} riskLevel={company.riskLevel} />
        </div>
        <p className="max-w-3xl text-sm text-emerald-900/80">
          {company.description}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-100 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              Why it compounds
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-4 text-sm text-emerald-900/80">
              {company.moat.slice(0, 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              Catalysts in motion
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-4 text-sm text-emerald-900/80">
              {company.catalysts.slice(0, 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-white/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          AI agent signals
        </p>
        <ul className="space-y-2 text-sm text-emerald-900/80">
          {company.commentary.map((comment) => (
            <li key={comment} className="rounded-xl bg-emerald-50/70 p-3">
              {comment}
            </li>
          ))}
        </ul>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
            Watchlist
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-emerald-700">
            {company.watchSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
