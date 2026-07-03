import { Card } from "@/components/Card";
import Avatar from "@/components/Avatar";

import type { EmployeeProfile } from "../types/employee.types";

interface CardPreviewProps {
  profile: EmployeeProfile;
}

export default function CardPreview({
  profile,
}: CardPreviewProps) {
  return (
    <Card className="max-w-sm mx-auto">
      <div className="flex flex-col items-center text-center gap-4">

        <Avatar
          src={profile.avatar}
          name={profile.name}
          size="xl"
        />

        <div>
          <h2 className="text-xl font-bold text-navy-500">
            {profile.name}
          </h2>

          <p className="text-mid-gray">
            {profile.jobTitle}
          </p>
        </div>

        <p className="text-sm text-mid-gray">
          {profile.description}
        </p>

      </div>
    </Card>
  );
}