import { Component, OnInit } from '@angular/core';
import { CameraService } from './camera.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  imageSrc: string;

  constructor(private cameraService: CameraService) { }

  ngOnInit() {
  }

  async takePicture() {
    this.imageSrc = await this.cameraService.takePicture();
    //this.processImage(this.imageSrc);
  }
  
}
