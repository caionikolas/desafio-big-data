import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayLoad } from 'src/auth/jwt.strategy'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

export type CloudinaryResponse =
  | UploadApiResponse
  | UploadApiErrorResponse
  | undefined

@Controller('/images')
@UseGuards(JwtAuthGuard)
export class UploadImagesController {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserPayLoad,
  ) {
    const userId = user.sub

    const details: CloudinaryResponse =
      await this.cloudinaryService.uploadFile(file)

    if (!details?.url) {
      throw new BadRequestException('Error when loading file')
    }

    await this.prisma.image.create({
      data: {
        userId,
        url: details?.url,
        uploadAt: details?.created_at,
      },
    })
  }
}
