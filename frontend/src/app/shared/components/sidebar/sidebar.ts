import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface SidebarItem {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input({ required: true })
  menuItems: SidebarItem[] = [
    // {
    //   title: 'Dashboard',
    //   icon: '📊',
    //   route: '/admin/dashboard',
    // },
    // {
    //   title: 'Products',
    //   icon: '📦',
    //   route: '/admin/products',
    // },
    // {
    //   title: 'Stores',
    //   icon: '🏬',
    //   route: '/admin/stores',
    // },
    // {
    //   title: 'Inventory',
    //   icon: '📋',
    //   route: '/admin/inventory',
    // },
    // {
    //   title: 'Transfers',
    //   icon: '🔄',
    //   route: '/admin/transfers',
    // },
  ];
}
