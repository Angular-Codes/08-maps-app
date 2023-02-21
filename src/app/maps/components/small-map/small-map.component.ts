import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-small-map',
  templateUrl: './small-map.component.html',
  styleUrls: ['./small-map.component.css']
})
export class SmallMapComponent implements AfterViewInit {
  
  @Input() lngLat: [number, number] = [0,0];
  @ViewChild('map') divMap!: ElementRef;
  
  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      center: this.lngLat,
      zoom: 14,
      style: 'mapbox://styles/mapbox/streets-v11',
      interactive: false,
    });

    new mapboxgl.Marker()
      .setLngLat(this.lngLat)    
      .addTo(map);
        
  }
}
