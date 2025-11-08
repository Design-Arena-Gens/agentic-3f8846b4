type RiskMatrixProps = {
  distribution: Record<"Guarded" | "Balanced" | "Aggressive", number>;
};

const TOTAL_INDICATOR_COLORS = {
  Guarded: "bg-emerald-500",
  Balanced: "bg-amber-500",
  Aggressive: "bg-rose-500",
} as const;

export const RiskMatrix = ({ distribution }: RiskMatrixProps) => {
  const total = Object.values(distribution).reduce((acc, value) => acc + value, 0);

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Risk posture across candidates
      </p>
      <div className="mt-4 space-y-3">
        {(Object.keys(distribution) as Array<keyof typeof distribution>).map((key) => {
          const count = distribution[key];
          const width = total === 0 ? 0 : Math.round((count / total) * 100);

          return (
            <div key={key} className="rounded-2xl border border-zinc-100 bg-zinc-50/60 p-3">
              <div className="flex items-center justify-between text-sm text-zinc-600">
                <span className="font-medium text-zinc-800">{key}</span>
                <span className="tabular-nums">{count}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-zinc-200/80">
                <div
                  className={`h-full rounded-full ${TOTAL_INDICATOR_COLORS[key]}`}
                  style={{ width: `${width}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                {width}% of universe
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
