import React from 'react'
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

const CreateCampaign = () => {
  return (
    <div className="flex flex-col w-full min-h-screen p-8 space-y-8">
      {/* Audience Rule Builder */}
      <div className="w-full max-w-5xl mx-auto space-y-4 mt-10">
        <h1 className="text-2xl font-semibold">Define Audience Segment</h1>
        <Textarea
          placeholder="e.g. spend > 10000 AND visits < 3 OR inactive for 90 days"
          className="min-h-[120px]"
        />
        <div className="flex justify-end">
          <Button>Fetch Audience</Button>
        </div>
      </div>

      <Separator />

      {/* Results Section */}
      <div className="max-w-5xl mx-auto w-full space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Total: 100 people</p>
          <Button>Create Campaign</Button>
        </div>

        {/* Table */}
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
            {/* Replace this with dynamic data */}
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
              <TableCell>12,000</TableCell>
              <TableCell>2</TableCell>
              <TableCell>2024-11-10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>jane@example.com</TableCell>
              <TableCell>15,000</TableCell>
              <TableCell>1</TableCell>
              <TableCell>2024-12-01</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CreateCampaign
