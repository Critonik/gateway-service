import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MenuGatewayService {
  private readonly menuBaseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.menuBaseUrl =
      this.configService.get<string>('MENU_SERVICE_URL') ??
      'http://menu-service:3001'; // docker-name + порт
  }

  async getAllDishes(userId: string): Promise<unknown> {
    const url = `${this.menuBaseUrl}/dishes`;

    const response = await firstValueFrom(
      this.http.get(url, {
        headers: {
          'x-user-id': userId, // прокидываем дальше, если понадобится
        },
      }),
    );

    return response.data;
  }
}
