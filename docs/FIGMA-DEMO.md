# Figma + GitHub Copilot app: satu perubahan kecil

## Yang sudah disiapkan

[Buka board Figma Shiftboard](https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=1-2).

File ini dibuat khusus untuk demo fiktif, dengan teks dan frame yang bisa diedit. Ini **spesifikasi visual shortcut**, bukan salinan aplikasi Petrosea, screenshot seluruh aplikasi, atau prototipe interaktif yang sudah menjalankan logika.

Untuk case satu format bagi beberapa perusahaan, tersedia halaman Figma tambahan dengan [draft Petrosea](https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=3-3) dan [draft Petrindo](https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=3-68). Keduanya memakai geometri template yang sama. Ikuti [MULTI-BRAND-DEMO.md](MULTI-BRAND-DEMO.md); jangan menganggap board shortcut original di bawah ini sebagai brand guide Petrosea.

| Referensi | Link frame |
| --- | --- |
| Board dan catatan acceptance | [UX spec, node 1:2](https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=1-2) |
| Shortcut tidak aktif | [Inactive, node 1:8](https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=1-8) |
| Shortcut aktif | [Active, node 1:14](https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=1-14) |

Koneksi Figma sesi pembuat sudah berhasil diautentikasi; pembuatan frame dan pengambilan render juga berhasil. Akses tersebut **tidak otomatis tersedia untuk akun presenter atau customer**. File berada di akun pembuat, tanpa perubahan sharing/public access. Jangan mengubah izin atau memindahkan file tanpa persetujuan pemilik.

Baseline React tetap tanpa shortcut, agar implementasinya menjadi langkah live demo. Tidak ada paket Figma, token, atau akses Figma di browser aplikasi. Integrasi berada di sisi **agent Copilot app melalui Figma MCP**.

## Koneksi dan konfigurasi

Sesi ini sudah memiliki konektor Figma; tidak perlu menambahkan server kedua. Pada instalasi presenter lain, gunakan pengaturan MCP/connector yang tersedia di GitHub Copilot app, pilih Figma jika didukung, dan lakukan autentikasi OAuth sendiri.

Endpoint resmi remote MCP: `https://mcp.figma.com/mcp`. Ketersediaan dan langkah pengaturan bergantung pada versi app dan daftar client yang didukung Figma. Ikuti UI dan dokumentasi instalasi yang berlaku; panduan ini tidak mengasumsikan menu yang belum diverifikasi atau menjamin semua client dapat tersambung.

**Jangan** menaruh access token, OAuth secret, atau kredensial dalam `.github/github-app.yml`, source React, `.env` yang dikomit, maupun prompt. File `github-app.yml` hanya memberikan instruksi proyek dan script; bukan tempat mendefinisikan atau mengautentikasi server MCP.

Sebelum meeting, kirim prompt ini di Copilot app:

```text
Periksa koneksi Figma menggunakan tool identitas akun, tanpa menampilkan email
atau kredensial di materi customer. Lalu periksa akses ke frame ini:
https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=1-8
Jangan mengubah file Figma, sharing, atau kode. Laporkan jika tool atau
izin akses tidak tersedia. Jangan menganggap link saja berarti bisa diakses.
```

Jika akses gagal, login dengan akun yang punya akses atau minta pemilik memberikan akses melalui prosedur yang disetujui. Jangan otomatis menjadikan file public. Seat/tier Figma dan batas pemakaian MCP dapat memengaruhi hasil.

## Urutan demo kecil

Gunakan baseline dan prosedur rehearsal dari [panduan utama](DEMO-GUIDE.md). Jalankan hanya satu perubahan: shortcut **Open items only**. Tambahkan langkah berikut setelah memperlihatkan baseline.

### 1. Baca desain, jangan langsung menulis kode

Pakai Plan mode:

```text
Baca dua frame Figma berikut melalui konektor Figma:
Inactive: https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=1-8
Active: https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=1-14

Muat guidance Figma design-to-code yang tersedia sebelum mengambil design
context. Ambil design context beserta referensi visual, bukan hanya metadata.
Jelaskan perbedaan tampilan shortcut kepada product owner. Bandingkan
dengan src/App.tsx dan src/styles.css. Ini hanya referensi kontrol, bukan
permintaan menyalin seluruh board atau mengganti halaman aplikasi.
Jangan edit kode atau Figma. Jika guidance, tool, atau akses tidak tersedia,
laporkan keterbatasannya; jangan menebak isi frame.
```

