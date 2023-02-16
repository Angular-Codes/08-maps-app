import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements AfterViewInit {
  
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 13;
  center: [number, number] =  [-76.2995683, 3.9006799 ];
  
  ngAfterViewInit(): void {
    
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      center: this.center,
      zoom: this.zoomLevel,
      style: 'mapbox://styles/mapbox/streets-v11'
    });

  }

  addMarker(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color,
    })
      .setLngLat( this.center )
      .addTo( this.map )

  }

  flyTo() {
    
  }


}
