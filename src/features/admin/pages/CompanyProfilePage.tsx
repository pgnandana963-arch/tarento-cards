import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Card } from '@/components/Card';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { useCompanyProfile, defaultCompanyProfile } from '@/features/admin/hooks/useCompanyProfile';
import TarentoLogo from '@/assets/Tarento_logo.svg';

export function CompanyProfilePage() {
  const { companyProfile, setCompanyProfile } = useCompanyProfile();
  const [draft, setDraft] = useState(companyProfile);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setDraft(companyProfile);
  }, [companyProfile]);

  const handleChange = (field: 'name' | 'website' | 'address' | 'motto' | 'logo', value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setCompanyProfile(draft);
  };

  const handleDiscard = () => {
    setDraft(companyProfile);
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleChange('logo', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const encodedAddress = encodeURIComponent(draft.address || defaultCompanyProfile.address);
  const mapsEmbedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  const mapsLink = `https://www.google.com/maps?q=${encodedAddress}`;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Company Profile"
        subtitle="These details appear on every employee's digital business card. Ensure information is accurate and reflects the current corporate brand guidelines."
      />

      <Card padding="lg">
        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-navy-700">Brand Identity</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-xl border border-light-gray bg-off-white p-4">
                <div className="text-sm font-medium text-navy-500">Company Logo</div>
                <div className="h-32 rounded-xl bg-white border border-light-gray flex items-center justify-center">
                  <img
                    src={draft.logo || TarentoLogo}
                    alt="Tarento Logo"
                    className="h-24 w-auto"
                  />
                </div>
                <button type="button" className="mt-2 text-sm font-medium text-teal-500 hover:underline" onClick={handleLogoClick}>
                  Replace Logo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-navy-600">Company Name</label>
                <input
                  className="w-full rounded-button border border-light-gray bg-white px-4 py-3 text-sm text-navy-700"
                  value={draft.name}
                  onChange={(event) => handleChange('name', event.target.value)}
                />

                <label className="block text-sm font-medium text-navy-600">Website URL</label>
                <input
                  className="w-full rounded-button border border-light-gray bg-white px-4 py-3 text-sm text-navy-700"
                  value={draft.website}
                  onChange={(event) => handleChange('website', event.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-navy-700">Location Details</h2>
            <label className="block text-sm font-medium text-navy-600">Office Address</label>
            <textarea
              className="w-full min-h-[96px] rounded-button border border-light-gray bg-white p-4 text-sm text-navy-700"
              value={draft.address}
              onChange={(event) => handleChange('address', event.target.value)}
            />
            <a href={mapsLink} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-light-gray bg-gray-50">
              <iframe
                title="Company location on Google Maps"
                src={mapsEmbedUrl}
                className="h-56 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
            <p className="text-sm text-mid-gray">Tap the map to open the company location in Google Maps.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-navy-700">Corporate Identity</h2>
            <label className="block text-sm font-medium text-navy-600">About / Company Motto</label>
            <textarea
              className="w-full min-h-[160px] rounded-button border border-light-gray bg-white p-4 text-sm text-navy-700"
              value={draft.motto}
              onChange={(event) => handleChange('motto', event.target.value)}
            />
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t border-light-gray">
            <Button variant="secondary" type="button" onClick={handleDiscard}>Discard Changes</Button>
            <Button variant="primary" type="button" onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
