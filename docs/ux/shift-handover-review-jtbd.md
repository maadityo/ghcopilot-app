# Tinjauan serah terima sif — JTBD (demo fiktif)

> Semua orang, catatan, situasi, dan contoh dalam artefak ini adalah materi demo fiktif. Ini bukan riset pelanggan, dan tidak ada pernyataan di bawah ini yang merupakan temuan tervalidasi.

## Pernyataan pekerjaan

Saat saya meninjau serah terima sif fiktif dan perlu menemukan item yang belum ditutup, saya ingin melihat dan memfilter item yang belum selesai serta menulis catatan yang tersimpan di browser, agar saya dapat meninjau konteks yang relevan dalam demo ini.

## Pengguna dan konteks

- Peran: Peninjau fiktif daftar serah terima sif; peran ini bukan persona pelanggan nyata atau tervalidasi.
- Konteks: Daftar fiktif berisi lima entri, empat di antaranya merupakan item terbuka. “Item terbuka” berarti status Open atau In progress, dan tidak mencakup Closed. Peninjau dapat menggabungkan dropdown/filter status dengan pencarian.
- Frekuensi/perangkat/aksesibilitas: Frekuensi dan perangkat yang sebenarnya belum diketahui. Prototipe dilihat di browser dan sebaiknya mendukung penggunaan dengan keyboard, fokus yang terlihat, kontrol semantis, kontras yang memadai, dan tata letak responsif.
- Batasan catatan: Catatan hanya tersimpan di penyimpanan lokal browser (localStorage) dan khusus untuk origin serta profil browser tersebut. Tidak ada implikasi bahwa catatan dibagikan atau tersimpan lintas perangkat.

## Pendekatan saat ini dan kendala

- Fakta yang diberikan:
  - Ada lima entri fiktif dan empat item terbuka.
  - Item terbuka mencakup Open dan In progress, tetapi tidak mencakup Closed.
  - Dropdown/filter status dan pencarian dapat digunakan bersamaan.
  - Catatan hanya tersimpan di penyimpanan lokal browser, khusus untuk origin dan profil browser tersebut.
  - Kesalahan penyimpanan harus dijelaskan secara eksplisit jika penyimpanan diblokir, penuh, atau tidak dapat dibaca; penyimpanan yang gagal tidak boleh disebut berhasil.
  - Reset hanya menghapus catatan dan filter setelah dikonfirmasi. Pembatalan atau kegagalan reset tidak mengubah keadaan.
- Asumsi:
  - Peninjau fiktif mungkin terbantu dengan mempersempit daftar sebelum membaca atau menulis catatan.
  - Editor catatan yang kaitannya jelas dengan suatu entri dapat mempermudah pemahaman tentang entri fiktif mana yang dirujuk oleh catatan.
  - Peninjau memahami bahwa catatan lokal browser hanya tersedia untuk origin/profil saat ini; hal ini perlu dikonfirmasi dalam tinjauan berikutnya.
- Pertanyaan terbuka:
  - Siapa peninjau yang dimaksud dalam skenario ini, dan apa tujuan serta konteks mereka sebenarnya?
  - Alternatif atau cara sementara apa yang mereka gunakan saat ini, dan kendala apa yang mereka sampaikan?
  - Seberapa sering mereka akan meninjau item, dan apa dampak item yang terlewat, tersembunyi, atau disalahpahami dalam narasi demo yang dimaksud?
  - Perangkat, browser, dan kebutuhan aksesibilitas apa yang sebaiknya direpresentasikan oleh prototipe?
  - Konten dan panjang catatan seperti apa yang perlu diperagakan dalam interaksi fiktif ini, jika ada?

## Hasil yang diinginkan

- Peninjau dapat membedakan empat item terbuka fiktif dari satu item Closed.
- Peninjau dapat menggabungkan pemfilteran status dengan pencarian dan memahami saat tidak ada hasil yang cocok.
- Peninjau dapat mengetahui entri fiktif mana yang terkait dengan suatu catatan dan apakah catatan tersebut tersimpan di origin/profil browser ini.
- Kesalahan penyimpanan dan reset disampaikan dengan jelas, tanpa menyiratkan penyimpanan atau reset berhasil jika gagal.
- Peninjau dapat menyelesaikan pengalaman ini dengan keyboard dan teknologi bantu, pada ukuran area pandang sempit maupun lebar.
