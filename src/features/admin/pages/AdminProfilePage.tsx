import { useState } from 'react';
import { Lock, Mail, Phone, Link2 } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import Avatar from '@/components/Avatar';
import { PageHeader } from '@/components/PageHeader';
import { useCompanyProfile } from '@/features/admin/hooks/useCompanyProfile';
import TarentoLogo from '@/assets/Tarento_logo.svg';

export function AdminProfilePage() {
  const { companyProfile } = useCompanyProfile();
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    title: 'Senior Product Design',
    department: 'Design & User Experience',
    about: 'Passionate about crafting clean interfaces.',
    phone: '+91 98765 43210',
    email: 'employee@tarento.com',
    linkedin: 'linkedin.com/in/janedoe',
  });

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Profile" subtitle="Manage your digital business card details and contact information." />

      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)_320px]">
        <Card padding="md">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-navy-700">Company details</h2>
                <p className="text-sm text-mid-gray">Managed centrally by your administrator</p>
              </div>
              <div className="rounded-full bg-slate-100 p-2 text-slate-500">
                <Lock size={16} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-light-gray bg-white p-4">
                <div className="text-sm text-navy-500 mb-2">Company Logo</div>
                <div className="h-28 w-full rounded-xl border border-light-gray bg-off-white flex items-center justify-center">
                  <img src={companyProfile.logo || TarentoLogo} alt="Company Logo" className="h-20 w-auto" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-600">Company Name</label>
                <input className="mt-2 w-full rounded-button border border-light-gray bg-white px-4 py-3 text-sm text-navy-700" value={companyProfile.name} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-600">Website</label>
                <input className="mt-2 w-full rounded-button border border-light-gray bg-white px-4 py-3 text-sm text-navy-700" value={companyProfile.website} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-600">Office Address</label>
                <textarea className="mt-2 w-full rounded-button border border-light-gray bg-white px-4 py-3 text-sm text-navy-700 min-h-[120px] resize-none" value={companyProfile.address} readOnly />
              </div>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar name={profile.name} size="xl" />
              <div>
                <h2 className="text-lg font-semibold text-navy-700">Your details</h2>
                <span className="text-sm text-mid-gray">Update your personal details for your admin profile.</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full Name" value={profile.name} onChange={() => {}} disabled />
              <Input label="Job Title" value={profile.title} onChange={() => {}} disabled />
            </div>
            <Input label="Department" value={profile.department} onChange={() => {}} disabled />
            <Input label="About" value={profile.about} onChange={(value) => handleChange('about', value)} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-navy-600"><Phone size={16} /><span>Phone</span></div>
                  <Input label="" value={profile.phone} onChange={() => {}} disabled />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-navy-600"><Mail size={16} /><span>Email</span></div>
                <Input label="" value={profile.email} onChange={() => {}} disabled />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-navy-600"><Link2 size={16} /><span>LinkedIn</span></div>
              <Input label="" value={profile.linkedin} onChange={() => {}} disabled />
            </div>

            <div className="flex justify-end">
              <Button variant="primary" type="button">Save changes</Button>
            </div>
          </div>
        </Card>

        <Card padding="md" className="self-start xl:sticky xl:top-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-navy-700">Profile preview</h2>
              <p className="text-sm text-mid-gray">This is how your admin profile will appear to others.</p>
            </div>

            <div className="rounded-2xl border border-light-gray bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <Avatar name={profile.name} size="xl" />
                <div className="mt-4 space-y-1">
                  <h3 className="text-lg font-semibold text-navy-700">{profile.name}</h3>
                  <p className="text-sm font-medium text-indigo-600">{profile.title}</p>
                  <p className="text-sm text-mid-gray">{profile.department}</p>
                </div>
                <p className="mt-4 text-sm text-mid-gray">{profile.about}</p>
                <div className="mt-5 w-full space-y-2 text-sm text-mid-gray">
                  <div className="flex items-center justify-center gap-2">
                    <Phone size={14} />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Mail size={14} />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Link2 size={14} />
                    <span>{profile.linkedin}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
