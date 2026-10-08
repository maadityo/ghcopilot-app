# Tinjauan serah terima sif — Spesifikasi alur (demo fiktif)

> Alur ini menjelaskan interaksi prototipe fiktif. Ini adalah materi perencanaan demo yang belum tervalidasi, bukan riset pelanggan atau panduan operasional.

## Titik masuk

Peninjau fiktif membuka layar daftar serah terima. Layar menampilkan lima entri fiktif, dengan empat item terbuka: status Open dan In progress dihitung sebagai terbuka; Closed tidak. Tidak ada data pelanggan, lokasi, peralatan, atau operasional nyata yang direpresentasikan.

## Langkah dan titik keputusan

1. **Memeriksa daftar**
   - Tampilkan konteks entri fiktif, status setiap entri, serta dropdown/filter status, pencarian, dan opsi untuk membuat catatan.
   - Peninjau dapat membiarkan filter status pada All atau memilih Item terbuka.

2. **Memfilter dan mencari**
   - Memilih Item terbuka mencakup Open dan In progress, tetapi tidak mencakup Closed.
   - Peninjau dapat memasukkan kata pencarian saat filter status aktif. Pencarian dan filter status digabungkan.
   - Pastikan kriteria aktif dan jumlah hasil mudah dipahami. Jangan menyiratkan bahwa jumlah hasil sama dengan keseluruhan empat item terbuka.
   - Jika tidak ada entri yang cocok dengan kriteria gabungan, tampilkan keadaan tanpa kecocokan yang memungkinkan peninjau mengubah atau menghapus kriteria.
   - Jika daftar itu sendiri tidak memiliki entri, tampilkan keadaan daftar kosong yang berbeda. Data contoh demo terdiri atas lima entri, jadi keadaan ini merupakan keadaan umum yang relevan, bukan hasil yang diharapkan dari data contoh.

3. **Memilih entri dan meninjau konteksnya**
   - Peninjau memilih entri fiktif yang cocok dan membuka konteks serah terimanya.
   - Pertahankan identitas entri terpilih agar tetap jelas saat peninjau membaca atau menulis catatan.
   - Jika entri terpilih tidak lagi tersedia dalam daftar saat ini, tampilkan keadaan pilihan tidak tersedia dengan jelas, alih-alih mengaitkan catatan dengan entri yang ambigu. Penanganan kasus ini merupakan asumsi yang perlu divalidasi.

4. **Menulis dan menyimpan catatan**
   - Peninjau memasukkan catatan untuk entri fiktif terpilih, lalu mencoba menyimpannya.
   - Setelah keberhasilan dikonfirmasi, tampilkan hasil penyimpanan lokal browser dengan jelas beserta catatan yang terkait. Nyatakan bahwa catatan hanya tersimpan di penyimpanan lokal untuk origin/profil browser ini; catatan tidak dibagikan dan tidak dijamin tersedia di perangkat, profil, atau origin lain.
   - Jika penyimpanan diblokir, penuh, atau tidak dapat dibaca, tampilkan kesalahan secara eksplisit. Jangan tampilkan pesan berhasil atau menyatakan bahwa catatan telah tersimpan.
   - Jika memungkinkan, pertahankan draf yang sudah dimasukkan setelah penyimpanan gagal; apakah draf harus tetap ada setelah navigasi merupakan pertanyaan terbuka, bukan perilaku yang dijamin.

5. **Mereset secara opsional**
   - Peninjau memilih Reset dan melihat konfirmasi bahwa reset hanya menghapus catatan dan filter.
   - Jika dikonfirmasi dan reset berhasil, hapus catatan dan filter lalu tampilkan hasil penyelesaian yang akurat.
   - Jika dibatalkan, tutup konfirmasi dan biarkan catatan serta filter tidak berubah.
   - Jika reset gagal, tampilkan kegagalan secara eksplisit dan biarkan catatan serta filter tidak berubah. Jangan menyatakan reset berhasil.
   - Reset tidak berarti menghapus entri dari daftar atau mengubah kode.

## Keadaan akhir

- Berhasil:
  - Peninjau telah memfilter/mencari dalam daftar fiktif dan meninjau sebuah entri; atau
  - Penyimpanan catatan berhasil dan dinyatakan secara akurat sebagai penyimpanan lokal browser untuk origin/profil saat ini; atau
  - Reset yang telah dikonfirmasi berhasil dan hanya catatan serta filter yang dihapus.
