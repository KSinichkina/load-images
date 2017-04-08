import { Routes } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';

export const rootRouterConfig: Routes = [
  { path: 'preview/:id', component: PreviewComponent }
];

