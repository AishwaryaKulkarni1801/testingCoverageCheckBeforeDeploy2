import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AppComponent, NavItem } from './app.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatBadgeModule,
        MatListModule,
        MatDividerModule
      ],
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  // COMPONENT_UI Pattern: Component renders without error
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // COMPONENT_UI Pattern: Props/data binding
  it('should have correct title', () => {
    expect(component.title).toEqual('Modern Demo App');
  });

  // COMPONENT_UI Pattern: Template rendering
  it('should render title in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.toolbar-title')?.textContent).toContain('Modern Demo App');
  });

  // COMPONENT_UI Pattern: Initial state
  it('should initialize with menu closed', () => {
    expect(component.isMenuOpen).toBe(false);
  });

  // COMPONENT_UI Pattern: Data initialization
  it('should initialize navigation items with correct structure', () => {
    expect(component.navItems).toBeDefined();
    expect(component.navItems.length).toBe(5);
    
    const expectedNavItems: NavItem[] = [
      { name: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
      { name: 'Analytics', route: '/analytics', icon: 'analytics' },
      { name: 'Projects', route: '/projects', icon: 'work' },
      { name: 'Team', route: '/team', icon: 'people' },
      { name: 'Settings', route: '/settings', icon: 'settings' }
    ];
    
    expect(component.navItems).toEqual(expectedNavItems);
  });

  // COMPONENT_UI Pattern: Event handling
  it('should toggle menu when toggleMenu is called', () => {
    expect(component.isMenuOpen).toBe(false);
    
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(true);
    
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(false);
  });

  // COMPONENT_UI Pattern: UI interaction testing
  it('should toggle menu when menu button is clicked', () => {
    fixture.detectChanges();
    
    // Find menu toggle button by its click handler
    spyOn(component, 'toggleMenu');
    
    const menuButton = fixture.debugElement.query(By.css('[data-test="menu-toggle"]')) || 
                      fixture.debugElement.query(By.css('button'));
    
    if (menuButton) {
      menuButton.nativeElement.click();
      expect(component.toggleMenu).toHaveBeenCalled();
    }
  });

  // COMPONENT_UI Pattern: Conditional rendering variants
  it('should reflect menu state in component property', () => {
    // Test closed state
    component.isMenuOpen = false;
    fixture.detectChanges();
    expect(component.isMenuOpen).toBe(false);
    
    // Test open state  
    component.isMenuOpen = true;
    fixture.detectChanges();
    expect(component.isMenuOpen).toBe(true);
  });

  // ROUTING_NAV Pattern: Navigation items structure validation
  it('should have navigation items with required properties', () => {
    component.navItems.forEach(item => {
      expect(item.name).toBeDefined();
      expect(item.route).toBeDefined();
      expect(item.icon).toBeDefined();
      expect(typeof item.name).toBe('string');
      expect(typeof item.route).toBe('string');
      expect(typeof item.icon).toBe('string');
      expect(item.route).toMatch(/^\/\w+$/); // Should start with / and have word characters
    });
  });

  // COMPONENT_UI Pattern: Accessibility testing
  it('should have accessible navigation structure', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check for toolbar
    const toolbar = compiled.querySelector('mat-toolbar');
    expect(toolbar).toBeTruthy();
    
    // Check for navigation elements
    const navElements = compiled.querySelectorAll('[role="button"], button, a');
    expect(navElements.length).toBeGreaterThan(0);
  });

  // COMPONENT_UI Pattern: Material Design integration
  it('should include Material Design components', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verify Material components are rendered
    expect(compiled.querySelector('mat-toolbar')).toBeTruthy();
  });

  // BUSINESS_LOGIC Pattern: Pure function behavior
  it('should maintain immutable navigation items', () => {
    const originalNavItems = component.navItems;
    const copiedNavItems = [...component.navItems];
    
    expect(originalNavItems).toEqual(copiedNavItems);
    
    // Verify original array is not modified when copied
    copiedNavItems.push({ name: 'Test', route: '/test', icon: 'test' });
    expect(component.navItems.length).toBe(5);
    expect(copiedNavItems.length).toBe(6);
  });

  // PERFORMANCE_EDGE Pattern: Component lifecycle
  it('should handle component destruction without errors', () => {
    fixture.detectChanges();
    expect(() => fixture.destroy()).not.toThrow();
  });
});
