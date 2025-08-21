import PropertyDetails from "@/components/Pages/Properties/PropertyDetails";
import { Button } from "@/components/ui/button";
import { getDraftListingById } from "@/Services/ListingServices";
import Link from "next/link";

const PreviewProperty = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data = await getDraftListingById(id);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="mt-16">
      <PropertyDetails property={data} />
      <Link href={`/listing/${id}/pricing`}>
        <Button className="w-full bg-[#819067] hover:bg-[#0A400C] text-white font-semibold py-3 transition-all duration-300 transform cursor-pointer">
          Publish Now
        </Button>
      </Link>
    </div>
  );
};

export default PreviewProperty;
