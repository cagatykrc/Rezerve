import { addDays } from 'date-fns';

export type AppointmentStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';
export type ServiceCategory = 'saç' | 'cilt' | 'tırnak' | 'epilasyon' | 'masaj';

export interface Appointment {
  id: string;
  customerName: string;
  service: string;
  staffName: string;
  date: Date;
  time: string;
  duration: number;
  status: AppointmentStatus;
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  duration: number;
  price: number;
  description: string;
  popular?: boolean;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  services: string[];
}

export const services: Service[] = [
  { id: '1', name: 'Klasik Saç Kesimi', category: 'saç', duration: 30, price: 150, description: 'Profesyonel saç kesimi', popular: true },
  { id: '2', name: 'Saç Boyama', category: 'saç', duration: 90, price: 450, description: 'Tam saç boyama hizmeti', popular: true },
  { id: '3', name: 'Manikür', category: 'tırnak', duration: 45, price: 120, description: 'Klasik manikür', popular: true },
  { id: '4', name: 'Pedikür', category: 'tırnak', duration: 60, price: 180, description: 'Bakımlı ayaklar' },
  { id: '5', name: 'Cilt Bakımı', category: 'cilt', duration: 75, price: 350, description: 'Derinlemesine cilt bakımı' },
  { id: '6', name: 'Lazer Epilasyon', category: 'epilasyon', duration: 30, price: 200, description: 'Bölgesel lazer epilasyon' },
  { id: '7', name: 'Aromaterapi Masaj', category: 'masaj', duration: 60, price: 280, description: 'Rahatlatıcı masaj' },
];

export const staff: Staff[] = [
  { id: '1', name: 'Ayşe Yılmaz', role: 'Kuaför', avatar: '/avatar1.svg', rating: 4.9, services: ['Klasik Saç Kesimi', 'Saç Boyama'] },
  { id: '2', name: 'Elif Demir', role: 'Estetisyen', avatar: '/avatar2.svg', rating: 4.8, services: ['Manikür', 'Pedikür', 'Cilt Bakımı'] },
  { id: '3', name: 'Zeynep Kaya', role: 'Masöz', avatar: '/avatar3.svg', rating: 5.0, services: ['Aromaterapi Masaj'] },
  { id: '4', name: 'Mehmet Arslan', role: 'Epilasyon Uzmanı', avatar: '/avatar4.svg', rating: 4.7, services: ['Lazer Epilasyon'] },
];

const today = new Date();
today.setHours(0, 0, 0, 0);

export const appointments: Appointment[] = [
  { id: '1', customerName: 'Selin Öztürk', service: 'Klasik Saç Kesimi', staffName: 'Ayşe Yılmaz', date: today, time: '10:00', duration: 30, status: 'confirmed' },
  { id: '2', customerName: 'Deniz Aydın', service: 'Manikür', staffName: 'Elif Demir', date: today, time: '11:30', duration: 45, status: 'confirmed' },
  { id: '3', customerName: 'Berk Yıldız', service: 'Saç Boyama', staffName: 'Ayşe Yılmaz', date: today, time: '14:00', duration: 90, status: 'pending' },
  { id: '4', customerName: 'Ceren Şahin', service: 'Cilt Bakımı', staffName: 'Elif Demir', date: addDays(today, 1), time: '09:00', duration: 75, status: 'confirmed' },
  { id: '5', customerName: 'Can Arslan', service: 'Aromaterapi Masaj', staffName: 'Zeynep Kaya', date: addDays(today, 1), time: '15:00', duration: 60, status: 'confirmed' },
  { id: '6', customerName: 'Merve Çelik', service: 'Lazer Epilasyon', staffName: 'Mehmet Arslan', date: addDays(today, 2), time: '10:30', duration: 30, status: 'pending' },
];

export const weeklyStats = {
  appointments: [12, 19, 15, 22, 18, 24, 20],
  revenue: [2400, 3800, 3200, 4500, 3600, 4800, 4200],
  newCustomers: [3, 5, 2, 7, 4, 6, 5],
};

export const monthlyStats = {
  totalAppointments: 156,
  completedAppointments: 142,
  totalRevenue: 42800,
  avgRating: 4.8,
  newCustomers: 32,
};
