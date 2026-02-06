
# Proyek SEHATERA - Dokumentasi Alur & Fitur

Aplikasi ini dirancang untuk menghubungkan lansia dengan pendamping yang penuh kasih melalui konten AI dan interaksi komunitas.

## 1. Peran Pengguna (User Roles)

### A. Pengguna Lansia (Elderly) - *Main User*
- **Tujuan:** Mendapatkan teman mengobrol, konten edukasi, dan hiburan harian.
- **Alur Utama:** Daftar -> Melengkapi Minat -> Interaksi Harian (AI Content/Puzzle) -> Pesan Sesi Pendampingan -> Berbagi di Komunitas.
- **Halaman Utama:**
  - `src/app/page.tsx`: **Elderly Home Dashboard**. Menampilkan sapaan hangat, konten AI harian, jadwal sesi, dan teka-teki asah otak.
  - `src/app/sessions/book/page.tsx`: **Book a Companion Session**. Antarmuka pesan sesi dengan tombol besar dan jadwal yang mudah dibaca.
  - `src/app/video-call/page.tsx`: **Active Video Companion Session**. Layar video call minimalis dengan kontrol berlabel jelas untuk lansia.
  - `src/app/community/page.tsx`: **Community Hub Feed**. Forum sosial dengan teks besar dan navigasi grup minat yang bersih.
  - `src/app/subscriptions/page.tsx`: Upgrade paket layanan.
  - `src/app/checkout/page.tsx`: Gateway pembayaran simulasi (QRIS/Transfer).

### B. Relawan (Volunteer) - *Companion*
- **Tujuan:** Memberikan pendampingan sosial kepada lansia.
- **Alur Utama:** Login -> Pantau Permintaan di Dasbor -> Terima Permintaan Sesi -> Masuk ke Ruang Chat/Video pada jadwalnya.
- **Halaman Utama:**
  - `src/app/dashboard/volunteer/page.tsx`: **Volunteer Management Dashboard**. Manajemen permintaan sesi, jadwal mendatang, dan riwayat bantuan.

### C. Super Administrator (Admin) - *Super Master*
- **Tujuan:** Mengelola ekosistem platform secara penuh.
- **Alur Utama:** Pantau Statistik -> Verifikasi Pembayaran Manual -> Moderasi User & Konten -> Support Chat.
- **Halaman Utama:**
  - `src/app/dashboard/admin/page.tsx`: **Super Admin Panel**. Manajemen pengguna lengkap, antrean verifikasi bayar, moderasi konten, dan statistik.

## 2. Fitur Unggulan (Core Features)

1. **AI Curated Content:** Konten harian (artikel & kutipan) yang dihasilkan oleh Gemini AI berdasarkan mood dan minat lansia.
2. **Senior-Friendly UI:** Penggunaan font Belleza (Headline) dan Alegreya (Body), tombol berukuran besar, dan palet warna pastel yang menenangkan.
3. **Session Scheduling:** Sistem booking sesi dengan berbagai media (Chat, Suara, Video).
4. **Theme Toggle:** Perpindahan Mode Terang dan Gelap yang mudah diakses dari Header atau Pengaturan.
5. **Modern Payment Gateway:** Simulasi checkout dengan metode pembayaran modern (QRIS, Kartu Kredit, Bank).
6. **Community Groups:** Grup tematik berbasis hobi untuk mendorong lansia tetap aktif bersosialisasi.
