import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SkilComponent } from './skil/skil.component';
import { YaadComponent } from './yaad/yaad.component';


import {
  DataTableModule,
  SharedModule,
  ButtonModule,
  DialogModule,
  CalendarModule,
  CheckboxModule,
  TreeTableModule,
  InputTextModule,
  DropdownModule,
  MenubarModule,
  SpinnerModule,
  GrowlModule,
  ConfirmDialogModule,
  ConfirmationService,


  ProgressBarModule

} from 'primeng/primeng';

const appRoutes: Routes = [
  { path: 'skil', component: SkilComponent },
  { path: 'yaad', component: YaadComponent },


];


@NgModule({
  declarations: [
    AppComponent,
    SkilComponent,
    YaadComponent,
    // SkilComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //  routes,
    HttpModule,
    //PrimeNG
    DataTableModule,
    SharedModule,
    ButtonModule,
    DialogModule,
    CalendarModule,
    CheckboxModule,
    TreeTableModule,
    InputTextModule,
    DropdownModule,
    MenubarModule,
    SpinnerModule,
    ProgressBarModule,
    GrowlModule,
    ConfirmDialogModule,

    BrowserAnimationsModule,


  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
