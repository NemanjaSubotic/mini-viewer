import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Image } from '../models/dicom-image';
import { DicomImageService } from '../services/dicom-image.service';
import { DisplayImageService, Tools } from '../services/display-image.service';
import { ViewerStore } from './viewer-store';

@Component({
  selector: 'app-dicom-viewer',
  templateUrl: './dicom-viewer.component.html',
  styleUrls: ['./dicom-viewer.component.scss']
})
export class DicomViewerComponent implements AfterViewInit, OnDestroy {

  @ViewChild("mainDisplay") mainDisplay: ElementRef;
  
  readonly imagesNames: string[];
  readonly tools: string[] = Object.values(Tools);
  activeImage$ : Observable<Image>;
  private activeImageSubscription: Subscription;


  constructor(
    private readonly imagesService: DicomImageService,
    private readonly displayService: DisplayImageService,
    private readonly viewerStore: ViewerStore,
    ) {
      this.imagesNames = this.imagesService.imagesNames;
      this.activeImage$ = this.viewerStore.selectActiveImage();
  }

  ngAfterViewInit(): void {
    this.displayService.enableAndAddTools(this.mainDisplay.nativeElement);

    this.activeImageSubscription = this.activeImage$.pipe(
      filter(img => !!img),
      tap(img => {
        this.displayService.display(this.mainDisplay.nativeElement, img, true);
      })  
    ).subscribe();
  }

  onToolChanged(event: InputEvent){
    const elem = <HTMLInputElement>event.target;
    const tool = <Tools> elem.value;
    this.displayService.activateTool(this.mainDisplay.nativeElement, tool);
  }

  ngOnDestroy(): void {
    this.activeImageSubscription.unsubscribe();
  }
}
