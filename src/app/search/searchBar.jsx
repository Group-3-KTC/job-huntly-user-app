"use client";

import React, { useState, useMemo } from "react";
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
import { useJobSearchStore } from "@/store/jobSearchStore";
import { useGetCitiesQuery } from "@/services/locationService";

export default function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [openProvince, setOpenProvince] = useState(false);
    const [searchProvinceTerm, setSearchProvinceTerm] = useState("");

    const setSearchTerm = useJobSearchStore((state) => state.setSearchTerm);

    const { data: provinces = [] } = useGetCitiesQuery();

    const filteredProvinces = useMemo(() => {
        const topProvinces = [
            "Thành phố Hồ Chí Minh",
            "Thành phố Hà Nội",
            "Thành phố Hải Phòng",
            "Thành phố Đà Nẵng",
            "Thành phố Huế",
            "Thành phố Cần Thơ",
        ];

        if (!searchProvinceTerm) {
            return provinces.filter((name) => topProvinces.includes(name));
        }

        const term = searchProvinceTerm.toLowerCase();
        return provinces.filter((name) => name.toLowerCase().includes(term));
    }, [searchProvinceTerm, provinces]);

    const handleSearch = () => {
        setSearchTerm({
            keyword,
            province: selectedProvince,
        });
    };

    const handleReset = () => {
        setKeyword("");
        setSelectedProvince("");
        setSearchTerm({ keyword: "", province: "" });
    };

    return (
        <div className="flex justify-center mb-2">
            <div className="bg-white rounded-full shadow-md w-full min-h-[56px] flex items-center px-4 gap-2">
                <Input
                    type="text"
                    placeholder="Title ..."
                    className="flex-1 px-4 py-2 text-sm text-gray-800 border-0 focus:outline-none"
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
                            {selectedProvince || "City"}
                            <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[220px] p-0">
                        <Command>
                            <CommandInput
                                placeholder="Search for more ..."
                                className="h-9"
                                onValueChange={setSearchProvinceTerm}
                                value={searchProvinceTerm}
                            />
                            <CommandEmpty>Không tìm thấy tỉnh</CommandEmpty>
                            <CommandGroup>
                                {filteredProvinces.map((name) => (
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
                                                selectedProvince === name
                                                    ? "opacity-100"
                                                    : "opacity-0"
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
                    <Search size={16} className="mr-1" /> Search
                </Button>

                <Button
                    variant="outline"
                    className="px-5 py-2 ml-2 text-sm text-red-700 border border-red-500 rounded-full"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}
