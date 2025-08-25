"use client";

import React, { useState, useEffect, useMemo } from "react";
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

const API_BASE = "http://18.142.226.139:8080/api/v1";

async function fetchJSON(url, signal) {
    try {
        const res = await fetch(url, { signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (e) {
        if (
            e.name === "AbortError" ||
            e.message === "signal is aborted without reason"
        ) {
            return null;
        }
        throw e;
    }
}

export default function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [openProvince, setOpenProvince] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [searchProvinceTerm, setSearchProvinceTerm] = useState("");

    const setSearchTerm = useJobSearchStore((state) => state.setSearchTerm);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const data = await fetchJSON(
                    `${API_BASE}/city`,
                    controller.signal
                );
                if (!data) return;

                const names = (Array.isArray(data) ? data : [])
                    .map((c) => (typeof c === "string" ? c : c?.city_name))
                    .filter(Boolean);
                const uniqueSorted = Array.from(new Set(names)).sort((a, b) =>
                    a.localeCompare(b, "vi")
                );
                setProvinces(uniqueSorted);
            } catch (e) {
                console.error("Failed to fetch cities:", e);
            }
        })();
        return () => {
            if (!controller.signal.aborted) controller.abort();
        };
    }, []);

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
        setSearchTerm({
            keyword: "",
            province: "",
        });
    };

    return (
        <div className="p-6 flex justify-center mb-2">
            <div className="bg-white rounded-full shadow-md w-full min-h-[56px] flex items-center px-4 gap-2">
                <Input
                    type="text"
                    placeholder="Title ..."
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
                            {selectedProvince || "City"}
                            <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
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
                    className="ml-2 border border-red-500 text-red-700 px-5 py-2 rounded-full text-sm"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}
