import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Terms = () => {
  return (
    <div className="bg-background-black min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10">
          
          <div className="flex items-center gap-5 mb-8 border-b border-white/10 pb-8">
            <div className="w-16 h-16 bg-white/5 border border-white/10 text-primary rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(255,51,102,0.15)]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent tracking-tight">Terms & Conditions</h1>
              <p className="text-gray-400 font-light mt-2">Last updated: August 2026</p>
            </div>
          </div>

          <div className="space-y-10">
            
            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4 tracking-wide">1. General Terms of Rental</h2>
              <ul className="list-disc pl-5 space-y-3 text-gray-400 font-light leading-relaxed">
                <li>The renter must be at least 18 years of age and possess a valid driving licence for the category of vehicle rented.</li>
                <li>The vehicle remains the property of Rydex at all times.</li>
                <li>The rented vehicle must only be driven by the individual whose details were provided during the booking process.</li>
                <li>Subletting or lending the vehicle to third parties is strictly prohibited.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4 tracking-wide">2. Security Deposit and Payments</h2>
              <ul className="list-disc pl-5 space-y-3 text-gray-400 font-light leading-relaxed">
                <li>A refundable security deposit is mandatory for all rentals and must be paid before the vehicle is handed over.</li>
                <li>The deposit will be refunded within 24 hours of returning the vehicle, provided there is no damage, loss of accessories, or pending fines.</li>
                <li>Rental fees must be paid in full upfront. Late returns will incur additional hourly charges.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4 tracking-wide">3. Vehicle Usage and Condition</h2>
              <ul className="list-disc pl-5 space-y-3 text-gray-400 font-light leading-relaxed">
                <li>The renter agrees to return the vehicle in the same condition as it was provided.</li>
                <li>Fuel is not included in the rental price. The renter must return the vehicle with the same fuel level as at the time of pickup.</li>
                <li>The vehicle must not be used for racing, towing, illegal activities, or driven on unpaved roads.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4 tracking-wide">4. Damages, Fines, and Liability</h2>
              <ul className="list-disc pl-5 space-y-3 text-gray-400 font-light leading-relaxed">
                <li>The renter is entirely responsible for any traffic violations, parking tickets, or toll charges incurred during the rental period.</li>
                <li>In case of an accident or damage, the renter must notify Rydex immediately. The renter is liable for repair costs up to the maximum liability limit.</li>
                <li>Loss of keys or helmets provided with the vehicle will result in deduction from the security deposit.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-4 tracking-wide">5. Cancellations and Refunds</h2>
              <ul className="list-disc pl-5 space-y-3 text-gray-400 font-light leading-relaxed">
                <li>Cancellations made 24 hours prior to the pickup time are eligible for a full refund.</li>
                <li>Cancellations made within 24 hours of pickup will incur a deduction of one day's rental fee.</li>
                <li>No refunds will be provided for early returns or unused rental days.</li>
              </ul>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};
