import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface SidebarItem {
  title: string;
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
  ];
}
