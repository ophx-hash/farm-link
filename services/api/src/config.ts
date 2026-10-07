export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
  district: process.env.DISTRICT || 'Lucknow',
  state: process.env.STATE || 'Uttar Pradesh',
  supabase: {
    url: process.env.SUPABASE_URL || 'https://example-project.supabase.co',
    anonKey: process.env.SUPABASE_ANON_KEY || 'demo-anon-key',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'demo-service-role-key',
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy_key_id',
    keySecret: process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret',
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'demo-cloud-name',
    apiKey: process.env.CLOUDINARY_API_KEY || 'demo-api-key',
    apiSecret: process.env.CLOUDINARY_API_SECRET || 'demo-api-secret',
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || 'demo-farmlink-project',
  },
};
