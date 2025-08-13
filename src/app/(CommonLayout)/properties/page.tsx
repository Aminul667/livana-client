import AllProperties from "@/components/Pages/Listing/AllProperties";

const PropertyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAE0] to-[#B1AB86]/20 mt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0A400C] mb-2">
            Browse Properties
          </h1>
          <p className="text-[#819067]">
            Find your perfect rental or purchase from our curated listings
          </p>
        </div>
        <AllProperties />
      </div>
    </div>
  );
};

export default PropertyPage;
