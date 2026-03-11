import { useEffect } from 'react';
import { Check } from 'lucide-react';

const plans = [
  { name: 'Starter', price: '₹999', features: ['1 app', 'Monthly scan', 'Email support'] },
  { name: 'Pro', price: '₹2,999', features: ['5 apps', 'Weekly scan', 'Priority support'] },
  { name: 'Agency', price: '₹9,999', features: ['Unlimited apps', 'Daily scan', 'Dedicated engineer'] }
];

function loadRazorpayCheckout(plan) {
  if (!window.Razorpay) return alert('Razorpay SDK failed to load.');

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    amount: Number(plan.price.replace(/[^0-9]/g, '')) * 100,
    currency: 'INR',
    name: 'VibeFix',
    description: `${plan.name} Subscription`,
    handler: () => alert(`Payment successful for ${plan.name} (test mode).`),
    theme: { color: '#00ff88' }
  };

  new window.Razorpay(options).open();
}

export default function PricingPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold">Pricing Plans</h1>
        <p className="mt-2 text-muted">Simple INR pricing for founders shipping fast.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="rounded-xl border border-accent/20 bg-panel p-6">
            <h2 className="text-2xl">{plan.name}</h2>
            <p className="mt-2 text-3xl text-accent">{plan.price}<span className="text-sm text-muted">/month</span></p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2"><Check size={14} className="text-accent" /> {feature}</li>
              ))}
            </ul>
            <button onClick={() => loadRazorpayCheckout(plan)} className="mt-5 w-full rounded-lg bg-accent px-4 py-2 text-black">Pay with Razorpay</button>
          </div>
        ))}
      </section>

      <section className="overflow-x-auto rounded-xl border border-accent/20 bg-panel p-4">
        <h3 className="mb-3 text-xl text-accent">Feature Comparison</h3>
        <table className="w-full text-sm">
          <thead className="text-left text-muted">
            <tr><th>Feature</th><th>Starter</th><th>Pro</th><th>Agency</th></tr>
          </thead>
          <tbody>
            <tr><td>Apps Covered</td><td>1</td><td>5</td><td>Unlimited</td></tr>
            <tr><td>Scan Frequency</td><td>Monthly</td><td>Weekly</td><td>Daily</td></tr>
            <tr><td>Support</td><td>Email</td><td>Priority</td><td>Dedicated</td></tr>
          </tbody>
        </table>
      </section>

      <section className="rounded-xl border border-accent/20 bg-panel p-4">
        <h3 className="mb-2 text-xl text-accent">FAQ</h3>
        <p className="text-sm text-muted">Q: Does this include hosting? A: Yes, deployment and managed hosting recommendations are included.</p>
        <p className="mt-2 text-sm text-muted">Q: Can I cancel anytime? A: Yes, cancel from your dashboard.</p>
      </section>
    </div>
  );
}
