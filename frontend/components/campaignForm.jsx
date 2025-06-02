import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useNavigate } from 'react-router-dom'

const CampaignForm = ({ customers }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const audienceSize = customers.length
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/campaign`, {
        name,
        message,
        audienceSize,
      })
      setName('')
      setMessage('')
      navigate('/campaigns')

    } catch (err) {
      console.error('Error creating campaign:', err)
      alert('Failed to create campaign')
    }
  }

  return (
    <div className="border p-4 rounded-md h-fit space-y-4 bg-white shadow">
      <div>
        <label className="block text-sm font-medium mb-1">Campaign Name</label>
        <input
          type="text"
          className="w-full border rounded-md p-2"
          placeholder="e.g. Diwali Offer"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <Textarea
          placeholder="Your campaign message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button className="w-full" disabled={!customers.length} onClick={handleSubmit}>
        Create Campaign
      </Button>
    </div>
  )
}

export default CampaignForm
