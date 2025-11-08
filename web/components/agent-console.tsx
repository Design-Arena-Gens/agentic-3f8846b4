type AgentConsoleProps = {
  highConvictionIdeas: string[];
  tacticalMoves: string[];
  guardrails: string[];
};

export const AgentConsole = ({
  highConvictionIdeas,
  tacticalMoves,
  guardrails,
}: AgentConsoleProps) => (
  <div className="grid gap-4 rounded-3xl border border-zinc-200 bg-zinc-50/80 p-6 shadow-sm lg:grid-cols-3">
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
        High conviction briefs
      </p>
      <ul className="mt-3 space-y-2 text-sm text-zinc-700">
        {highConvictionIdeas.map((idea) => (
          <li key={idea} className="rounded-2xl bg-white p-3 shadow-sm">
            {idea}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
        Tactical moves
      </p>
      <ul className="mt-3 space-y-2 text-sm text-zinc-700">
        {tacticalMoves.map((idea) => (
          <li key={idea} className="rounded-2xl bg-white p-3 shadow-sm">
            {idea}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
        Guardrails
      </p>
      <ul className="mt-3 space-y-2 text-sm text-zinc-700">
        {guardrails.map((item) => (
          <li key={item} className="rounded-2xl bg-white p-3 shadow-sm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
