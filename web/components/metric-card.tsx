type MetricCardProps = {
  label: string;
  value: string;
  helper?: string;
};

export const MetricCard = ({ label, value, helper }: MetricCardProps) => (
  <div className="flex flex-col gap-1 rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-sm shadow-emerald-50 backdrop-blur">
    <span className="text-xs font-medium uppercase tracking-wide text-emerald-600">
      {label}
    </span>
    <span className="text-2xl font-semibold text-zinc-900">{value}</span>
    {helper ? (
      <span className="text-xs text-zinc-500">{helper}</span>
    ) : null}
  </div>
);
