import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private apiUrl = 'https://api.cognitive.microsofttranslator.com/translate';

  constructor(private http: HttpClient) { }

  convertLangOld(): Observable<any> {
    return this.http.post(this.apiUrl, {
      headers: {
        "Ocp-Apim-Subscription-Key": "9962acc6c8c14d65b7325fde271cb442",
        "Ocp-Apim-Subscription-Region": "centralindia",
        "Content-type": "application/json",
        "X-ClientTraceId": `call_${Math.random()}`
      },
      params: new HttpParams({ fromObject: { 'api-version': '3.0', from: 'en', to: 'ga' } }),
      body: [{
        "text": "I would really like to drive your car around the block a few times!"
      }]
    })
  }
  convertLang(translateDta: any, to: string, outPut: any) {
    // WARNING: For POST requests, body is set to null by browsers.
    var data = JSON.stringify(translateDta);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        outPut = this.responseText
      }
    });

    xhr.open("POST", `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=${to}`);
    xhr.setRequestHeader("Ocp-Apim-Subscription-Key", "9962acc6c8c14d65b7325fde271cb442");
    xhr.setRequestHeader("Ocp-Apim-Subscription-Region", "centralindia");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-ClientTraceId", `call_${Math.random()}`);

    xhr.send(data);
  }
 makeRequest =  (translateDta: any, to: string, outPut: any) => {
  return new Promise(function (resolve, reject) {
    var data = JSON.stringify(translateDta);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=${to}`);
    xhr.setRequestHeader("Ocp-Apim-Subscription-Key", "9962acc6c8c14d65b7325fde271cb442");
    xhr.setRequestHeader("Ocp-Apim-Subscription-Region", "centralindia");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-ClientTraceId", `call_${Math.random()}`);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };
    xhr.send(data);
  });
}

}
