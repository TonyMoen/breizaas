import type { BookingFormData } from '@/schemas/booking.schema';
import type { ContactFormData } from '@/schemas/contact.schema';

const WEB3FORMS_API = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;

/**
 * Send form data to Web3Forms API
 */
async function sendToWeb3Forms(data: Record<string, string>): Promise<void> {
  if (!WEB3FORMS_ACCESS_KEY) {
    throw new Error('WEB3FORMS_ACCESS_KEY is not configured');
  }

  const response = await fetch(WEB3FORMS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      ...data,
    }),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(`Web3Forms error: ${result.message || 'Unknown error'}`);
  }
}

/**
 * Send booking confirmation email to the event organizer
 * @param data Booking form data from the organizer
 */
export async function sendBookingConfirmation(data: BookingFormData): Promise<void> {
  const { email, contactPerson, eventType, date, venue, city } = data;

  const formattedDate = new Date(date).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  await sendToWeb3Forms({
    subject: `Booking bekreftelse - Breizaas`,
    from_name: 'Breizaas Booking',
    to_email: email,
    message: `
Hei ${contactPerson},

Takk for din bookingforespørsel!

Vi har mottatt forespørselen din for ${eventType} den ${formattedDate} i ${city}.

Arrangementdetaljer:
- Sted: ${venue}
- By: ${city}
- Dato: ${formattedDate}

Vi kontakter deg snart for å diskutere detaljer rundt bookingen.

Vennlig hilsen,
Breizaas

---
For spørsmål, kontakt oss på booking@breizaas.no
    `.trim(),
  });
}

/**
 * Send booking notification to artist management with all inquiry details
 * @param data Booking form data from the organizer
 */
export async function sendBookingNotification(data: BookingFormData): Promise<void> {
  const {
    contactPerson,
    organization,
    email,
    phone,
    eventType,
    date,
    venue,
    city,
    budget,
    description,
    requestTechnicalRider,
  } = data;

  const formattedDate = new Date(date).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  await sendToWeb3Forms({
    subject: `Ny bookingforespørsel: ${eventType} - ${city}`,
    from_name: 'Breizaas Booking System',
    replyto: email,
    message: `
NY BOOKINGFORESPØRSEL

KONTAKTINFORMASJON
- Kontaktperson: ${contactPerson}
- Organisasjon: ${organization}
- E-post: ${email}
- Telefon: ${phone || 'Ikke oppgitt'}

ARRANGEMENTDETALJER
- Arrangementtype: ${eventType}
- Dato: ${formattedDate}
- Sted: ${venue}
- By: ${city}
- Budsjett: ${budget || 'Ikke oppgitt'}
- Teknisk rider ønsket: ${requestTechnicalRider ? 'Ja' : 'Nei'}

BESKRIVELSE AV ARRANGEMENTET
${description}

---
Denne forespørselen ble mottatt via breizaas.no/arrangor
    `.trim(),
  });
}

/**
 * Send contact message to artist management
 * @param data Contact form data
 */
export async function sendContactMessage(data: ContactFormData): Promise<void> {
  const { name, email, subject, message } = data;

  const subjectMap: Record<string, string> = {
    booking: 'Booking',
    press: 'Presse',
    general: 'Generell henvendelse',
    other: 'Annet',
  };

  const subjectText = subjectMap[subject] || subject;

  await sendToWeb3Forms({
    subject: `Ny kontaktmelding: ${subjectText}`,
    from_name: name,
    replyto: email,
    message: `
NY KONTAKTMELDING

Fra: ${name}
E-post: ${email}
Emne: ${subjectText}

MELDING
${message}

---
Denne meldingen ble mottatt via breizaas.no/kontakt
    `.trim(),
  });
}
