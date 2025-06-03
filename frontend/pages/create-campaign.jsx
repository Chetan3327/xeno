import CampaignForm from '@/components/campaignForm'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const CreateCampaign = () => {
  const [query, setQuery] = useState("")
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAudience = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${BACKEND_URL}/api/audience/`, { query })
      console.log(res.data)
      setCustomers(res.data.customers || [])
    } catch (err) {
      console.error('Failed to fetch audience:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen p-8 space-y-8">
      {/* Audience Rule Builder */}
      <div className="w-full max-w-5xl mx-auto space-y-4 mt-10">
        <h1 className="text-2xl font-semibold">Define Audience Segment</h1>
        <Textarea
          placeholder="e.g. spend > 200 AND visits < 2"
          className="min-h-[120px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={fetchAudience} disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch Audience'}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Results Section */}
      {customers.length !== 0 && (<div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto w-full mt-8">
        {/* Left: Audience Table */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Total: {customers.length} people
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Spend (INR)</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((c, i) => (
                <TableRow key={i}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.spent.toLocaleString()}</TableCell>
                  <TableCell>{c.visits}</TableCell>
                  <TableCell>{new Date(c.lastVisit).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Right: Campaign Form */}
        {/* <div className="border p-4 rounded-md h-fit space-y-4 bg-white shadow">
          <div>
            <label className="block text-sm font-medium mb-1">Campaign Name</label>
            <input
              type="text"
              className="w-full border rounded-md p-2"
              placeholder="e.g. Diwali Offer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <Textarea placeholder="Your campaign message..." />
          </div>
          <Button className="w-full" disabled={!customers.length}>
            Create Campaign
          </Button>
        </div> */}
        <CampaignForm customers={customers} />
      </div>)}

    </div>
  )
}

export default CreateCampaign
