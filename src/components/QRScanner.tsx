'use client'

import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

type QRScannerProps = {
  onScanSuccess: (text: string) => void
  onClose: () => void
}

export default function QRScanner({ onScanSuccess, onClose }: QRScannerProps) {
  const readerRef = useRef<HTMLDivElement>(null)
  const [scannerReady, setScannerReady] = useState(false)

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 200 && entry.contentRect.height > 200) {
          setScannerReady(true)
        }
      }
    })

    if (readerRef.current) {
      observer.observe(readerRef.current)
    }

    return () => {
      if (readerRef.current) {
        observer.unobserve(readerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!scannerReady) return

    const html5QrCode = new Html5Qrcode("qr-reader")

    html5QrCode
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          console.log("✅ Scanned:", decodedText)
          onScanSuccess(decodedText)
          html5QrCode.stop().then(onClose).catch(console.error)
        },
        (errorMessage) => {
          console.log("QR Error:", errorMessage)
        }
      )
      .catch(err => console.error("Camera start error", err))

    return () => {
      html5QrCode.stop().catch(() => {})
    }
  }, [scannerReady, onScanSuccess, onClose])

  return <div ref={readerRef} id="qr-reader" className="w-full h-full rounded-md" />
}
