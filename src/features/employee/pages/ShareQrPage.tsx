import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";

import CardPreview from "../components/CardPreview";
import QrShareCard from "../components/QrShareCard";
import { useEmployeeProfile } from "../hooks/useEmployeeProfile";

export default function ShareQrPage() {
  const navigate = useNavigate();

  const {
    profile,
    isLoading,
  } = useEmployeeProfile();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-20">
        Unable to load profile.
      </div>
    );
  }

  const profileUrl = `https://tarentocard.com/profile/${profile.id}`;

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <Button
            variant="tertiary"
            onClick={() => navigate(-1)}
          >
            <div className="flex items-center gap-2">
              <Icon
                icon={ArrowLeft}
                size={20}
              />
              Back
            </div>
          </Button>

          <h1 className="mt-4 text-3xl font-bold text-navy-500">
            Share Your Digital Card
          </h1>

          <p className="mt-2 text-mid-gray">
            Share your professional profile with a QR
            code or direct link.
          </p>

        </div>

      </div>

      {/* Main Content */}

      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">

        {/* QR */}

        <QrShareCard
          employeeName={profile.name}
          designation={profile.jobTitle}
          profileUrl={profileUrl}
        />

        {/* Preview */}

        <Card>

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-navy-500">
              Live Preview
            </h2>

            <p className="mt-1 text-mid-gray">
              This is how visitors will see your
              digital business card.
            </p>

          </div>

          <div className="flex justify-center">

            <CardPreview
              profile={profile}
            />

          </div>

        </Card>

      </div>

    </div>
  );
}