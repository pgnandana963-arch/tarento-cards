import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-off-white flex justify-center w-full">
      {/* Constrains maximum width so mobile-first components don't stretch indefinitely */}
      <main className="w-full max-w-md bg-white shadow-[0_20px_60px_rgba(23,40,60,0.06)] min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}