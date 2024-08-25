import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { UploadImagesController } from './controllers/upload-images.controller'
import { FetchRecentImagesController } from './controllers/fetch-recent-images.controller'
import { CloudinaryModule } from './cloudinary/cloudinary.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    UploadImagesController,
    FetchRecentImagesController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
