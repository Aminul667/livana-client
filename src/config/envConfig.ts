const envConfig = {
  baseApi: process.env.NEXT_PUBLIC_BASE_API,
  stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  googleMapApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  nextAuthSecretKey: process.env.NEXTAUTH_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

export default envConfig;
