export type Language = 'en' | 'ar';

export interface TranslationKeys {
  // Navbar
  nav: {
    home: string;
    services: string;
    caseStudies: string;
    about: string;
    blog: string;
    contact: string;
    getStarted: string;
  };
  // Hero
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };
  // Services
  services: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  // Case Studies
  caseStudies: {
    badge: string;
    title: string;
    items: Array<{
      category: string;
      title: string;
      description: string;
    }>;
  };
  // Process
  process: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  // Technologies
  tech: {
    badge: string;
    title: string;
    subtitle: string;
  };
  // Team
  team: {
    badge: string;
    title: string;
    subtitle: string;
    members: Array<{
      name: string;
      role: string;
    }>;
  };
  // Testimonials
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      role: string;
      company: string;
      quote: string;
    }>;
  };
  // CTA
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  // Contact
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    projectPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    info: {
      email: string;
      phone: string;
      location: string;
    };
  };
  // Blog
  blog: {
    badge: string;
    title: string;
    subtitle: string;
    readMore: string;
    posts: Array<{
      category: string;
      title: string;
      excerpt: string;
      date: string;
      readTime: string;
    }>;
  };
  // Footer
  footer: {
    description: string;
    links: string;
    services: string;
    company: string;
    copyright: string;
    pages: Array<{ label: string; href: string }>;
    serviceLinks: Array<{ label: string }>;
  };
}
