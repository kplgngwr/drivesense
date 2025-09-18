'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { ScrollArea } from '@/components/ui/scroll-area'
import axios from 'axios'
import endpoint from '@/constants/api'

type DriverData = {
  name: string
  email: string
  age: number
  dob: string
  phoneNumber: string
  gender: string
  address: string
  drivingLicense: string
  drivingExp: string
  languages: string
  preferedRoute: string
}

type UlipDriverDetails = {
  bioFullName: string
  bioGenderDesc: string
  bioMobileNo: string
  bioCitiZen: string
  bioEndorsementNo: string
  bioPermDistName: string
}


const initialData: DriverData = {
  name: '',
  age: 0,
  dob: '',
  email: '',
  phoneNumber: '',
  gender: '',
  address: '',
  drivingLicense: '',
  drivingExp: '',
  languages: '',
  preferedRoute: ''
}

export default function DriverRegistrationForm() {
  const [step, setStep] = useState(1)
  const [driverData, setDriverData] = useState<DriverData>(initialData)
  const [isVerified, setIsVerified] = useState(false)
  const [ulipDl, setUlipDl] = useState<UlipDriverDetails | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDriverData(prev => ({ ...prev, [name]: value }))
  }

  const verifyDetails = async () => {
    setIsVerified(false)
    try {
      const response = await axios.post(
        `${endpoint}/api/verify`,
        {
          dlnumber: driverData.drivingLicense,
          dob: driverData.dob
        },
      )
      const apiData = response.data
      const responseData = apiData.response[0].response.dldetobj[0].bioObj
      setUlipDl(responseData)
      setIsVerified(true)
      console.log(responseData);
    } catch (error) {
      setIsVerified(false)
      console.error("Verification Error:", error)
      toast({
        title: "Error",
        description: "An error occurred during verification."
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isVerified) {
      toast({
        title: "Error",
        description: "Please verify your details before submitting."
      })
      return
    }

    console.log('Submitting:', driverData)

    toast({
      title: "Success",
      description: "Driver registered successfully!"
    })

    setStep(1)
    setDriverData(initialData)
    setIsVerified(false)
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  return (
    <ScrollArea className='h-full'>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-20">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">

          <div className="flex justify-between mb-8">
            <div className={`text-xl font-semibold ${step === 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              1. Basic Details
            </div>
            <div className={`text-xl font-semibold ${step === 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              2. Driving
            </div>
            <div className={`text-xl font-semibold ${step === 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              3. Job
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={driverData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    value={driverData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={driverData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={driverData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="button" onClick={nextStep}>Next</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="drivingLicense">Driving License Number</Label>
                  <Input
                    id="drivingLicense"
                    name="drivingLicense"
                    value={driverData.drivingLicense}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={driverData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Button type="button" onClick={verifyDetails} disabled={isVerified}>
                    {isVerified ? "Verified" : "Verify Details"}
                  </Button>
                  {isVerified ? (
                    <div>
                      <h1 className='font-bold text-xl underline mb-4'>Verify Details</h1>
                      <p>Driver Full Name : {ulipDl?.bioFullName}</p>
                      <p>Driver Gender : {ulipDl?.bioGenderDesc}</p>
                      <p>Driver Mobile Number : {ulipDl?.bioMobileNo}</p>
                      <p>Driver Citizenship : {ulipDl?.bioCitiZen}</p>
                      <p>Driver Endorsement Number : {ulipDl?.bioEndorsementNo}</p>
                      <p>Driver District : {ulipDl?.bioPermDistName}</p>
                    </div>
                  ) : (
                    <p></p>
                  )}
                  <Button type="button" onClick={prevStep} variant="outline" className='mt-10 mr-10'>Previous</Button>
                  <Button type="button" onClick={nextStep}>Next</Button>
                  <Button type="button" onClick={nextStep} className='ml-10'>Stop Registration</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="languages">Languages</Label>
                  <Input
                    id="languages"
                    name="languages"
                    value={driverData.languages}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="preferedRoute">Prefered Route</Label>
                  <Input
                    id="preferedRoute"
                    name="preferedRoute"
                    value={driverData.preferedRoute}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="button" onClick={prevStep} variant="outline">Previous</Button>
                <Button type="submit">Register Driver</Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </ScrollArea>
  )
}
