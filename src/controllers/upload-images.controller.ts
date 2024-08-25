import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayLoad } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

// cloudinary-response.ts
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary'

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  },
}

const uploadImagesBodySchema = z.object({
  url: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(uploadImagesBodySchema)

type UploadImagesBodySchema = z.infer<typeof uploadImagesBodySchema>

@Controller('/images')
@UseGuards(JwtAuthGuard)
export class UploadImagesController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: UploadImagesBodySchema,
    @CurrentUser() user: UserPayLoad,
  ) {
    const { url } = body
    const userId = user.sub

    await this.prisma.image.create({
      data: {
        userId,
        url,
      },
    })
  }
}
