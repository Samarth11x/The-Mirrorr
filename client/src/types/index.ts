export interface SalonSetting {
  id: string;
  salonName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  updatedAt?: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  detailedContent: string;
  price: string | null;
  imagePath: string | null;
  active: boolean;
  displayOrder: number;
  features: string[];
  tags: string[];
}

export interface GalleryItem {
  id: string;
  imagePath: string;
  altText: string;
  category: string;
  active: boolean;
  displayOrder: number;
  caption: string | null;
}

export interface Enquiry {
  id: string;
  customerName: string;
  contactMethod: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  selectedService: string | null;
  preferredTime: string | null;
  status: "new" | "contacted" | "closed";
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface EnquirySubmission {
  customerName: string;
  contactMethod: string;
  selectedService?: string;
  preferredTime?: string;
  message?: string;
}
