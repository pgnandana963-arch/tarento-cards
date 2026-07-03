import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/Card';
import { Logo } from '../../../components/Logo';
import { ROUTES } from '../../../config/routes';
import { AdminLoginForm } from '../components/AdminLoginForm';
import { useLogin } from '../api/login';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  return (
    <div className="min-h-screen px-6 py-10 flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(11,61,73,0.08),_transparent_40%),linear-gradient(180deg,_#f7f5f1_0%,_#ffffff_100%)]">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo variant="dark" size="md" />
        </div>

        <Card padding="lg" className="shadow-[0_20px_50px_rgba(11,61,73,0.08)]">
          <div className="mb-6 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-500">Admin access</p>
            <h1 className="text-2xl font-semibold text-navy-500">Sign in to continue</h1>
            <p className="text-sm text-mid-gray">Use your admin credentials to reach the dashboard.</p>
          </div>

          <AdminLoginForm
            onSubmit={(credentials) => {
              loginMutation.mutate(credentials, {
                onSuccess: () => {
                  navigate(ROUTES.ADMIN_DASHBOARD);
                },
              });
            }}
            isLoading={loginMutation.isPending}
            error={loginMutation.error?.message}
          />
        </Card>
      </div>
    </div>
  );
}