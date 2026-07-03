import {
  Copy,
  Download,
  Share2,
  QrCode,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";

interface QrShareCardProps {
  profileUrl: string;
  employeeName: string;
  designation?: string;
}

export default function QrShareCard({
  profileUrl,
  employeeName,
  designation,
}: QrShareCardProps) {
  const copyLink = async () => {
    await navigator.clipboard.writeText(profileUrl);
  };

  const shareProfile = async () => {
    if (navigator.share) {
      await navigator.share({
        title: employeeName,
        text: `${employeeName}'s Digital Business Card`,
        url: profileUrl,
      });
    } else {
      copyLink();
    }
  };

  const downloadQR = () => {
    const canvas = document.getElementById(
      "employee-qr"
    ) as HTMLCanvasElement | null;

    if (!canvas) return;

    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = url;
    link.download = `${employeeName}-qr.png`;

    link.click();
  };

  return (
    <Card className="max-w-md w-full mx-auto">

      <div className="flex flex-col items-center">

        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-navy-100">
          <Icon
            icon={QrCode}
            size={32}
            tone="default"
          />
        </div>

        <h2 className="text-2xl font-semibold text-navy-500">
          Share Your Card
        </h2>

        <p className="mt-2 text-center text-mid-gray">
          Anyone can scan this QR code to instantly
          access your digital business card.
        </p>

        <div className="my-8 rounded-xl border border-light-gray bg-white p-5">

          <QRCodeCanvas
            id="employee-qr"
            value={profileUrl}
            size={220}
            includeMargin
          />

        </div>

        <h3 className="text-lg font-semibold text-navy-500">
          {employeeName}
        </h3>

        {designation && (
          <p className="text-mid-gray">
            {designation}
          </p>
        )}

        {/* Link */}

        <div className="mt-8 w-full">

          <label className="mb-2 block text-sm font-medium text-mid-gray">
            Public Card Link
          </label>

          <div className="flex gap-2">

            <input
              readOnly
              value={profileUrl}
              className="flex-1 rounded-button border border-light-gray bg-off-white px-3 py-2 text-sm text-mid-gray"
            />

            <Button
              variant="secondary"
              onClick={copyLink}
            >
              <div className="flex items-center gap-2">
                <Icon icon={Copy} size={16} />
                Copy
              </div>
            </Button>

          </div>

        </div>

        {/* Actions */}

        <div className="mt-8 grid w-full gap-3">

          <Button
            variant="primary"
            onClick={shareProfile}
          >
            <div className="flex items-center justify-center gap-2">

              <Icon
                icon={Share2}
                size={20}
              />

              Share Card

            </div>
          </Button>

          <Button
            variant="secondary"
            onClick={downloadQR}
          >
            <div className="flex items-center justify-center gap-2">

              <Icon
                icon={Download}
                size={20}
              />

              Download QR

            </div>
          </Button>

        </div>

      </div>

    </Card>
  );
}