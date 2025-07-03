import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-[var(--primary)] dark:text-[var(--secondary)]">MyScheme</h1>
      <p className="text-lg text-[var(--secondary)] dark:text-[var(--primary)]">MyScheme is a platform for creating and managing your schemes.</p>
      <button className="mt-4 bg-[var(--primary)] dark:bg-[var(--secondary)] text-[var(--secondary)] dark:text-[var(--primary)] px-4 py-2 rounded hover:bg-[var(--secondary)] dark:hover:bg-[var(--primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2">Get Started</button>
      <footer className="mt-4">
        <p className="text-[var(--secondary)] dark:text-[var(--primary)]">© 2025 MyScheme. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default page