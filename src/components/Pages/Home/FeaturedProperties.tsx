import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bath, Bed, Heart, MapPin, Square } from "lucide-react";
import Image from "next/image";

const properties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "Downtown, Seattle",
    price: "$2,800",
    period: "month",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,200",
    image:
      "https://plus.unsplash.com/premium_photo-1661964014750-963a28aeddea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    type: "Apartment",
  },
  {
    id: 2,
    title: "Cozy Family House",
    location: "Suburbs, Portland",
    price: "$3,200",
    period: "month",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,800",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false,
    type: "House",
  },
  {
    id: 3,
    title: "Luxury Studio Loft",
    location: "Arts District, LA",
    price: "$2,100",
    period: "month",
    bedrooms: 1,
    bathrooms: 1,
    area: "800",
    image:
      "https://plus.unsplash.com/premium_photo-1684508638760-72ad80c0055f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    type: "Studio",
  },
  {
    id: 4,
    title: "Spacious Townhouse",
    location: "Riverside, Austin",
    price: "$2,950",
    period: "month",
    bedrooms: 3,
    bathrooms: 3,
    area: "2,100",
    image:
      "https://plus.unsplash.com/premium_photo-1680296668995-53278a787ed4?q=80&w=1101&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false,
    type: "Townhouse",
  },
];

const FeaturedProperties = () => {
  return (
    <section className="py-16 bg-[#FEFAE0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A400C] mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-[#819067] max-w-2xl mx-auto">
            Discover handpicked rental properties that offer the perfect blend
            of comfort, location, and value
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="group overflow-hidden border-[#B1AB86]/20 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {property.featured && (
                    <Badge className="bg-[#819067] text-white hover:bg-[#0A400C]">
                      Featured
                    </Badge>
                  )}
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-[#0A400C]"
                  >
                    {property.type}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-[#819067] hover:text-[#0A400C] rounded-full p-2"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-[#0A400C] text-lg mb-1 group-hover:text-[#819067] transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-[#819067] text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-[#0A400C]">
                    {property.price}
                    <span className="text-sm font-normal text-[#819067]">
                      /{property.period}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-[#819067] mb-4">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    {property.bedrooms} bed
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    {property.bathrooms} bath
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {property.area} sqft
                  </div>
                </div>

                <Button className="w-full bg-[#819067] hover:bg-[#0A400C] text-white transition-colors">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-[#819067] text-[#819067] hover:bg-[#819067] hover:text-white px-8 py-3 bg-transparent"
          >
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
