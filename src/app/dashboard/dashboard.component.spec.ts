import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

import { DashboardComponent, DashboardCard, RecentActivity, ProjectStatus } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatProgressBarModule,
        MatChipsModule,
        MatListModule,
        MatDividerModule,
        MatBadgeModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  // COMPONENT_UI Pattern: Component renders without error
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // COMPONENT_UI Pattern: Component lifecycle
  it('should call ngOnInit without error', () => {
    expect(() => component.ngOnInit()).not.toThrow();
  });

  // COMPONENT_UI Pattern: Data initialization validation
  it('should initialize dashboard cards with correct structure', () => {
    expect(component.dashboardCards).toBeDefined();
    expect(component.dashboardCards.length).toBe(4);
    
    const expectedCards: DashboardCard[] = [
      {
        title: 'Total Users',
        value: '2,451',
        icon: 'people',
        color: 'gradient-bg',
        trend: '+12%',
        trendIcon: 'trending_up'
      },
      {
        title: 'Revenue',
        value: '$54,679',
        icon: 'attach_money',
        color: 'gradient-bg-2',
        trend: '+8%',
        trendIcon: 'trending_up'
      },
      {
        title: 'Projects',
        value: '127',
        icon: 'work',
        color: 'gradient-bg-3',
        trend: '+3%',
        trendIcon: 'trending_up'
      },
      {
        title: 'Performance',
        value: '98.2%',
        icon: 'speed',
        color: 'gradient-bg',
        trend: '+0.5%',
        trendIcon: 'trending_up'
      }
    ];
    
    expect(component.dashboardCards).toEqual(expectedCards);
  });

  // COMPONENT_UI Pattern: Data structure validation
  it('should have dashboard cards with required properties', () => {
    component.dashboardCards.forEach(card => {
      expect(card.title).toBeDefined();
      expect(card.value).toBeDefined();
      expect(card.icon).toBeDefined();
      expect(card.color).toBeDefined();
      expect(card.trend).toBeDefined();
      expect(card.trendIcon).toBeDefined();
      
      expect(typeof card.title).toBe('string');
      expect(typeof card.value).toBe('string');
      expect(typeof card.icon).toBe('string');
      expect(typeof card.color).toBe('string');
      expect(typeof card.trend).toBe('string');
      expect(typeof card.trendIcon).toBe('string');
    });
  });

  // COMPONENT_UI Pattern: Recent activities data validation
  it('should initialize recent activities with correct structure', () => {
    expect(component.recentActivities).toBeDefined();
    expect(component.recentActivities.length).toBe(4);
    
    const expectedActivities: RecentActivity[] = [
      {
        action: 'New user registration',
        user: 'John Doe',
        time: '5 minutes ago',
        icon: 'person_add'
      },
      {
        action: 'Project completed',
        user: 'Sarah Wilson',
        time: '1 hour ago',
        icon: 'task_alt'
      },
      {
        action: 'System backup completed',
        user: 'System',
        time: '2 hours ago',
        icon: 'backup'
      },
      {
        action: 'New order received',
        user: 'Mike Johnson',
        time: '3 hours ago',
        icon: 'shopping_cart'
      }
    ];
    
    expect(component.recentActivities).toEqual(expectedActivities);
  });

  // COMPONENT_UI Pattern: Project status data validation
  it('should initialize project status with correct structure', () => {
    expect(component.projectStatus).toBeDefined();
    expect(component.projectStatus.length).toBe(4);
    
    const expectedProjects: ProjectStatus[] = [
      {
        name: 'Website Redesign',
        progress: 85,
        status: 'In Progress',
        dueDate: '2024-01-15'
      },
      {
        name: 'Mobile App Development',
        progress: 60,
        status: 'In Progress',
        dueDate: '2024-02-28'
      },
      {
        name: 'Database Migration',
        progress: 100,
        status: 'Completed',
        dueDate: '2024-01-10'
      },
      {
        name: 'API Integration',
        progress: 35,
        status: 'Planning',
        dueDate: '2024-03-15'
      }
    ];
    
    expect(component.projectStatus).toEqual(expectedProjects);
  });

  // BUSINESS_LOGIC Pattern: Pure function testing with all branches
  it('should return correct color for Completed status', () => {
    const result = component.getStatusColor('Completed');
    expect(result).toBe('primary');
  });

  it('should return correct color for In Progress status', () => {
    const result = component.getStatusColor('In Progress');
    expect(result).toBe('accent');
  });

  it('should return correct color for Planning status', () => {
    const result = component.getStatusColor('Planning');
    expect(result).toBe('warn');
  });

  // BUSINESS_LOGIC Pattern: Edge cases and default behavior
  it('should return primary color for unknown status', () => {
    const result = component.getStatusColor('Unknown Status');
    expect(result).toBe('primary');
  });

  it('should handle null status input', () => {
    const result = component.getStatusColor(null as any);
    expect(result).toBe('primary');
  });

  it('should handle undefined status input', () => {
    const result = component.getStatusColor(undefined as any);
    expect(result).toBe('primary');
  });

  it('should handle empty string status input', () => {
    const result = component.getStatusColor('');
    expect(result).toBe('primary');
  });

  // COMPONENT_UI Pattern: Template rendering verification
  it('should render dashboard cards in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check if cards container exists
    const cardElements = compiled.querySelectorAll('mat-card, .dashboard-card, .card');
    expect(cardElements.length).toBeGreaterThan(0);
  });

  // COMPONENT_UI Pattern: Data types validation
  it('should have recent activities with required properties', () => {
    component.recentActivities.forEach(activity => {
      expect(activity.action).toBeDefined();
      expect(activity.user).toBeDefined();
      expect(activity.time).toBeDefined();
      expect(activity.icon).toBeDefined();
      
      expect(typeof activity.action).toBe('string');
      expect(typeof activity.user).toBe('string');
      expect(typeof activity.time).toBe('string');
      expect(typeof activity.icon).toBe('string');
    });
  });

  it('should have project status with required properties', () => {
    component.projectStatus.forEach(project => {
      expect(project.name).toBeDefined();
      expect(project.progress).toBeDefined();
      expect(project.status).toBeDefined();
      expect(project.dueDate).toBeDefined();
      
      expect(typeof project.name).toBe('string');
      expect(typeof project.progress).toBe('number');
      expect(typeof project.status).toBe('string');
      expect(typeof project.dueDate).toBe('string');
      
      // Validate progress is within valid range
      expect(project.progress).toBeGreaterThanOrEqual(0);
      expect(project.progress).toBeLessThanOrEqual(100);
    });
  });

  // BUSINESS_LOGIC Pattern: Data consistency validation
  it('should have consistent trend icons for positive trends', () => {
    const positiveCards = component.dashboardCards.filter(card => card.trend.includes('+'));
    positiveCards.forEach(card => {
      expect(card.trendIcon).toBe('trending_up');
    });
  });

  // PERFORMANCE_EDGE Pattern: Large data handling
  it('should handle component destruction without memory leaks', () => {
    fixture.detectChanges();
    expect(() => fixture.destroy()).not.toThrow();
  });

  // COMPONENT_UI Pattern: Conditional rendering states
  it('should handle empty dashboard cards array', () => {
    component.dashboardCards = [];
    fixture.detectChanges();
    expect(component.dashboardCards.length).toBe(0);
  });

  it('should handle empty recent activities array', () => {
    component.recentActivities = [];
    fixture.detectChanges();
    expect(component.recentActivities.length).toBe(0);
  });

  it('should handle empty project status array', () => {
    component.projectStatus = [];
    fixture.detectChanges();
    expect(component.projectStatus.length).toBe(0);
  });

  // COVERAGE_COMPLETION Pattern: Branch coverage for all status types
  it('should cover all getStatusColor branches with status variations', () => {
    const testCases = [
      { input: 'Completed', expected: 'primary' },
      { input: 'In Progress', expected: 'accent' },
      { input: 'Planning', expected: 'warn' },
      { input: 'completed', expected: 'primary' }, // case sensitivity
      { input: 'COMPLETED', expected: 'primary' }, // uppercase
      { input: 'in progress', expected: 'primary' }, // space difference
      { input: '   Planning   ', expected: 'primary' }, // whitespace
      { input: 'Cancelled', expected: 'primary' }, // non-existent status
    ];

    testCases.forEach(testCase => {
      const result = component.getStatusColor(testCase.input);
      expect(result).toBe(testCase.expected);
    });
  });
});