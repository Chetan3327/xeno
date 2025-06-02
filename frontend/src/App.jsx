import CreateCampaign from '@/pages/create-campaign.jsx'
import Login from '../pages/login.jsx'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Campaigns from '@/pages/campaigns.jsx'
import { ThemeProvider } from '@/providers/theme-provider.jsx'
import { ModeToggle } from '@/components/mode-toggle.jsx'
import Navbar from '@/components/navbar.jsx'

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/create-campaign' element={<CreateCampaign />} />
          <Route path='/campaigns' element={<Campaigns />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
