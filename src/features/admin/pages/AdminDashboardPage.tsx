import { Card } from '@/components/Card';
import { PageHeader } from '@/components/PageHeader';
import StatCard from '@/components/StatCard';
import { Users, Eye, BarChart3, ShieldCheck } from 'lucide-react';

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Where people have scanned your card in the last 30 days." />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total employees" value="128" trend={{ direction: 'up', value: '+12%' }} icon={Users} />
        <StatCard label="Card visits" value="2,845" trend={{ direction: 'up', value: '+8%' }} icon={Eye} />
        <StatCard label="Approval requests" value="9" trend={{ direction: 'down', value: '-14%' }} icon={ShieldCheck} />
        <StatCard label="Team growth" value="18%" trend={{ direction: 'up', value: '+3%' }} icon={BarChart3} />
      </div>

      <Card padding="md">
        <h2 className="text-lg font-semibold text-navy-700 mb-4">Card visit locations</h2>
        <div className="space-y-4">
          {[
            { city: 'Bengaluru, India', visits: 142 },
            { city: 'Mumbai, India', visits: 76 },
            { city: 'Hyderabad, India', visits: 58 },
            { city: 'Pune, India', visits: 45 },
            { city: 'Delhi NCR, India', visits: 21 },
          ].map((location) => (
            <div key={location.city} className="flex items-center justify-between gap-4">
              <div className="text-sm text-navy-600">{location.city}</div>
              <div className="text-sm font-semibold text-navy-700">{location.visits}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
