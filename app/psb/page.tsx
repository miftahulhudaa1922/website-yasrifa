"use client";

import { useState } from "react";
import Step1Siswa from "./components/Step1Siswa";
import Step2Alamat from "./components/Step2Alamat";
import Step3Ortu from "./components/Step3Ortu";
import Step4Kontak from "./components/Step4Kontak";
import Step5Pribadi from "./components/Step5Pribadi";
import Step6Foto from "./components/Step6Foto";

const Pendaftaran = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<any>({
    namaLengkap: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    agama: "",
    asalSekolah: "",
    nisn: "",
    noUjian: "",
    kk: "",
    nik: "",
    alamat: "",
    desa: "",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
    tinggalDengan: "",
    ayah: {
      nama: "",
      tahunLahir: "",
      pendidikan: "",
      pekerjaan: "",
      penghasilan: "",
    },
    ibu: {
      nama: "",
      tahunLahir: "",
      pendidikan: "",
      pekerjaan: "",
      penghasilan: "",
    },
    kontak: {
      telp: "",
      email: "",
    },
    pribadi: {
      saudara: "",
      tinggi: "",
      berat: "",
      hobi: "",
    },
    pendidikanTujuan: "",
    foto: null,
  });

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center text-sm mb-4">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div
            key={s}
            className={`flex-1 text-center py-1 rounded ${
              step === s
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Step {s}
          </div>
        ))}
      </div>

      {step === 1 && <Step1Siswa form={form} setForm={setForm} next={next} />}
      {step === 2 && (
        <Step2Alamat form={form} setForm={setForm} next={next} prev={prev} />
      )}
      {step === 3 && (
        <Step3Ortu form={form} setForm={setForm} next={next} prev={prev} />
      )}
      {step === 4 && (
        <Step4Kontak form={form} setForm={setForm} next={next} prev={prev} />
      )}
      {step === 5 && (
        <Step5Pribadi form={form} setForm={setForm} next={next} prev={prev} />
      )}
      {step === 6 && <Step6Foto form={form} setForm={setForm} prev={prev} />}
    </div>
  );
};

export default Pendaftaran;
