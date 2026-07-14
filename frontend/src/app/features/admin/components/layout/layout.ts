import { Component } from '@angular/core';
import { Sidebar, SidebarItem } from '../../../../shared/components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  sidebarItems: SidebarItem[] = [
    {
      title: 'Products',
      route: '/admin/products',
    },
    {
      title: 'Stores',
      route: '/admin/stores',
    },
    {
      title: 'Inventory',
      route: '/admin/stocks',
    },
  ];
}
