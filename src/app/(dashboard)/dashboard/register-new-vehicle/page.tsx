'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import axios from 'axios'
import { ScrollArea } from '@/components/ui/scroll-area'
import endpoint from '@/constants/api'
import { X } from 'lucide-react'
import QRScanner from '@/components/QRScanner'

type UlipVehicleDetails = {
  rc_owner_name: string
  rc_regn_no: string
  rc_regn_dt: string
  rc_regn_upto: string
  rc_chasi_no: string
  rc_eng_no: string
  rc_maker_desc: string
  rc_insurance_policy_no: string
  rc_insurance_upto: string
  rc_status: string
  rc_vch_catg_desc: string
}

export default function VehicleRegistrationForm() {
  const [deviceId, setDeviceId] = useState('')
  const deviceIdRef = useRef('')
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [ulipDl, setUlipDl] = useState<UlipVehicleDetails | null>(null)
  const [scanning, setScanning] = useState(false)

  const verifyDetails = async () => {
    setIsVerified(false)
    try {
      const response = await axios.post(`${endpoint}/api/verify/vahaan`, {
        vehiclenumber: vehicleNumber
      })
      const apiData = response.data
      setUlipDl(apiData)
      setIsVerified(true)
    } catch (error) {
      setIsVerified(false)
      console.error("Verification Error:", error)
      toast({
        title: "Error",
        description: "An error occurred during verification."
      })
    }
  }
  useEffect(() => {
    deviceIdRef.current = deviceId
    console.log("🎯 Device ID changed:", deviceId)
  }, [deviceId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!deviceId || !vehicleNumber) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: "Device linked with vehicle successfully!",
    })

    // setDeviceId('')
    // setVehicleNumber('')
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-20">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Link Device with Vehicle</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="deviceId">Device ID</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="deviceId"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  placeholder="Enter Device ID"
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setScanning(true)}
                >
                  Scan QR
                </Button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
  Current Device ID: <code>{deviceId}</code>
</div>

            <div>
              <Label htmlFor="vehicleNumber">Vehicle Number</Label>
              <Input
                id="vehicleNumber"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="Enter Vehicle Number"
              />
            </div>

            <Button type="button" onClick={verifyDetails} disabled={isVerified}>
              {isVerified ? "Verified" : "Verify Details"}
            </Button>

            {isVerified && ulipDl && (
              <div className='mb-10'>
                <h1 className='font-bold text-xl underline mb-4'>Verify Details</h1>
                <p>Driver Full Name : {ulipDl.rc_owner_name}</p>
                <p>Registration Number : {ulipDl.rc_regn_no}</p>
                <p>Registration Date : {ulipDl.rc_regn_dt}</p>
                <p>Registration upto : {ulipDl.rc_regn_upto}</p>
                <p>Chasi Number : {ulipDl.rc_chasi_no}</p>
                <p>Engine Number : {ulipDl.rc_eng_no}</p>
                <p>Maker: {ulipDl.rc_maker_desc}</p>
                <p>Insurance Policy Number : {ulipDl.rc_insurance_policy_no}</p>
                <p>Insurance Upto : {ulipDl.rc_insurance_upto}</p>
                <p>Status : {ulipDl.rc_status}</p>
                <p>Vehicle Category : {ulipDl.rc_vch_catg_desc}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <Button type="submit">Register</Button>
              <Button type="button" className='text-sm' variant="secondary">Stop Registration</Button>
            </div>
          </form>
        </div>
      </div>

      {scanning && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative w-[320px] h-[320px] rounded-lg bg-white p-4 shadow-xl">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setScanning(false)}
              className="absolute top-2 right-2 z-10"
            >
              <X className="w-5 h-5 text-black" />
            </Button>
            <QRScanner
              onScanSuccess={(text) => {
                console.log("✅ Scanned:", text)
                setDeviceId(text) // <-- ✅ THIS UPDATES INPUT
                setScanning(false)
                toast({
                  title: "Scanned",
                  description: "Device ID filled from QR code.",
                })
              }}
              onClose={() => setScanning(false)}
            />

          </div>
        </div>
      )}
    </ScrollArea>
  )
}
