import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Brandbook } from '@/types/brandbook';
import { format } from 'date-fns';
import { FileText, MoreVertical, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BrandbookCardProps {
  brandbook: Brandbook;
  onDelete: (id: string) => void;
  onRegenerate: (id: string) => void;
}

// Define the common card style used in the dashboard
const cardStyle = {
  background:
    'radial-gradient(79.58% 79.58% at 50% 20.42%, rgb(32, 32, 32) 0%, rgb(16, 16, 16) 100%)',
  borderRadius: '12px',
  boxShadow:
    'rgba(255, 255, 255, 0.15) 0px 1px 0px 1px inset, rgba(0, 0, 0, 0.29) 0px 2px 4px 0px, rgba(0, 0, 0, 0.26) 0px 8px 8px 0px, rgba(0, 0, 0, 0.15) 0px 17px 10px 0px, rgba(0, 0, 0, 0.04) 0px 31px 12px 0px, rgba(0, 0, 0, 0.01) 0px 48px 13px 0px',
};

export function BrandbookCard({
  brandbook,
  onDelete,
  onRegenerate,
}: BrandbookCardProps) {
  return (
    <Card
      className="w-full max-w-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]"
      style={cardStyle}
    >
      <CardHeader className="relative pt-6 px-4 pb-4">
        <div className="absolute right-2 top-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-gray-800 border-gray-700 text-white"
            >
              <DropdownMenuItem
                onClick={() => onRegenerate(brandbook.id)}
                className="hover:bg-gray-700 cursor-pointer"
              >
                Regenerate
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive hover:bg-destructive/20 hover:bg-gray-700 hover:text-destructive cursor-pointer"
                onClick={() => onDelete(brandbook.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="h-28 w-28 mx-auto relative">
          <Image
            src={brandbook.logoUrl}
            alt={`${brandbook.companyName} logo`}
            fill
            className="object-contain"
          />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <h3 className="text-lg font-semibold text-white text-center mb-1">
          {brandbook.companyName}
        </h3>
        <p className="text-sm text-gray-400 text-center">
          Created {format(new Date(brandbook.createdAt), 'MMM d, yyyy')}
        </p>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <Button
          asChild
          variant="outline"
          className="w-full text-white border-white/20 hover:bg-white/10 hover:text-white"
        >
          <Link href={`/dashboard/brandbook/view/${brandbook.id}`}>
            <FileText className="mr-2 h-4 w-4" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
