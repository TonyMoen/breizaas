import { Mail, Phone } from 'lucide-react'

interface BookingContactProps {
  email: string
  phone?: string
}

export function BookingContact({ email, phone }: BookingContactProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary uppercase mb-8 tracking-wide">
        KONTAKT FOR BOOKING
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <a
          href={`mailto:${email}`}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-gold-champagne hover:bg-gold-vintage text-brown-dark font-semibold rounded-lg transition-colors duration-200"
        >
          <Mail className="w-5 h-5" />
          {email}
        </a>

        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-brown-warm hover:bg-brown-light text-text-primary font-semibold rounded-lg border-2 border-gold-champagne transition-colors duration-200"
          >
            <Phone className="w-5 h-5" />
            {phone}
          </a>
        )}
      </div>
    </section>
  )
}
