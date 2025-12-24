import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MenuGatewayModule } from './menu-gateway/menu-gateway.module';
import { StoplistGatewayModule } from './stoplist-gateway/stoplist-gateway.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    AuthModule,
    MenuGatewayModule,
    StoplistGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
