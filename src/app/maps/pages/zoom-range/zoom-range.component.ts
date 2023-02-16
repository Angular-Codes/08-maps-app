import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] =  [-76.2995683, 3.9006799 ];

  ngOnDestroy(): void {
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  }
  
  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      center: this.center,
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

    this.map.on('move', ( event ) => {
      const center = event.target.getCenter();
      const { lng, lat } = center;
      this.center = [lng, lat];
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
