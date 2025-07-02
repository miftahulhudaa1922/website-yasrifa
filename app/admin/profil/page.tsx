"use client"

import { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ProfilForm() {
  const [sejarah, setSejarah] = useState("")
  const [sambutan, setSambutan] = useState("")
  const [visiMisi, setVisiMisi] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/profil")
      .then((res) => res.json())
      .then((data) => {
        setSejarah(data.sejarah || "")
        setSambutan(data.sambutan || "")
        setVisiMisi(data.visiMisi || "")
      })
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/profil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sejarah, sambutan, visiMisi }),
      })

      if (res.ok) {
        toast.success("Profil berhasil disimpan")
      } else {
        toast.error("Gagal menyimpan profil")
      }
    } catch (err) {
      console.error(err)
      toast.error("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Kelola Profil</h1>

      <div>
        <Label>Sejarah</Label>
        <Textarea
          value={sejarah}
          onChange={(e) => setSejarah(e.target.value)}
          rows={6}
          className="mt-1"
        />
      </div>

      <div>
        <Label>Sambutan</Label>
        <Textarea
          value={sambutan}
          onChange={(e) => setSambutan(e.target.value)}
          rows={6}
          className="mt-1"
        />
      </div>

      <div>
        <Label>Visi & Misi</Label>
        <Textarea
          value={visiMisi}
          onChange={(e) => setVisiMisi(e.target.value)}
          rows={6}
          className="mt-1"
        />
      </div>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </div>
  )
}
