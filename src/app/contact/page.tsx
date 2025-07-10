'use client';
import React from 'react';
import { MapPin, Mail, Phone, Clock, Building } from 'lucide-react';

const Contact: React.FC = () => {
  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   subject: '',
  //   message: ''
  // });

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  //   // Add form submission logic here
  // };

  return (
    <section className="py-10 mb-16 lg:py-12" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-4" 
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--primary)' }}>
            <Phone className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Contact Us
          </h2>
          <p className="text-lg text-[var(--sub-text)] max-w-2xl mx-auto">
            Have questions about government schemes? We&apos;re here to help you navigate and find the right benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Side - Map and Location Info */}
          <div className="space-y-8">
            
            {/* Interactive Map */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-[var(--bg-secondary)]">
              <div className="aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0123456789!2d77.2273!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2daa9eb4d0b%3A0x717971125923e5d!2sNational%20E-Governance%20Division%20NEGD!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="National E-Governance Division Location"
                ></iframe>
              </div>
              
              {/* Map Overlay Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-[var(--bg-primary)] rounded-lg p-4 shadow-lg border border-[var(--border)]">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Building className="w-4 h-4 text-[var(--primary)]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                        National E-Governance Division
                      </h4>
                      <p className="text-xs text-[var(--sub-text)]">
                        4th Floor, 6 CGO Complex, Pragati Vihar, New Delhi 110003
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Office Hours */}
              <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Office Hours</h3>
                </div>
                <div className="space-y-2 text-sm text-[var(--sub-text)]">
                  <p>Monday - Friday</p>
                  <p className="font-medium">9:00 AM - 5:30 PM</p>
                  <p className="text-xs">Closed on weekends & holidays</p>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Helpline</h3>
                </div>
                <div className="space-y-2 text-sm text-[var(--sub-text)]">
                  <p className="font-medium">(011) 24303714</p>
                  <p>For urgent queries</p>
                  <p className="text-xs">Available during office hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Information and Form */}
          <div className="space-y-8">
            
            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 gap-6">
              
              {/* Address Card */}
              <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>ADDRESS</h3>
                    <p className="text-[var(--sub-text)] leading-relaxed">
                      4th Floor, NeGD, Electronics Niketan, 6 CGO Complex, Lodhi Road, New Delhi - 110003, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>EMAIL</h3>
                    <p className="text-[var(--sub-text)] leading-relaxed break-all">
                      support-myscheme@digitalindia.gov.in
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>PHONE</h3>
                    <p className="text-[var(--sub-text)] leading-relaxed">
                      (011) 24303714
                    </p>
                    <p className="text-sm text-[var(--sub-text)] mt-1">
                      9:00 AM to 5:30 PM (Mon-Fri)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            {/* <div className="p-8 rounded-xl border" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text)' }}>CONTACT US</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Contact us for any help or to join our team
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--sub-text)]" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        style={{ 
                          backgroundColor: 'var(--input-bg)', 
                          borderColor: 'var(--border)',
                          color: 'var(--text)'
                        }}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--sub-text)]" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        style={{ 
                          backgroundColor: 'var(--input-bg)', 
                          borderColor: 'var(--border)',
                          color: 'var(--text)'
                        }}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    style={{ 
                      backgroundColor: 'var(--input-bg)', 
                      borderColor: 'var(--border)',
                      color: 'var(--text)'
                    }}
                    placeholder="What is this regarding?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                    style={{ 
                      backgroundColor: 'var(--input-bg)', 
                      borderColor: 'var(--border)',
                      color: 'var(--text)'
                    }}
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;