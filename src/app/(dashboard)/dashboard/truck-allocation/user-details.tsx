import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from 'lucide-react'

type User = {
  id: number
  name: string
}

type UserDetailsProps = {
  user: User
  onBack: () => void
  onNext: () => void
}

export function UserDetails({ user, onBack, onNext }: UserDetailsProps) {
  // Mock user details with Indian context
  const userDetails = {
    name: user.name,
    email: `${user.name.toLowerCase().replace(' ', '.')}@example.com`,
    phoneNumber: '+91 98765 43210',
    drivingLicense: 'DL-1420110012345',
    pastExperience: '3-5 years',
    preferredRoutes: 'Mumbai - Pune, Delhi - Jaipur',
    languages: 'Hindi, English, Marathi'
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">{userDetails.name}</h2>
        <div className="space-y-3 mb-6">
          <DetailItem label="Email" value={userDetails.email} />
          <DetailItem label="Phone Number" value={userDetails.phoneNumber} />
          <DetailItem label="Driving License" value={userDetails.drivingLicense} />
          <DetailItem label="Past Experience" value={userDetails.pastExperience} />
          <DetailItem label="Preferred Routes" value={userDetails.preferredRoutes} />
          <DetailItem label="Languages" value={userDetails.languages} />
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={onNext}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-semibold">{label}:</span> {value}
    </div>
  )
}

