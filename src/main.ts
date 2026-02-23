import { bootstrapApplication } from '@angular/platform-browser';
import { OptionsTokens, OWL_DATE_TIME_LOCALE } from '../projects/picker/src/public_api';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
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
