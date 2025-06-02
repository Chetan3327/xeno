import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/campaign`)
        setCampaigns(res.data)
      } catch (err) {
        console.error("Error fetching campaigns:", err)
      }
    }

    fetchCampaigns()
  }, [])

  return (
    <div className="flex flex-col w-full min-h-screen p-8 space-y-8">
      <div className="w-full max-w-5xl mx-auto space-y-4 mt-10">
        <h1 className="text-2xl font-semibold">Campaign History</h1>
      </div>

      <div className="max-w-5xl mx-auto w-full space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Audience Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign, i) => (
              <TableRow className="cursor-pointer" key={i} onClick={() => navigate(`/campaigns/${campaign._id}`)}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.message}</TableCell>
                <TableCell>{campaign.audienceSize}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Campaigns
