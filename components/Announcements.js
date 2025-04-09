import { useEffect, useState } from 'react'
import axios from 'axios'
import Papa from 'papaparse'
import { parse, format } from 'date-fns'

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://docs.google.com/spreadsheets/d/1dqBSWQTSJmpDH_bkCg43jZ9rvR2sLVevxLDycrb9XM8/export?format=csv'
        )
        
        const parsed = Papa.parse(response.data, { header: true })
        const sorted = parsed.data
          .map(item => ({
            ...item,
            DATE: parse(item.DATE, 'dd/MM/yyyy', new Date())
          }))
          .sort((a, b) => b.DATE - a.DATE)

        setAnnouncements(sorted)
      } catch (error) {
        console.error('Error fetching announcements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 600000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div>Φόρτωση...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ανακοινώσεις</h1>
      {announcements.map((announcement, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold">{announcement.TITLE}</h2>
          <p className="text-gray-600 mt-2">
            📅 {format(announcement.DATE, 'dd/MM/yyyy')}
          </p>
          <p className="mt-4">{announcement.DESCRIPTION}</p>
          <hr className="my-6 border-t-2" />
        </div>
      ))}
    </div>
  )
}

export default Announcements