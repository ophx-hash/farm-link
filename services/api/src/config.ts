export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
  district: process.env.DISTRICT || 'Lucknow',
  state: process.env.STATE || 'Uttar Pradesh',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:Farmlink$098@db.zhcvjogaqneabbovjhsq.supabase.co:5432/postgres',
  supabase: {
    url: process.env.SUPABASE_URL || 'https://zhcvjogaqneabbovjhsq.supabase.co',
    anonKey: process.env.SUPABASE_ANON_KEY || 'sb_publishable_orI6xRh5G0_ClB_xvSwPtw_bzcwIKjg',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || '',
  },
  jwtSecret: process.env.JWT_SECRET || 'farm-link-demo-secret',
};
