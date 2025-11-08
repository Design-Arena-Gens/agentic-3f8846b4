type SectorPulseProps = {
  sectors: Array<{
    name: string;
    avgScore: number;
    companies: string[];
    narrative: string;
  }>;
};

export const SectorPulse = ({ sectors }: SectorPulseProps) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {sectors.map((sector) => (
      <div
        key={sector.name}
        className="flex flex-col gap-3 rounded-3xl border border-emerald-200/60 bg-white/80 p-5 shadow-sm shadow-emerald-50"
      >
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-600">
            Sector pulse
          </p>
          <h3 className="text-lg font-semibold text-emerald-950">
            {sector.name}
          </h3>
        </div>
        <p className="text-sm text-emerald-900/80">{sector.narrative}</p>
        <div className="flex items-center justify-between text-xs text-emerald-600">
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
            Avg score {sector.avgScore.toFixed(1)}
          </span>
          <span>{sector.companies.length} picks</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-emerald-700">
          {sector.companies.map((company) => (
            <span
              key={company}
              className="rounded-full bg-emerald-100/80 px-3 py-1 font-medium"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);
