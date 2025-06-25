import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { motion } from 'framer-motion'

export default function CalendarView({ events }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={events.map(e => ({
          title: String(e.value),
          date: e.date
        }))}
      />
    </motion.div>
  )
}
