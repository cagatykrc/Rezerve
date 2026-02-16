'use client';

import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Clock,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { weeklyStats, monthlyStats, appointments } from '@/lib/data';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const chartData = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day, i) => ({
  name: day,
  randevu: weeklyStats.appointments[i],
  gelir: weeklyStats.revenue[i],
  fullName: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'][i],
}));

const pieData = [
  { name: 'Saç', value: 35, color: '#0d9488' },
  { name: 'Cilt', value: 25, color: '#f59e0b' },
  { name: 'Tırnak', value: 20, color: '#8b5cf6' },
  { name: 'Masaj', value: 15, color: '#ec4899' },
  { name: 'Diğer', value: 5, color: '#6b7280' },
];

const statCards = [
  {
    title: 'Toplam Randevu',
    value: monthlyStats.totalAppointments,
    change: '+12%',
    icon: Calendar,
    iconColor: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    title: 'Aylık Gelir',
    value: `₺${monthlyStats.totalRevenue.toLocaleString('tr-TR')}`,
    change: '+8%',
    icon: DollarSign,
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    title: 'Yeni Müşteri',
    value: monthlyStats.newCustomers,
    change: '+24%',
    icon: Users,
    iconColor: 'text-violet-600',
    bgColor: 'bg-violet-50',
  },
  {
    title: 'Ortalama Puan',
    value: monthlyStats.avgRating,
    change: '0.1',
    icon: Star,
    iconColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-gray-100 text-gray-700',
};

const statusLabels: Record<string, string> = {
  confirmed: 'Onaylı',
  pending: 'Beklemede',
  cancelled: 'İptal',
  completed: 'Tamamlandı',
};

export default function DashboardPage() {
  const todayAppointments = appointments.filter(
    (a) => format(a.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            İşletmenizin genel görünümü - {format(new Date(), 'd MMMM yyyy', { locale: tr })}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl ${stat.bgColor} p-3`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <span className="text-sm font-medium text-emerald-600">{stat.change}</span>
              </div>
              <p className="mt-4 text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="mb-8 grid gap-8 lg:grid-cols-3">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg lg:col-span-2"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Haftalık Randevu & Gelir</h2>
              <Link
                href="/randevular"
                className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
              >
                Detay
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="h-80 min-h-[320px]">
              <ResponsiveContainer width="100%" height="100%" minHeight={320}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRandevu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                    formatter={(value, name) => [
                      name === 'randevu' ? value : `₺${Number(value).toLocaleString('tr-TR')}`,
                      name === 'randevu' ? 'Randevu' : 'Gelir',
                    ]}
                    labelFormatter={(_, payload) => payload[0]?.payload?.fullName ?? ''}
                  />
                  <Area
                    type="monotone"
                    dataKey="randevu"
                    stroke="#0d9488"
                    strokeWidth={2}
                    fill="url(#colorRandevu)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg"
          >
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Hizmet Dağılımı</h2>
            <div className="h-64 min-h-[256px]">
              <ResponsiveContainer width="100%" height="100%" minHeight={256}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                    formatter={(value) => [`%${value}`, 'Oran']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Today's Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-teal-500" />
              <h2 className="text-lg font-semibold text-gray-900">Bugünkü Randevular</h2>
            </div>
            <Link
              href="/randevular"
              className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              Tümünü Gör
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {todayAppointments.length > 0 ? (
              todayAppointments.map((apt, i) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600 font-semibold">
                      {apt.time}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{apt.customerName}</p>
                      <p className="text-sm text-gray-500">{apt.service} • {apt.staffName}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusColors[apt.status]
                    }`}
                  >
                    {statusLabels[apt.status]}
                  </span>
                </motion.div>
              ))
            ) : (
              <div className="px-6 py-12 text-center text-gray-500">
                <Calendar className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                Bugün randevu bulunmuyor
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
