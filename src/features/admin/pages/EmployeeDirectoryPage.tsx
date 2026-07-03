import { Card } from '@/components/Card';
import { PageHeader } from '@/components/PageHeader';

export function EmployeeDirectoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Employee Directory" subtitle="Browse and manage employee records." />
      <Card padding="md">
        <div className="text-mid-gray">Employee directory is under development.</div>
      </Card>
    </div>
  );
}
