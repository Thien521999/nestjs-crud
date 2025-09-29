import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các field ko dc khai báo decorator trong DTO
      forbidNonWhitelisted: true, // Nếu có field ko dc khai báo decorator trong DTO mà client truyền lên thì sẽ báo lỗi
      transform: true, // Tự động chuyển đỗi dữ liệu sang kiểu được khai báo trong DTO
      transformOptions: {
        enableImplicitConversion: true, // chuyển dữ liệu ngầm định (có nghĩa là khi ta truyền số, nhưng dữ liệu là chuỗi)
      },
      exceptionFactory: (validationErrors) => {
        return new UnprocessableEntityException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints as any).join(', '),
          })),
        )
      },
    }),
  )
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
