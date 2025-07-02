"use client";

import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export default function UnitSejarah({ slug }: Props) {
  const [sejarah, setSejarah] = useState("");

  useEffect(() => {
    fetch(`/api/unit-sejarah/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data sejarah:", data);
        setSejarah(data.sejarah || "");
      });
  }, [slug]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2 text-green-800">
        Sejarah Singkat
      </h2>
      <p className="text-gray-700 leading-relaxed">{sejarah}</p>
    </section>
  );
}
