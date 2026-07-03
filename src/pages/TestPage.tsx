import EmployeeDashboardPage from "@/features/employee/pages/EmployeeDashboardPage";
import EditProfilePage from "@/features/employee/pages/EditProfilePage";
import ShareQrPage from "@/features/employee/pages/ShareQrPage";
import VisitLocationsPage from "@/features/employee/pages/VisitLocationsPage";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-off-white p-8">

      {/* Uncomment ONE page at a time */}

      {/* <EmployeeDashboardPage /> */}

      <EditProfilePage />

      {/* <ShareQrPage /> */}

      {/* <VisitLocationsPage /> */}

    </div>
  );
}