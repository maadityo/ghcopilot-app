# Satu format, identitas perusahaan berbeda

## Case yang relevan

Tim ingin menggunakan satu format handover untuk beberapa perusahaan, tanpa mengulang pembuatan UI. Demo ini memisahkan **struktur dan perilaku bersama** dari **token visual per brand**.

Ini bukan pemodelan struktur legal grup perusahaan dan bukan sistem multi-tenant. Kita menggunakan nama Petrosea/Petrindo sebagai referensi visual draft, tanpa menyatakan hubungan korporasi atau approval branding.

## Coba di aplikasi

Jalankan demo seperti biasa. Pada **Visual theme**, pilih **Petrosea-inspired draft**, kemudian **Petrindo-inspired draft**.

Layout, field, status, dan fungsi notes tetap sama. Sidebar, CTA, aksen, selected card, focus, dan permukaan highlight berubah melalui token yang sama di `src/themes.ts`. Komponen handover tidak diduplikasi.

Urutan presenter:

1. Pilih Petrosea-inspired draft. Filter Open items dan cari `HT`. Pilih HT-208.
2. Simpan satu note fiktif; ketik draft kedua tanpa menyimpan.
3. Ganti ke Petrindo-inspired draft. Tunjukkan bahwa dua hasil pencarian, pilihan HT-208, saved note, dan draft masih ada.
4. Bandingkan dua frame Figma, lalu tunjukkan bahwa warna berasal dari token, bukan halaman aplikasi kedua.

**Penting:** data tetap sama karena ini demo tema visual. Jangan menunjukkan saved note tadi sebagai data Petrosea yang dipindahkan ke Petrindo. Aplikasi perusahaan sungguhan membutuhkan tenant selection terpisah, authorization, penyimpanan terisolasi, dan audit.

Reload kembali ke Original demo. Reset yang berhasil menghapus notes demo dan mengembalikan filter serta tema Original demo. Reset yang dibatalkan atau gagal tidak mengubah tema.

## Referensi situs yang benar-benar diperiksa

`petrindo.com` tidak berhasil di-resolve saat diperiksa. Situs resmi yang ditemukan dan dipakai sebagai sumber adalah [petrindo.co.id](https://petrindo.co.id/), dengan canonical URL dan identitas PT Petrindo Jaya Kreasi pada HTML-nya.

| Perusahaan | Bukti dari CSS publik | Adaptasi ke draft |
| --- | --- | --- |
| Petrosea | `.about__title`: `#00674e`; `.ads__desc`: `#09503e`; link hover: `#f38036`; gradient about: `#f4f2e8`; font Nunito | CTA hijau, sidebar hijau gelap, aksen orange, permukaan krem |
| Petrindo | `--primary: #f15a2b`; `--secondary: #53c7d7`; `--tertiary: #0d2b4c`; `--light-bg: #f5f5f5`; `--blue: #007482`; font Poppins | Sidebar/CTA navy, aksen orange, aksen sekunder cyan, permukaan abu terang |

Sumber CSS:

- [Petrosea theme stylesheet](https://petrosea.com/wp-content/themes/petrosea/css/style.css?ver=1.0)
- [Petrindo main stylesheet yang dirujuk homepage](https://petrindo.co.id/wp-content/litespeed/css/f66198e99f9780d7d8ffc234a53ff0f6.css?ver=08c24)

Ini observasi stylesheet situs publik, **bukan brand book resmi**. URL asset Petrindo berisi hash cache dan dapat berubah. Angka warna dicatat sebagai referensi, bukan stylesheet remote yang dimuat aplikasi.

**Keputusan kontras:** orange Petrindo tidak dipakai sebagai background tombol kecil bertulisan putih; draft memakai navy `#0d2b4c` untuk CTA dan menyimpan orange sebagai aksen. Warna status Open/In progress/Closed tetap konsisten lintas tema supaya arti status tidak berubah.

Orange Petrosea `#f38036` pada sidebar hijau gelap tidak mencapai kontras 4.5:1 untuk teks kecil. Label kecil memakai turunan orange lebih terang `#ffb47f`; ini penyesuaian aksesibilitas draft, bukan warna yang diklaim berasal dari brand guide. Tes mengukur pasangan teks/background utama terhadap minimum 4.5:1.

Font runtime tetap Segoe UI/system sans-serif; Figma memakai Inter. Nunito/Poppins disebut sebagai observasi sumber, tidak diunduh atau disalin dari website. Tidak ada logo, foto, copy marketing, atau source stylesheet perusahaan yang diimpor.

## Draft Figma: format yang sama

| Draft | Frame |
| --- | --- |
| Petrosea-inspired | [Petrosea handover](https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=3-3) |
| Petrindo-inspired | [Petrindo handover](https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=3-68) |

Keduanya berada pada halaman **One template - company themes** di file demo sebelumnya. Frame Petrindo dibuat dari clone format Petrosea dengan pemetaan warna, bukan menggambar ulang struktur. Geometri frame bersama diperiksa sama: 1200 x 1060.

Figma menunjukkan draft representatif dengan tiga contoh kartu yang terlihat; runtime memiliki lima record lengkap dan selector tema. Ini bukan screenshot runtime, bukan hasil capture pixel-perfect, dan tidak mengklaim sinkronisasi otomatis. Board shortcut original tetap disimpan.

File berada di akun pembuat; izin sharing tidak diubah. Periksa akses presenter sebelum meeting seperti panduan Figma.

## Prompt demo Copilot app

Untuk menjelaskan implementasi yang **sudah ada**, bukan berpura-pura membuatnya live:

```text
Baca src/themes.ts, src/App.tsx, dan src/styles.css.
Jelaskan bagaimana satu format handover dapat memakai palette berbeda
untuk Petrosea-inspired dan Petrindo-inspired. Tunjukkan pemisahan token
dari komponen, serta state yang tetap sama ketika tema berubah.
Jelaskan bahwa ini visual draft, bukan tenant isolation atau brand guide.
Jangan ubah kode atau perluas ke sistem multi-tenant.
```

Untuk sesi perubahan berikutnya, gunakan hanya frame yang sudah diizinkan:

```text
Baca referensi frame Figma berikut melalui konektor yang tersedia, setelah
memuat guidance design-to-code:
https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=3-3
https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=3-68
Bandingkan dua visual draft dan rencanakan penyesuaian token saja pada
template bersama. Pertahankan filter, notes, draft, error, dan reset.
Jangan duplikasi halaman, ambil logo, ubah akses, atau tambah API runtime.
Laporkan akses/guidance yang tidak tersedia. Jangan implementasikan dulu.
```

Talk track:

> "Kita tidak perlu membuat aplikasi kedua hanya untuk identitas visual perusahaan lain. Format dan komponen tetap, sementara token brand berubah. Copilot app membantu membaca referensi, membuat perubahan terarah, dan memeriksa bahwa fungsi bersama tidak ikut berubah."

## Batas dan pemeriksaan

Default original demo dipertahankan untuk kompatibilitas presentasi sebelumnya. Tidak ada theme persistence, backend, theme-download API, runtime Figma request, atau proses tenant switching.

Tes memastikan ganti tema tidak menghapus search, filter, selected equipment, saved note, dan draft; notes tetap dapat disimpan; provenance terlihat; nilai tema tidak dikenal ditolak; dan cancel/failure reset tidak mengubah tema.

Sebelum production, gunakan brand guide yang disetujui customer, validasi semua warna/typography/asset, dan pisahkan kebutuhan identitas visual dari kebutuhan data/security tiap perusahaan.
