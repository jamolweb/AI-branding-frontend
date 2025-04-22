import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Brandbook } from '@/types/brandbook'
import { format } from 'date-fns'
import { FileText, MoreVertical, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface BrandbookCardProps {
	brandbook: Brandbook
	onDelete: (id: string) => void
	onRegenerate: (id: string) => void
}

export function BrandbookCard({
	brandbook,
	onDelete,
	onRegenerate,
}: BrandbookCardProps) {
	return (
		<Card className='w-full max-w-sm'>
			<CardHeader className='relative'>
				<div className='absolute right-4 top-4'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' size='icon'>
								<MoreVertical className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem onClick={() => onRegenerate(brandbook.id)}>
								Regenerate
							</DropdownMenuItem>
							<DropdownMenuItem
								className='text-destructive'
								onClick={() => onDelete(brandbook.id)}
							>
								<Trash2 className='mr-2 h-4 w-4' />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className='h-32 w-32 mx-auto relative'>
					<Image
						src={brandbook.logoUrl}
						alt={`${brandbook.companyName} logo`}
						fill
						className='object-contain'
					/>
				</div>
			</CardHeader>
			<CardContent>
				<h3 className='text-lg font-semibold text-center mb-2'>
					{brandbook.companyName}
				</h3>
				<p className='text-sm text-muted-foreground text-center'>
					Created {format(new Date(brandbook.createdAt), 'MMM d, yyyy')}
				</p>
			</CardContent>
			<CardFooter className='flex justify-between'>
				<Button asChild variant='outline' className='w-full'>
					<Link href={`/dashboard/brandbook/view/${brandbook.id}`}>
						<FileText className='mr-2 h-4 w-4' />
						View Details
					</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
