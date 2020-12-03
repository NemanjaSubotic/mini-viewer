import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../../models/dicom-image';
import { ViewerStore } from '../viewer-store';
import { filter, take, tap } from 'rxjs/operators';
import { DisplayImageService } from 'src/app/services/display-image.service';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent implements AfterViewInit, OnInit {

  @ViewChild("thumbnail") 
  thumbnail: ElementRef;
  
  image$: Observable<Image>;
  activeId$: Observable<string>;
  id: string;

  constructor(
    private readonly displayService: DisplayImageService,
    private readonly viewerStore: ViewerStore,
    ) { }
  
  ngOnInit(): void {
    this.activeId$ = this.viewerStore.select((state) => state.activeImage);
  }

  @Input()
  set imageName(value: string){
    this.viewerStore.getImage(value);
    this.image$ = this.viewerStore.selectImage(value);
    this.id = value;
  }

  ngAfterViewInit(): void {
    this.displayService.enableElement(this.thumbnail.nativeElement);
    this.image$.pipe(
      filter(img => !!img),
      tap(img => {  
        this.displayService.display(this.thumbnail.nativeElement, img);
      }),
      take(1)
    ).subscribe();
  }

  show(): void {
    this.viewerStore.activateImage(this.id);
  }

}
