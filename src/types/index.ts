
/**
 * @fileOverview Definisi tipe data global untuk aplikasi SEHATERA.
 * Aplikasi ini menghubungkan lansia dengan pendamping (relawan) dan konten AI.
 */

import { z } from 'zod';

/** 
 * Peran pengguna dalam sistem:
 * - elderly: Pengguna utama (lansia) yang menerima pendampingan dan konten harian.
 * - admin: Super Administrator yang mengelola seluruh sistem, user, dan pembayaran.
 * - volunteer: Relawan yang memberikan waktu untuk pendampingan.
 * - guest: Status default untuk pengguna yang belum terautentikasi (tamu).
 */
export type UserRole = 'elderly' | 'admin' | 'volunteer' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  interests?: string[];
  mood?: string;
  bio?: string;
  status?: 'active' | 'suspended';
  createdAt?: string;
}

export interface Volunteer {
    name: string;
    avatarUrl?: string;
}

/** 
 * Mewakili sesi pendampingan antara Lansia dan Relawan.
 */
export interface Session {
    id: string;
    title: string;
    description: string;
    time: string; 
    type: 'chat' | 'voice' | 'video';
    user: {
        name: string;
        avatarUrl?: string;
        interests?: string[];
    };
    volunteer?: Volunteer;
    status: 'available' | 'scheduled' | 'completed' | 'cancelled';
}

export interface CommunityComment {
  id: string;
  author: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  content: string;
  timestamp: string;
}

/** 
 * Postingan di feed komunitas.
 */
export interface CommunityPost {
  id: string;
  author: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  content: string;
  timestamp: string;
  likes: number;
  comments: CommunityComment[];
  group?: string;
  reports?: number;
  media?: Array<{
    url: string;
    type: 'image' | 'video';
  }>;
}

export interface ThemedGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  icon?: React.ElementType;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  frequency: 'per minggu' | 'per bulan' | 'per sesi';
  features: string[];
  cta: string;
  isPopular?: boolean;
}

export interface Transaction {
  id: string;
  userId?: string;
  userName?: string;
  planName: string;
  date: string;
  amount: string;
  status: 'success' | 'pending' | 'failed';
  paymentMethod?: 'QRIS' | 'Transfer Manual';
  proofUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Skema untuk Genkit AI Flow (Kurasi Konten)
export const CurateContentInputSchema = z.object({
  userMood: z.string().describe('Suasana hati pengguna saat ini.'),
  interests: z.string().describe('Daftar minat pengguna dipisahkan koma.'),
});
export type CurateContentInput = z.infer<typeof CurateContentInputSchema>;

export const CurateContentOutputSchema = z.object({
  articleTitle: z
    .string()
    .describe('Judul artikel singkat yang menarik untuk lansia.'),
  articleSummary: z
    .string()
    .describe('Ringkasan artikel dengan nada hangat dan positif.'),
  positiveQuote: z
    .string()
    .describe('Kutipan inspiratif yang relevan dengan minat pengguna.'),
});
export type CurateContentOutput = z.infer<typeof CurateContentOutputSchema>;
