import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private config: any = {};

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    return firstValueFrom(this.http.get('/config.json')).then((cfg) => {
      this.config = cfg;
    });
  }

  get(key: string) {
    return this.config[key];
  }
}
