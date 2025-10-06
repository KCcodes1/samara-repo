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

export interface ServicesSettings {
  hero: {
    title: string;
    subtitle: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
  services: Array<{
    title: string;
    description: string;
    price: string;
    duration: string;
    icon: string;
    features: string[];
  }>;
  processSteps: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    content: string;
    rating: number;
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

export async function getServicesSettings(): Promise<ServicesSettings> {
  try {
    const filePath = path.join(process.cwd(), 'content/settings/services.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const servicesSettings = JSON.parse(fileContent) as ServicesSettings;
    
    return servicesSettings;
  } catch (error) {
    console.error('Error reading services settings:', error);
    // Return default values if file doesn't exist or is invalid
    return {
      hero: {
        title: "Transform Your Space with Expert Design Services",
        subtitle: "Professional interior design and home décor solutions tailored to your style, budget, and lifestyle. From consultation to completion, we bring your vision to life.",
        primaryButtonText: "Get Free Consultation",
        primaryButtonLink: "/contact",
        secondaryButtonText: "View Our Work",
        secondaryButtonLink: "/catalogue"
      },
      services: [
        {
          title: "Interior Design Consultation",
          description: "Professional design consultation to transform your space with expert guidance on layout, color schemes, and furniture selection.",
          price: "From $150",
          duration: "2-3 hours",
          icon: "consultation",
          features: ["Space planning", "Color consultation", "Furniture selection", "Style guidance"]
        },
        {
          title: "Complete Room Makeover",
          description: "Full-service room transformation including design, sourcing, and installation of all elements.",
          price: "From $2,500",
          duration: "2-4 weeks",
          icon: "room-makeover",
          features: ["Complete design plan", "Product sourcing", "Installation service", "Final styling"]
        },
        {
          title: "Custom Curtains & Drapes",
          description: "Bespoke window treatments designed and crafted to perfectly fit your windows and complement your interior style.",
          price: "From $300",
          duration: "1-2 weeks",
          icon: "curtains",
          features: ["Custom measurements", "Fabric selection", "Professional installation", "Maintenance guide"]
        },
        {
          title: "Furniture Selection & Styling",
          description: "Expert furniture curation and styling services to create cohesive, functional, and beautiful living spaces.",
          price: "From $200",
          duration: "1-2 weeks",
          icon: "furniture",
          features: ["Furniture sourcing", "Style coordination", "Space optimization", "Accessory selection"]
        },
        {
          title: "Home Staging",
          description: "Professional home staging services to showcase your property's potential and attract potential buyers or renters.",
          price: "From $1,200",
          duration: "3-5 days",
          icon: "staging",
          features: ["Property assessment", "Furniture rental", "Styling & arrangement", "Photo-ready setup"]
        },
        {
          title: "Maintenance & Updates",
          description: "Ongoing maintenance and seasonal updates to keep your space fresh and well-maintained throughout the year.",
          price: "From $100",
          duration: "As needed",
          icon: "maintenance",
          features: ["Seasonal updates", "Maintenance checks", "Style refreshes", "Trend consultations"]
        }
      ],
      processSteps: [
        {
          step: "01",
          title: "Initial Consultation",
          description: "We start with a detailed discussion about your vision, lifestyle, and budget to understand your needs."
        },
        {
          step: "02",
          title: "Design & Planning",
          description: "Our team creates a comprehensive design plan with 3D visualizations and detailed specifications."
        },
        {
          step: "03",
          title: "Sourcing & Procurement",
          description: "We source the best materials and furniture within your budget, handling all vendor relationships."
        },
        {
          step: "04",
          title: "Installation & Styling",
          description: "Professional installation and final styling to bring your vision to life with attention to every detail."
        }
      ],
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "Homeowner",
          content: "Samara transformed our living room completely. Their attention to detail and professional approach exceeded our expectations.",
          rating: 5
        },
        {
          name: "Michael Chen",
          role: "Business Owner",
          content: "The home staging service helped us sell our property 30% faster than expected. Highly recommend their expertise.",
          rating: 5
        },
        {
          name: "Emily Rodriguez",
          role: "Interior Enthusiast",
          content: "Their custom curtain service was outstanding. Perfect fit, beautiful fabric selection, and professional installation.",
          rating: 5
        }
      ],
      cta: {
        title: "Ready to Transform Your Space?",
        description: "Get started with a free consultation and discover how we can bring your vision to life.",
        primaryButtonText: "Schedule Consultation",
        primaryButtonLink: "/contact",
        secondaryButtonText: "View Portfolio",
        secondaryButtonLink: "/catalogue"
      }
    };
  }
}
