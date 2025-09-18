import { Button } from "@/components/ui/button"

type User = {
  id: number
  name: string
}

type UserListProps = {
  users: User[]
  onSelectUser: (user: User) => void
}

export function UserList({ users, onSelectUser }: UserListProps) {
  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Select a Driver</h2>
      {users.map((user) => (
        <Button
          key={user.id}
          onClick={() => onSelectUser(user)}
          className="w-full justify-start text-left"
          variant="outline"
        >
          {user.name}
        </Button>
      ))}
    </div>
  )
}

