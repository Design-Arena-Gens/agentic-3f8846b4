import { AgentConsole } from "@/components/agent-console";
import { CompanyInsightPanel } from "@/components/company-insight-panel";
import { CompanyTable } from "@/components/company-table";
import { MetricCard } from "@/components/metric-card";
import { RiskMatrix } from "@/components/risk-matrix";
import { ScoreBreakdown } from "@/components/score-breakdown";
import { SectorPulse } from "@/components/sector-pulse";
import { lastUpdated, scoredCompanies } from "@/data/companies";

const sectorNarratives: Record<string, string> = {
  "Auto Tech":
    "Regulation-driven software adoption in EV and ADAS unlocks multi-year engineering deal wins for nimble vendors.",
  "Electronics Manufacturing":
    "China+1 tailwinds with government incentives accelerating local EMS scale-up across auto, wearables and industrials.",
  "Design & Engineering":
    "Premium digital engineering partners winning wallet share as software-defined products take centre stage.",
  SaaS:
    "Vertical SaaS platforms monetising data flywheels in travel and hospitality where incumbents are under-digitised.",
  "Specialty Chemicals":
    "Integrated producers with green chemistry edge are entering high-value niches while global clients derisk sourcing.",
  "Digital Platform":
    "Geospatial intelligence is becoming critical infrastructure for mobility, smart city and logistics orchestration.",
  "Financial Services":
    "Granular lenders combining analytics with on-ground underwriting to capture MSME credit demand responsibly.",
  Semiconductor:
    "Domestic OSAT ambitions riding incentive momentum though execution risk keeps allocations disciplined.",
};

const sectorsData = (() => {
  const grouped = new Map<
    string,
    { totalScore: number; companies: string[]; count: number }
  >();

  scoredCompanies.forEach((company) => {
    const existing = grouped.get(company.sector) ?? {
      totalScore: 0,
      companies: [],
      count: 0,
    };

    existing.totalScore += company.score;
    existing.companies.push(company.name);
    existing.count += 1;

    grouped.set(company.sector, existing);
  });

  return Array.from(grouped.entries())
    .map(([name, stats]) => ({
      name,
      avgScore: stats.totalScore / stats.count,
      companies: stats.companies.slice(0, 3),
      narrative:
        sectorNarratives[name] ??
        "Sector showing improving earnings momentum with structural tailwinds.",
    }))
    .sort((a, b) => b.avgScore - a.avgScore);
})();

const averageScore =
  scoredCompanies.reduce((acc, company) => acc + company.score, 0) /
  scoredCompanies.length;

const averageRevenueGrowth =
  scoredCompanies.reduce((acc, company) => acc + company.revenueGrowth3Y, 0) /
  scoredCompanies.length;

const riskDistribution = scoredCompanies.reduce(
  (acc, company) => {
    acc[company.riskLevel] += 1;
    return acc;
  },
  {
    Guarded: 0,
    Balanced: 0,
    Aggressive: 0,
  } as Record<"Guarded" | "Balanced" | "Aggressive", number>
);

const topCompany = scoredCompanies[0];
const topFive = scoredCompanies.slice(0, 5);
const topSector =
  sectorsData[0] ?? ({
    name: "N/A",
    avgScore: 0,
    companies: [],
    narrative: "Awaiting dataset.",
  } as (typeof sectorsData)[number]);

const secondarySector =
  topFive[1]?.sector ?? topSector?.name ?? topFive[0]?.sector ?? "Diversified";

const highConvictionIdeas = topFive.slice(0, 3).map(
  (company) =>
    `${company.name}: ${company.catalysts[0]} · Score ${company.score}`
);

const tacticalMoves = [
  `Average revenue CAGR across universe at ${Math.round(averageRevenueGrowth)}%; stagger entries around quarterly prints.`,
  `Blend exposure between ${topFive[0].sector} and ${secondarySector} to ride structural + cyclical tailwinds.`,
  `Use SIP-style accumulation for Guarded names; redeploy profits into Balanced bucket on dips.`,
];

const highestDebt = scoredCompanies.reduce((prev, current) =>
  current.debtToEquity > prev.debtToEquity ? current : prev
);
const richestPeg = scoredCompanies.reduce((prev, current) =>
  current.peg > prev.peg ? current : prev
);

