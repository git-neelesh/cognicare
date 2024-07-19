import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { MapService } from 'src/app/templates/services/map.service';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { ChartData, ChartOptions, ChartType, Color } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit, AfterViewInit {
  patient: any;
  colors = ['#7676ab', '#059ab4', '#f03d81', '#064167', '#7b8b49', '#0aade4', '#008d99', '#925fb1', '#445269']
  backgroundColor = '#7676ab';
  @ViewChild('map', { static: true }) mapElementRef!: ElementRef;
  map: any;
  source = { lat: 18.5285, lng: 73.8744 };
  destination = { lat: 18.5132, lng: 73.9242 };
  directionsService: any;
  directionsDisplay: any;
  sourceMarker: any;
  destination_marker: any;
  private dataUrl = 'assets/data.json';
  data: any;
  weakestGame= '';
  reasoning = '';

  public chartType: ChartType = 'bar';
  public barChartData: any[] = [];
  public chartLabels: string[] = [];
  public barChartColors: Color[] = [];

  public options = {
    responsive: true,
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }]
    }
  };
  gameToBrainMap = {
    'Game 1': 'Frontal Lobe',
    'Game 2': 'Parietal Lobe',
    'Game 3': 'Temporal Lobe',
  };


  constructor(
    private route: Router,
    private mapService: MapService,
    private renderer: Renderer2,
    private http: HttpClient,
    public location: Location
  ) {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.patient = navigation.extras.state['patient'];
    }
  }

  ngOnInit() {
    
  this.getData().subscribe(data => {
    this.data = data[Math.floor(Math.random() * 10) + 1];
    this.chartLabels = this.data.game_details.map(game => game.name);
    const successData = this.data.game_details.map(game => game.score.success);
    const failureData = this.data.game_details.map(game => game.score.failure);
    this.barChartData = [
      { data: successData, label: 'Success', backgroundColor: '#008D99' },
      { data: failureData, label: 'Failure', backgroundColor: '#F03D81' },
    ];
    this.chartType = 'bar';
    this.analyzeGameDetails(this.data.game_details);
  });

  }

  analyzeGameDetails(gameDetails: any[]) {
    let weakestGameName = '';
    let lowestRate = 1;

    gameDetails.forEach(game => {
        const success = game.score.success;
        const failure = game.score.failure;
        const rate = success / (success + failure);

        if (rate < lowestRate) {
            lowestRate = rate;
            weakestGameName = game.name;
        }
    });

    let reasoning = '';
    switch (weakestGameName) {
        case 'Game 1':
            reasoning = 'Weak in Game 1. This suggests a potential weakness in the frontal lobe.';
            break;
        case 'Game 2':
            reasoning = 'Weak in Game 2. This suggests a potential weakness in the temporal lobe.';
            break;
        case 'Game 3':
            reasoning = 'Weak in Game 3. This suggests a potential weakness in the parietal lobe.';
            break;
        default:
            reasoning = 'Weakness identified, further analysis needed.';
            break;
    }

    this.weakestGame = weakestGameName;
    this.reasoning = reasoning;
}

  openPatientTracker(patient: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        patient: patient
      }
    };
    this.route.navigate([`/track-user`, patient.firstName], navigationExtras);
  }


  getData(): any {
    return this.http.get(this.dataUrl);
  }

  ngAfterViewInit(): void {
  }

  backToDashboard(){
    this.route.navigate(['/dashboard']);
  }
}
