import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type Truck = {
  id: number
  name: string
  model: string
  capacity: string
}

type TruckSelectionProps = {
  trucks: Truck[]
  onSelectTruck: (truck: Truck) => void
  onBack: () => void
  onSubmit: () => void
  selectedTruck: Truck | null
}

export function TruckSelection({ trucks, onSelectTruck, onBack, onSubmit, selectedTruck }: TruckSelectionProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Select a Truck</h2>
        <RadioGroup onValueChange={(value) => onSelectTruck(trucks.find(t => t.id.toString() === value)!)}>
          {trucks.map((truck) => (
            <div key={truck.id} className="flex items-center space-x-2 mb-4">
              <RadioGroupItem value={truck.id.toString()} id={`truck-${truck.id}`} />
              <Label htmlFor={`truck-${truck.id}`} className="flex-grow cursor-pointer">
                <div className="font-medium">{truck.name}</div>
                <div className="text-sm text-gray-500">Model: {truck.model}</div>
                <div className="text-sm text-gray-500">Capacity: {truck.capacity}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={onSubmit} disabled={!selectedTruck}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

