import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Injectable } from '@angular/core';
import { readFileSync } from 'fs-extra';
import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    getLongRunningPoller,
    isUnexpected,
} from '@azure-rest/ai-vision-face';

@Component({
  selector: 'app-camera-view',
  templateUrl: './camera-view.component.html',
  styleUrls: ['./camera-view.component.scss'],
})
export class CameraViewComponent  implements OnInit {
  myImage = null;

  ngOnInit() {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    this.myImage = image.webPath;
    this.identifyPerson(this.myImage);
    console.log(this.myImage);
  }

  async identifyPerson(myImage) {

    const endpoint = 'https://memorymakers.cognitiveservices.azure.com';
    const apikey = '62f4c4b15f654617ab2e73a4a94631b3';
    const credential = new AzureKeyCredential(apikey);
    const client = createFaceClient(endpoint, credential);
    const largePersonGroupId = 'family1';

        console.log('Detect faces from the target image.');
    const detectResponse = await client.path('/detect').post({
        contentType: 'application/octet-stream',
        queryParameters: {
            detectionModel: 'detection_03',
            recognitionModel: 'recognition_04',
            returnFaceId: true,
        },
        body: readFileSync('demo.jpeg'),
    });
    if (isUnexpected(detectResponse)) {
        throw new Error(detectResponse.body.error.message);
    }
    const faceIds = detectResponse.body.map(face => face.faceId as string)

    console.log('Identify the faces in the large person group.');
    const identifyResponse = await client.path('/identify').post({
        body: { faceIds, largePersonGroupId },
    });
    if (isUnexpected(identifyResponse)) {
        throw new Error(identifyResponse.body.error.message);
    }
    console.log(identifyResponse.body);
      }
}
