import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// This would typically come from an API or database
const users = [
  { id: 1, name: "Rakesh", email: "rakesh@example.com" },
  { id: 2, name: "Mukesh", email: "mukesh@example.com" },
  { id: 3, name: "Amit", email: "amit@example.com" },
]

export default function UsersPage() {
  return (
    <div className="container mx-auto py-10 px-10">
      <h1 className="text-2xl font-bold mb-5">Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Link href={`/dashboard/users/${user.id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

