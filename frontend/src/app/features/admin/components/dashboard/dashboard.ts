import { Component } from '@angular/core';
import { Sidebar, SidebarItem } from '../../../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
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
      route: '/admin/inventory',
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
