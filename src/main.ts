import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { OptionsTokens, OWL_DATE_TIME_LOCALE } from '../projects/picker/src/public_api';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
        provideAnimations(),
        {
            provide: OWL_DATE_TIME_LOCALE,
            useValue: 'en-GB'
        },
        {
            provide: OptionsTokens.multiYear,
            useFactory: () => ({ yearRows: 5, yearsPerRow: 3 })
        }
    ]
});
