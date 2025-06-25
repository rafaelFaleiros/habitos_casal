import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function SummaryChart({ data, user }) {
  const total = data.reduce((sum, item) => sum + item[user], 0)
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">Total Geral: {total}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={user} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
