import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Campaigns = () => {
  return (
    <div className="flex flex-col w-full min-h-screen p-8 space-y-8">
      {/* Audience Rule Builder */}
      <div className="w-full max-w-5xl mx-auto space-y-4 mt-10">
        <h1 className="text-2xl font-semibold">Campaign History</h1>
      </div>
      <div>
      <div className="max-w-5xl mx-auto w-full space-y-4">
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
    </div>
  )
}

export default Campaigns