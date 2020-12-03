import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DicomViewerComponent } from './dicom-viewer.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { ViewerStore } from './viewer-store';

@NgModule({
  declarations: [
    DicomViewerComponent,
    ThumbnailComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DicomViewerComponent
  ],
  providers: [ViewerStore]
})
export class DicomViewerModule { }
