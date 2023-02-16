import { Component } from '@angular/core';


interface MenuItem {
  path: string;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuItems: MenuItem[] = [
    { path: '/maps/full-screen', name: 'Full Screen' },
    { path: '/maps/markers', name: 'Markers' },
    { path: '/maps/properties', name: 'Properties' },
    { path: '/maps/zoom-range', name: 'Zoom Range' }
  ];


}
