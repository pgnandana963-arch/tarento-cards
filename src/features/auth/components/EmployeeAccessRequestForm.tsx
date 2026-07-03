import { useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';
import type { AccessRequestPayload } from '../types/auth';

interface EmployeeAccessRequestFormProps {
  onSubmit: (data: AccessRequestPayload) => void;
  isLoading?: boolean;
  error?: string;
  submitted?: boolean;
}

const departmentOptions = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Sales', value: 'sales' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Operations', value: 'operations' },
  { label: 'Human Resources', value: 'human-resources' },
];

export function EmployeeAccessRequestForm({ onSubmit, isLoading = false, error, submitted = false }: EmployeeAccessRequestFormProps) {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ fullName, workEmail, employeeId, department });
  };

  if (submitted) {
    return (
      <div className="rounded-card border border-teal-200 bg-teal-50 px-4 py-5 text-navy-500">
        <p className="text-sm font-semibold">Your request is pending HR approval.</p>
        <p className="mt-1 text-sm text-teal-600">We&apos;ll notify you once access has been reviewed.</p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input label="Full name" value={fullName} onChange={setFullName} autoComplete="name" required />
      <Input label="Work email" type="email" value={workEmail} onChange={setWorkEmail} autoComplete="email" required />
      <Input label="Employee ID" value={employeeId} onChange={setEmployeeId} required />
      <Select
        label="Department"
        value={department}
        onChange={setDepartment}
        options={departmentOptions}
        placeholder="Select your department"
        required
      />

      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

      <Button variant="primary" type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Request access'}
      </Button>
    </form>
  );
}