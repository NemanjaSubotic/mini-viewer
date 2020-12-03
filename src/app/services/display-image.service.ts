import { Injectable } from '@angular/core';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import Hammer from 'hammerjs';
import { Image } from '../models/dicom-image';

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

cornerstoneTools.init();

const LengthTool = cornerstoneTools.LengthTool;
const ZoomTool = cornerstoneTools.ZoomTool;
const PanTool = cornerstoneTools.PanTool;

export enum Tools{
  Length = "Length",
  Zoom = "Zoom",
  Pan = "Pan"
}

@Injectable({
  providedIn: 'root'
})
export class DisplayImageService {
  
  public enableElement(displayElement: HTMLDivElement): void {
    cornerstone.enable(displayElement);
  }

  public enableAndAddTools(displayElement: HTMLDivElement): void {
    cornerstone.enable(displayElement);
    this.addTools(displayElement);
  }

  public display(displayElement: HTMLDivElement, img: Image, withReset: boolean = false): void {
    cornerstone.displayImage(displayElement, img.data);
    if(withReset)
      cornerstone.reset(displayElement);
  }

  public activateTool(element: HTMLDivElement, tool: Tools): void {
    cornerstoneTools.setToolActiveForElement(
      element,
      tool,
      { mouseButtonMask: 1 }
    );
  }

  private addTools(element: HTMLDivElement): void {
    cornerstoneTools.addToolForElement(element, LengthTool);
    cornerstoneTools.addToolForElement(element, ZoomTool);
    cornerstoneTools.addToolForElement(element, PanTool);
  }
}
