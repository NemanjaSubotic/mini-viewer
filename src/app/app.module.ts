import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DicomViewerModule } from './dicom-viewer/dicom-viewer.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DicomViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
