type ScoreBadgeProps = {
  score: number;
  riskLevel: "Guarded" | "Balanced" | "Aggressive";
};

const RISK_COLORS: Record<ScoreBadgeProps["riskLevel"], string> = {
  Guarded: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Balanced: "bg-amber-100 text-amber-700 border-amber-200",
  Aggressive: "bg-rose-100 text-rose-700 border-rose-200",
};

export const ScoreBadge = ({ score, riskLevel }: ScoreBadgeProps) => {
  const bucket = score >= 80 ? "High conviction" : score >= 70 ? "On radar" : "Watchlist";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`rounded-full border px-3 py-1 text-sm font-semibold tabular-nums shadow-sm ${RISK_COLORS[riskLevel]}`}
      >
        {score}
      </span>
      <span className="text-xs uppercase tracking-wide text-zinc-500">
        {bucket} · {riskLevel}
      </span>
    </div>
  );
};
