# Mengubah detail portofolio

Buka `assets/js/portfolio-data.js`. Setiap blok ID (`"1"` sampai `"9"`) adalah data untuk tombol Detail dengan URL `portfolio-details.html?id=ID`.

Ubah nilai berikut pada ID yang diinginkan:
- `title`: judul proyek.
- `category`: kategori.
- `client`: nama klien.
- `date`: tanggal proyek (teks bebas).
- `url`: alamat proyek lengkap dengan https://.
- `description`: deskripsi proyek.
- `images`: daftar lokasi gambar untuk slider. Bisa satu atau beberapa gambar.

Simpan gambar di `assets/img/portfolio/`, lalu tulis lokasinya dalam `images`, misalnya `assets/img/portfolio/proyek-saya.jpg`. Simpan file data dan refresh halaman detail. Data klien, tanggal, URL, deskripsi, dan gambar tambahan bawaan masih contoh; ganti dengan data Anda.

Pertahankan tanda kutip, koma, dan kurung saat mengedit. ID jangan diubah agar tautan kartu tetap sesuai. Data ini mengatur halaman detail; thumbnail dan judul pratinjau kartu di halaman utama tetap diubah di `index.html`.

Tidak memerlukan database. Jika situs sudah online, unggah juga file data dan gambar yang diubah.
