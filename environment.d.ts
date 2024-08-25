declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      JWT_PRIVATE_KEY: string
      JWT_PUBLIC_KEY: string
      CLOUDINARY_URL: string
      CLOUDINARY_CLOUD_NAME: string
      CLOUDINARY_API_KEY: string
      CLOUDINARY_API_SECRET: string
      PORT: number | 3333
    }
  }
}
