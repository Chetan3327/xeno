import Navbar from '@/components/navbar.jsx'
import Campaigns from '@/pages/campaigns.jsx'
import CreateCampaign from '@/pages/create-campaign.jsx'
import { ThemeProvider } from '@/providers/theme-provider.jsx'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from '../pages/login.jsx'
import { UserProvider } from '@/providers/user-context.jsx'

const App = () => {
  return (
    <UserProvider>
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
    </UserProvider>
  )
}

export default App
