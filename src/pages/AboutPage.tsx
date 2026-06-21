import { Helmet } from 'react-helmet-async'
import { ShieldCheck, Users, Trophy, Award, MapPin, Mail, Phone, Calendar } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | SR Car Gallery</title>
        <meta name="description" content="Learn more about SR Car Gallery. Dhaka's trusted used car dealer providing multi-point certified inspected vehicles with premium customer service." />
      </Helmet>

      <div className="pt-24 pb-16 bg-navy-950 text-white min-h-screen">
        <div className="container-custom">
          
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase">Our Journey</span>
            <h1 className="font-heading text-4xl md:text-5xl font-black mt-3 mb-6">
              Dhaka's Most Trusted <span className="text-gradient">Used Car Destination</span>
            </h1>
            <p className="text-platinum-400 text-lg leading-relaxed">
              Founded with the goal of bringing complete transparency to the pre-owned vehicle market in Bangladesh. We buy quality used cars, inspect them thoroughly, professionally photograph them, and sell with complete confidence.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: ShieldCheck, title: '200+ Point Inspection', desc: 'Every car we buy goes through a rigorous checking procedure by our certified engineers.' },
              { icon: Trophy, title: 'Premium Showroom Quality', desc: 'We restore vehicles, detail them inside-out, and display them in our dry, indoor showroom.' },
              { icon: Users, title: 'Customer First Culture', desc: 'No hidden charges. We handle all transfer paperwork and bank financing approvals ourselves.' }
            ].map((v, i) => (
              <div key={i} className="glass border border-white/5 rounded-2xl p-8 hover:border-orange-500/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-6">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-sm text-platinum-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Mission & Vision Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-navy-900 border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800" 
                alt="Showroom" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-bold text-white">Our Mission</h2>
              <p className="text-platinum-300 leading-relaxed">
                To simplify used car buying and selling in Bangladesh. We aim to eliminate the common doubts buyers have about mileage tampering, hidden accidents, or paper forged documents.
              </p>
              
              <h2 className="font-heading text-3xl font-bold text-white">Why Choose SR Car Gallery?</h2>
              <div className="space-y-3">
                {[
                  '100% Paper Verification Guarantee',
                  'Engine and Gearbox inspection report provided',
                  'Tailored financing options with leading banks in Bangladesh',
                  'Same-day spot payment when selling your car'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-platinum-400">
                    <Award className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Showroom Map Mockup */}
          <div className="glass border border-white/15 rounded-3xl p-8 max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-white mb-6 text-center">Visit Our Showroom</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Address</h4>
                  <p className="text-platinum-400 mt-1">D-19 B, Agargaon Taltola, Sher E Bangla Nagar, Dhaka-1207</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Contact Info</h4>
                  <p className="text-platinum-400 mt-1">Phone: +880 1401-238019<br />Email: info@srcargallery.autos</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Calendar className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Business Hours</h4>
                  <p className="text-platinum-400 mt-1">Saturday - Thursday: 9:00 AM - 7:00 PM<br />Friday: 2:00 PM - 7:00 PM</p>
                </div>
              </div>
            </div>
            
            {/* Showroom Map placeholder */}
            <div className="w-full h-80 rounded-2xl overflow-hidden border border-white/5 relative bg-navy-900 flex items-center justify-center text-center">
              <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/90.3789,23.7788,14,0/800x400?access_token=mock')` }}></div>
              <div className="relative z-10 p-6 space-y-3">
                <MapPin className="w-10 h-10 text-orange-500 mx-auto animate-bounce" />
                <h3 className="font-bold text-white">Map Location</h3>
                <p className="text-xs text-platinum-400 max-w-sm mx-auto">
                  Located right in Sher-e-Bangla Nagar/Agargaon. Near Taltola Bazaar, Dhaka.
                </p>
                <a 
                  href="https://maps.google.com/?q=Agargaon+Taltola+Dhaka" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center text-xs py-2 px-4"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
