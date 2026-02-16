'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  format,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { tr } from 'date-fns/locale';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Scissors,
  Filter,
  Plus,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { appointments } from '@/lib/data';

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
  completed: 'bg-gray-100 text-gray-600 border-gray-200',
};

const statusLabels: Record<string, string> = {
  confirmed: 'Onaylı',
  pending: 'Beklemede',
  cancelled: 'İptal',
  completed: 'Tamamlandı',
};

export default function RandevularPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1;

  const filteredAppointments = appointments
    .filter((apt) => {
      const matchesDate = !selectedDate || format(apt.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
      const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
      const matchesSearch =
        !searchQuery ||
        apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.service.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDate && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      const dateCompare = a.date.getTime() - b.date.getTime();
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    });

  const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Randevular</h1>
            <p className="mt-1 text-gray-600">Tüm randevularınızı görüntüleyin ve yönetin</p>
          </div>
          <Link href="/randevu-olustur">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-white font-semibold shadow-lg shadow-teal-500/30"
            >
              <Plus className="h-5 w-5" />
              Yeni Randevu
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {format(currentDate, 'MMMM yyyy', { locale: tr })}
              </h2>
              <div className="flex gap-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentDate(subDays(currentDate, 31))}
                  className="rounded-lg p-2 hover:bg-gray-100"
                >
                  <ChevronLeft className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentDate(addDays(currentDate, 31))}
                  className="rounded-lg p-2 hover:bg-gray-100"
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
              {dayNames.map((day) => (
                <div key={day} className="py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startPadding }).map((_, i) => (
                <div key={`pad-${i}`} className="aspect-square" />
              ))}
              {days.map((day) => {
                const hasAppointments = appointments.some(
                  (a) => format(a.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                );
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                return (
                  <motion.button
                    key={day.toString()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDate(day)}
                    className={`relative aspect-square rounded-lg text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-teal-500 text-white'
                        : isToday(day)
                        ? 'bg-teal-100 text-teal-700'
                        : hasAppointments
                        ? 'hover:bg-teal-50 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {format(day, 'd')}
                    {hasAppointments && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-teal-500" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Appointments List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg lg:col-span-2"
          >
            {/* Filters */}
            <div className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Müşteri veya hizmet ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-2 pl-10 pr-4 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'confirmed', 'pending', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      filterStatus === status
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'all' ? 'Tümü' : statusLabels[status]}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="max-h-[500px] overflow-y-auto">
              {filteredAppointments.length > 0 ? (
                <AnimatePresence mode="popLayout">
                  {filteredAppointments.map((apt, i) => (
                    <motion.div
                      key={apt.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.02 }}
                      className="flex items-center justify-between border-b border-gray-50 p-4 transition-colors hover:bg-gray-50/50 last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100">
                          <Clock className="h-6 w-6 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{apt.customerName}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Scissors className="h-3.5 w-3.5" />
                            {apt.service}
                          </p>
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <User className="h-3 w-3" />
                            {apt.staffName} • {format(apt.date, 'd MMM', { locale: tr })} {apt.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${statusColors[apt.status]}`}
                        >
                          {statusLabels[apt.status]}
                        </span>
                        <span className="text-sm font-medium text-gray-500">{apt.duration} dk</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-gray-500"
                >
                  <Calendar className="mb-4 h-16 w-16 text-gray-300" />
                  <p className="font-medium">Randevu bulunamadı</p>
                  <p className="text-sm">
                    {selectedDate
                      ? format(selectedDate, 'd MMMM', { locale: tr }) + ' için'
                      : 'Arama kriterlerinize uygun'}{' '}
                    randevu yok
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
