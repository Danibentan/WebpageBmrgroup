type ContactInfo = {
  commercial: {
    phonePrimaryDisplay: string;
    phoneSecondaryDisplay: string;
    phonePrimaryHref: string;
    phoneSecondaryHref: string;
    scheduleWeekdays: string;
    scheduleSaturday: string;
  };
  whatsapp: {
    href: string;
  };
  location: {
    label: string;
    mapsHref: string;
  };
  social: {
    instagramLabel: string;
    instagramHref: string;
    facebookLabel: string;
    facebookHref: string;
    emailLabel: string;
    emailHref: string;
  };
};

export const contactInfo: ContactInfo = {
  commercial: {
    phonePrimaryDisplay: '+54 9 11 6525 3473',
    phoneSecondaryDisplay: '+54 9 11 2754 1214',
    phonePrimaryHref: 'tel:+5491165253473',
    phoneSecondaryHref: 'tel:+5491127541214',
    scheduleWeekdays: 'Lunes a Viernes · 08:00 a 17:00',
    scheduleSaturday: 'Sábados · 09:30 a 13:00'
  },
  whatsapp: {
    href: 'https://wa.me/5491165253473?text=Hola%2C%20bmrgroupme%20interesa%20cotizar%20aberturas%20'
  },
  location: {
    label: 'Colectora Este Ramal Escobar 1871 ramal, B1625 Belén de Escobar, Provincia de Buenos Aires',
    mapsHref: 'https://maps.google.com/?q=Colectora+Este+Ramal+Escobar+1871+ramal,+B1625+Bel%C3%A9n+de+Escobar,+Provincia+de+Buenos+Aires'
  },
  social: {
    instagramLabel: '@bmrgroupargentina',
    instagramHref: 'https://www.instagram.com/bmrgroupar',
    emailLabel: 'panamericanglass@gmail.com',
    emailHref: 'mailto:panamericanglass@gmail.com'
  }
};
