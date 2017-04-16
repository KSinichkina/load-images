import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { ListService } from './service/items-list.service.ts';
import { ItemsCommunictionService } from './service/item.communication.service';

import { PreviewComponent } from './preview/preview.component';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemsListComponent } from './items-list/items-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent,
    NewItemComponent,
    ItemsListComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    ListService,
    ItemsCommunictionService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
