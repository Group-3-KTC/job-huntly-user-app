"use client";

import React, { useState } from "react";
import SearchBar from "./searchBar";
import FilterBar from "./filterBar";
import CardJob from "./cardJob";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    categories: [],
    levels: [],
    workTypes: [],
    skills: [],
  });

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 lg:px-20">
      <section className="mb-6 max-w-7xl w-full mx-auto">
        <SearchBar onSearch={(value) => setSearchTerm(value)} />
      </section>

      <section className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        <div className="w-full lg:w-1/4">
          <FilterBar onFilterChange={setFilters} />
        </div>

        <div className="w-full lg:w-3/4">
          <CardJob searchTerm={searchTerm} filters={filters} />
        </div>
      </section>
    </main>
  );
}