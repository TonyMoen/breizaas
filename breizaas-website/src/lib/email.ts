import { Resend } from 'resend';
import type { BookingFormData } from '@/schemas/booking.schema';
import type { ContactFormData } from '@/schemas/contact.schema';

// Initialize Resend client (use placeholder for build time)
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_for_build');

/**
 * Send booking confirmation email to the event organizer
 * @param data Booking form data from the organizer
 */
export async function sendBookingConfirmation(data: BookingFormData): Promise<void> {
  const { email, contactPerson, eventType, date, venue, city } = data;

  await resend.emails.send({
    from: 'Breizaas Booking <booking@breizaas.no>',
    to: email,
    subject: 'Booking confirmation - Breizaas',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Montserrat', Arial, sans-serif; background-color: #1a1410; color: #faf8f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #2a1f18; border: 2px solid #4a3f35; border-radius: 8px; padding: 40px;">
            <h1 style="color: #d4af37; font-size: 32px; margin-bottom: 20px; text-align: center;">Takk for din bookingforespørsel!</h1>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hei ${contactPerson},
            </p>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Vi har mottatt forespørselen din for <strong>${eventType}</strong> den <strong>${new Date(date).toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' })}</strong> i <strong>${city}</strong>.
            </p>

            <div style="background-color: #1a1410; border-left: 4px solid #d4af37; padding: 16px; margin: 24px 0;">
              <h3 style="color: #d4af37; font-size: 18px; margin: 0 0 12px 0;">Arrangementdetaljer</h3>
              <p style="margin: 8px 0;"><strong>Sted:</strong> ${venue}</p>
              <p style="margin: 8px 0;"><strong>By:</strong> ${city}</p>
              <p style="margin: 8px 0;"><strong>Dato:</strong> ${new Date(date).toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Vi kontakter deg snart for å diskutere detaljer rundt bookingen.
            </p>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Vennlig hilsen,<br>
              <strong style="color: #d4af37;">Breizaas</strong>
            </p>

            <hr style="border: none; border-top: 1px solid #4a3f35; margin: 32px 0;">

            <p style="font-size: 14px; color: #8b7d6b; text-align: center; margin: 0;">
              For spørsmål, kontakt oss på <a href="mailto:booking@breizaas.no" style="color: #d4af37; text-decoration: none;">booking@breizaas.no</a>
            </p>
          </div>
        </body>
      </html>
    `,
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

  const artistEmail = process.env.ARTIST_EMAIL || 'booking@breizaas.no';

  await resend.emails.send({
    from: 'Breizaas Booking System <booking@breizaas.no>',
    to: artistEmail,
    subject: `Ny bookingforespørsel: ${eventType} - ${city}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Montserrat', Arial, sans-serif; background-color: #1a1410; color: #faf8f5; padding: 20px;">
          <div style="max-width: 700px; margin: 0 auto; background-color: #2a1f18; border: 2px solid #d4af37; border-radius: 8px; padding: 40px;">
            <h1 style="color: #d4af37; font-size: 32px; margin-bottom: 24px; text-align: center;">Ny bookingforespørsel</h1>

            <div style="background-color: #1a1410; border-radius: 4px; padding: 24px; margin-bottom: 24px;">
              <h2 style="color: #d4af37; font-size: 20px; margin: 0 0 16px 0; border-bottom: 1px solid #4a3f35; padding-bottom: 8px;">
                Kontaktinformasjon
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #8b7d6b; width: 40%;"><strong>Kontaktperson:</strong></td>
                  <td style="padding: 8px 0;">${contactPerson}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8b7d6b;"><strong>Organisasjon:</strong></td>
                  <td style="padding: 8px 0;">${organization}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8b7d6b;"><strong>E-post:</strong></td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #d4af37; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8b7d6b;"><strong>Telefon:</strong></td>
                  <td style="padding: 8px 0;">${phone || '<em style="color: #8b7d6b;">Ikke oppgitt</em>'}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #1a1410; border-radius: 4px; padding: 24px; margin-bottom: 24px;">
              <h2 style="color: #d4af37; font-size: 20px; margin: 0 0 16px 0; border-bottom: 1px solid #4a3f35; padding-bottom: 8px;">
                Arrangementdetaljer
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #8b7d6b; width: 40%;"><strong>Arrangementtype:</strong></td>
                  <td style="padding: 8px 0;">${eventType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8b7d6b;"><strong>Dato:</strong></td>
                  <td style="padding: 8px 0;">${new Date(date).toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8b7d6b;"><strong>Sted:</strong></td>
                  <td style="padding: 8px 0;">${venue}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8b7d6b;"><strong>By:</strong></td>
                  <td style="padding: 8px 0;">${city}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8b7d6b;"><strong>Budsjett:</strong></td>
                  <td style="padding: 8px 0;">${budget || '<em style="color: #8b7d6b;">Ikke oppgitt</em>'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8b7d6b; vertical-align: top;"><strong>Teknisk rider:</strong></td>
                  <td style="padding: 8px 0;">${requestTechnicalRider ? '✅ Ja' : '❌ Nei'}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #1a1410; border-radius: 4px; padding: 24px;">
              <h2 style="color: #d4af37; font-size: 20px; margin: 0 0 16px 0; border-bottom: 1px solid #4a3f35; padding-bottom: 8px;">
                Beskrivelse av arrangementet
              </h2>
              <p style="font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${description}</p>
            </div>

            <hr style="border: none; border-top: 1px solid #4a3f35; margin: 32px 0;">

            <p style="font-size: 14px; color: #8b7d6b; text-align: center; margin: 0;">
              Denne forespørselen ble mottatt via breizaas.no/arrangor
            </p>
          </div>
        </body>
      </html>
    `,
  });
}

/**
 * Send contact message to artist management
 * @param data Contact form data
 */
export async function sendContactMessage(data: ContactFormData): Promise<void> {
  const { name, email, subject, message } = data;

  const artistEmail = process.env.ARTIST_EMAIL || 'booking@breizaas.no';

  const subjectMap = {
    booking: 'Booking',
    press: 'Presse',
    general: 'Generell henvendelse',
    other: 'Annet',
  };

  await resend.emails.send({
    from: 'Breizaas Kontaktskjema <kontakt@breizaas.no>',
    to: artistEmail,
    replyTo: email,
    subject: `Ny kontaktmelding: ${subjectMap[subject as keyof typeof subjectMap]}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Montserrat', Arial, sans-serif; background-color: #1a1410; color: #faf8f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #2a1f18; border: 2px solid #d4af37; border-radius: 8px; padding: 40px;">
            <h1 style="color: #d4af37; font-size: 32px; margin-bottom: 24px; text-align: center;">Ny kontaktmelding</h1>

            <div style="background-color: #1a1410; border-radius: 4px; padding: 24px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #8b7d6b; width: 30%;"><strong>Fra:</strong></td>
                  <td style="padding: 8px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8b7d6b;"><strong>E-post:</strong></td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #d4af37; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8b7d6b;"><strong>Emne:</strong></td>
                  <td style="padding: 8px 0;">${subjectMap[subject as keyof typeof subjectMap]}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #1a1410; border-radius: 4px; padding: 24px;">
              <h2 style="color: #d4af37; font-size: 20px; margin: 0 0 16px 0; border-bottom: 1px solid #4a3f35; padding-bottom: 8px;">
                Melding
              </h2>
              <p style="font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>

            <hr style="border: none; border-top: 1px solid #4a3f35; margin: 32px 0;">

            <p style="font-size: 14px; color: #8b7d6b; text-align: center; margin: 0;">
              Denne meldingen ble mottatt via breizaas.no/kontakt
            </p>
          </div>
        </body>
      </html>
    `,
  });
}
