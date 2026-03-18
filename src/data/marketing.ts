// ─── Brand ────────────────────────────────────────────────────────────────────
export const BRAND = {
  colors: [
    { name: 'Primary Orange', hex: '#F28E2E', role: 'CTA / Highlights only', textColor: '#fff' },
    { name: 'Dark Base',      hex: '#373435', role: 'Text + Structure',       textColor: '#fff' },
    { name: 'Light Grey',     hex: '#E6E7E8', role: 'Subtle sections',        textColor: '#373435' },
    { name: 'White',          hex: '#FFFFFF', role: 'Background dominance',   textColor: '#373435' },
  ],
  typography: [
    { family: 'Gotham Bold',   role: 'Heading',    sample: 'Luxury Living Starts Here',                      size: '2.25rem', weight: '700' },
    { family: 'Gotham Black',  role: 'Display',    sample: 'ONE Property Holdings',                          size: '3rem',    weight: '900' },
    { family: 'Arial Bold',    role: 'Subheading', sample: 'Premium commercial real estate.',                size: '1.125rem', weight: '700' },
    { family: 'Arial Regular', role: 'Body',       sample: 'Discover premium properties designed for modern lifestyles.', size: '1rem', weight: '400' },
  ],
  guidelines: [
    { color: '#F28E2E', label: 'Orange',     rule: 'Use for CTA buttons and key highlights only. Never for body text.' },
    { color: '#373435', label: 'Dark Grey',  rule: 'Primary text colour and structural elements. Dominant in headers.' },
    { color: '#FFFFFF', label: 'White',      rule: 'Dominant background colour. Ensures clarity and breathing space.' },
    { color: '#E6E7E8', label: 'Light Grey', rule: 'Section dividers, card backgrounds, and subtle separation.' },
  ],
};

// ─── Shared Canva edit link ────────────────────────────────────────────────────
const CANVA_EDIT = 'https://www.canva.com/design/DAHBLY8qYKQ/oXEuqyhFXctcB4YpsLx8Zw/edit?utm_content=DAHBLY8qYKQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';

// ─── Poster images (actual marketing assets) ──────────────────────────────────
const THUMB = {
  poster1:      '/posters/poster-1.png',   // Fairland Walk Shopping Centre
  poster2:      '/posters/poster-2.png',   // Southdale Shopping Centre interior
  poster3:      '/posters/poster-3.png',   // Blog Post - Strategic Property Transfer
  poster4:      '/posters/poster-4.png',   // Breaking News - ATM Heist
  poster5:      '/posters/poster-5.png',   // Did You Know - Southdale
  // video thumbnails (Unsplash - videos not yet created)
  vidFairland:   'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=800&q=80',
  vidSouthdale:  'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&q=80',
  vidOffice:     'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  vidAerial:     'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
  vidCape:       'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  vidDurban:     'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80',
};

// ─── Videos ──────────────────────────────────────────────────────────────────
export interface MarketingVideo {
  id: string;
  propertyId: string;
  propertyName: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  canvaUrl: string;
  duration: string;
  date: string;
  type: 'tour' | 'campaign' | 'aerial' | 'social';
  area: string;
  status: 'ready' | 'in-progress';
}

