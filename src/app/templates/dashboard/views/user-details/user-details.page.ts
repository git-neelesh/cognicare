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
import { ChartData, ChartOptions } from 'chart.js';

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

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels= [];
  public barChartType: string = 'bar';
  public barChartLegend = true;
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Data' }
    ]
  };

  constructor(
    private route: Router,
    private socket: Socket,
    private mapService: MapService,
    private renderer: Renderer2,
    private http: HttpClient
  ) {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.patient = navigation.extras.state['patient'];
    }
  }

  ngOnInit() {
  //  this.socket.connect();
   // this.getGeoLocation();
  //  this.getCurrentGeoLocation();

  this.getData().subscribe(data => {
    console.log(data);
    //this.barChartLabels = data.map(item => item.name);
    //this.barChartData.datasets[0].data = data.map(item => item.value);
  });
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
