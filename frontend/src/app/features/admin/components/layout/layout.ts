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
      title: 'Dashboard',
      icon: '📊',
      route: '/admin/dashboard',
    },
    {
      title: 'Products',
      icon: '📦',
      route: '/admin/products',
    },
    {
      title: 'Stores',
      icon: '🏬',
      route: '/admin/stores',
    },
    {
      title: 'Inventory',
      icon: '📋',
      route: '/admin/stocks',
    },
    {
      title: 'Transfers',
      icon: '🔄',
      route: '/admin/transfers',
    },
    {
      title: 'Users',
      icon: '👥',
      route: '/admin/users',
    },
    {
      title: 'Settings',
      icon: '⚙️',
      route: '/admin/settings',
    },
  ];
}