const guardrails = [
  `${highestDebt.name} leverage at ${highestDebt.debtToEquity}x — ensure cash conversion adheres to guidance before scaling position.`,
  `Valuation stretch visible with ${richestPeg.name} trading at PEG ${richestPeg.peg}; chase only on breakout confirmation.`,
  "Always cross-check disclosures, credit rating movements and bulk deals to validate conviction.",
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 pb-16 pt-12 md:px-8">
      <section className="grid gap-10 rounded-3xl border border-emerald-200/60 bg-white/70 p-8 shadow-xl shadow-emerald-100 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Bharat multibagger radar
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-emerald-950 md:text-5xl">
              AI agent decoding India&apos;s next multi-bagger opportunities
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-emerald-900/80">
              The agent ingests growth, quality, balance sheet and valuation
              signals to rank listed companies on multi-bagger readiness. Every
              score fuses fundamentals with execution catalysts to surface
              conviction-backed accumulation ideas.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="Universe conviction"
              value={`${averageScore.toFixed(1)} / 100`}
              helper="Weighted blend of growth, quality and valuation factors"
            />
            <MetricCard
              label="Sector leadership"
              value={topSector.name}
              helper={`Avg score ${topSector.avgScore.toFixed(1)} across ${topSector.companies.length} picks`}
            />
            <MetricCard
              label="Last intelligence refresh"
              value={lastUpdated}
              helper="Agent retrains each quarter with latest filings & con-calls"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6 rounded-3xl border border-emerald-100 bg-emerald-50/80 p-6 shadow-inner shadow-emerald-100">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              Current playbook
            </p>
            <h2 className="mt-2 text-xl font-semibold text-emerald-950">
              Multi-factor scorecard tuned for FY25 earnings cycle
            </h2>
            <p className="mt-3 text-sm text-emerald-900/80">
              Growth metrics (26%), return ratios (16%), balance sheet strength
              (10%), free cash conversion (8%) and valuation elasticity (8%)
              stack together to flag asymmetric upside pockets ahead of
              consensus upgrades.
            </p>
          </div>
          <div className="space-y-2 text-xs text-emerald-800">
            <p className="font-semibold uppercase tracking-wide">
              Agent heuristics
            </p>
            <ul className="space-y-1">
              <li>• Prefers scalable midcaps between ₹2.5k–₹45k Cr market cap</li>
              <li>• Penalises leverage above 0.6x unless free cash conversion excels</li>
              <li>• Flags valuation drift when PEG pushes beyond 1.6x</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-emerald-950">
              Sectoral heatmap
            </h2>
            <p className="text-sm text-emerald-900/80">
              Agent clusters opportunity by structural tailwinds and execution
              depth across sectors.
            </p>
          </div>
        </div>
        <SectorPulse sectors={sectorsData.slice(0, 3)} />
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <CompanyInsightPanel company={topCompany} />
        <div className="flex flex-col gap-6">
          <ScoreBreakdown components={topCompany.scoreBreakdown} />
          <RiskMatrix distribution={riskDistribution} />
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-emerald-950">
            AI agent console
          </h2>
          <p className="text-sm text-emerald-900/80">
            Live tactical signals synthesised from quantitative scoring and
            qualitative catalysts.
          </p>
        </div>
        <AgentConsole
          highConvictionIdeas={highConvictionIdeas}
          tacticalMoves={tacticalMoves}
          guardrails={guardrails}
        />
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-emerald-950">
              Top multi-bagger candidates
            </h2>
            <p className="text-sm text-emerald-900/80">
              Weighted scores focus on sustainable compounding potential across
              growth, quality, capital allocation and valuation readiness.
            </p>
          </div>
          <div className="text-xs text-zinc-500">
            Scores are relative and dynamic. Rebalance monthly using updated
            metrics and corporate disclosures.
          </div>
        </div>
        <CompanyTable companies={scoredCompanies} />
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 text-xs leading-relaxed text-zinc-500">
        <p>
          Disclaimer: This AI agent synthesises publicly available financial
          metrics, management commentary and sectoral data to project potential
          multi-bagger opportunities in Indian equities. Signals are exploratory
          in nature and not investment advice. Validate numbers against company
          filings, perform independent diligence and consult a SEBI-registered
          advisor before acting. Markets carry the risk of permanent capital
          loss.
        </p>
      </section>
    </main>
  );
}