export const VIDEOS: MarketingVideo[] = [
  {
    id: 'v1', propertyId: 'fairland-walk', propertyName: 'Fairland Walk Shopping Centre',
    title: 'Property Tour — Full Walkthrough',
    description: 'Full property walkthrough showcasing the open-air retail experience, anchor tenants, and lifestyle offerings at Fairland Walk.',
    thumbnail: THUMB.fairlandWalk, videoUrl: '#', canvaUrl: CANVA_EDIT,
    duration: '—', date: '2025-01-01', type: 'tour', area: 'Johannesburg',
    status: 'in-progress',
  },
  {
    id: 'v2', propertyId: 'fairland-walk', propertyName: 'Fairland Walk Shopping Centre',
    title: 'Campaign Reel — Brand Launch',
    description: 'High-energy brand campaign reel introducing Fairland Walk to digital audiences across social media platforms.',
    thumbnail: THUMB.vidFairland, videoUrl: '#', canvaUrl: CANVA_EDIT,
    duration: '—', date: '2025-01-01', type: 'campaign', area: 'Johannesburg',
    status: 'in-progress',
  },
  {
    id: 'v3', propertyId: 'southdale', propertyName: 'Southdale Shopping Centre',
    title: 'Property Tour — Southdale',
    description: 'Cinematic interior tour of one of South Africa\'s oldest shopping centres, highlighting its heritage and modern retail mix.',
    thumbnail: THUMB.southdaleInt, videoUrl: '#', canvaUrl: CANVA_EDIT,
    duration: '—', date: '2025-01-01', type: 'tour', area: 'Johannesburg',
    status: 'in-progress',
  },
  {
    id: 'v4', propertyId: 'southdale', propertyName: 'Southdale Shopping Centre',
    title: 'Aerial Drone — Southdale Overview',
    description: 'Aerial drone footage capturing the full site and surrounding Johannesburg South precinct.',
    thumbnail: THUMB.vidAerial, videoUrl: '#', canvaUrl: CANVA_EDIT,
    duration: '—', date: '2025-01-01', type: 'aerial', area: 'Johannesburg',
    status: 'in-progress',
  },
  {
    id: 'v5', propertyId: 'southdale', propertyName: 'Southdale Shopping Centre',
    title: 'Social Reel — Did You Know?',
    description: 'Engaging social media video based on the "Did You Know" fun fact series — Southdale is one of SA\'s oldest shopping centres.',
    thumbnail: THUMB.vidSouthdale, videoUrl: '#', canvaUrl: CANVA_EDIT,
    duration: '—', date: '2025-01-01', type: 'social', area: 'Johannesburg',
    status: 'in-progress',
  },
  {
    id: 'v6', propertyId: 'corporate', propertyName: 'ONE Property Holdings',
    title: 'Corporate Brand Film',
    description: 'Strategic brand film showcasing ONE Property Holdings\' portfolio, vision, and position in the South African real estate market.',
    thumbnail: THUMB.vidOffice, videoUrl: '#', canvaUrl: CANVA_EDIT,
    duration: '—', date: '2025-01-01', type: 'campaign', area: 'South Africa',
    status: 'in-progress',
  },
  {
    id: 'v7', propertyId: 'corporate', propertyName: 'ONE Property Holdings',
    title: 'Enyuka Strategic Transfer — Story Film',
    description: 'Narrative video covering the strategic property transfer that elevated Enyuka to a prominent position in unlisted retail real estate.',
    thumbnail: THUMB.vidCape, videoUrl: '#', canvaUrl: CANVA_EDIT,
    duration: '—', date: '2025-01-01', type: 'campaign', area: 'South Africa',
    status: 'in-progress',
  },
  {
    id: 'v8', propertyId: 'corporate', propertyName: 'ONE Property Holdings',
    title: 'Portfolio Overview — Drone Showreel',
    description: 'Multi-property aerial showreel across the full ONE Property Holdings portfolio for investor and media use.',
    thumbnail: THUMB.vidDurban, videoUrl: '#', canvaUrl: CANVA_EDIT,
    duration: '—', date: '2025-01-01', type: 'aerial', area: 'South Africa',
    status: 'in-progress',
  },
];

// ─── Posters ─────────────────────────────────────────────────────────────────
export interface MarketingPoster {
  id: string;
  propertyId: string;
  propertyName: string;
  title: string;
  type: 'campaign' | 'brochure' | 'social' | 'billboard' | 'digital';
  area: string;
  thumbnail: string;
  downloadUrl: string;
  canvaUrl: string;
  date: string;
  dimensions: string;
}

