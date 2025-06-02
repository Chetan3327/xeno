import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Campaign = () => {
  const { campaignId } = useParams();
  console.log(campaignId)
  console.log("object")
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCampaignLogs() {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/campaign/${campaignId}`);
        if (!res.ok) throw new Error("Failed to fetch campaign details");
        const data = await res.json();
        setLogs(data.communicationLogs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaignLogs();
  }, [campaignId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!logs.length) return <p>No communication logs found for this campaign.</p>;

  return (
    <div className="flex flex-col w-full min-h-screen p-8 space-y-8">
      <div className="w-full max-w-5xl mx-auto space-y-4 mt-10">
        <h1 className="text-2xl font-semibold">Communication Logs</h1>
      </div>

      <div className="max-w-5xl mx-auto w-full space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log._id}>
                <TableCell>{log.customerId.name}</TableCell>
                <TableCell>{log.customerId.email}</TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>{log.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Campaign;
