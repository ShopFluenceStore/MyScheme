import React from "react";
import {
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import CurvedLine from "./CurvedLine";


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {name:"About Us", href:"/about"},
    {name:"Contact Us", href:"/contact"},
    {name:"Screen Reader", href:"/screen-reader"},
    {name:"Accessibility Statement", href:"/accessibility-statement"},
    {name:"Frequently Asked Questions", href:"/faq"},
    {name:"Disclaimer", href:"/disclaimer"},
    {name:"Terms & Conditions", href:"/terms"},
  ];

  const usefulLogos = [
    {
      name: "Digital India",
      src: "/images/banner/1.jpg",
      alt: "Digital India",
    },
    {
      name: "DigiLocker",
      src: "/images/banner/2.jpg",
      alt: "DigiLocker",
    },
    {
      name: "UMANG",
      src: "/images/banner/3.jpg",
      alt: "UMANG",
    },
    {
      name: "India.gov.in",
      src: "/images/banner/4.jpg",
      alt: "India.gov.in",
    },
    {
      name: "MyGov",
      src: "/images/banner/5.jpg",
      alt: "MyGov",
    },
    {
      name: "Data.gov.in",
      src: "/images/banner/6.jpg",
      alt: "Data.gov.in",
    },
    {
      name: "NIC",
      src: "/images/banner/1.jpg",
      alt: "NIC",
    },
  ];

  return (
    <footer className="relative bg-[var(--gray)] text-[var(--white)]">
      <CurvedLine variant="gray" />
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-12 lg:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Left Column - Logo & Agency Info */}
          <div className="flex flex-col justify-between space-y-6">
            {/* Logo and Copyright */}
            <div className="flex items-center space-x-2">
              <p className="text-sm">©{currentYear}</p>
              <Logo variant="text" size="lg" />
            </div>

            {/* Powered by Digital India */}
            <div className="flex items-center space-x-3">
              <span className="text-sm">Powered by</span>
              <Logo variant="image2" size="lg" className="text-[var(--primary)]" />
            </div>

            {/* Agency Information */}
            <div className="text-sm space-y-1">
              <p className="font-medium">Digital India Corporation (DIC)</p>
              <p>Ministry of Electronics & IT (MeitY)</p>
              <p>Government of India</p>
            </div>

            {/* Social Media Icons */}
            <div className="">
              <SocialMedia />
            </div>
          </div>

          {/* Second Column - Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center text-[var(--white)] hover:text-[var(--primary)] transition-colors duration-200 group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-[var(--primary)] group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-sm">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Third Column - Useful Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Useful Links</h3>
            <div className="grid grid-cols-3 gap-3">
              {usefulLogos.map((logo, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-[var(--bg-primary)] rounded-lg p-2 hover:bg-[var(--gray)] border border-[var(--border)] group"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={100}
                    height={100}
                    className="w-full h-12 object-contain transition-transform duration-200"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Get in Touch */}
          <div>
            <h3 className="text-xl font-bold mb-6">Get in touch</h3>
            <div className="space-y-4 text-sm text-[var(--white)]">
              {/* Address */}
              <div>
                <p className="leading-relaxed">
                  4th Floor, NeGD, Electronics Niketan, 6 CGO Complex,
                  <br />
                  Lodhi Road, New Delhi - 110003,
                  <br />
                  India
                </p>
              </div>

              {/* Email */}
              <div>
                <p>
                  support-
                  <br />
                  myscheme@digitalindia.gov.in
                </p>
              </div>

              {/* Working Hours */}
              <div>
                <p>(011) 24303714 (9:00 AM to 5:30 PM)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border)] bg-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-[var(--text)]">
            <p>Last Updated On : 04/07/2025 | v-2.2.17</p>
            <div className="mt-2 sm:mt-0">
              <p>Made with ❤️ for Digital India</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
