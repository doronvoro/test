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
import { NavMenuComponent } from './navmenu/navmenu.component';
import { TreeviewModule } from 'ngx-treeview';

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
  InputMaskModule,
  BlockUIModule,
  PanelModule,
  TreeModule,
  TreeNode,

  

  ProgressBarModule

} from 'primeng/primeng';

 

import { TestComponent } from './test/test.component';

const appRoutes: Routes = [
  { path: 'skil', component: SkilComponent },
  { path: 'yaad', component: YaadComponent },
  { path: 'test', component: TestComponent   },
  


];


@NgModule({
  declarations: [
    AppComponent,
    SkilComponent,
    YaadComponent,
    NavMenuComponent,
    TestComponent,
  
     
    // SkilComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    TreeviewModule.forRoot(),

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
    InputMaskModule,
    BlockUIModule,
    PanelModule,
    TreeModule,
    BrowserAnimationsModule,


  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
