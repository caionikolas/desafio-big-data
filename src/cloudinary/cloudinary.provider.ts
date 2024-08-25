// cloudinary.provider.ts
import { ConfigService } from '@nestjs/config'
import { v2 as cloudinary } from 'cloudinary'

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  import: [ConfigService],
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dvii0k9fa',
      api_key: '363639266691558',
      api_secret: 'h0egcvhwXFVG_y8dZYP6YgbFHGc',
    })
  },
}
