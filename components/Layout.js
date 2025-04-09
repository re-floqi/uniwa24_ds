const Layout = ({ children, currentPage, setCurrentPage }) => {
    return (
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 p-4 border-r">
          <h1 className="text-xl font-bold mb-6">Πανεπιστήμιο Δυτικής Αττικής</h1>
          <nav className="space-y-2">
            <button
              onClick={() => setCurrentPage('announcements')}
              className={`w-full text-left p-2 rounded ${
                currentPage === 'announcements' 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-200'
              }`}
            >
              Ανακοινώσεις
            </button>
            <button
              onClick={() => setCurrentPage('schedule')}
              className={`w-full text-left p-2 rounded ${
                currentPage === 'schedule' 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-200'
              }`}
            >
              Πρόγραμμα Μαθημάτων
            </button>
          </nav>
        </div>
  
        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">{children}</main>
      </div>
    )
  }
  
  export default Layout