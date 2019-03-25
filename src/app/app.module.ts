import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { DataGridComponent } from './data-grid/data-grid.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [ AppComponent, DataGridComponent ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
