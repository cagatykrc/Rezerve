'use client';

import { motion } from 'framer-motion';
import { Star, Scissors } from 'lucide-react';
import Link from 'next/link';
import { staff } from '@/lib/data';

export default function PersonelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Personel</h1>
          <p className="mt-1 text-gray-600">Ekibimizi tanıyın, randevu alırken tercih edin</p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map((person, i) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="relative h-48 bg-gradient-to-br from-teal-100 to-cyan-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-3xl font-bold text-white shadow-lg"
                  >
                    {person.name.charAt(0)}
                  </motion.div>
                </div>
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-sm font-medium text-amber-600 shadow">
                  <Star className="h-4 w-4 fill-amber-400" />
                  {person.rating}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{person.name}</h3>
                <p className="mt-1 text-teal-600 font-medium">{person.role}</p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {person.services.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <Link href="/randevu-olustur">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full rounded-xl bg-teal-500 py-2.5 text-sm font-medium text-white hover:bg-teal-600"
                  >
                    Randevu Al
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
