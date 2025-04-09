import { useState, useEffect } from 'react'
import axios from 'axios'
import Papa from 'papaparse'

const Schedule = () => {
  const [schedule, setSchedule] = useState([])
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authenticated) {
      const fetchData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(
            'https://docs.google.com/spreadsheets/d/1JxGZdDt1iWbKSbbOwIueDzj3kzfzBbINxxW0yATcbV4/export?format=csv'
          )
          const parsed = Papa.parse(response.data, { header: true })
          setSchedule(parsed.data)
        } catch (error) {
          console.error('Error fetching schedule:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
      const interval = setInterval(fetchData, 600000)
      return () => clearInterval(interval)
    }
  }, [authenticated])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === 'uniwa') {
      setAuthenticated(true)
    }
  }

  if (!authenticated) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Πρόγραμμα Μαθημάτων</h1>
        <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Εισάγετε κωδικό πρόσβασης"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Επιβεβαίωση
          </button>
          {password && password !== 'uniwa' && (
            <p className="text-red-600">Λάθος κωδικός! Δοκιμάστε ξανά.</p>
          )}
        </form>
      </div>
    )
  }

  if (loading) return <div>Φόρτωση...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Πρόγραμμα Μαθημάτων</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {schedule[0] &&
                Object.keys(schedule[0]).map((header, index) => (
                  <th key={index} className="p-3 border text-left">
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="p-3 border">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Schedule