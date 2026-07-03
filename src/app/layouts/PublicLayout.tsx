import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-off-white flex justify-center w-full">
      {/* Constrains maximum width so mobile-first components don't stretch indefinitely */}
      <main className="w-full max-w-md bg-white shadow-sm min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}