"use client"

import React from "react"
import "@/styles/loading-dots.css" 

export default function LoadingDots() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="dots-loading space-x-2 flex">
        <span className="dot bg-red-500"></span>
        <span className="dot bg-yellow-500"></span>
        <span className="dot bg-green-500"></span>
      </div>
    </div>
  )
}
