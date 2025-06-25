import fs from 'fs'
import path from 'path'
import UserSelector from '../components/UserSelector'
import CalendarView from '../components/CalendarView'
import SummaryChart from '../components/SummaryChart'

export async function getStaticPaths() {
  return {
    paths: [
      { params: { user: 'julia' } },
      { params: { user: 'rafael' } }
    ],
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'stats.json')
  const raw = fs.readFileSync(filePath, 'utf8')
  const allData = JSON.parse(raw)
  const events = allData.map(item => ({
    date: item.date,
    value: item[params.user]
  }))
  return { props: { events, allData, user: params.user } }
}

export default function UserPage({ events, allData, user }) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <UserSelector />
      <h1 className="text-3xl font-bold capitalize mb-4">{user}</h1>
      <CalendarView events={events} />
      <SummaryChart data={allData} user={user} />
    </div>
  )
}
