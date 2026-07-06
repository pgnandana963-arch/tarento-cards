import { useEffect, useState } from 'react';

export interface CompanyProfileData {
  name: string;
  website: string;
  address: string;
  motto: string;
  logo?: string;
}

const STORAGE_KEY = 'tarento-company-profile';

export const defaultCompanyProfile: CompanyProfileData = {
  name: 'Tarento Technologies',
  website: 'https://www.tarento.com/',
  address: 'IBC Knowledge Park, Bannerghatta Main Road, Bangalore, Karnataka 560029',
  motto: 'We build digital products that create meaningful impact.',
  logo: undefined,
};

export function useCompanyProfile() {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfileData>(() => {
    if (typeof window === 'undefined') {
      return defaultCompanyProfile;
    }

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as CompanyProfileData;
      }
    } catch {
      // fall back to the default profile if localStorage is unavailable
    }

    return defaultCompanyProfile;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(companyProfile));
    }
  }, [companyProfile]);

  return { companyProfile, setCompanyProfile };
}
