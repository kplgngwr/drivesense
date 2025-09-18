'use client'

import { useState } from 'react'
import { UserList } from './user-list'
import { UserDetails } from './user-details'
import { TruckSelection } from './truck-selection'
import { toast } from "@/components/ui/use-toast"

// Mock data for users with Indian names
const users = [
  { id: 1, name: 'Rajesh Kumar' },
  { id: 2, name: 'Priya Sharma' },
  { id: 3, name: 'Amit Patel' },
  { id: 4, name: 'Sunita Gupta' },
  { id: 5, name: 'Vikram Singh' },
]

// Mock data for trucks with Indian context
const trucks = [
  { id: 1, name: 'Tata Ace', model: 'Gold', capacity: '750 kg' },
  { id: 2, name: 'Mahindra Bolero', model: 'Pickup', capacity: '1250 kg' },
  { id: 3, name: 'Ashok Leyland Dost', model: 'Strong', capacity: '1500 kg' },
  { id: 4, name: 'Eicher Pro', model: '2049', capacity: '5000 kg' },
  { id: 5, name: 'BharatBenz', model: '1014R', capacity: '10000 kg' },
]

type User = typeof users[0]
type Truck = typeof trucks[0]

export default function TruckAllocationPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null)
  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
    if (step === 3) {
      setSelectedTruck(null)
    }
  }

  const handleSubmit = () => {
    if (selectedUser && selectedTruck) {
      // Here you would typically send the data to your backend
      console.log('Submitting:', { user: selectedUser, truck: selectedTruck })
      toast({
        title: "Success",
        description: `Allocated ${selectedTruck.name} to ${selectedUser.name}`,
      })
      // Reset the form
      setSelectedUser(null)
      setSelectedTruck(null)
      setStep(1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Truck Allocation</h1>
      {step === 1 && (
        <UserList users={users} onSelectUser={(user) => { setSelectedUser(user); handleNext(); }} />
      )}
      {step === 2 && selectedUser && (
        <UserDetails user={selectedUser} onBack={handleBack} onNext={handleNext} />
      )}
      {step === 3 && selectedUser && (
        <TruckSelection 
          trucks={trucks} 
          onSelectTruck={setSelectedTruck} 
          onBack={handleBack} 
          onSubmit={handleSubmit}
          selectedTruck={selectedTruck}
        />
      )}
    </div>
  )
}

