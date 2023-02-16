import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit {
  
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 10;
  
  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      center: [-76.2995683, 3.9006799 ],
      zoom: this.zoomLevel,
      style: 'mapbox://styles/mapbox/streets-v11'
    });

    this.map.on('zoom', () => {
      const currentZoom  = this.map.getZoom();
      this.zoomLevel = currentZoom;
    })

    this.map.on('zoomend', () => {
      if( this.map.getZoom() > 18 ) {
        this.map.zoomTo(18)
      }
    })
  }

  zoomOut() {
    this.map.zoomOut();
    this.zoomLevel = this.map.getZoom();
  }

  zoomInt() {
    this.map.zoomIn();
    this.zoomLevel = this.map.getZoom();
  }

  changeZoom( value: string ){
    this.map.zoomTo( Number(value) )
  }

}
