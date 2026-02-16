'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calendar, Clock, User, Scissors, ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';
import { services, staff } from '@/lib/data';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00',
];

export default function RandevuOlusturPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const nextDays = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"
          >
            <Check className="h-10 w-10 text-emerald-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900">Randevu Oluşturuldu!</h2>
          <p className="mt-2 text-gray-600">
            {selectedDate && selectedTime && (
              <>
                {format(selectedDate, 'd MMMM yyyy', { locale: tr })} tarihinde saat {selectedTime}&apos;da
                randevunuz kaydedildi.
              </>
            )}
          </p>
          <div className="mt-6 flex gap-4 justify-center">
            <Link href="/randevular">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl border border-gray-200 px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
              >
                Randevuları Gör
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSuccess(false);
                setStep(1);
                setSelectedService(null);
                setSelectedStaff(null);
                setSelectedDate(null);
                setSelectedTime(null);
                setCustomerName('');
                setCustomerPhone('');
              }}
              className="rounded-xl bg-teal-500 px-6 py-2.5 font-medium text-white hover:bg-teal-600"
            >
              Yeni Randevu
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/randevular" className="text-sm text-gray-500 hover:text-teal-600">
            ← Randevulara dön
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Yeni Randevu Oluştur</h1>
          <p className="mt-1 text-gray-600">Adım adım randevu oluşturun</p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${
                step >= s ? 'bg-teal-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Service */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <Scissors className="h-5 w-5 text-teal-500" />
                Hizmet Seçin
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <motion.button
                    key={service.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedService(service.id)}
                    className={`flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                      selectedService === service.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 bg-white hover:border-teal-200'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.duration} dk • ₺{service.price}</p>
                    </div>
                    {selectedService === service.id && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Staff */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <User className="h-5 w-5 text-teal-500" />
                Personel Seçin
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {staff.map((s) => (
                  <motion.button
                    key={s.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedStaff(s.id)}
                    className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                      selectedStaff === s.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:border-teal-200'
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 font-semibold">
                      {s.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{s.name}</p>
                      <p className="text-sm text-gray-500">{s.role} • ⭐ {s.rating}</p>
                    </div>
                    {selectedStaff === s.id && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <Calendar className="h-5 w-5 text-teal-500" />
                Tarih ve Saat Seçin
              </h2>
              <div>
                <p className="mb-3 font-medium text-gray-700">Tarih</p>
                <div className="flex flex-wrap gap-2">
                  {nextDays.map((day) => (
                    <motion.button
                      key={day.toString()}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedDate(day)}
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                        selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {format(day, 'd MMM', { locale: tr })}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 font-medium text-gray-700">Saat</p>
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
                  {timeSlots.map((time) => (
                    <motion.button
                      key={time}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                        selectedTime === time
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Customer Info */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <User className="h-5 w-5 text-teal-500" />
                Müşteri Bilgileri
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Ad Soyad</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="Müşteri adı"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Telefon</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="05XX XXX XX XX"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="mt-10 flex justify-between">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className={step === 1 ? 'invisible' : 'rounded-xl border border-gray-200 px-6 py-2.5 font-medium text-gray-700'}
            >
              Geri
            </motion.button>
            {step < 4 ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (step === 1 && selectedService) setStep(2);
                  else if (step === 2 && selectedStaff) setStep(3);
                  else if (step === 3 && selectedDate && selectedTime) setStep(4);
                }}
                disabled={
                  (step === 1 && !selectedService) ||
                  (step === 2 && !selectedStaff) ||
                  (step === 3 && (!selectedDate || !selectedTime))
                }
                className="flex items-center gap-2 rounded-xl bg-teal-500 px-6 py-2.5 font-medium text-white disabled:opacity-50"
              >
                Devam
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-xl bg-teal-500 px-6 py-2.5 font-medium text-white"
              >
                Randevu Oluştur
                <Check className="h-5 w-5" />
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
