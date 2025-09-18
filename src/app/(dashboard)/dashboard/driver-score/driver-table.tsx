import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Driver {
    id: number;
    name: string;
    score: number;
}

interface DriverTableProps {
    drivers: Driver[];
}

export function DriverTable({ drivers }: DriverTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {drivers.map((driver) => (
                    <TableRow key={driver.id}>
                        <TableCell>{driver.name}</TableCell>
                        <TableCell>{driver.score.toFixed(2)}</TableCell>
                        <TableCell>
                            <Button asChild>
                                <Link href={`/dashboard/driver-score/${driver.id}`}>View More</Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

