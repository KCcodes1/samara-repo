import fs from 'fs';
import path from 'path';

export interface ContactInfo {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  whatsappMessage: string;
  socials: {
    instagram?: string;
    pinterest?: string;
    tiktok?: string;
    facebook?: string;
  };
}

export async function getContactInfo(): Promise<ContactInfo> {
  try {
    const filePath = path.join(process.cwd(), 'content/settings/contact.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const contactInfo = JSON.parse(fileContent) as ContactInfo;
    
    return contactInfo;
  } catch (error) {
    console.error('Error reading contact info:', error);
    // Return default values if file doesn't exist or is invalid
    return {
      companyName: "Samara H&H",
      address: "Nairobi, Kenya",
      phone: "+254 700 000000",
      email: "hello@example.com",
      whatsappNumber: "254700000000",
      whatsappMessage: "Hi! I'm interested in your home décor and fittings.",
      socials: {
        instagram: "https://instagram.com/yourbrand",
        pinterest: "https://pinterest.com/yourbrand",
        tiktok: "https://tiktok.com/@yourbrand",
        facebook: "https://facebook.com/yourbrand"
      }
    };
  }
}
