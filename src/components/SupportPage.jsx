import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Phone,
} from "lucide-react";

const helpContacts = [
  {
    name: "Chiromo Hospital Group",
    role: "24/7 emergency mental health support",
    phone: "+254 20 397 1000",
    altPhone: "+254 750 927 232",
    place: "Nairobi and virtual support",
    site: "https://chiromohospitalgroup.co.ke/",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Kenya Red Cross Society",
    role: "Health and humanitarian support referral",
    phone: "+254 703 037 000",
    altPhone: "",
    place: "South C, Nairobi",
    site: "https://redcross.co.ke/",
    image:
      "https://images.unsplash.com/photo-1516549655669-df3f9e8d8a73?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Emergency Services in Kenya",
    role: "Immediate danger or urgent crisis response",
    phone: "999",
    altPhone: "",
    place: "Use immediately in an emergency",
    site: "https://en.wikipedia.org/wiki/Emergency_telephone_number",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
  },
];

export default function SupportPage() {
  return (
    <main className="support-page">
      <section className="support-shell">
        <div className="support-page-top">
          <Link to="/" className="chat-back">
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <p className="eyebrow">Explore support</p>
          <h1>
            Contacts that can help when mental health feels too heavy to carry
            alone.
          </h1>
          <p className="support-page-lead">
            This page pulls direct support contacts into one place so the user
            can reach real institutions faster. If there is immediate danger,
            urgent help should come first.
          </p>
        </div>

        <div className="support-contact-grid">
          {helpContacts.map((contact) => (
            <article key={contact.name} className="support-contact-card">
              <img
                src={contact.image}
                alt={contact.name}
                className="support-contact-image"
              />

              <div className="support-contact-body">
                <p className="support-contact-role">{contact.role}</p>
                <h2>{contact.name}</h2>

                <div className="support-contact-row">
                  <Phone size={16} />
                  <div>
                    <strong>{contact.phone}</strong>
                    {contact.altPhone ? (
                      <span>Alternative: {contact.altPhone}</span>
                    ) : null}
                  </div>
                </div>

                <div className="support-contact-row">
                  <MapPin size={16} />
                  <span>{contact.place}</span>
                </div>

                <a
                  href={contact.site}
                  className="secondary-action support-contact-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open source
                  <ArrowRight size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="support-warning">
          <AlertTriangle size={18} />
          <span>
            If the user may harm themselves or someone else, call emergency
            services immediately instead of waiting for a later conversation.
          </span>
        </div>
      </section>
    </main>
  );
}
