import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface ColorMarker {
  color   : string,
  marker ?: mapboxgl.Marker
  center ?: [number, number]
}


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

  markers: ColorMarker[] = [];
  
  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      center: this.center,
      zoom: this.zoomLevel,
      style: 'mapbox://styles/mapbox/streets-v11'
    });

    this.readLocalStorage()
  }

  addMarker(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color,
    })
      .setLngLat( this.center )
      .addTo( this.map )

    this.markers.push({
      color,
      marker: newMarker
    })

    newMarker.on('dragend', () => {
      this.saveLocalStorage()
    })

    this.saveLocalStorage();
  }

  flyTo( marker: mapboxgl.Marker | undefined ) {
    if( !marker ) return;

    const { lng, lat } = marker.getLngLat()

    this.map.flyTo({
      center: [lng, lat],
      zoom: 15,
      duration: 1200
    })
  }
  
  saveLocalStorage(){
    const lgnLatArr: ColorMarker[] = []

    this.markers.forEach( elemt => {
      const { lng, lat } = elemt.marker!.getLngLat()
      lgnLatArr.push({
        color: elemt.color,
        center: [lng, lat]
      })
    })

    localStorage.setItem('markers', JSON.stringify(lgnLatArr));
  }

  readLocalStorage(){

    if( !localStorage.getItem('markers') ) return;

    const lngLatArr: ColorMarker[] = JSON.parse( localStorage.getItem('markers')! );

    lngLatArr.forEach( elem => {
      const newMarker = new mapboxgl.Marker({
        draggable: true,
        color: elem.color,
      })
        .setLngLat( elem.center! )
        .addTo( this.map )
  
      this.markers.push({
        color: elem.color,
        marker: newMarker
      })

      newMarker.on('dragend', () => {
        this.saveLocalStorage()
      })

    })

  }

  deleteMarker( position: number ){
    this.markers[position].marker?.remove();
    this.markers.splice(position, 1);
    this.saveLocalStorage();
  }

}
