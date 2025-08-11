"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import useDebounce from "@/hooks/debounce.hook";
import { useGetAllListing } from "@/hooks/listing.hooks";
import { useListingFilters } from "@/hooks/listingFilters.hook";
import { Grid3X3, List, Search, SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type ViewMode = "grid" | "list";

const PRICE = { MIN: 0, MAX: 1_000_000, STEP: 50 } as const;

const AllProperties = () => {
  const { params, setParam, setRange, resetAll } = useListingFilters();
  const { data, isFetching, error } = useGetAllListing(params);

  // UI-only state
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // ---- Search (debounced to URL)
  const [searchInput, setSearchInput] = useState(params.searchTerm ?? "");
  const debouncedSearch = useDebounce(searchInput, 400);

  useEffect(() => {
    setSearchInput(params.searchTerm ?? "");
  }, [params.searchTerm]);

  useEffect(() => {
    const val = debouncedSearch.trim();
    setParam("searchTerm", val ? val : undefined);
  }, [debouncedSearch, setParam]);

  // ---- Price range (debounced to URL)
  const urlRange = useMemo<[number, number]>(
    () => [
      params.minMonthlyRent ?? PRICE.MIN,
      params.maxMonthlyRent ?? PRICE.MAX,
    ],
    [params.minMonthlyRent, params.maxMonthlyRent]
  );

  const [rangeDraft, setRangeDraft] = useState<[number, number]>(urlRange);
  useEffect(() => setRangeDraft(urlRange), [urlRange]);

  // Debounce the draft range before writing to URL
  const debouncedRange = useDebounce(rangeDraft, 350);

  useEffect(() => {
    const [dMin, dMax] = debouncedRange;
    const [uMin, uMax] = urlRange;
    if (dMin !== uMin || dMax !== uMax) {
      setRange("minMonthlyRent", "maxMonthlyRent", [dMin, dMax]);
    }
  }, [debouncedRange, urlRange, setRange]);

  const handleRangeChange = useCallback((value: number[]) => {
    setRangeDraft(value as [number, number]); // only local UI change; URL updates via debounce
  }, []);

  // ---- Property type
  const propertyType = params.propertyType ?? "";
  const handlePropertyTypeChange = useCallback(
    (val: string) => setParam("propertyType", val || undefined),
    [setParam]
  );

  console.log("data", data);

  return (
    <>
      {/* Search and Controls */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-5 h-5" />
          <Input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20 h-12"
          />
        </div>

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white bg-transparent"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {/* {Object.values(filters).some((v) => (Array.isArray(v) ? v.length > 0 : v !== "" && v !== 0)) && (
                  <Badge className="ml-2 bg-[#0A400C] text-white text-xs">
                    {filters.features.length +
                      (filters.search ? 1 : 0) +
                      (filters.listingType ? 1 : 0) +
                      (filters.propertyType ? 1 : 0) +
                      (filters.city ? 1 : 0) +
                      (filters.bedrooms ? 1 : 0) +
                      (filters.bathrooms ? 1 : 0)}
                  </Badge>
                )} */}
            </Button>

            {/* Quick Filters */}
            <div className="hidden md:flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-32 bg-white border-[#B1AB86]/30">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#B1AB86]/30">
                  <SelectItem value="rent">For Rent</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-40 bg-white border-[#B1AB86]/30">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#B1AB86]/30">
                  {["A", "B", "C"].map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-[#819067]">
              {/* {filteredProperties.length} properties
                {totalPages > 1 && (
                  <span className="ml-2">
                    (Page {currentPage} of {totalPages})
                  </span>
                )} */}
              20
            </span>
            <div className="flex items-center border border-[#B1AB86]/30 rounded-md bg-white">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`${
                  viewMode === "grid"
                    ? "bg-[#819067] text-white"
                    : "text-[#819067]"
                } hover:bg-[#819067] hover:text-white`}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("list")}
                className={`${
                  viewMode === "list"
                    ? "bg-[#819067] text-white"
                    : "text-[#819067]"
                } hover:bg-[#819067] hover:text-white`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card className="mb-6 border-[#B1AB86]/30 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#0A400C]">
                Advanced Filters
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetAll}
                className="text-[#819067] hover:text-[#0A400C]"
              >
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Bedrooms */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0A400C]">
                  Min Bedrooms
                </Label>
                <Select
                //   value={filters.bedrooms}
                //   onValueChange={(value) =>
                //     handleFilterChange("bedrooms", value)
                //   }
                >
                  <SelectTrigger className="bg-white border-[#B1AB86]/30">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#B1AB86]/30">
                    <SelectItem value="0">Studio</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0A400C]">
                  Property Type
                </Label>
                <Select
                  value={propertyType}
                  onValueChange={handlePropertyTypeChange}
                >
                  <SelectTrigger className="bg-white border-[#B1AB86]/30">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#B1AB86]/30">
                    <SelectItem value="flat">Flat</SelectItem>
                    <SelectItem value="APARTMENT">Apartment</SelectItem>
                    <SelectItem value="HOUSE">House</SelectItem>
                    <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
                    <SelectItem value="UNIT">Unit</SelectItem>
                    <SelectItem value="STUDIO">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0A400C]">
                  Price Range: ${rangeDraft[0].toLocaleString()} – $
                  {rangeDraft[1].toLocaleString()}
                </Label>
                <Slider
                  value={rangeDraft}
                  min={PRICE.MIN}
                  max={PRICE.MAX}
                  step={PRICE.STEP}
                  className="w-full"
                  onValueChange={handleRangeChange}
                />
              </div>
            </div>

            {/* Features */}
            <div className="mt-6">
              <Label className="text-sm font-medium text-[#0A400C] mb-3 block">
                Features
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                  { key: "hasParking", label: "Parking" },
                  { key: "hasBalcony", label: "Balcony" },
                ].map((f) => {
                  const checked = params[f.key as keyof typeof params] === true;
                  return (
                    <div key={f.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={f.key}
                        checked={checked}
                        onCheckedChange={(state) =>
                          setParam(f.key, state === true ? true : undefined)
                        }
                      />
                      <Label
                        htmlFor={f.key}
                        className="text-sm text-[#0A400C] cursor-pointer"
                      >
                        {f.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AllProperties;
