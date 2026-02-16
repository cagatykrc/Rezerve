'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  BarChart3,
  Clock,
  Shield,
  Smartphone,
  Zap,
  ChevronRight,
  Star,
  Users,
  TrendingUp,
} from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Online Randevu',
    description: '7/24 istediğiniz zaman randevu alın. Müşterileriniz kolayca rezervasyon yapabilsin.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: BarChart3,
    title: 'Detaylı Raporlar',
    description: 'Gelir, randevu ve müşteri istatistiklerini grafiklerle takip edin.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Clock,
    title: 'Akıllı Takvim',
    description: 'Personel müsaitliklerine göre otomatik randevu önerileri.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Shield,
    title: 'Güvenli Sistem',
    description: 'Verileriniz şifreli ve güvende. KVKK uyumlu veri yönetimi.',
    color: 'from-emerald-500 to-green-500',
  },
  {
    icon: Smartphone,
    title: 'Mobil Uyumlu',
    description: 'Tüm cihazlarda mükemmel çalışan responsive tasarım.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Zap,
    title: 'Anlık Bildirimler',
    description: 'SMS ve e-posta ile randevu hatırlatmaları ve onayları.',
    color: 'from-rose-500 to-pink-500',
  },
];

const stats = [
  { value: '50K+', label: 'Randevu', icon: Calendar },
  { value: '1200+', label: 'İşletme', icon: TrendingUp },
  { value: '4.9', label: 'Puan', icon: Star },
  { value: '98%', label: 'Memnuniyet', icon: Users },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-cyan-50" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-sm font-medium text-teal-700 shadow-lg shadow-teal-500/10"
          >
            <Zap className="h-4 w-4 text-amber-500" />
            Türkiye&apos;nin #1 Randevu Yönetim Platformu
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Randevularınızı
            <span className="block bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Tek Tıkla Yönetin
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl"
          >
            Kuaför, güzellik salonu, klinik veya ofis - tüm randevularınızı tek platformda toplayın.
            Daha az stres, daha fazla müşteri memnuniyeti.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/randevu-olustur">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -15px rgba(13, 148, 136, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-teal-500/30"
              >
                Randevu Al
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </Link>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-gray-700 shadow-lg hover:border-teal-200 hover:bg-teal-50/50"
              >
                Demo Görüntüle
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-lg backdrop-blur"
              >
                <stat.icon className="mx-auto mb-2 h-8 w-8 text-teal-500" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative border-t border-gray-100 bg-white/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              İhtiyacınız Olan Her Şey
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Randevu yönetiminizi kolaylaştıran tüm özellikler bir arada
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${feature.color} p-3 text-white`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
                <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.color} transition-all duration-300 group-hover:w-full`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white sm:text-4xl"
          >
            Randevu Yönetimine Geçiş Yapın
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-teal-100"
          >
            Hemen ücretsiz deneyin. Kredi kartı gerekmez.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/randevu-olustur">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 rounded-2xl bg-white px-10 py-4 text-lg font-semibold text-teal-600 shadow-xl hover:bg-teal-50"
              >
                Ücretsiz Başlayın
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white">
                <Calendar className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">Rezerve</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-600">
              <Link href="/hizmetler" className="hover:text-teal-600">Hizmetler</Link>
              <Link href="/randevular" className="hover:text-teal-600">Randevular</Link>
              <Link href="/dashboard" className="hover:text-teal-600">Dashboard</Link>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            © 2025 Rezerve. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}
