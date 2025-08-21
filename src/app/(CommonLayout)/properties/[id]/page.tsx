import PropertyDetails from "@/components/Pages/Properties/PropertyDetails";
import { getListingById } from "@/Services/ListingServices";

const SinglePropertyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const data = await getListingById(id);

  if(!data){
    return <h2>Loading...</h2>
  }
  
  return (
    <div className="mt-16">
      <PropertyDetails property={data} />
    </div>
  );
};

export default SinglePropertyPage;
