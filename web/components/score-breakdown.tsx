import type { ScoreComponent } from "@/lib/types";

type ScoreBreakdownProps = {
  components: ScoreComponent[];
};

export const ScoreBreakdown = ({ components }: ScoreBreakdownProps) => {
  const maxContribution = Math.max(...components.map((item) => item.contribution), 1);

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Score architecture
      </p>
      <div className="mt-4 space-y-4">
        {components.map((component) => (
          <div key={component.label}>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="font-medium text-zinc-700">{component.label}</span>
              <span>{component.contribution.toFixed(1)} pts</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{
                  width: `${Math.min(
                    100,
                    (component.contribution / maxContribution) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