Hasil yang diharapkan: referensi frame yang benar, warna/border/radius kontrol, perbedaan active/inactive, dan pemetaan ke komponen yang sudah ada. Design context merupakan bahan adaptasi, bukan kode final yang wajib disalin. Pertahankan font aplikasi; board memakai Inter sebagai font desain, bukan instruksi mengunduh font baru.

### 2. Rencanakan implementasi dari desain

```text
Rencanakan shortcut Open items only berdasarkan dua frame yang sudah dibaca.
Tambahkan kontrol saja di atas daftar equipment; jangan menyalin catatan
acceptance, panel contoh, atau seluruh board ke UI.

Gunakan status state dan filterEquipment yang sudah ada. Open items berarti
Open plus In progress. Toggle aktif mengatur Open items; toggle berikutnya
mengatur All. Sinkronkan dengan dropdown dan pertahankan search.
Count pada shortcut adalah empat open items seluruh site, bukan jumlah
hasil pencarian. Gunakan aria-pressed, focus yang terlihat, target minimal
44px, dan layout sempit yang tidak overflow. Pertahankan notes browser-local,
pesan error, disclaimer fiktif, dan reset yang meminta konfirmasi.

Identifikasi perubahan App.tsx, styles.css, dan tes yang dibutuhkan.
Jangan implementasikan dulu. Jangan tambahkan API Figma ke runtime,
backend, data customer, atau integrasi operasional.
```

Tampilkan plan dan gunakan kontrol approval app. Figma menentukan referensi tampilan; requirement tertulis menentukan perilaku aplikasi.

### 3. Implementasikan setelah approval

```text
Implementasikan plan shortcut yang disetujui dengan referensi Figma tadi.
Adaptasikan ke React dan CSS proyek ini. Jangan tambahkan framework,
font eksternal, autentikasi, atau library besar hanya untuk satu tombol.
Tambahkan tes toggle, sinkronisasi dropdown, search, count, dan reset.
Jalankan npm run check. Buka preview lokal di browser Copilot app.
Jangan edit Figma, commit, push, atau memperluas scope.
```

### 4. Bandingkan desain dan hasil

Tunjukkan frame Figma dan preview lokal, lalu gunakan acceptance table di panduan utama. Periksa tombol putih/border ketika inactive, hijau gelap ketika active, radius 6px, keyboard focus, dan narrow layout. Jangan menjanjikan pixel-perfect seluruh halaman dari dua frame kontrol.

```text
Bandingkan shortcut di preview dengan frame Figma inactive dan active.
Periksa appearance, aria-pressed, focus, target 44px, serta wrapping.
Periksa juga toggle, dropdown, preserved search, empat site-wide open items,
dan reset. Laporkan perbedaan serta pemeriksaan yang belum bisa dilakukan.
Jangan klaim semua cocok hanya berdasarkan screenshot atau tes unit.
```

Talk track:

> "Desainer menyampaikan intent lewat Figma. Tim menyepakati perilaku lewat plan. Copilot app membantu menerapkannya ke kode yang sudah ada, lalu kita melihat hasil dan diff. Figma dan kode tidak otomatis selalu sinkron."

## Batas integrasi dan fallback

Ini bukan sinkronisasi dua arah otomatis, Code Connect mapping, webhook, atau penambahan Figma SDK ke website. Membaca desain tidak mengubah desain. Mengubah kode tidak memperbarui Figma tanpa permintaan terpisah dan tool write.

Jika MCP tidak tersedia, izin ditolak, atau rate limit tercapai, gunakan frame yang dapat dibuka presenter sebagai referensi manual dan jelaskan bahwa pengambilan konteks agent belum berhasil. Baseline tetap dapat berjalan. Jangan beralih ke VS Code hanya untuk menyelesaikan presentasi.

Pemeriksaan koneksi, pembuatan board, pembacaan node melalui tool Figma, dan render sudah dilakukan. **Implementasi shortcut dari design context belum dijalankan**; itu tetap latihan live yang perlu direhearsal pada akun presenter. Tidak ada klaim bahwa alur design-to-code sudah lolos end-to-end.

## Sumber

- [Figma remote MCP setup dan OAuth](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
- [Figma MCP tools dan prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
- [Figma MCP akses dan rate limits](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)
- [GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app)
