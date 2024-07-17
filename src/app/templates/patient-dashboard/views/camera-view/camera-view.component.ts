import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-camera-view',
  templateUrl: './camera-view.component.html',
  styleUrls: ['./camera-view.component.scss'],
})
export class CameraViewComponent  implements OnInit {
myImage = null;
  constructor() { }

  ngOnInit() {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    this.myImage = image.webPath;
  }
}
