import EditProperty from "@/components/Pages/Listing/EditProperty";
import { getDraftListingById } from "@/Services/ListingServices";

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const data = await getDraftListingById(id);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="mt-16 min-h-screen bg-gradient-to-br from-[#FEFAE0] to-[#B1AB86]/20 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A400C] mb-2">
            Edit Your Property
          </h1>
          <p className="text-[#819067]">
            Edit the details below to update your property on Livana
          </p>
        </div>
        <EditProperty property={data} />
      </div>
    </div>
  );
};

export default EditPage;
