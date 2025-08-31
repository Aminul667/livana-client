"use client";

import PropertyCard from "@/components/Shared/UI/PropertyCard";
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
import {
  checkboxOptions,
  furnishedConstants,
  months,
  propertyTypeConstants,
  purposeConstants,
  rentFrequencyConstants,
} from "@/constants/listing.constants";
import useDebounce from "@/hooks/debounce.hook";
import { useGetAllListing } from "@/hooks/listing.hooks";
import { useListingFilters } from "@/hooks/listingFilters.hook";
import { TCardProperty } from "@/types/listing.types";
import { Grid3X3, List, Search, SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type ViewMode = "grid" | "list";

const PRICE = { MIN: 0, MAX: 1_000_000, STEP: 50 } as const;
const BEDROOM = { MIN: 0, MAX: 100, STEP: 1 } as const;

const AllProperties = () => {
  const { params, setParam, setRange, resetAll } = useListingFilters();
  const { data: propertyData, isFetching, error } = useGetAllListing(params);

  console.log("Params", params);

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
    setRangeDraft(value as [number, number]);
  }, []);

  // ---- Bedroom range (debounced to URL)
  const urlRangeBedroom = useMemo<[number, number]>(
    () => [
      params.minBedrooms ?? BEDROOM.MIN,
      params.maxBedrooms ?? BEDROOM.MAX,
    ],
    [params.minBedrooms, params.maxBedrooms]
  );

  const [rangeDraftBedroom, setRangeDraftBedroom] =
    useState<[number, number]>(urlRangeBedroom);
  useEffect(() => setRangeDraftBedroom(urlRangeBedroom), [urlRangeBedroom]);

  // Debounce the draft range before writing to URL
  const debouncedRangeBedroom = useDebounce(rangeDraftBedroom, 350);

  useEffect(() => {
    const [dMin, dMax] = debouncedRangeBedroom;
    const [uMin, uMax] = urlRangeBedroom;
    if (dMin !== uMin || dMax !== uMax) {
      setRange("minBedrooms", "maxBedrooms", [dMin, dMax]);
    }
  }, [debouncedRangeBedroom, urlRangeBedroom, setRange]);

  const handleRangeChangeBedroom = useCallback((value: number[]) => {
    setRangeDraftBedroom(value as [number, number]);
  }, []);

  // ---- Property type
  const propertyType = params.propertyType ?? "";
  const handlePropertyTypeChange = useCallback(
    (val: string) => setParam("propertyType", val || undefined),
    [setParam]
  );

  // purpose
  const purpose = params.purpose ?? "";
  const handlePurposeChange = useCallback(
    (val: string) => setParam("purpose", val || undefined),
    [setParam]
  );

  // furnished
  const furnished = params.furnished ?? "";
  const handleFurnishedChange = useCallback(
    (val: string) => setParam("furnished", val || undefined),
    [setParam]
  );

  // rentFrequency
  const rentFrequency = params.rentFrequency ?? "";
  const handleRentFrequencyChange = useCallback(
    (val: string) => setParam("rentFrequency", val || undefined),
    [setParam]
  );

  // rentFrequency
  const availableMonth = params.availableMonth ?? "";
  const handleAvailableMonthChange = useCallback(
    (val: string) => setParam("availableMonth", val || undefined),
    [setParam]
  );

  // sort
  const sortBy = params.sortBy ?? "";
  const handleSortByChange = useCallback(
    (val: string) => {
      setParam("sortBy", val || undefined);
    },
    [setParam]
  );

  const sortOrder = params.sortOrder ?? "";
  const handleSortOrderChange = useCallback(
    (val: string) => {
      setParam("sortOrder", val || undefined);
    },
    [setParam]
  );

  console.log("data", propertyData);

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

            <div className="flex gap-2">
              {/* Quick Filters */}
              <div className="md:flex items-center gap-2">
                <Select value={sortBy} onValueChange={handleSortByChange}>
                  <SelectTrigger className="w-32 bg-white border-[#B1AB86]/30">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#B1AB86]/30">
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Quick Filters */}
              <div className="md:flex items-center gap-2">
                <Select value={sortOrder} onValueChange={handleSortOrderChange}>
                  <SelectTrigger className="w-32 bg-white border-[#B1AB86]/30">
                    <SelectValue placeholder="Sort Order" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#B1AB86]/30">
                    <SelectItem value="asc">Low to High</SelectItem>
                    <SelectItem value="desc">High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-[#819067]">
              {propertyData?.meta?.total} properties
              <span className="ml-2">(page {propertyData?.meta?.page})</span>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Property Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0A400C]">
                  Property Type
                </Label>
                <Select
                  value={propertyType}
                  onValueChange={handlePropertyTypeChange}
                >
                  <SelectTrigger className="bg-white border-[#B1AB86]/30 w-full">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#B1AB86]/30">
                    {propertyTypeConstants.map((item, index) => (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* purpose */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0A400C]">
                  Purpose
                </Label>
                <Select value={purpose} onValueChange={handlePurposeChange}>
                  <SelectTrigger className="bg-white border-[#B1AB86]/30 w-full">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#B1AB86]/30">
                    {purposeConstants.map((item, index) => (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* furnished */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0A400C]">
                  Furnished
                </Label>
                <Select value={furnished} onValueChange={handleFurnishedChange}>
                  <SelectTrigger className="bg-white border-[#B1AB86]/30 w-full">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#B1AB86]/30">
                    {furnishedConstants.map((item, index) => (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* rentFrequency */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0A400C]">
                  Rent Frequency
                </Label>
                <Select
                  value={rentFrequency}
                  onValueChange={handleRentFrequencyChange}
                >
                  <SelectTrigger className="bg-white border-[#B1AB86]/30 w-full">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#B1AB86]/30">
                    {rentFrequencyConstants.map((item, index) => (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
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
              {/* availableMonth */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0A400C]">
                  Month
                </Label>
                <Select
                  value={availableMonth}
                  onValueChange={handleAvailableMonthChange}
                >
                  <SelectTrigger className="bg-white border-[#B1AB86]/30 w-full">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#B1AB86]/30">
                    {months.map((item, index) => (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0A400C]">
                  Bedroom Range: ${rangeDraftBedroom[0].toLocaleString()} – $
                  {rangeDraftBedroom[1].toLocaleString()}
                </Label>
                <Slider
                  value={rangeDraftBedroom}
                  min={BEDROOM.MIN}
                  max={BEDROOM.MAX}
                  step={BEDROOM.STEP}
                  className="w-full"
                  onValueChange={handleRangeChangeBedroom}
                />
              </div>

              {/* boolean */}
              <Label className="text-sm font-medium text-[#0A400C] mb-3 block">
                Features
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {checkboxOptions.map((f) => {
                  const checked =
                    params[f.name as keyof typeof params] === true;
                  return (
                    <div key={f.name} className="flex items-center space-x-2">
                      <Checkbox
                        id={f.name}
                        checked={checked}
                        onCheckedChange={(state) =>
                          setParam(f.name, state === true ? true : undefined)
                        }
                      />
                      <Label
                        htmlFor={f.name}
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

      {propertyData?.data.length === 0 ? (
        <Card className="border-[#B1AB86]/30 bg-white">
          <CardContent className="p-12 text-center">
            <div className="text-[#819067] mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-[#0A400C] mb-2">
                No properties found
              </h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
            <Button
              className="bg-[#819067] hover:bg-[#0A400C] text-white"
              onClick={resetAll}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {propertyData?.data.map((property: TCardProperty) => (
              <PropertyCard
                key={property.id}
                property={property}
                viewMode={viewMode}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default AllProperties;
