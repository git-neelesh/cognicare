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

@Component({
  selector: 'app-track-user',
  templateUrl: './track-user.page.html',
  styleUrls: ['./track-user.page.scss'],
})
export class TrackUserPage implements OnInit {
        
  patient: any;
  @ViewChild('map', { static: true }) mapElementRef!: ElementRef;
  map: any;
  source = { lat: 18.5285, lng: 73.8744 };
  destination = { lat: 18.5132, lng: 73.9242 };
  directionsService: any;
  directionsDisplay: any;
  sourceMarker: any;
  destination_marker: any;

  constructor(
    private route: Router,
    private socket: Socket,
    private mapService: MapService,
    private renderer: Renderer2
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
  }

  ngAfterViewInit(): void {
    this.loadMap();
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

}
