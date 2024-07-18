import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { BottomTabItem, tabItemsList } from '../templates/patient-dashboard/models/tabs';

declare var webkitSpeechRecognition;
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit{
  messages: { text: string, from: string }[] = [];
  userMessage: string = '';
  projectId: string = '<YOUR_DIALOGFLOW_PROJECT_ID>';
  sessionId: string = Math.random().toString(36).slice(2);
  // apiKey = 'AIzaSyBAounSiq8BdKkUZ7LJmmli0zLPyisVZhk';
  // proJectId = '489077677635';
  // dialogflowUrl: string = `https://dialogflow.googleapis.com/v2/projects/${this.apiKey}/agent/sessions/${this.projectId}:detectIntent`;
  isListening = false;
  results: any;

  constructor(private http: HttpClient, private modalController: ModalController) {
    
  }

  ngOnInit(){
    this.messages = [{text: 'vasy', from: 'user'}, {text: 'how are you ', from: 'bot'}]
  }

  sendMessage() {
    if (this.userMessage.trim() === '') return;

    this.messages.push({ text: this.userMessage, from: 'user' });
    this.messages.push({ text: 'Hey I am bot', from: 'bot' });
    this.userMessage = '';
    // const requestBody = {
    //   queryInput: {
    //     text: {
    //       text: this.userMessage,
    //       languageCode: 'en-US',
    //     },
    //   },
    // };
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer <YOUR_DIALOGFLOW_API_TOKEN>',
    //   }),
    // };

    // this.http.post(this.dialogflowUrl, requestBody, httpOptions)
    //   .subscribe((response: any) => {
    //     const botReply = response.queryResult.fulfillmentText;
    //     this.messages.push({ text: botReply, from: 'bot' });
    //     this.userMessage = '';
    //   }, (error) => {
    //     console.error('Error fetching response from Dialogflow:', error);
    //   });
  }

  async startSpeechToText() {
    // Logic to start speech-to-text functionality
    console.log('Starting speech-to-text...');
    this.isListening = true;

    if ('webkitSpeechRecognition' in window) {
      const vSearch = new webkitSpeechRecognition();
      vSearch.continuous = false;
      vSearch.interimresults = false;
      vSearch.lang = 'en-US';
      vSearch.start();
      vSearch.onresult = (e) => {
        console.log(e);
        this.results = e.results[0][0].transcript;
        this.getResult();
        vSearch.stop();
        this.isListening = false
      };
    } else {
      alert('Your browser does not support voice recognition!');
    }

  }


  getResult(){
    console.log(this.results);
    this.userMessage = this.results;
    // this.messages.push({from: 'user', text : this.results});
  }


  close() {
    this.modalController.dismiss({data:tabItemsList[0]});
  }
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
