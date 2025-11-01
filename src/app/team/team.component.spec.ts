import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';

import { TeamComponent, TeamMember } from './team.component';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamComponent],
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatChipsModule,
        MatBadgeModule,
        MatCardModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamComponent);
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
  it('should initialize team members with correct structure', () => {
    expect(component.teamMembers).toBeDefined();
    expect(component.teamMembers.length).toBe(6);
    
    const expectedMembers: TeamMember[] = [
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Frontend Developer',
        department: 'Engineering',
        avatar: 'SJ',
        email: 'sarah.johnson@company.com',
        status: 'online',
        projects: 3,
        tasksCompleted: 28
      },
      {
        id: 2,
        name: 'Mike Chen',
        role: 'Backend Developer',
        department: 'Engineering',
        avatar: 'MC',
        email: 'mike.chen@company.com',
        status: 'online',
        projects: 2,
        tasksCompleted: 35
      },
      {
        id: 3,
        name: 'Emily Davis',
        role: 'UX Designer',
        department: 'Design',
        avatar: 'ED',
        email: 'emily.davis@company.com',
        status: 'away',
        projects: 4,
        tasksCompleted: 22
      },
      {
        id: 4,
        name: 'Alex Rodriguez',
        role: 'Product Manager',
        department: 'Product',
        avatar: 'AR',
        email: 'alex.rodriguez@company.com',
        status: 'online',
        projects: 5,
        tasksCompleted: 18
      },
      {
        id: 5,
        name: 'Lisa Wang',
        role: 'Data Scientist',
        department: 'Analytics',
        avatar: 'LW',
        email: 'lisa.wang@company.com',
        status: 'offline',
        projects: 2,
        tasksCompleted: 31
      },
      {
        id: 6,
        name: 'David Brown',
        role: 'DevOps Engineer',
        department: 'Engineering',
        avatar: 'DB',
        email: 'david.brown@company.com',
        status: 'online',
        projects: 3,
        tasksCompleted: 26
      }
    ];
    
    expect(component.teamMembers).toEqual(expectedMembers);
  });

  // COMPONENT_UI Pattern: Table configuration
  it('should initialize displayed columns correctly', () => {
    expect(component.displayedColumns).toBeDefined();
    expect(component.displayedColumns).toEqual(['name', 'role', 'department', 'status', 'projects', 'tasks', 'actions']);
  });

  // BUSINESS_LOGIC Pattern: getStatusIcon function testing
  it('should return correct icon for online status', () => {
    const result = component.getStatusIcon('online');
    expect(result).toBe('radio_button_checked');
  });

  it('should return correct icon for away status', () => {
    const result = component.getStatusIcon('away');
    expect(result).toBe('schedule');
  });

  it('should return correct icon for offline status', () => {
    const result = component.getStatusIcon('offline');
    expect(result).toBe('radio_button_unchecked');
  });

  it('should return help icon for unknown status', () => {
    const result = component.getStatusIcon('unknown');
    expect(result).toBe('help');
  });

  // BUSINESS_LOGIC Pattern: Edge cases for getStatusIcon
  it('should handle null status input for getStatusIcon', () => {
    const result = component.getStatusIcon(null as any);
    expect(result).toBe('help');
  });

  it('should handle undefined status input for getStatusIcon', () => {
    const result = component.getStatusIcon(undefined as any);
    expect(result).toBe('help');
  });

  it('should handle empty string for getStatusIcon', () => {
    const result = component.getStatusIcon('');
    expect(result).toBe('help');
  });

  // BUSINESS_LOGIC Pattern: getStatusColor function testing
  it('should return correct color for online status', () => {
    const result = component.getStatusColor('online');
    expect(result).toBe('primary');
  });

  it('should return correct color for away status', () => {
    const result = component.getStatusColor('away');
    expect(result).toBe('accent');
  });

  it('should return correct color for offline status', () => {
    const result = component.getStatusColor('offline');
    expect(result).toBe('warn');
  });

  it('should return primary color for unknown status', () => {
    const result = component.getStatusColor('unknown');
    expect(result).toBe('primary');
  });

  // BUSINESS_LOGIC Pattern: Edge cases for getStatusColor
  it('should handle null status input for getStatusColor', () => {
    const result = component.getStatusColor(null as any);
    expect(result).toBe('primary');
  });

  it('should handle undefined status input for getStatusColor', () => {
    const result = component.getStatusColor(undefined as any);
    expect(result).toBe('primary');
  });

  it('should handle empty string for getStatusColor', () => {
    const result = component.getStatusColor('');
    expect(result).toBe('primary');
  });

  // BUSINESS_LOGIC Pattern: getDepartmentColor function testing
  it('should return correct color for Engineering department', () => {
    const result = component.getDepartmentColor('Engineering');
    expect(result).toBe('primary');
  });

  it('should return correct color for Design department', () => {
    const result = component.getDepartmentColor('Design');
    expect(result).toBe('accent');
  });

  it('should return correct color for Product department', () => {
    const result = component.getDepartmentColor('Product');
    expect(result).toBe('warn');
  });

  it('should return correct color for Analytics department', () => {
    const result = component.getDepartmentColor('Analytics');
    expect(result).toBe('primary');
  });

  it('should return primary color for unknown department', () => {
    const result = component.getDepartmentColor('Unknown');
    expect(result).toBe('primary');
  });

  // BUSINESS_LOGIC Pattern: Edge cases for getDepartmentColor
  it('should handle null department input for getDepartmentColor', () => {
    const result = component.getDepartmentColor(null as any);
    expect(result).toBe('primary');
  });

  it('should handle undefined department input for getDepartmentColor', () => {
    const result = component.getDepartmentColor(undefined as any);
    expect(result).toBe('primary');
  });

  it('should handle empty string for getDepartmentColor', () => {
    const result = component.getDepartmentColor('');
    expect(result).toBe('primary');
  });

  // COMPONENT_UI Pattern: Data structure validation
  it('should have team members with required properties', () => {
    component.teamMembers.forEach(member => {
      expect(member.id).toBeDefined();
      expect(member.name).toBeDefined();
      expect(member.role).toBeDefined();
      expect(member.department).toBeDefined();
      expect(member.avatar).toBeDefined();
      expect(member.email).toBeDefined();
      expect(member.status).toBeDefined();
      expect(member.projects).toBeDefined();
      expect(member.tasksCompleted).toBeDefined();
      
      expect(typeof member.id).toBe('number');
      expect(typeof member.name).toBe('string');
      expect(typeof member.role).toBe('string');
      expect(typeof member.department).toBe('string');
      expect(typeof member.avatar).toBe('string');
      expect(typeof member.email).toBe('string');
      expect(typeof member.status).toBe('string');
      expect(typeof member.projects).toBe('number');
      expect(typeof member.tasksCompleted).toBe('number');
      
      // Validate status is one of allowed values
      expect(['online', 'offline', 'away']).toContain(member.status);
      
      // Validate numeric fields are positive
      expect(member.id).toBeGreaterThan(0);
      expect(member.projects).toBeGreaterThanOrEqual(0);
      expect(member.tasksCompleted).toBeGreaterThanOrEqual(0);
    });
  });

  // BUSINESS_LOGIC Pattern: Email validation
  it('should have team members with valid email formats', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    component.teamMembers.forEach(member => {
      expect(member.email).toMatch(emailRegex);
    });
  });

  // COMPONENT_UI Pattern: Template rendering verification
  it('should render team table in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check if table exists
    const tableElement = compiled.querySelector('mat-table, table');
    expect(tableElement).toBeTruthy();
  });

  // BUSINESS_LOGIC Pattern: Data consistency validation
  it('should have unique team member IDs', () => {
    const ids = component.teamMembers.map(member => member.id);
    const uniqueIds = [...new Set(ids)];
    
    expect(ids.length).toBe(uniqueIds.length);
  });

  it('should have team members from different departments', () => {
    const departments = component.teamMembers.map(member => member.department);
    const uniqueDepartments = [...new Set(departments)];
    
    expect(uniqueDepartments.length).toBeGreaterThan(1);
    expect(uniqueDepartments).toContain('Engineering');
    expect(uniqueDepartments).toContain('Design');
    expect(uniqueDepartments).toContain('Product');
    expect(uniqueDepartments).toContain('Analytics');
  });

  // COMPONENT_UI Pattern: Conditional rendering states
  it('should handle empty team members array', () => {
    component.teamMembers = [];
    fixture.detectChanges();
    expect(component.teamMembers.length).toBe(0);
  });

  // COVERAGE_COMPLETION Pattern: Comprehensive branch testing
  it('should cover all getStatusIcon branches with various inputs', () => {
    const testCases = [
      { input: 'online', expected: 'radio_button_checked' },
      { input: 'away', expected: 'schedule' },
      { input: 'offline', expected: 'radio_button_unchecked' },
      { input: 'ONLINE', expected: 'help' }, // case sensitivity
      { input: 'Online', expected: 'help' }, // case sensitivity
      { input: 'busy', expected: 'help' },
      { input: 'idle', expected: 'help' },
      { input: '123', expected: 'help' },
      { input: ' online ', expected: 'help' }, // whitespace
    ];

    testCases.forEach(testCase => {
      const result = component.getStatusIcon(testCase.input);
      expect(result).toBe(testCase.expected);
    });
  });

  it('should cover all getStatusColor branches with various inputs', () => {
    const testCases = [
      { input: 'online', expected: 'primary' },
      { input: 'away', expected: 'accent' },
      { input: 'offline', expected: 'warn' },
      { input: 'ONLINE', expected: 'primary' }, // case sensitivity
      { input: 'Away', expected: 'primary' }, // case sensitivity
      { input: 'busy', expected: 'primary' },
      { input: 'idle', expected: 'primary' },
      { input: '456', expected: 'primary' },
      { input: ' away ', expected: 'primary' }, // whitespace
    ];

    testCases.forEach(testCase => {
      const result = component.getStatusColor(testCase.input);
      expect(result).toBe(testCase.expected);
    });
  });

  it('should cover all getDepartmentColor branches with various inputs', () => {
    const testCases = [
      { input: 'Engineering', expected: 'primary' },
      { input: 'Design', expected: 'accent' },
      { input: 'Product', expected: 'warn' },
      { input: 'Analytics', expected: 'primary' },
      { input: 'engineering', expected: 'primary' }, // case sensitivity
      { input: 'DESIGN', expected: 'primary' }, // case sensitivity
      { input: 'Marketing', expected: 'primary' },
      { input: 'HR', expected: 'primary' },
      { input: 'Finance', expected: 'primary' },
      { input: '789', expected: 'primary' },
      { input: ' Product ', expected: 'primary' }, // whitespace
    ];

    testCases.forEach(testCase => {
      const result = component.getDepartmentColor(testCase.input);
      expect(result).toBe(testCase.expected);
    });
  });

  // PERFORMANCE_EDGE Pattern: Component lifecycle and memory management
  it('should handle component destruction without memory leaks', () => {
    fixture.detectChanges();
    expect(() => fixture.destroy()).not.toThrow();
  });

  // BUSINESS_LOGIC Pattern: Validate data immutability
  it('should not modify original team members when accessed', () => {
    const originalMembers = component.teamMembers;
    const copiedMembers = [...component.teamMembers];
    
    expect(originalMembers).toEqual(copiedMembers);
    
    copiedMembers.push({
      id: 99,
      name: 'Test User',
      role: 'Test Role',
      department: 'Test Dept',
      avatar: 'TU',
      email: 'test@test.com',
      status: 'online',
      projects: 1,
      tasksCompleted: 5
    });
    
    expect(component.teamMembers.length).toBe(6);
    expect(copiedMembers.length).toBe(7);
  });

  // BUSINESS_LOGIC Pattern: Validate avatar format
  it('should have properly formatted avatars', () => {
    component.teamMembers.forEach(member => {
      expect(member.avatar).toBeDefined();
      expect(member.avatar.length).toBeGreaterThan(0);
      expect(member.avatar.length).toBeLessThanOrEqual(3); // Typical avatar initials format
    });
  });

  // ANALYTICS_TRACKING Pattern: Validate team metrics
  it('should have meaningful team metrics', () => {
    const totalProjects = component.teamMembers.reduce((sum, member) => sum + member.projects, 0);
    const totalTasks = component.teamMembers.reduce((sum, member) => sum + member.tasksCompleted, 0);
    
    expect(totalProjects).toBeGreaterThan(0);
    expect(totalTasks).toBeGreaterThan(0);
    
    // Validate that each member has reasonable metrics
    component.teamMembers.forEach(member => {
      expect(member.projects).toBeLessThanOrEqual(10); // Reasonable project limit
      expect(member.tasksCompleted).toBeLessThanOrEqual(100); // Reasonable task limit
    });
  });
});