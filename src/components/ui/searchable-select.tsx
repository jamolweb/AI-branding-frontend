"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "cmdk"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface SearchableSelectProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  emptyMessage?: string
  className?: string
  searchPlaceholder?: string
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  emptyMessage = "No results found.",
  className,
  searchPlaceholder = "Search..."
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-[#1a1a1a] border-gray-800 text-white h-10 px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)] hover:bg-gray-800/30 transition-colors",
            className
          )}
        >
          <span className="truncate">
            {value
              ? options.find((option) => option === value) || placeholder
              : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 bg-[#1a1a1a] border border-gray-700 shadow-lg rounded-md overflow-hidden"
        align="start"
        sideOffset={5}
      >
        <Command className="bg-[#1a1a1a]">
          <div className="flex items-center border-b border-gray-700 px-3 py-2 sticky top-0 bg-[#1a1a1a] z-10">
            <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
            <CommandInput
              placeholder={searchPlaceholder}
              className="h-8 text-white bg-transparent border-0 outline-none focus:ring-0 focus:border-0 text-sm placeholder:text-gray-400 w-full"
            />
          </div>
          <CommandEmpty className="py-6 text-center text-sm text-gray-400">
            {emptyMessage}
          </CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto py-1">
            {options.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={() => {
                  onChange(option)
                  setOpen(false)
                }}
                className="text-white hover:bg-gray-800 px-3 py-2 text-sm cursor-pointer aria-selected:bg-gray-800 flex items-center"
              >
                <div className="flex items-center w-full">
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 flex-shrink-0",
                      value === option ? "text-[rgb(239,252,118)]" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{option}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
