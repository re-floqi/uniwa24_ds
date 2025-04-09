import { useState } from 'react'
import Layout from '../components/Layout'
import Announcements from '../components/Announcements'
import Schedule from '../components/Schedule'

export default function Home() {
  const [currentPage, setCurrentPage] = useState('announcements')

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage === 'announcements' ? <Announcements /> : <Schedule />}
    </Layout>
  )
}