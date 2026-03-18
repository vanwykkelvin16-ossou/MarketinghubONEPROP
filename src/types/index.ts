export interface Tenant {
  id: string;
  name: string;
  category: string;
  type: 'anchor' | 'retail' | 'office' | 'food' | 'service';
  unit: string;
  size: string;
  leaseStart: string;
  leaseEnd: string;
  status: 'active' | 'pending' | 'expired';
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  category: 'legal' | 'financial' | 'lease' | 'maintenance' | 'insurance' | 'plans';
  icon: string;
}

export interface MediaItem {
  id: string;
  title: string;
  category: 'exterior' | 'interior' | 'aerial' | 'development' | 'event';
  url: string;
  thumbnail: string;
  date: string;
  fileSize: string;
}

export interface MarketingAsset {
  id: string;
  title: string;
  type: 'photo' | 'video' | 'brochure' | 'social' | 'branding';
  url: string;
  thumbnail: string;
  date: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  city: string;
  province: string;
  type: 'retail' | 'commercial' | 'mixed-use' | 'industrial' | 'office';
  status: 'active' | 'development' | 'upcoming';
  openingDate: string;
  gla: string;
  description: string;
  townOverview: string;
  coverImage: string;
  accentColor: string;
  stats: {
    occupancy: string;
    tenants: number;
    parkingBays: string;
    floors: string;
  };
  tenants: Tenant[];
  documents: Document[];
  media: MediaItem[];
  marketing: MarketingAsset[];
}
