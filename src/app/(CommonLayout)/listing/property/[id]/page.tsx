const SinglePropertyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <h2>This is single property page: {id}</h2>
    </div>
  );
};

export default SinglePropertyPage;