- Sebagian selesai:
  - Filter/pencarian menampilkan catatan yang berguna, tetapi peninjau belum menulis catatan.
  - Peninjau telah menulis draf, tetapi belum menyimpannya.
  - Tidak ada catatan yang cocok dengan kriteria terpilih; peninjau dapat mengubah filter/pencarian tanpa menganggapnya sebagai kegagalan aplikasi.
  - Peninjau membatalkan reset; semua catatan dan filter tetap seperti semula.
- Terhambat:
  - Penyimpanan lokal diblokir, penuh, atau tidak dapat dibaca sehingga penyimpanan catatan tidak dapat dikonfirmasi; tampilkan kesalahan yang relevan secara eksplisit dan jangan pernah menyatakan bahwa penyimpanan berhasil.
  - Upaya reset gagal; tampilkan kesalahan secara eksplisit dan biarkan catatan serta filter tidak berubah.
  - Entri terpilih tidak tersedia atau ambigu; jangan mengaitkan catatan dengan entri yang salah dan sediakan cara yang jelas untuk kembali ke daftar.

## Persyaratan aksesibilitas

- Semua filter, pencarian, pemilihan catatan, pengisian/penyimpanan catatan, reset, dan tindakan konfirmasi harus dapat digunakan dengan keyboard tanpa memerlukan gestur penunjuk.
- Sediakan indikator fokus yang terlihat jelas pada setiap keadaan interaktif; urutan fokus harus mengikuti urutan visual dan alur tugas, dan dialog harus mengelola serta mengembalikan fokus dengan tepat.
- Gunakan label semantis dan kontrol bawaan atau kontrol lain yang setara aksesibilitasnya. Sampaikan keadaan terpilih/diperluas/ditekan serta pembaruan hasil atau kesalahan kepada teknologi bantu; jangan menyampaikan status hanya melalui warna.
- Pertahankan kontras teks, batas, dan kontrol yang memadai pada semua keadaan, termasuk fokus, filter terpilih, kesalahan, dan kontrol nonaktif.
- Dukung penataan ulang responsif pada ukuran area pandang sempit dan lebar tanpa kehilangan konten, kontrol terpotong, atau gulir horizontal yang tidak perlu. Pastikan pembesaran dan pengubahan ukuran teks tetap dapat digunakan.

## Asumsi dan pertanyaan terbuka

- Fakta yang diberikan:
  - Data contoh berisi lima entri fiktif dan empat item terbuka.
  - Item terbuka berarti status Open dan In progress, tetapi tidak mencakup Closed.
  - Dropdown/filter status dan pencarian dapat digabungkan.
  - Catatan hanya tersimpan di penyimpanan lokal browser, khusus untuk origin dan profil browser tersebut.
  - Kesalahan penyimpanan mencakup kondisi diblokir, penuh, dan tidak dapat dibaca, serta harus dijelaskan secara eksplisit; penyimpanan yang gagal tidak pernah dilaporkan sebagai berhasil.
  - Reset hanya menghapus catatan dan filter setelah dikonfirmasi; pembatalan atau kegagalan tidak mengubah keadaan.
- Asumsi:
  - Peninjau dapat memilih entri dari daftar yang difilter dan mengakses editor catatannya.
  - Pesan keberhasilan penyimpanan dapat membedakan penyimpanan lokal browser dari penyimpanan bersama.
  - Draf mungkin dipertahankan setelah penyimpanan gagal, tetapi masa berlaku draf dan perilaku saat navigasi belum ditentukan.
  - Entri terpilih yang menghilang dari hasil filter saat ini tidak seharusnya diam-diam mengubah keterkaitan catatan.
- Pertanyaan terbuka:
  - Apa peran, tujuan, konteks, frekuensi, dan cara sementara yang digunakan saat ini oleh peninjau yang dimaksud?
  - Perangkat, browser, teknologi bantu, dan kebutuhan aksesibilitas lainnya apa yang sebaiknya direpresentasikan?
  - Apakah entri terpilih harus tetap terpilih saat filter/pencarian berubah, dan apa yang harus terjadi pada draf yang belum disimpan?
  - Bagaimana perilaku pengeditan/penggantian catatan dan batas panjang maksimum yang diharapkan?
  - Kata-kata konfirmasi, perilaku fokus, dan opsi pemulihan apa yang paling sesuai bagi peninjau yang dimaksud?
