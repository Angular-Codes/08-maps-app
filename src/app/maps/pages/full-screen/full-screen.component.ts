import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.css']
})
export class FullScreenComponent implements OnInit {

  ngOnInit(): void {
    
    new mapboxgl.Map({
      container: 'map',
      center: [-76.2995683, 3.9006799 ],
      zoom: 12,
      style: 'mapbox://styles/mapbox/streets-v11'
    });

  }

}
