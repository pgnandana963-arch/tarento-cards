import { useState } from 'react';
import { Card } from '../../../components/Card';
import { Logo } from '../../../components/Logo';
import { EmployeeAccessRequestForm } from '../components/EmployeeAccessRequestForm';
import { useRequestAccess } from '../api/requestAccess';

export function EmployeeAccessRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const accessRequestMutation = useRequestAccess();

  return (
    <div className="relative min-h-screen px-6 py-10 flex items-center justify-center overflow-hidden bg-off-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at top, rgba(23,40,60,0.08), transparent 38%), radial-gradient(circle at 78% 14%, rgba(30,143,142,0.12), transparent 28%), radial-gradient(circle at 22% 82%, rgba(240,165,0,0.11), transparent 25%)',
        }}
      />
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo variant="dark" size="md" />
        </div>

        <Card padding="lg" className="relative z-10">
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