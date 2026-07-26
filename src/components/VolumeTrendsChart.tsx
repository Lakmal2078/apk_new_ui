import React, { memo, useMemo } from 'react';
import { DepositRecord, WithdrawalRecord } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useApp } from '../context/AppContext';

interface VolumeTrendsChartProps {
  deposits: DepositRecord[];
  withdrawals: WithdrawalRecord[];
}

export const VolumeTrendsChart: React.FC<VolumeTrendsChartProps> = memo(({ deposits, withdrawals }) => {
  const { t, formatCurrency } = useApp();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();

  const chartData = useMemo(() => {
    return months.map((month, idx) => {
      const depVolume = deposits
        .filter((d) => {
          const date = new Date(d.createdAt);
          return date.getMonth() === idx && date.getFullYear() === currentYear;
        })
        .reduce((sum, d) => sum + d.amount, 0);

      const withVolume = withdrawals
        .filter((w) => {
          const date = new Date(w.createdAt);
          return date.getMonth() === idx && date.getFullYear() === currentYear;
        })
        .reduce((sum, w) => sum + w.amount, 0);

      return {
        name: month,
        Deposits: depVolume,
        Withdrawals: withVolume
      };
    });
  }, [deposits, withdrawals, currentYear]);

  const totalDepVolume = useMemo(() => deposits.reduce((s, d) => s + d.amount, 0), [deposits]);
  const totalWithVolume = useMemo(() => withdrawals.reduce((s, w) => s + w.amount, 0), [withdrawals]);

  return (
    <div className="glass-panel p-5 sm:p-6 text-slate-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-base font-extrabold text-cyan-300 tracking-tight">{t('chart_title', { year: currentYear })}</h3>
          <p className="text-xs text-slate-400 font-medium">{t('chart_sub')}</p>
        </div>
        <div className="flex items-center gap-2.5 text-xs">
          <div className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-xl glow-cyan">
            <span className="text-slate-400 font-medium">{t('chart_deposits')}: </span>
            <strong className="text-cyan-300 font-extrabold">{formatCurrency(totalDepVolume)}</strong>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl glow-amber">
            <span className="text-slate-400 font-medium">{t('chart_payouts')}: </span>
            <strong className="text-amber-300 font-extrabold">{formatCurrency(totalWithVolume)}</strong>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `${val / 1000}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#020617',
                borderColor: '#06b6d4',
                borderRadius: '16px',
                fontSize: '12px',
                color: '#f8fafc',
                boxShadow: '0 10px 25px -5px rgba(6, 182, 212, 0.2)'
              }}
              formatter={(value: any) => [formatCurrency(Number(value))]}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
            <Bar dataKey="Deposits" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Withdrawals" fill="#f59e0b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

VolumeTrendsChart.displayName = 'VolumeTrendsChart';

