import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators'
import { DicomImageService } from '../services/dicom-image.service';
import { Image } from '../models/dicom-image';

export interface ViewerState {
    activeImage: string;
    images: Image[]
}

@Injectable()
export class ViewerStore extends ComponentStore<ViewerState>{

    constructor(private readonly imagesService: DicomImageService){
        super({images: [], activeImage: imagesService.imagesNames[0]})
    } 
    
    readonly getImage = this.effect((imgName$: Observable<string>) => {
        return imgName$.pipe(
            map(name => this.imagesService.loadImage(name).pipe(
                tap(img => this.addImage(img)),
                take(1)
            ).subscribe())
        );
    });

    readonly activateImage = this.effect((imgName$: Observable<string>) => {
        return imgName$.pipe(
            tap( (name: string) => this.setActiveImage(name))
        );
    });

    readonly addImage = this.updater((state, image: Image) => ({
        ...state,
        images: [...state.images, image]
    }));

    readonly setActiveImage = this.updater((state, id: string) => ({
        ...state,
        activeImage: id
    }));


    selectImage(imageId: string): Observable<Image>{
        return this.select((state) => state.images.find(img => imageId === img.id));
    }

    selectActiveImage(): Observable<Image> {
        return this.select((state) => state.images.find(img => state.activeImage === img.id))
    }

}