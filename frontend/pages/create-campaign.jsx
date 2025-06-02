import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from '@/components/ui/separator'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const CreateCampaign = () => {
  const [query, setQuery] = useState('')
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
          placeholder="e.g. spend > 10000 AND visits < 3 OR inactive for 90 days"
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
      <div className="max-w-5xl mx-auto w-full space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Total: {customers.length} people
          </p>
          <Button disabled={!customers.length}>Create Campaign</Button>
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
    </div>
  )
}

export default CreateCampaign
