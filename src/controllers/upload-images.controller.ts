import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayLoad } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { z } from 'zod'

const uploadImagesBodySchema = z.object({
  url: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(uploadImagesBodySchema)

type UploadImagesBodySchema = z.infer<typeof uploadImagesBodySchema>

@Controller('/images')
@UseGuards(JwtAuthGuard)
export class UploadImagesController {
  constructor() {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: UploadImagesBodySchema,
    @CurrentUser() user: UserPayLoad,
  ) {
    const { url } = body

    return 'ok'
  }
}
