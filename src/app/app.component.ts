import { Component } from '@angular/core';

export interface NavItem {
  name: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Modern Demo App';
  
  isMenuOpen = false;
  
  navItems: NavItem[] = [
    { name: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { name: 'Analytics', route: '/analytics', icon: 'analytics' },
    { name: 'Projects', route: '/projects', icon: 'work' },
    { name: 'Team', route: '/team', icon: 'people' },
    { name: 'Settings', route: '/settings', icon: 'settings' }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
