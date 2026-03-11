import { Link } from 'react-router-dom';
import AIDiagnosisTool from '../components/AIDiagnosisTool';

const pricing = [
  { name: 'Starter', price: '₹999', detail: 'Single app monitoring + monthly fixes' },
  { name: 'Pro', price: '₹2,999', detail: 'Up to 5 apps + priority diagnosis' },
  { name: 'Agency', price: '₹9,999', detail: 'Unlimited apps + dedicated support' }
];

export default function LandingPage() {
  return (
    <div className="space-y-16">
      <section className="rounded-2xl border border-accent/25 bg-gradient-to-b from-panel to-bg p-8 text-center glow">
        <p className="text-sm text-accent">Aapka broken app, 24 ghante mein fixed</p>
        <h1 className="mt-4 text-4xl font-bold md:text-6xl">Your Broken App, Fixed in 24 Hours</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          VibeFix repairs broken vibe-coded apps built with Bolt.new, Lovable, Cursor, and v0. AI diagnosis + human experts + managed hosting.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/919876543210"
            className="rounded-lg bg-green-500 px-5 py-3 text-sm font-bold text-black"
          >
            WhatsApp Support (+91)
          </a>
          <Link to="/pricing" className="rounded-lg border border-accent px-5 py-3 text-sm text-accent">See Pricing</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {['Describe', 'AI Diagnoses', 'We Fix & Host'].map((step, index) => (
          <div key={step} className="rounded-xl border border-accent/20 bg-panel p-5">
            <p className="text-xs text-accent">STEP {index + 1}</p>
            <h3 className="mt-2 text-xl">{step}</h3>
          </div>
        ))}
      </section>

      <AIDiagnosisTool />

      <section>
        <h2 className="mb-5 text-2xl text-accent">Plans</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {pricing.map((plan) => (
            <div key={plan.name} className="rounded-xl border border-accent/20 bg-panel p-5">
              <h3 className="text-xl">{plan.name}</h3>
              <p className="mt-2 text-3xl text-accent">{plan.price}<span className="text-sm text-muted">/month</span></p>
              <p className="mt-2 text-sm text-muted">{plan.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl text-accent">Testimonials</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-accent/20 bg-panel p-5 text-sm text-muted">
              “VibeFix saved our launch. Placeholder testimonial card {i}.”
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