export const POSTERS: MarketingPoster[] = [
  {
    id: 'p1', propertyId: 'fairland-walk', propertyName: 'Fairland Walk Shopping Centre',
    title: 'Fairland Walk — Property Reveal Post',
    type: 'social', area: 'Johannesburg',
    thumbnail: THUMB.poster1,
    downloadUrl: '#', canvaUrl: CANVA_EDIT,
    date: '2025-01-01', dimensions: '1080×1080px',
  },
  {
    id: 'p2', propertyId: 'southdale', propertyName: 'Southdale Shopping Centre',
    title: 'Southdale — Interior Showcase Post',
    type: 'social', area: 'Johannesburg',
    thumbnail: THUMB.poster2,
    downloadUrl: '#', canvaUrl: CANVA_EDIT,
    date: '2025-01-01', dimensions: '1080×1080px',
  },
  {
    id: 'p3', propertyId: 'corporate', propertyName: 'ONE Property Holdings',
    title: 'New Blog Post — Strategic Property Transfer',
    type: 'campaign', area: 'South Africa',
    thumbnail: THUMB.poster3,
    downloadUrl: '#', canvaUrl: CANVA_EDIT,
    date: '2025-01-01', dimensions: '1080×1080px',
  },
  {
    id: 'p4', propertyId: 'southdale', propertyName: 'Southdale Shopping Centre',
    title: 'Breaking News — ATM Heist Community Alert',
    type: 'digital', area: 'Johannesburg',
    thumbnail: THUMB.poster4,
    downloadUrl: '#', canvaUrl: CANVA_EDIT,
    date: '2025-01-01', dimensions: '1080×1080px',
  },
  {
    id: 'p5', propertyId: 'southdale', propertyName: 'Southdale Shopping Centre',
    title: 'Did You Know? — Southdale Fun Fact',
    type: 'social', area: 'Johannesburg',
    thumbnail: THUMB.poster5,
    downloadUrl: '#', canvaUrl: CANVA_EDIT,
    date: '2025-01-01', dimensions: '1080×1080px',
  },
];

// ─── Canva Links ──────────────────────────────────────────────────────────────
export interface CanvaLink {
  id: string;
  name: string;
  category: 'poster' | 'video' | 'template' | 'social' | 'brochure';
  propertyName: string;
  url: string;
  lastUpdated: string;
}

export const CANVA_LINKS: CanvaLink[] = [
  // Poster / Social links
  { id: 'cl1',  name: 'Fairland Walk — Property Reveal Post (1080×1080)',     category: 'social',   propertyName: 'Fairland Walk Shopping Centre',   url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  { id: 'cl2',  name: 'Southdale — Interior Showcase Post (1080×1080)',        category: 'social',   propertyName: 'Southdale Shopping Centre',        url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  { id: 'cl3',  name: 'Blog Post — Strategic Property Transfer',               category: 'poster',   propertyName: 'ONE Property Holdings',            url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  { id: 'cl4',  name: 'Breaking News — ATM Heist Community Alert',             category: 'poster',   propertyName: 'Southdale Shopping Centre',        url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  { id: 'cl5',  name: 'Did You Know? — Southdale Fun Fact Post',               category: 'social',   propertyName: 'Southdale Shopping Centre',        url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  // Video graphic links
  { id: 'cl6',  name: 'Fairland Walk — Video Title Cards',                     category: 'video',    propertyName: 'Fairland Walk Shopping Centre',   url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  { id: 'cl7',  name: 'Southdale — Video Lower-Thirds & End Card',             category: 'video',    propertyName: 'Southdale Shopping Centre',        url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  { id: 'cl8',  name: 'Corporate Brand Film — Motion Graphic Assets',          category: 'video',    propertyName: 'ONE Property Holdings',            url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  // Brochures
  { id: 'cl9',  name: 'Fairland Walk — A4 Property Brochure',                  category: 'brochure', propertyName: 'Fairland Walk Shopping Centre',   url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  { id: 'cl10', name: 'Southdale — A4 Property Brochure',                      category: 'brochure', propertyName: 'Southdale Shopping Centre',        url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  { id: 'cl11', name: 'ONE Property Holdings — Investment Brochure A4',        category: 'brochure', propertyName: 'ONE Property Holdings',            url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  // Templates
  { id: 'cl12', name: 'Master Brand Poster Template — Portrait (A4)',          category: 'template', propertyName: 'All Properties',                  url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  { id: 'cl13', name: 'Master Brand Poster Template — Square (1080×1080)',     category: 'template', propertyName: 'All Properties',                  url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  { id: 'cl14', name: 'Social Media Pack — Instagram + Facebook Stories',      category: 'template', propertyName: 'All Properties',                  url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  { id: 'cl15', name: 'Breaking News Template — Community Alerts',             category: 'template', propertyName: 'All Properties',                  url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  { id: 'cl16', name: 'Blog Post Announcement Template',                       category: 'template', propertyName: 'All Properties',                  url: CANVA_EDIT, lastUpdated: '2025-01-01' },
  { id: 'cl17', name: 'Did You Know? Fun Fact Template',                       category: 'template', propertyName: 'All Properties',                  url: CANVA_EDIT, lastUpdated: '2025-01-01' },
];
