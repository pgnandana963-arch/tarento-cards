import {
  Phone,
  Mail,
  Briefcase,
  MapPin,
  Globe,
  Download,
  Share2,
} from 'lucide-react';

interface DigitalBusinessCardProps {
  name: string;
  title: string;
  tagline: string;
  phone: string;
  email: string;
  linkedinUrl: string;
  address: string;
  websiteUrl: string;
  avatarInitials: string;
  avatarUrl?: string;
  companyName: string;
  companyLogoUrl?: string;
  companyTagline?: string;
  expertiseTags: string[];
  onSaveContact: () => void;
  onShare: () => void;
}

import { forwardRef } from 'react';

const DigitalBusinessCard = forwardRef<HTMLDivElement, DigitalBusinessCardProps>((props, ref) => {
  const {
    name,
    title,
    tagline,
    phone,
    email,
    linkedinUrl,
    address,
    websiteUrl,
    avatarInitials,
    avatarUrl,
    companyName,
    companyLogoUrl,
    companyTagline,
    expertiseTags = [],
    onSaveContact,
    onShare,
  } = props;
  const visibleTags = expertiseTags.slice(0, 4);

  return (
    <div ref={ref as any} className="max-w-[360px] w-full rounded-[16px] border border-[#E5E7EB] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden">
      <div className="relative bg-[#042C53] h-[160px] px-4 pt-5 pb-3">
        <div className="absolute left-1/2 top-4 -translate-x-1/2 flex flex-col items-center justify-center gap-1 text-center">
          {companyLogoUrl ? (
            <img src={companyLogoUrl} alt={`${companyName} logo`} crossOrigin="anonymous" className="h-9 w-auto object-contain bg-transparent" />
          ) : (
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white">
              {companyName}
            </span>
          )}
          {companyTagline ? (
            <span className="text-[12px] text-white/90">{companyTagline}</span>
          ) : null}
        </div>
        <div className="absolute left-1/2 top-[110px] flex -translate-x-1/2 items-center justify-center rounded-full bg-white p-[4px] shadow-[0_0_0_4px_rgba(255,255,255,0.9)]">
          <div className="flex h-[86px] w-[86px] items-center justify-center overflow-hidden rounded-full bg-[#B5D4F4] text-[#042C53] text-[24px] font-semibold">
            {avatarUrl ? (
              <img src={avatarUrl} alt={`${name} photo`} crossOrigin="anonymous" className="h-full w-full object-cover" />
            ) : (
              avatarInitials
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pt-14 pb-4 text-center">
        <h1 className="text-[24px] font-semibold text-[#042C53]" style={{ fontFamily: 'Sora, sans-serif' }}>
          {name}
        </h1>
        <p className="mt-2 text-[13px] font-medium text-[#085041]" style={{ fontFamily: 'Inter, sans-serif' }}>
          {title}
        </p>
        <p className="mt-2 text-[12px] text-[#64748B]" style={{ fontFamily: 'Inter, sans-serif' }}>
          {tagline}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 px-4 pb-4">
        <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex min-h-[68px] items-center gap-3 rounded-[14px] border border-[#E5E7EB] bg-white px-3 py-3" aria-label={`Call ${phone}`}>
          <span className="inline-flex h-9 w-9 min-w-[36px] items-center justify-center rounded-full bg-[#E6F1FB] text-[#0C447C] flex-shrink-0">
            <Phone size={16} />
          </span>
          <span className="flex-1 min-w-0 flex items-center text-[11px] leading-4 text-[#0F172A] whitespace-nowrap">{phone}</span>
        </a>
        <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`} target="_blank" rel="noreferrer" className="flex min-h-[68px] items-center gap-2 rounded-[14px] border border-[#E5E7EB] bg-white px-2 py-3" aria-label={`Email ${email}`}>
          <span className="inline-flex h-8 w-8 min-w-[28px] items-center justify-center rounded-full bg-[#E6F1FB] text-[#0C447C] flex-shrink-0">
            <Mail size={16} />
          </span>
          <span className="flex-1 min-w-0 flex items-center text-[10px] leading-4 text-[#0F172A] whitespace-nowrap">{email}</span>
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[68px] items-center gap-3 rounded-[14px] border border-[#E5E7EB] bg-white px-2 py-3 text-[11px] text-[#0F172A] transition hover:bg-[#F8FBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#085041] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          aria-label="Open LinkedIn profile"
        >
          <span className="inline-flex h-9 w-9 min-w-[36px] items-center justify-center rounded-full bg-[#E6F1FB] text-[#0C447C] flex-shrink-0">
            <Briefcase size={16} />
          </span>
          <span className="flex-1 min-w-0 text-[11px] whitespace-nowrap">LinkedIn</span>
        </a>
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(address)}`}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[68px] items-center gap-3 rounded-[14px] border border-[#E5E7EB] bg-white px-2 py-3 text-[11px] text-[#0F172A] transition hover:bg-[#F8FBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#085041] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          aria-label="Open address in Google Maps"
        >
          <span className="inline-flex h-9 w-9 min-w-[36px] items-center justify-center rounded-full bg-[#E6F1FB] text-[#0C447C] flex-shrink-0">
            <MapPin size={16} />
          </span>
          <span className="flex-1 min-w-0 text-[11px] whitespace-nowrap">Address</span>
        </a>
      </div>

      <div className="mx-4 border-t border-[#E5E7EB]" />

      <div className="px-4 pb-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#64748B]" style={{ fontFamily: 'Inter, sans-serif' }}>
          Areas of expertise
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="rounded-[10px] bg-[#E6F1FB] px-3 py-2 text-sm font-medium text-[#0C447C] text-center"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <a
        href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
        target="_blank"
        rel="noreferrer"
        className="mx-4 mb-4 flex items-center justify-center gap-3 rounded-[10px] border border-[#E5E7EB] bg-white px-3 py-3 text-sm text-[#0C447C] transition hover:bg-[#F8FBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#085041] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label="Open website"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E6F1FB] text-[#0C447C]">
          <Globe size={16} />
        </span>
        {websiteUrl.replace(/^https?:\/\//, '')}
      </a>

      <div className="space-y-3 px-4 pb-4">
        <button
          type="button"
          onClick={onSaveContact}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#042C53] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#021f3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#085041] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <Download size={18} />
          Download card
        </button>
        <button
          type="button"
          onClick={onShare}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#042C53] bg-white px-4 py-3 text-sm font-medium text-[#042C53] transition hover:bg-[#F8FAFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#085041] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <Share2 size={18} />
          Share profile
        </button>
      </div>
    </div>
  );
});

export default DigitalBusinessCard;
