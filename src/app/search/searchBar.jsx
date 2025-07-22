"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown, Search, Check } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export default function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [openProvince, setOpenProvince] = useState(false);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then((data) => setProvinces(data.map((p) => p.name)))
      .catch(console.error);
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        keyword,
        province: selectedProvince,
      });
    }
  };

  const handleReset = () => {
    setKeyword("");
    setSelectedProvince("");
    if (onSearch) {
      onSearch({
        keyword: "",
        province: "",
      });
    }
  };

  return (
    <div className="p-6 flex justify-center mb-2">
      <div className="bg-white rounded-full shadow-md w-full min-h-[56px] flex items-center px-4 gap-2">
        <Input
          type="text"
          placeholder="Nhập từ khóa..."
          className="flex-1 border-0 px-4 py-2 text-sm text-gray-800 focus:outline-none"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Popover open={openProvince} onOpenChange={setOpenProvince}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-white border-none text-[#0a66c2] text-xs px-2 py-1 rounded-full flex items-center"
              role="combobox"
              aria-expanded={openProvince}
            >
              <MapPin className="mr-1" size={14} />
              {selectedProvince || "Chọn tỉnh"}
              <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-0">
            <Command>
              <CommandInput placeholder="Tìm tỉnh..." className="h-9" />
              <CommandEmpty>Không tìm thấy tỉnh</CommandEmpty>
              <CommandGroup>
                {provinces.map((name) => (
                  <CommandItem
                    key={name}
                    value={name}
                    onSelect={(val) => {
                      setSelectedProvince(val);
                      setOpenProvince(false);
                    }}
                  >
                    {name}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedProvince === name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Button
          className="ml-3 bg-[#0a66c2] hover:bg-[#0056a3] text-white px-5 py-2 rounded-full text-sm"
          onClick={handleSearch}
        >
          <Search size={16} className="mr-1" /> Tìm kiếm
        </Button>

        <Button
          variant="outline"
          className="ml-2 border border-red-500 text-red-700 px-5 py-2 rounded-full text-sm"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
