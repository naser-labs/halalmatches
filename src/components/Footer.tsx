'use client';

import Link from 'next/link';
import { Heart, Shield, Users, HelpCircle, Mail, ExternalLink } from 'lucide-react';

const footerLinks = {
  platform: [
    { href: '/wali-workflows', label: 'Wali Workflows' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/faq', label: 'FAQ' },
  ],
  resources: [
    { href: '/faq#verification', label: 'Verification Process' },
    { href: '/faq#moderation', label: 'Moderation' },
    { href: '/faq#halal-monetization', label: 'Halal Monetization' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 dark:bg-charcoal-950 text-cream-100">
      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl" />
                <Heart className="relative w-5 h-5 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-semibold text-white">
                  HalalMatches
                </span>
                <span className="text-[10px] text-charcoal-400 -mt-1 tracking-wide">
                  DIGNIFIED MATRIMONY
                </span>
              </div>
            </div>
            <p className="text-charcoal-400 max-w-md mb-6 leading-relaxed">
              A global Muslim matrimonial platform built on Islamic principles. 
              Structured introductions, wali workflows, and strong boundaries — 
              helping Muslims find their spouse the halal way.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/50 text-emerald-400 text-sm">
                <Shield className="w-3.5 h-3.5" />
                Privacy First
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/50 text-emerald-400 text-sm">
                <Users className="w-3.5 h-3.5" />
                Wali Supported
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-charcoal-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-charcoal-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800">
        <div className="container-wide py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-charcoal-500">
              © {currentYear} HalalMatches. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-charcoal-500">
              <span className="flex items-center gap-1.5">
                <span className="font-arabic text-lg">بِسْمِ ٱللَّٰهِ</span>
              </span>
              <a
                href="mailto:salam@halalmatches.com"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-5 pointer-events-none" />
    </footer>
  );
}
