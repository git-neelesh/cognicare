import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { BottomTabItem, tabItemsList } from '../templates/patient-dashboard/models/tabs';


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
    // Implement your speech-to-text functionality here
    // this.isListening = true;
    // try {
    //   const spokenText = await this.speechRecognitionService.startListening();
    //   this.messages.push({ text: spokenText, from: 'user' });
    //   // Process the spokenText and interact with your chatbot logic here
    // } catch (error) {
    //   console.error('Speech recognition error:', error);
    // }
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
