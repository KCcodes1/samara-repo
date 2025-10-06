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

export interface AboutSettings {
  statistics: {
    projectsCompleted: string;
    yearsExperience: string;
    clientSatisfaction: string;
    teamMembers: string;
  };
  team: Array<{
    name: string;
    role: string;
    bio: string;
    image?: string;
  }>;
  testimonials: Array<{
    name: string;
    location: string;
    rating: number;
    testimonial: string;
  }>;
  cta: {
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
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

export async function getAboutSettings(): Promise<AboutSettings> {
  try {
    const filePath = path.join(process.cwd(), 'content/settings/about.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const aboutSettings = JSON.parse(fileContent) as AboutSettings;
    
    return aboutSettings;
  } catch (error) {
    console.error('Error reading about settings:', error);
    // Return default values if file doesn't exist or is invalid
    return {
      statistics: {
        projectsCompleted: "500+",
        yearsExperience: "10+",
        clientSatisfaction: "98%",
        teamMembers: "50+"
      },
      team: [
        {
          name: "Sarah Mwangi",
          role: "Lead Interior Designer",
          bio: "With 8 years of experience, Sarah specializes in modern and contemporary designs.",
          image: "/uploads/hero.jpg"
        },
        {
          name: "James Kiprop",
          role: "Project Manager",
          bio: "James ensures every project runs smoothly from concept to completion.",
          image: "/uploads/hero.jpg"
        },
        {
          name: "Grace Wanjiku",
          role: "Senior Designer",
          bio: "Grace brings creativity and attention to detail to every design project.",
          image: "/uploads/hero.jpg"
        }
      ],
      testimonials: [
        {
          name: "Mary Wanjiku",
          location: "Karen, Nairobi",
          rating: 5,
          testimonial: "Samara H&H transformed our living room beyond our expectations. The attention to detail and quality of work is outstanding."
        },
        {
          name: "David Kimani",
          location: "Westlands, Nairobi",
          rating: 5,
          testimonial: "Professional, reliable, and creative. They understood our vision and brought it to life beautifully."
        },
        {
          name: "Susan Akinyi",
          location: "Runda, Nairobi",
          rating: 5,
          testimonial: "From consultation to completion, the entire process was seamless. Highly recommend their services."
        }
      ],
      cta: {
        title: "Ready to Transform Your Space?",
        description: "Let's work together to create the home of your dreams. Contact us today for a free consultation.",
        primaryButtonText: "Get Free Consultation",
        primaryButtonLink: "/contact",
        secondaryButtonText: "View Our Work",
        secondaryButtonLink: "/catalogue"
      }
    };
  }
}
