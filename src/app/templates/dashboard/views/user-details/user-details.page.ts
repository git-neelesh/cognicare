import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { defaults as defaultControls, Attribution } from 'ol/control';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit, AfterViewInit {
  patient: any;
  colors = ['#7676ab', '#059ab4', '#f03d81', '#064167', '#7b8b49', '#0aade4', '#008d99', '#925fb1', '#445269']
  backgroundColor = '#7676ab';
  map!: Map;

  constructor(private route: Router, private socket: Socket) {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.patient = navigation.extras.state['patient'];
    }
   }

  ngOnInit() {
    this.setBackgroundColor();
    this.socket.connect();
    this.getGeoLocation();
  }

  ngAfterViewInit(): void {
    this.renderMap([7.999, 4.827]);
  }

  renderMap(cord = []) {
    const coordinates =  cord ; //getRandomCoordinates();
    console.log("abcd", coordinates);
    const transformedCoordinates = fromLonLat(coordinates);
    const marker = new Feature({
      geometry: new Point(transformedCoordinates),
    });
    console.log(marker)
    const vectorSource = new VectorSource({
      features: [marker],
    });

    
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          anchor: [0.5, 1],
        }),
      }),
    });

    new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: transformedCoordinates,
        zoom: 14,
      }),
    });
  }


  setBackgroundColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    this.backgroundColor = this.colors[randomIndex];
  }

  getRandomCoordinates(): [number, number] {
    const longitude = (Math.random() * 360) - 180;
    const latitude = (Math.random() * 180) - 90;
    return [longitude, latitude];
  }


  backToDashboard(){
    this.route.navigate(['/dashboard']);
  }

  getGeoLocation() {
    console.log("called!");
    this.socket.on('send-geolocation', (data) => {
      console.log(data);
      this.renderMap([data['coords'].latitude, data['coords'].longitude ]);
    });

    this.socket.fromEvent('send-geolocation').subscribe(data => {
      
    });
  }
}
