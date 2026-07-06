import { useEffect, useState } from 'react';
import { Copy, Download, ExternalLink, Mail, Share2 } from 'lucide-react';
import DigitalBusinessCard from '../components/DigitalBusinessCard';
import SarahPhoto from '@/sarah.png';
import TarentoLogo from '@/assets/tarento_logo.png';
import { useCompanyProfile } from '@/features/admin/hooks/useCompanyProfile';
import Modal from '@/components/Modal';

const employeeProfile = {
  name: 'Sarah Jenkins',
  title: 'Senior Solutions Architect | Enterprise Cloud',
  tagline: 'Helping businesses scale securely.',
  phone: '+1 987 65 43210',
  email: 'sarah.j@tarento.com',
  linkedinUrl: 'https://www.linkedin.com/in/sarah-jenkins',
  avatarInitials: 'SJ',
  companyName: 'Tarento',
  companyTagline: 'Co-creating a better tomorrow',
  expertiseTags: [
    'Cloud Architecture Strategy',
    'Enterprise Scale & Migration',
    'Zero-Trust Security & Compliance',
    'Cost & Performance Optimization',
  ],
};

const pdfFileName = 'Sarah_Jenkins_full_profile.pdf';

export default function BusinessCardPage() {
  useEffect(() => {
    if (!document.getElementById('sora-inter-font')) {
      const link = document.createElement('link');
      link.id = 'sora-inter-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Sora:wght@500&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const { companyProfile } = useCompanyProfile();
  const contactUrl = 'https://tarento.com/sarah-jenkins';
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const generatePdfBlob = async (): Promise<Blob> => {
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 48;
    const contentWidth = pageWidth - margin * 2;
    const website = companyProfile.website.replace(/^https?:\/\//, '');
    let y = 54;

    const addWrappedText = (
      text: string,
      x: number,
      currentY: number,
      maxWidth: number,
      lineHeight: number,
      options?: { align?: 'left' | 'center' | 'right' }
    ) => {
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, currentY, options);
      return currentY + lines.length * lineHeight;
    };

    pdf.setFillColor(4, 44, 83);
    pdf.roundedRect(margin, y, contentWidth, 122, 10, 10, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(24);
    pdf.text(employeeProfile.companyName, pageWidth / 2, y + 42, { align: 'center' });
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.text(employeeProfile.companyTagline, pageWidth / 2, y + 64, { align: 'center' });

    pdf.setFillColor(255, 255, 255);
    pdf.circle(pageWidth / 2, y + 120, 38, 'F');
    pdf.setFillColor(181, 212, 244);
    pdf.circle(pageWidth / 2, y + 120, 32, 'F');
    pdf.setTextColor(4, 44, 83);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text(employeeProfile.avatarInitials, pageWidth / 2, y + 127, { align: 'center' });

    y += 186;
    pdf.setTextColor(4, 44, 83);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(28);
    pdf.text(employeeProfile.name, pageWidth / 2, y, { align: 'center' });

    y += 24;
    pdf.setTextColor(8, 80, 65);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(13);
    y = addWrappedText(employeeProfile.title, pageWidth / 2, y, contentWidth, 16, { align: 'center' });

    pdf.setTextColor(100, 116, 139);
    pdf.setFontSize(11);
    y = addWrappedText(employeeProfile.tagline, pageWidth / 2, y + 10, contentWidth, 15, { align: 'center' });

    y += 28;
    pdf.setDrawColor(229, 231, 235);
    pdf.line(margin, y, pageWidth - margin, y);

    y += 34;
    pdf.setTextColor(4, 44, 83);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(15);
    pdf.text('Contact details', margin, y);

    y += 26;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.setTextColor(15, 23, 42);

    const contactRows = [
      ['Phone', employeeProfile.phone],
      ['Email', employeeProfile.email],
      ['LinkedIn', employeeProfile.linkedinUrl],
      ['Website', website],
      ['Address', companyProfile.address],
    ];

    contactRows.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${label}:`, margin, y);
      pdf.setFont('helvetica', 'normal');
      y = addWrappedText(value, margin + 78, y, contentWidth - 78, 15);
      y += 8;
    });

    y += 16;
    pdf.setTextColor(4, 44, 83);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(15);
    pdf.text('Areas of expertise', margin, y);

    y += 24;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.setTextColor(15, 23, 42);
    employeeProfile.expertiseTags.forEach((tag) => {
      y = addWrappedText(`- ${tag}`, margin, y, contentWidth, 15);
      y += 6;
    });

    pdf.setFillColor(246, 247, 249);
    pdf.rect(margin, 760, contentWidth, 34, 'F');
    pdf.setTextColor(100, 116, 139);
    pdf.setFontSize(9);
    pdf.text('Generated from Tarento Digital Business Card', pageWidth / 2, 782, { align: 'center' });

    return pdf.output('blob');
  };

  const downloadPdf = async () => {
    const blob = await generatePdfBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = pdfFileName;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleSaveContact = async () => {
    try {
      await downloadPdf();
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const sharePdfWithDevice = async () => {
    setIsSharing(true);
    try {
      const blob = await generatePdfBlob();
      const file = new File([blob], pdfFileName, { type: 'application/pdf' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await (navigator as any).share({ files: [file], title: 'Sarah Jenkins Digital Business Card', text: "Sarah Jenkins's Digital Business Card" });
        setIsShareOpen(false);
        return;
      }

      const url = URL.createObjectURL(blob);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error(err);
      alert('Failed to generate/share PDF: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSharing(false);
    }
  };

  const copyProfileLink = async () => {
    try {
      await navigator.clipboard.writeText(contactUrl);
      alert('Profile link copied.');
    } catch {
      alert(`Copy this profile link: ${contactUrl}`);
    }
  };

  const emailProfileLink = () => {
    const subject = encodeURIComponent('Sarah Jenkins full profile PDF');
    const body = encodeURIComponent(`Please download or share Sarah Jenkins's full profile PDF from ${contactUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-10">
      <div className="mx-auto w-full max-w-[375px]">
        <DigitalBusinessCard
          name={employeeProfile.name}
          title={employeeProfile.title}
          tagline={employeeProfile.tagline}
          phone={employeeProfile.phone}
          email={employeeProfile.email}
          linkedinUrl={employeeProfile.linkedinUrl}
          address={companyProfile.address}
          websiteUrl={companyProfile.website.replace(/^https?:\/\//, '')}
          avatarInitials={employeeProfile.avatarInitials}
          avatarUrl={SarahPhoto}
          companyName={employeeProfile.companyName}
          companyLogoUrl={TarentoLogo}
          companyTagline={employeeProfile.companyTagline}
          expertiseTags={employeeProfile.expertiseTags}
          onSaveContact={handleSaveContact}
          onShare={() => setIsShareOpen(true)}
        />
      </div>

      <Modal
        isOpen={isShareOpen}
        title="Share full profile"
        onClose={() => setIsShareOpen(false)}
        className="max-w-md"
      >
        <div className="grid gap-3">
          <button
            type="button"
            onClick={sharePdfWithDevice}
            disabled={isSharing}
            className="flex min-h-[56px] items-center gap-3 rounded-[8px] border border-light-gray px-4 text-left text-navy-500 transition hover:bg-off-white disabled:opacity-60"
          >
            <Share2 size={18} />
            <span className="font-medium">{isSharing ? 'Preparing PDF...' : 'Share PDF with device apps'}</span>
          </button>
          <button
            type="button"
            onClick={handleSaveContact}
            className="flex min-h-[56px] items-center gap-3 rounded-[8px] border border-light-gray px-4 text-left text-navy-500 transition hover:bg-off-white"
          >
            <Download size={18} />
            <span className="font-medium">Download full profile PDF</span>
          </button>
          <button
            type="button"
            onClick={copyProfileLink}
            className="flex min-h-[56px] items-center gap-3 rounded-[8px] border border-light-gray px-4 text-left text-navy-500 transition hover:bg-off-white"
          >
            <Copy size={18} />
            <span className="font-medium">Copy profile link</span>
          </button>
          <button
            type="button"
            onClick={emailProfileLink}
            className="flex min-h-[56px] items-center gap-3 rounded-[8px] border border-light-gray px-4 text-left text-navy-500 transition hover:bg-off-white"
          >
            <Mail size={18} />
            <span className="font-medium">Share by email</span>
          </button>
          <a
            href={contactUrl}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[56px] items-center gap-3 rounded-[8px] border border-light-gray px-4 text-left font-medium text-navy-500 transition hover:bg-off-white"
          >
            <ExternalLink size={18} />
            Open public profile
          </a>
        </div>
      </Modal>
    </div>
  );
}
