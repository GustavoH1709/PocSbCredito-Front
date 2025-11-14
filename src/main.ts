import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

// IMPORTA O SERVIÇO
import { AppConfigService } from './app/core/services/app-config.service';

// FUNÇÃO PARA CARREGAR O CONFIG
export function initConfig(configService: AppConfigService) {
  return () => configService.load();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes),

    // Necessário para HttpClient funcionar no APP_INITIALIZER
    importProvidersFrom(HttpClientModule),

    // Register APP_INITIALIZER
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true,
    },

    // Seus outros imports
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatDialogModule,
      MatIconModule,
      MatInputModule,
      MatSelectModule,
      MatFormFieldModule,
      MatTableModule,
      MatCheckboxModule
    ),
  ],
}).catch((err) => console.error(err));
