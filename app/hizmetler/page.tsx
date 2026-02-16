'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { services, type ServiceCategory } from '@/lib/data';

const categoryLabels: Record<ServiceCategory, string> = {
  saç: 'Saç',
  cilt: 'Cilt',
  tırnak: 'Tırnak',
  epilasyon: 'Epilasyon',
  masaj: 'Masaj',
};

const categoryColors: Record<ServiceCategory, string> = {
  saç: 'from-teal-500 to-cyan-500',
  cilt: 'from-amber-500 to-orange-500',
  tırnak: 'from-violet-500 to-purple-500',
  epilasyon: 'from-rose-500 to-pink-500',
  masaj: 'from-emerald-500 to-green-500',
};

export default function HizmetlerPage() {
  const [filter, setFilter] = useState<ServiceCategory | 'all'>('all');

  const filteredServices = filter === 'all'
    ? services
    : services.filter((s) => s.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Hizmetler</h1>
          <p className="mt-1 text-gray-600">Sunulan tüm hizmetler ve fiyatlar</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          <button
            onClick={() => setFilter('all')}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tümü
          </button>
          {(Object.keys(categoryLabels) as ServiceCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                filter === cat ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
              >
                {service.popular && (
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                    <Sparkles className="h-3 w-3" />
                    Popüler
                  </div>
                )}
                <div
                  className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${categoryColors[service.category]} p-3 text-white`}
                >
                  <Scissors className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {service.duration} dk
                    </span>
                    <span className="font-semibold text-teal-600">₺{service.price}</span>
                  </div>
                  <Link href="/randevu-olustur">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600"
                    >
                      Randevu Al
                    </motion.button>
                  </Link>
                </div>
                <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${categoryColors[service.category]} transition-all duration-300 group-hover:w-full`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-gray-500"
          >
            <Scissors className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <p className="font-medium">Bu kategoride hizmet bulunamadı</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
