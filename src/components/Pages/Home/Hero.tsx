import Image from "next/image";
import { useState } from "react";
import happyFamily from "../../../assets/happy-family-living-room.jpg";
import { CalendarIcon, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Hero = () => {
  const [date, setDate] = useState<Date>();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-20 md:pb-0">
      {/* Background with Family Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={happyFamily}
          alt="Happy family in their rental home"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-[#0A400C]/85 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          {/* Brand Name */}
          <div className="mb-2 sm:mb-4 md:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F8F5E4] drop-shadow-2xl">
              Livana
            </h2>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight sm:leading-snug md:leading-tight text-[#F8F5E4] drop-shadow-2xl px-2">
            Find Your Perfect Rental — Or List One with{" "}
            <span className="text-[#D1C9A3] drop-shadow-2xl">Ease</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-[#F8F5E4]/90 max-w-3xl mx-auto leading-relaxed drop-shadow-xl px-2 sm:px-4">
            Whether you&apos;re looking for your next home or want to rent out
            your property, we&apos;ve got you covered. Browse verified listings
            or post yours in just a few clicks.
          </p>

          {/* Search Form */}
          <div className="pt-8">
            <div className="bg-[#FEFAE0]/95 backdrop-blur-md rounded-2xl p-6 max-w-4xl mx-auto shadow-2xl border border-[#B1AB86]/30">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Location Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0A400C] block">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="City, neighborhood..."
                      className="pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20 text-[#0A400C] placeholder:text-[#819067]/60"
                    />
                  </div>
                </div>

                {/* Date Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0A400C] block">
                    Move-in Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white border-[#B1AB86]/30 hover:bg-[#B1AB86]/5 text-[#0A400C]"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#819067]" />
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span className="text-[#819067]/60">Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white border-[#B1AB86]/30"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="text-[#0A400C]"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Bedrooms Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0A400C] block">
                    Bedrooms
                  </label>
                  <Select>
                    <SelectTrigger className="bg-white w-full border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20 text-[#0A400C]">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#B1AB86]/30">
                      <SelectItem
                        value="any"
                        className="text-[#0A400C] hover:bg-[#B1AB86]/10"
                      >
                        Any
                      </SelectItem>
                      <SelectItem
                        value="studio"
                        className="text-[#0A400C] hover:bg-[#B1AB86]/10"
                      >
                        Studio
                      </SelectItem>
                      <SelectItem
                        value="1"
                        className="text-[#0A400C] hover:bg-[#B1AB86]/10"
                      >
                        1 Bedroom
                      </SelectItem>
                      <SelectItem
                        value="2"
                        className="text-[#0A400C] hover:bg-[#B1AB86]/10"
                      >
                        2 Bedrooms
                      </SelectItem>
                      <SelectItem
                        value="3"
                        className="text-[#0A400C] hover:bg-[#B1AB86]/10"
                      >
                        3 Bedrooms
                      </SelectItem>
                      <SelectItem
                        value="4"
                        className="text-[#0A400C] hover:bg-[#B1AB86]/10"
                      >
                        4+ Bedrooms
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-transparent block">
                    Search
                  </label>
                  <Button
                    size="lg"
                    className="w-full bg-[#819067] hover:bg-[#0A400C] text-[#FEFAE0] font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search Rentals
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Improved Supporting Text - Mobile Responsive */}
          <div className="pt-4 sm:pt-6 md:pt-8 px-2">
            <div className="bg-[#0A400C]/40 backdrop-blur-md rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 max-w-4xl mx-auto border border-[#D1C9A3]/50 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-center">
                <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#6B8E4E] to-[#0A400C] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg sm:text-xl md:text-2xl">🚫</span>
                  </div>
                  <div>
                    <h4 className="text-[#F8F5E4] font-semibold text-sm sm:text-base md:text-lg drop-shadow-sm">
                      No middlemen
                    </h4>
                    <p className="text-[#D1C9A3] text-xs sm:text-sm mt-1">
                      Direct connection with owners
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#D1C9A3] to-[#6B8E4E] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg sm:text-xl md:text-2xl">✨</span>
                  </div>
                  <div>
                    <h4 className="text-[#F8F5E4] font-semibold text-sm sm:text-base md:text-lg drop-shadow-sm">
                      No hassle
                    </h4>
                    <p className="text-[#D1C9A3] text-xs sm:text-sm mt-1">
                      Streamlined rental process
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#0A400C] to-[#6B8E4E] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg sm:text-xl md:text-2xl">🏠</span>
                  </div>
                  <div>
                    <h4 className="text-[#F8F5E4] font-semibold text-sm sm:text-base md:text-lg drop-shadow-sm">
                      Smart renting
                    </h4>
                    <p className="text-[#D1C9A3] text-xs sm:text-sm mt-1">
                      Intelligent home matching
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Hidden on mobile */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#6B8E4E]/20 rounded-full blur-3xl hidden sm:block"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-[#D1C9A3]/25 rounded-full blur-2xl hidden sm:block"></div>
      <div className="absolute bottom-32 left-20 w-40 h-40 bg-[#0A400C]/15 rounded-full blur-3xl hidden sm:block"></div>
      <div className="absolute bottom-20 right-10 w-28 h-28 bg-[#6B8E4E]/20 rounded-full blur-2xl hidden sm:block"></div>
    </section>
  );
};

export default Hero;
