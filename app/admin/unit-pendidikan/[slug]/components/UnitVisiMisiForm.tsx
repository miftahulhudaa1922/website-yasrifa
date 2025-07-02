"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  slug: string;
}

export default function UnitVisiMisiForm({ slug }: Props) {
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/unit-visimisi/${slug}`);
        const data = await res.json();
        if (data.visi) setVisi(data.visi);
        if (data.misi) setMisi(data.misi);
      } catch (err) {
        console.error("Gagal memuat data visi dan misi:", err);
        toast.error("Gagal memuat data visi dan misi");
      } finally {
        setInitialLoad(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/unit-visimisi/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visi, misi }),
      });

      if (!res.ok) throw new Error();

      toast.success("Visi dan misi berhasil disimpan");
    } catch {
      toast.error("Gagal menyimpan visi dan misi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-semibold text-green-800">
        Visi & Misi Unit ({slug})
      </h2>

      {initialLoad ? (
        <p className="text-gray-500 text-sm">Memuat data...</p>
      ) : (
        <>
          <div>
            <label className="block font-medium text-sm mb-1 text-gray-700">
              Visi
            </label>
            <Textarea
              rows={4}
              value={visi}
              onChange={(e) => setVisi(e.target.value)}
              placeholder="Tulis visi unit pendidikan..."
              className="w-full border rounded p-3 text-sm"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1 text-gray-700">
              Misi
            </label>
            <Textarea
              rows={6}
              value={misi}
              onChange={(e) => setMisi(e.target.value)}
              placeholder="Tulis misi unit pendidikan..."
              className="w-full border rounded p-3 text-sm"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-green-700 hover:bg-green-800 text-white"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </>
      )}
    </form>
  );
}
