import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { MapService } from 'src/app/templates/services/map.service';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { ChartData, ChartOptions, ChartType, Color } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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
  });

  }


  getData(): any {
    return this.http.get(this.dataUrl);
  }

  ngAfterViewInit(): void {
    // this.loadMap();
  }

  async getCurrentGeoLocation() {
    try {
      const permissionStatus = await Geolocation.checkPermissions();
      if(permissionStatus?.location !== 'granted') {
        const requestStatus = await Geolocation.requestPermissions();
        if(requestStatus.location !== 'granted') {
          console.log('Not granted');
          return;
        }

        let options: PositionOptions = {
          maximumAge: 8000,
          timeout: 30000,
          enableHighAccuracy: true
        }
        await Geolocation.watchPosition(options, (data)=> {
          const source = { lat: data['coords'].latitude, lng: data['coords'].longitude};
          this.changeMarkerPositionToNew(source);
        });
        
      }
    } catch(exception) {
      console.log("exception")
    }

  }

  async loadMap() {
    try {
      const googleMaps = await this.mapService.loadGoogleMaps();
      this.map = googleMaps;
      const mapElement = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(this.source.lat, this.source.lng);
      this.map = new googleMaps.Map(mapElement, {
        center: location,
        zoom: 12,
      });
      this.setAllMapService(googleMaps);
      const {sourceIconUrl, destinationIconUrl} = this.getTrackerIcons();
      const {sourcePosition, destinationPosition} = this.getSourceAndDestination(googleMaps);
      const sourceIcon = this.createMarkerIcons(sourceIconUrl, googleMaps);
      const destinationIcon = this.createMarkerIcons(destinationIconUrl, googleMaps);
      this.sourceMarker = this.createMarkers(googleMaps, sourcePosition, sourceIcon);
      this.destination_marker = this.createMarkers(googleMaps, destinationPosition, destinationIcon);
      this.setMarkerOnMap();
      await this.drawMapRoute();
      this.map.setCenter(sourcePosition);
      this.renderer.addClass(mapElement, 'visible');
    } catch (e) {
      console.log(e);
    }
  }
  
  setAllMapService(googleMaps) {
    this.directionsService = new googleMaps.DirectionsService;
    this.directionsDisplay = new googleMaps.DirectionsRenderer;
    this.directionsDisplay = new googleMaps.DirectionsRenderer();
  }

  setMarkerOnMap() {
    this.sourceMarker.setMap(this.map);
    this.destination_marker.setMap(this.map);
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({
      polylineOptions: {
        strokeWeight: 4,
        strokeOpacity: 1,
        strokeColor: 'black'
      },
      suppressMarkers: true
    });
  }
  getTrackerIcons() {
    return {
    sourceIconUrl: 'assets/icon/caretaker.png',
    destinationIconUrl: 'assets/icon/subject.png'
    }
  }

  getSourceAndDestination(googleMaps) {
    return {
       sourcePosition: new googleMaps.LatLng(this.source.lat, this.source.lng),
      destinationPosition: new googleMaps.LatLng(this.destination.lat, this.destination.lng)
    }
  }

  createMarkerIcons(url, googleMaps) {
    return {
        url: url,
        scaledSize: new googleMaps.Size(40, 40), // scaled size
        origin: new googleMaps.Point(0, 0), // origin
        anchor: new googleMaps.Point(0, 0) // anchor
    }
  }

  createMarkers(googleMaps, position, icon) {
    return new googleMaps.Marker({
      map: this.map,
      position: position,
      animation: googleMaps.Animation.DROP,
      icon: icon,
    });
  }

  drawMapRoute() {
    this.directionsService.route({
      origin: this.source,
      destination: this.destination,
      travelMode: 'DRIVING',
      provideRouteAlternatives: true
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        //console.log('response: ', response);
        //const directionsData = response.routes[0].legs[0];
       // console.log(directionsData);
      //  const duration = directionsData.duration.text;
       // console.log(duration);
      } else {
       // console.log(status);
      }
    });
  }
  changeMarkerPositionToNew(data) {
    const newPosition = { lat: data?.lat, lng: data?.lng }; // Set the new marker position coordinates
    this.source = {...newPosition};
    console.log(newPosition);
    this.sourceMarker.setPosition(newPosition);
   // this.map.panTo(newPosition); // Pan the map to the new marker position
    this.drawMapRoute();
  }
 
  getGeoLocation() {
    console.log('called!');
    this.socket.on('send-geolocation', (data) => {
      console.log(data);
      //this.renderMap([data['coords'].latitude, data['coords'].longitude ]);
    });
  }

  backToDashboard(){
    this.route.navigate(['/dashboard']);
  }
}
