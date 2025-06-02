import CreateCampaign from '@/pages/create-campaign.jsx'
import Login from '../pages/login.jsx'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Campaigns from '@/pages/campaigns.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/create-campaign' element={<CreateCampaign />} />
        <Route path='/campaigns' element={<Campaigns />} />
      </Routes>
    </Router>
  )
}

export default App
