'use client'

import { useState } from 'react'
import { UserList } from './user-list'
import MapView from './map-view'
import { ScrollArea } from '@/components/ui/scroll-area'
import Truck from '@/components/Truck'

// Mock data for users with Indian names
const users = [
    { id: 1, name: 'Rajesh Kumar' },
    { id: 2, name: 'Priya Sharma' },
    { id: 3, name: 'Amit Patel' },
    { id: 4, name: 'Sunita Gupta' },
    { id: 5, name: 'Vikram Singh' },
]

type User = typeof users[0]

export default function VehicleTrackingPage() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    return (
        <ScrollArea className='h-full'>
            <div className="container mx-auto px-4 py-8">
                <div className='flex items-center'>
                    <h1 className="text-2xl font-bold mb-6">Vehicle Tracking</h1>
                    {/* <button
                        onClick={() => setSelectedUser(null)}
                        className="ml-auto px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    >
                        Back to User List
                    </button> */}
                </div>
                {!selectedUser ? (
                    <UserList users={users} onSelectUser={setSelectedUser} />
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Tracking {selectedUser.name}&apos;s Vehicle</h2>
                        <MapView />
                        <h1 className='mt-10 text-xl font-bold'>Truck Orientation</h1>
                        <Truck />

                    </div>
                )}
            </div>
        </ScrollArea>
    )
}

