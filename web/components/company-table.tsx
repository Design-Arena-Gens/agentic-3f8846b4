import type { ScoredCompany } from "@/lib/types";
import { ScoreBadge } from "./score-badge";

const croreFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

type CompanyTableProps = {
  companies: ScoredCompany[];
};

export const CompanyTable = ({ companies }: CompanyTableProps) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg shadow-emerald-50">
      <table className="min-w-full divide-y divide-zinc-100">
        <thead className="bg-emerald-50/60 text-left text-xs uppercase tracking-wide text-emerald-600">
          <tr>
            <th className="px-5 py-4 font-medium">Company</th>
            <th className="px-5 py-4 font-medium">Signal</th>
            <th className="px-5 py-4 font-medium">Growth</th>
            <th className="px-5 py-4 font-medium">Quality</th>
            <th className="px-5 py-4 font-medium">Valuation</th>
            <th className="px-5 py-4 font-medium">Catalysts</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-sm text-zinc-700">
          {companies.map((company) => (
            <tr key={company.ticker} className="hover:bg-emerald-50/40">
              <td className="px-5 py-5">
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-zinc-900">
                    {company.name}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-zinc-400">
                    {company.ticker} · {company.sector}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {company.description}
                  </span>
                </div>
              </td>
              <td className="px-5 py-5 align-top">
                <ScoreBadge score={company.score} riskLevel={company.riskLevel} />
              </td>
              <td className="px-5 py-5 align-top">
                <div className="flex flex-col gap-1">
                  <span>Revenue CAGR: {company.revenueGrowth3Y}%</span>
                  <span>Profit CAGR: {company.profitGrowth3Y}%</span>
                  <span>5Y EPS CAGR: {company.fiveYearCagr}%</span>
                </div>
              </td>
              <td className="px-5 py-5 align-top">
                <div className="flex flex-col gap-1">
                  <span>ROE: {company.roe}%</span>
                  <span>ROCE: {company.roce}%</span>
                  <span>D/E: {company.debtToEquity}</span>
                </div>
              </td>
              <td className="px-5 py-5 align-top">
                <div className="flex flex-col gap-1">
                  <span>PEG: {company.peg}</span>
                  <span>FCF Margin: {company.fcfMargin}%</span>
                  <span>
                    Market Cap: ₹{croreFormatter.format(company.marketCapCr)} Cr
                  </span>
                </div>
              </td>
              <td className="px-5 py-5 align-top">
                <ul className="list-disc space-y-1 pl-4">
                  {company.catalysts.slice(0, 3).map((item) => (
                    <li key={item} className="text-xs text-zinc-500">
                      {item}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
