import { useState, useEffect } from 'react';
import { CheckCircle, Clock, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import StatCard from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVerified: 0,
    correctMaps: 0,
    pending: 0,
  });
  const [recentVillages, setRecentVillages] = useState([]);

  useEffect(() => {
    // TODO: Fetch actual data from API
    // Mock data for now
    setStats({
      totalVerified: 245,
      correctMaps: 189,
      pending: 56,
    });

    setRecentVillages([
      {
        id: '1',
        villageName: 'Rampur',
        district: 'Agra',
        status: 'correct',
        verifiedAt: '2025-10-10 14:30',
      },
      {
        id: '2',
        villageName: 'Sultanpur',
        district: 'Lucknow',
        status: 'incorrect',
        verifiedAt: '2025-10-10 13:15',
      },
      {
        id: '3',
        villageName: 'Bhimpur',
        district: 'Kanpur',
        status: 'correct',
        verifiedAt: '2025-10-10 12:00',
      },
      {
        id: '4',
        villageName: 'Kishanganj',
        district: 'Meerut',
        status: 'correct',
        verifiedAt: '2025-10-10 11:45',
      },
      {
        id: '5',
        villageName: 'Nandgaon',
        district: 'Mathura',
        status: 'incorrect',
        verifiedAt: '2025-10-10 10:30',
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of village land verification</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Verified Villages"
            value={stats.totalVerified}
            icon={MapPin}
            variant="default"
          />
          <StatCard
            title="Correct Village Maps"
            value={stats.correctMaps}
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="Pending Verification"
            value={stats.pending}
            icon={Clock}
            variant="warning"
          />
        </div>

        {/* Recent Verifications */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Recent Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Village Name</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentVillages.map((village) => (
                    <TableRow key={village.id}>
                      <TableCell className="font-medium">{village.villageName}</TableCell>
                      <TableCell>{village.district}</TableCell>
                      <TableCell>
                        <Badge
                          variant={village.status === 'correct' ? 'default' : 'destructive'}
                          className={
                            village.status === 'correct'
                              ? 'bg-success text-success-foreground'
                              : ''
                          }
                        >
                          {village.status === 'correct' ? 'Correct' : 'Incorrect'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {village.verifiedAt}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
