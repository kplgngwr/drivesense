import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

// This would typically come from an API or database based on the user ID
const getUserDetails = (id: string) => ({
  id: parseInt(id),
  name: "Rajesh Kumar",
  email: "rajesh.kumar@example.com",
  phoneNumber: "+91 98765 43210",
  age: 38,
  drivingLicense: "DL1234567890",
  trucksAllocated: [
    {
      truckName: "Tata 407",
      deviceId: "ABC123XYZ",
      vehicleNumber: "UP32AB1234",
      weight: 3500,  // Weight in KG
      registrationDate: "15-Jan-2018",
      ownerName: "Rajesh Kumar",
      insuranceStatus: "Active",
      rtoLocation: "Lucknow",
      lastServiceDate: "20-Oct-2023",
      mileage: 80000, // Mileage in KM
    },
    {
      truckName: "Mahindra Bolero Pik-Up",
      deviceId: "DEF456UVW",
      vehicleNumber: "MH12CD5678",
      weight: 2800,  // Weight in KG
      registrationDate: "10-Mar-2019",
      ownerName: "Rajesh Kumar",
      insuranceStatus: "Expired",
      rtoLocation: "Mumbai",
      lastServiceDate: "15-Nov-2023",
      mileage: 60000, // Mileage in KM
    }
  ],
  totalDeliveries: 22,
  drivingScore: 95,
  totalKm: 373
})

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const user = getUserDetails(params.id)

  return (
    <ScrollArea className="h-full">
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">User Details</h1>
      
      {/* Cards with Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="transition-all transform rounded-xl bg-blue-100">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">Total Deliveries</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold text-blue-600">{user.totalDeliveries}</p>
          </CardContent>
        </Card>
        
        <Card className="transition-all transform rounded-xl bg-green-100">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">Driving Score</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold text-green-600">{user.drivingScore.toFixed(1)}%</p>
          </CardContent>
        </Card>
        
        <Card className="transition-all transform rounded-xl bg-yellow-100">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">Total KM</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold text-yellow-600">{user.totalKm.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Personal Information and Allocated Trucks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <Card className="transition-all transform bg-gray-50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4 text-gray-600">
              <div>
                <dt className="font-semibold">Name:</dt>
                <dd>{user.name}</dd>
              </div>
              <div>
                <dt className="font-semibold">Email:</dt>
                <dd>{user.email}</dd>
              </div>
              <div>
                <dt className="font-semibold">Phone Number:</dt>
                <dd>{user.phoneNumber}</dd>
              </div>
              <div>
                <dt className="font-semibold">Age:</dt>
                <dd>{user.age}</dd>
              </div>
              <div>
                <dt className="font-semibold">Driving License:</dt>
                <dd>{user.drivingLicense}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="transition-all transform bg-gray-50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">Allocated Trucks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {user.trucksAllocated.map((truck, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-md transition-all">
                  <h3 className="text-lg font-semibold text-gray-800">{truck.truckName}</h3>
                  <p className="text-gray-600"><strong>Device ID:</strong> {truck.deviceId}</p>
                  <p className="text-gray-600"><strong>Vehicle Number:</strong> {truck.vehicleNumber}</p>
                  <p className="text-gray-600"><strong>Weight:</strong> {truck.weight} KG</p>
                  <p className="text-gray-600"><strong>Registration Date:</strong> {truck.registrationDate}</p>
                  <p className="text-gray-600"><strong>Insurance Status:</strong> {truck.insuranceStatus}</p>
                  <p className="text-gray-600"><strong>RTO Location:</strong> {truck.rtoLocation}</p>
                  <p className="text-gray-600"><strong>Last Service Date:</strong> {truck.lastServiceDate}</p>
                  <p className="text-gray-600"><strong>Mileage:</strong> {truck.mileage.toLocaleString()} KM</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </ScrollArea>
  )
}
