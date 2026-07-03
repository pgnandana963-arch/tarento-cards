import { useState } from 'react';
import { Card } from '../../../components/Card';
import { Logo } from '../../../components/Logo';
import { EmployeeAccessRequestForm } from '../components/EmployeeAccessRequestForm';
import { useRequestAccess } from '../api/requestAccess';

export function EmployeeAccessRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const accessRequestMutation = useRequestAccess();

  return (
    <div className="min-h-screen px-6 py-10 flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(177,141,90,0.12),_transparent_42%),linear-gradient(180deg,_#f7f5f1_0%,_#ffffff_100%)]">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo variant="dark" size="md" />
        </div>

        <Card padding="lg" className="shadow-[0_20px_50px_rgba(11,61,73,0.08)]">
          <div className="mb-6 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-500">Employee access</p>
            <h1 className="text-2xl font-semibold text-navy-500">Request workspace access</h1>
            <p className="text-sm text-mid-gray">Submit your details and HR will review the request.</p>
          </div>

          <EmployeeAccessRequestForm
            submitted={submitted}
            onSubmit={(data) => {
              accessRequestMutation.mutate(data, {
                onSuccess: () => {
                  setSubmitted(true);
                },
              });
            }}
            isLoading={accessRequestMutation.isPending}
            error={accessRequestMutation.error?.message}
          />
        </Card>
      </div>
    </div>
  );
}