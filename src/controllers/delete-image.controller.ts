import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayLoad } from 'src/auth/jwt.strategy'
import { PrismaService } from 'src/prisma/prisma.service'

import { v2 as cloudinary } from 'cloudinary'

@Controller('/images')
@UseGuards(JwtAuthGuard)
export class DeleteImageController {
  constructor(private prisma: PrismaService) {}

  @Delete(':cloudId')
  async deleteImage(
    @Param('cloudId') cloudId: string,
    @CurrentUser() user: UserPayLoad,
  ) {
    const userId = user.sub

    try {
      await cloudinary.uploader.destroy(cloudId)
    } catch {
      throw new BadRequestException()
    }

    const resources = await cloudinary.search.expression().execute()

    const image = await this.prisma.image.findFirst({
      where: {
        userId,
        cloudId,
      },
    })

    if (!image) {
      throw new NotFoundException()
    }

    await this.prisma.image.delete({
      where: {
        cloudId,
      },
    })

    return resources
  }
}
