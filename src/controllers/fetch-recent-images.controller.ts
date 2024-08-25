import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

import { CurrentUser } from 'src/auth/current-user-decorator'
import { UserPayLoad } from 'src/auth/jwt.strategy'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/images')
@UseGuards(JwtAuthGuard)
export class FetchRecentImagesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
    @CurrentUser() user: UserPayLoad,
  ) {
    const userId = user.sub

    const perPage = 5

    const images = await this.prisma.image.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        uploadAt: 'desc',
      },
      where: {
        userId,
      },
    })

    return { images }
  }
}
