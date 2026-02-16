'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, LayoutDashboard, Scissors, Users, Menu } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Ana Sayfa', icon: null },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/randevular', label: 'Randevular', icon: Calendar },
  { href: '/hizmetler', label: 'Hizmetler', icon: Scissors },
  { href: '/personel', label: 'Personel', icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass shadow-sm"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-lg shadow-teal-500/30"
          >
            <Calendar className="h-5 w-5" />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            Rezerve
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-lg bg-teal-100 -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </motion.span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/randevu-olustur">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition hover:shadow-teal-500/40"
            >
              <Calendar className="h-4 w-4" />
              Randevu Al
            </motion.button>
          </Link>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 md:hidden"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </motion.button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-200 bg-white/95 backdrop-blur md:hidden"
        >
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-4 py-3 ${
                  pathname === item.href ? 'bg-teal-50 text-teal-600' : 'text-gray-600'
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </Link>
            ))}
            <Link href="/randevu-olustur" onClick={() => setMobileOpen(false)}>
              <div className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-4 py-3 text-white font-semibold">
                <Calendar className="h-4 w-4" />
                Randevu Al
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
