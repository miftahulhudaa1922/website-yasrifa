import { z } from 'zod'

export const pendaftarSchema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi'),
  tempatLahir: z.string().min(1, 'Tempat lahir wajib diisi'),
  tanggalLahir: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Tanggal lahir tidak valid',
  }),
  jenisKelamin: z.enum(['L', 'P'], {
    errorMap: () => ({ message: 'Jenis kelamin wajib dipilih' }),
  }),
  agama: z.enum(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha'], {
    errorMap: () => ({ message: 'Agama wajib dipilih' }),
  }),
  asalSekolah: z.string().min(1, 'Asal sekolah wajib diisi'),

  nisn: z
    .string()
    .regex(/^\d{10}$/, 'NISN harus terdiri dari 10 angka'),

  noUjian: z
    .string()
    .regex(/^\d+$/, 'No Ujian hanya boleh angka'),

  nik: z
    .string()
    .regex(/^\d{16}$/, 'NIK harus terdiri dari 16 angka'),

  alamat: z.string().min(1, 'Alamat wajib diisi'),
  desa: z.string().min(1, 'Desa wajib diisi'),
  kecamatan: z.string().min(1, 'Kecamatan wajib diisi'),
  kabupaten: z.string().min(1, 'Kabupaten wajib diisi'),
  provinsi: z.string().min(1, 'Provinsi wajib diisi'),
  tinggalDengan: z.string().min(1, 'Tinggal dengan siapa wajib diisi'),

  pendidikanTujuan: z.enum(
    ['PAUD', 'MI', 'SMP', 'MA', 'SMK', 'KULIAH', 'MONDOK SAJA'],
    {
      errorMap: () => ({ message: 'Pendidikan tujuan wajib dipilih' }),
    }
  ),

  ayahNama: z.string().min(1, 'Nama ayah wajib diisi'),
  ayahLahir: z.string().min(1, 'Tanggal lahir ayah wajib diisi'),
  ayahPendidikan: z.string().min(1, 'Pendidikan ayah wajib diisi'),
  ayahPekerjaan: z.string().min(1, 'Pekerjaan ayah wajib diisi'),
  ayahPenghasilan: z.string().min(1, 'Penghasilan ayah wajib diisi'),

  ibuNama: z.string().min(1, 'Nama ibu wajib diisi'),
  ibuLahir: z.string().min(1, 'Tanggal lahir ibu wajib diisi'),
  ibuPendidikan: z.string().min(1, 'Pendidikan ibu wajib diisi'),
  ibuPekerjaan: z.string().min(1, 'Pekerjaan ibu wajib diisi'),
  ibuPenghasilan: z.string().min(1, 'Penghasilan ibu wajib diisi'),

  telp: z
    .string()
    .min(8, 'Nomor telepon minimal 8 digit')
    .regex(/^\d+$/, 'Nomor telepon hanya boleh angka'),

  email: z.string().email('Format email tidak valid'),

  saudara: z.coerce.number().min(1, 'Jumlah saudara minimal 1'),
  tinggi: z.coerce.number().min(1, 'Tinggi badan wajib diisi'),
  berat: z.coerce.number().min(1, 'Berat badan wajib diisi'),
  hobi: z.string().min(1, 'Hobi wajib diisi'),
})
