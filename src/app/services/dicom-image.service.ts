import { Injectable } from '@angular/core';

import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from "dicom-parser";
import { from, Observable } from 'rxjs';
import { Image } from '../models/dicom-image';

cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

const baseUrl = "http://localhost:4200/assets/SingleFrameSingleFile";

@Injectable({
  providedIn: 'root'
})
export class DicomImageService {
  public loadImage(imgName: string) : Observable<Image> {
    return from(new Promise<Image>(resolve => {
      const imageId = `wadouri:${baseUrl}/${imgName}.dcm`;
      cornerstone.loadImage(imageId).then( (img: any) => {
        resolve({id: imgName, data: img});
      });
    }))
  }

  readonly imagesNames : string[] = [
    "S13-Implicit-Monochrome2",
    "U14-JpegLossless.70-Monochrome1",
    "S16-ExplicitLittleEndian-Monochrome2-RescaleIntercept",
    "U15-ExplicitLittleEndian-Monochrome1",
    "S16-ExplicitLittleEndian-Monochrome2",
    "U15-Jpeg2000.91-Monochrome1",
    "S16-Implicit-Monochrome2-RescaleSlope",
    "U16-ExplicitLittleEndian-Monochrome1",
    "S16-Implicit-Monochrome2",
    "U16-Jpeg2000.90-Monochrome2",
    "U10-ExplicitLittleEndian-Monochrome2",
    "U16-JpegLossless.70-Monochrome2",
    "U10-JpegBaseline.51-Monochrome2",
    "U16-RleLossless-PaletteColor",
    "U10-JpegLossless.70-Monochrome1",
    "U8-ExplicitLittleEndian-Monochrome2",
    "U10-JpegLossless.70-Monochrome2",
    "U8-ExplicitLittleEndian-Rgb-NoPixelSpacing",
    "U10-JpegLsLossless-Monochrome1-ISO_IR_192",
    "U8-ExplicitLittleEndian-Rgb-VLPhotographicImageIOD",
    "U12-ExplicitLittleEndian-Monochrome1",
    "U8-ExplicitLittleEndian-Rgb",
    "U12-ExplicitLittleEndian-Monochrome2",
    "U8-Implicit-Rgb-DefaultWindowLevel",
    "U12-Jpeg2000.90-Monochrome2-DicomBitStoredVsJpeg2000BitStored",
    "U8-Implicit-Rgb",
    "U12-JpegBaseline.51-Monochrome2-RescaleSlopeIntercept",
    "U8-Jpeg2000.90-YbrRct",
    "U12-JpegBaseline.51-Monochrome2",
    "U8-Jpeg2000.91-YbrIct",
    "U12-JpegLossless.57-Monochrome2",
    "U8-JpegLossless.70-Monochrome2",
    "U12-JpegLossless.70-Monochrome1",
    "U8-JpegLossless.70-Rgb",
    "U12-JpegLossless.70-Monochrome2",
    "U8-RleLossless-PaletteColor",
    "U12-RleLossless-Monochrome2",
    "U8-RleLossless-YbrFullPlanar",
  ]
}
