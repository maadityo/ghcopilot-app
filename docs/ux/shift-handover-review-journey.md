# Tinjauan serah terima sif — Perjalanan pengguna (demo fiktif)

> Persona, skenario, reaksi, dan peluang di bawah ini adalah materi demo fiktif. Ini bukan riset pelanggan atau temuan tervalidasi.

## Persona dan tujuan

Persona fiktif: seorang peninjau yang melihat daftar demo serah terima sif. Tujuannya adalah menemukan item fiktif yang belum selesai, mempersempit daftar, dan menulis catatan yang tersimpan di browser. Persona dan tujuan ini merupakan asumsi perencanaan, bukan profil pelanggan nyata.

## Tahapan

### 1. Membuka daftar serah terima sif fiktif
- Melakukan: Membuka daftar demo yang berisi lima entri fiktif.
- Berpikir: “Item mana yang masih terbuka?”
- Merasa: Belum ditetapkan; reaksi apa pun di sini masih hipotetis.
- Kendala: Tidak ada bukti kendala yang diberikan. Pertanyaan penelusuran yang mungkin diajukan: apakah daftar memudahkan pengguna mengenali status item yang belum selesai?
- Peluang UX: Buat konteks entri fiktif dan informasi status mudah dipindai; pastikan batasan demo tetap terlihat.

### 2. Mempersempit daftar ke item yang belum selesai
- Melakukan: Memilih dropdown/filter status untuk Item terbuka, yang mencakup Open dan In progress, tetapi tidak mencakup Closed. Pengguna juga dapat memasukkan kata pencarian; kedua filter dapat digabungkan.
- Berpikir: “Apakah ini menampilkan kedua status terbuka, dan bisakah saya mempersempitnya lagi?”
- Merasa: Belum ditetapkan; reaksi apa pun di sini masih hipotetis.
- Kendala: Tidak ada bukti kendala yang diberikan. Hasil tanpa kecocokan dari filter dapat membingungkan jika keadaan kosong tidak dijelaskan dengan baik.
- Peluang UX: Tampilkan filter yang aktif, jelaskan arti Item terbuka, dan bedakan keadaan tanpa kecocokan dari daftar yang memang kosong.

### 3. Meninjau entri yang cocok
- Melakukan: Memindai entri fiktif yang cocok lalu memilih salah satunya untuk membaca konteks serah terimanya.
- Berpikir: “Apakah ini entri yang saya maksud?”
- Merasa: Belum ditetapkan; reaksi apa pun di sini masih hipotetis.
- Kendala: Tidak ada bukti kendala yang diberikan. Pemilihan catatan yang ambigu merupakan pertanyaan untuk peninjauan prototipe.
- Peluang UX: Pastikan identitas entri dan konteks yang dipilih mudah dikenali, termasuk saat daftar difilter.

### 4. Menulis catatan yang tersimpan di browser
- Melakukan: Memasukkan catatan yang terkait dengan entri fiktif terpilih dan mencoba menyimpannya.
- Berpikir: “Apakah catatan ini tersimpan, dan di mana catatan ini tersedia?”
- Merasa: Belum ditetapkan; reaksi apa pun di sini masih hipotetis.
- Kendala: Penyimpanan mungkin diblokir, penuh, atau tidak dapat dibaca; kondisi ini harus dijelaskan secara eksplisit. Kegagalan menyimpan tidak boleh digambarkan sebagai keberhasilan.
- Peluang UX: Kaitkan editor dengan catatan terpilih, berikan hasil penyimpanan yang akurat, dan jelaskan bahwa catatan hanya tersedia di origin/profil browser ini.

### 5. Mereset keadaan demo atau keluar
- Melakukan: Jika memilih Reset, meninjau konfirmasi sebelum menghapus catatan dan filter. Pengguna membatalkan atau melanjutkan.
- Berpikir: “Apa saja yang akan dihapus?”
- Merasa: Belum ditetapkan; reaksi apa pun di sini masih hipotetis.
- Kendala: Cakupan reset yang tidak jelas dapat menimbulkan ekspektasi yang keliru. Tidak ada bukti dari pengguna nyata.
- Peluang UX: Nyatakan bahwa reset hanya memengaruhi catatan dan filter; minta konfirmasi. Pembatalan atau kegagalan harus membiarkan keadaan tetap sama dan tidak boleh menyatakan reset berhasil.

## Indikator keberhasilan

Indikator pengalaman yang diusulkan dan belum tervalidasi:

- Peninjau dapat mengenali empat item terbuka di antara lima entri fiktif dan memahami bahwa Closed tidak disertakan.
- Peninjau dapat menggabungkan filter status dan pencarian serta mengetahui saat tidak ada catatan yang cocok.
- Peninjau dapat mengenali catatan yang dipilih dan memahami batasan penyimpanan catatan yang khusus untuk origin/profil browser.
- Kesalahan penyimpanan terlihat dan secara akurat menjelaskan operasi yang gagal atau tidak tersedia; kesalahan tersebut tidak mengumumkan bahwa penyimpanan berhasil.
- Cakupan reset jelas, dan pembatalan atau kegagalan reset membuat catatan dan filter tetap seperti semula.
- Pengguna keyboard dapat menjangkau dan menggunakan kontrol yang sama, fokus tetap terlihat, konten menyesuaikan secara responsif, serta kontras teks/kontrol memadai.

## Fakta yang diberikan, asumsi, dan pertanyaan terbuka

- Fakta yang diberikan:
  - Demo fiktif berisi lima entri, empat di antaranya berstatus terbuka.
  - Item terbuka mencakup Open dan In progress, tetapi tidak mencakup Closed; filter status dan pencarian dapat digabungkan.
  - Catatan hanya tersimpan di penyimpanan lokal browser untuk origin/profil saat ini. Penyimpanan yang diblokir, penuh, atau tidak dapat dibaca harus dilaporkan secara eksplisit; penyimpanan yang gagal tidak boleh disebut berhasil.
  - Reset hanya menghapus catatan dan filter setelah dikonfirmasi. Pembatalan atau kegagalan tidak mengubah keadaan.
- Asumsi:
  - Peninjau fiktif memilih entri untuk membaca konteksnya dan membuka editor catatan.
  - Tahapan dan pemikiran hipotetis menggambarkan perjalanan demo yang berguna; tidak satu pun merupakan perilaku pengguna yang diamati.
- Pertanyaan terbuka:
  - Apa peran, tujuan, konteks, cara sementara yang digunakan saat ini, kendala, dan frekuensi peninjauan peninjau yang dimaksud?
  - Apa dampak interaksi yang membingungkan atau gagal dalam skenario yang dimaksud?
  - Perangkat, browser, dan kebutuhan aksesibilitas apa yang sebaiknya direpresentasikan oleh prototipe?
  - Perilaku seperti apa yang diharapkan terhadap pilihan catatan dan draf yang belum disimpan saat filter berubah?
