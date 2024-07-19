import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Injectable } from '@angular/core';
import { AzureKeyCredential } from '@azure/core-auth';
import createFaceClient, {
  getLongRunningPoller,
  isUnexpected,
} from '@azure-rest/ai-vision-face';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { tabItemsList } from '../../models/tabs';

@Component({
  selector: 'app-camera-view',
  templateUrl: './camera-view.component.html',
  styleUrls: ['./camera-view.component.scss'],
})
export class CameraViewComponent implements OnInit {
  myImage = null;
  isPictureTaken = false;
  imageUrl: string;
  backgroundColor = '#7676ab';
  filePath: string;
  name: string = '';
  selectedTab = tabItemsList[3];
  ngOnInit() {
   }

  async takePicture() {
  const image: Photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    this.imageUrl = image.webPath;
    const savedImageFile = await this.savePicture(image);

    this.filePath = savedImageFile;
    this.myImage = image.webPath;
    console.log('Image File Path:', this.filePath);
    // this.identifyPerson(this.myImage);
    this.faceID(savedImageFile)
    this.isPictureTaken = true;

  }
 async savePicture(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const base64Data = await this.convertBlobToBase64(blob) as string;

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    return savedFile.uri;
  }

  convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
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
      body: myImage // readFileSync('faceID.jpeg'),
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
  faceID(imgPath:string) {
    // <environment>
    let subscriptionKey = '62f4c4b15f654617ab2e73a4a94631b3';
    let endpoint = 'https://memorymakers.cognitiveservices.azure.com' + '/face/v1.0/detect';

    // Optionally, replace with your own image URL (for example a .jpg or .png URL).
    let imageUrl = 'https://avatars.githubusercontent.com/u/16577300?v=4'//'https://avatars.githubusercontent.com/u/12031655?v=4'//'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/faces.jpg';
    // </environment>

    // <main>
    let xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint + '?returnFaceId=true&detectionModel=detection_03&recognitionModel=recognition_04', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey);

    xhr.onreadystatechange =  () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Status text: ' + xhr.status);
          console.log('Status text: ' + xhr.statusText);
          console.log();
          console.log(JSON.parse(xhr.responseText));
          this.personID(JSON.parse(xhr.responseText)?.[0]?.faceId)
        } else {
          console.log('Error: ' + xhr.status);
          console.log(xhr.responseText);
        }
      }
    };
    let data = JSON.stringify({ url: imageUrl });
    console.log(data)
    xhr.send(data);
  }
  personID(id:string) {
    // <environment>
    let subscriptionKey = '62f4c4b15f654617ab2e73a4a94631b3';
    let endpoint = 'https://memorymakers.cognitiveservices.azure.com/face/v1.0/identify';

    // Optionally, replace with your own image URL (for example a .jpg or .png URL).
    let imageUrl = 'https://avatars.githubusercontent.com/u/16577300?v=4'//'https://avatars.githubusercontent.com/u/12031655?v=4'//'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/faces.jpg';
    // </environment>

    // <main>
    let xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey);

    xhr.onreadystatechange =  () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Status text: ' + xhr.status);
          console.log('Status text: ' + xhr.statusText);
          console.log();
          console.log(JSON.parse(xhr.responseText));
          this.getpersonInfo(JSON.parse(xhr.responseText)?.[0].candidates?.[0]?.personId)
        } else {
          console.log('Error: ' + xhr.status);
          console.log(xhr.responseText);
        }
      }
    };

    let data = JSON.stringify({
    "largePersonGroupId": "family1",
    "faceIds": [id],
    "maxNumOfCandidatesReturned": 1,
    "confidenceThreshold": 0.5,
    "recognitionModel": "recognition_04"
});
    console.log(data)
    xhr.send(data);
  }
  getpersonInfo(id:string) {
    // <environment>
    let subscriptionKey = '62f4c4b15f654617ab2e73a4a94631b3';
    let endpoint = `https://memorymakers.cognitiveservices.azure.com/face/v1.0/largepersongroups/family1/persons/${id}`;

    // Optionally, replace with your own image URL (for example a .jpg or .png URL).
    let imageUrl = 'https://avatars.githubusercontent.com/u/16577300?v=4'//'https://avatars.githubusercontent.com/u/12031655?v=4'//'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/faces.jpg';
    // </environment>

    // <main>
    let xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey);

    xhr.onreadystatechange =  () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Status text: ' + xhr.status);
          console.log('Status text: ' + xhr.statusText);
          console.log();
          console.log(JSON.parse(xhr.responseText));
          this.name = JSON.parse(xhr.responseText)?.name
        } else {
          console.log('Error: ' + xhr.status);
          console.log(xhr.responseText);
        }
      }
    };
    xhr.send();
  }

}
