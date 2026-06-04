export const CONTACT = {
  email: 'business@florensservices.com',
  phoneDisplay: '090712 05087',
  phoneTel: '+919071205087',
  whatsappDisplay: '6361890855',
  whatsappTel: '916361890855',
  whatsappUrl: 'https://wa.me/916361890855',
  address: {
    line1: '25, 1st Floor, 1st Main, 2nd Stage, E Block',
    line2: 'S M S R Nagar, Rajajinagar',
    city: 'Bengaluru, Karnataka 560010',
  },
} as const;

export const CONTACT_ADDRESS_FULL = `${CONTACT.address.line1}, ${CONTACT.address.line2}, ${CONTACT.address.city}`;
