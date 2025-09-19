import React from 'react'

const Home = () => {
  return (
      <div className="min-h-screen bg-black-100 p-8">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Portal</h1>
        <p className="text-lg text-gray-700">
          Explore projects, give feedback, and stay updated.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-black">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Projects</h2>
          <p>View all ongoing and completed projects in one place.</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Feedbacks</h2>
          <p>Share your opinions and see what others have suggested.</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Updates</h2>
          <p>Stay updated with the latest activities and news.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">About This Portal</h2>
        <p className="max-w-2xl mx-auto text-gray-700">
          This portal is designed to help users explore projects, provide
          feedback, and access important updates. Navigate through the menu
          to get started.
        </p>
      </section>
    </div>
  )
}

export default Home
