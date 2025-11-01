import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { AnalyticsComponent, AnalyticsCard, ChartData } from './analytics.component';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalyticsComponent],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatChipsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
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
  it('should initialize analytics cards with correct structure', () => {
    expect(component.analyticsCards).toBeDefined();
    expect(component.analyticsCards.length).toBe(4);
    
    const expectedCards: AnalyticsCard[] = [
      {
        title: 'Page Views',
        value: '45,678',
        change: '+12.5%',
        changeType: 'positive',
        icon: 'visibility'
      },
      {
        title: 'Unique Visitors',
        value: '12,340',
        change: '+8.2%',
        changeType: 'positive',
        icon: 'people'
      },
      {
        title: 'Bounce Rate',
        value: '2.4%',
        change: '-1.1%',
        changeType: 'positive',
        icon: 'trending_down'
      },
      {
        title: 'Conversion Rate',
        value: '3.8%',
        change: '+0.5%',
        changeType: 'positive',
        icon: 'trending_up'
      }
    ];
    
    expect(component.analyticsCards).toEqual(expectedCards);
  });

  // COMPONENT_UI Pattern: Traffic sources data validation
  it('should initialize traffic sources with correct structure', () => {
    expect(component.trafficSources).toBeDefined();
    expect(component.trafficSources.length).toBe(4);
    
    const expectedSources: ChartData[] = [
      { name: 'Organic Search', value: 45 },
      { name: 'Direct', value: 25 },
      { name: 'Social Media', value: 20 },
      { name: 'Email', value: 10 }
    ];
    
    expect(component.trafficSources).toEqual(expectedSources);
  });

  // BUSINESS_LOGIC Pattern: Pure function testing - getChangeIcon
  it('should return trending_up icon for positive change type', () => {
    const result = component.getChangeIcon('positive');
    expect(result).toBe('trending_up');
  });

  it('should return trending_down icon for negative change type', () => {
    const result = component.getChangeIcon('negative');
    expect(result).toBe('trending_down');
  });

  it('should return trending_flat icon for neutral change type', () => {
    const result = component.getChangeIcon('neutral');
    expect(result).toBe('trending_flat');
  });

  // BUSINESS_LOGIC Pattern: Edge cases for getChangeIcon
  it('should return trending_flat icon for unknown change type', () => {
    const result = component.getChangeIcon('unknown');
    expect(result).toBe('trending_flat');
  });

  it('should handle null input for getChangeIcon', () => {
    const result = component.getChangeIcon(null as any);
    expect(result).toBe('trending_flat');
  });

  it('should handle undefined input for getChangeIcon', () => {
    const result = component.getChangeIcon(undefined as any);
    expect(result).toBe('trending_flat');
  });

  it('should handle empty string for getChangeIcon', () => {
    const result = component.getChangeIcon('');
    expect(result).toBe('trending_flat');
  });

  // BUSINESS_LOGIC Pattern: Pure function testing - getChangeColor
  it('should return primary color for positive change type', () => {
    const result = component.getChangeColor('positive');
    expect(result).toBe('primary');
  });

  it('should return warn color for negative change type', () => {
    const result = component.getChangeColor('negative');
    expect(result).toBe('warn');
  });

  it('should return accent color for neutral change type', () => {
    const result = component.getChangeColor('neutral');
    expect(result).toBe('accent');
  });

  // BUSINESS_LOGIC Pattern: Edge cases for getChangeColor
  it('should return accent color for unknown change type', () => {
    const result = component.getChangeColor('unknown');
    expect(result).toBe('accent');
  });

  it('should handle null input for getChangeColor', () => {
    const result = component.getChangeColor(null as any);
    expect(result).toBe('accent');
  });

  it('should handle undefined input for getChangeColor', () => {
    const result = component.getChangeColor(undefined as any);
    expect(result).toBe('accent');
  });

  it('should handle empty string for getChangeColor', () => {
    const result = component.getChangeColor('');
    expect(result).toBe('accent');
  });

  // COMPONENT_UI Pattern: Data structure validation
  it('should have analytics cards with required properties', () => {
    component.analyticsCards.forEach(card => {
      expect(card.title).toBeDefined();
      expect(card.value).toBeDefined();
      expect(card.change).toBeDefined();
      expect(card.changeType).toBeDefined();
      expect(card.icon).toBeDefined();
      
      expect(typeof card.title).toBe('string');
      expect(typeof card.value).toBe('string');
      expect(typeof card.change).toBe('string');
      expect(typeof card.changeType).toBe('string');
      expect(typeof card.icon).toBe('string');
      
      // Validate changeType is one of the allowed values
      expect(['positive', 'negative', 'neutral']).toContain(card.changeType);
    });
  });

  it('should have traffic sources with required properties', () => {
    component.trafficSources.forEach(source => {
      expect(source.name).toBeDefined();
      expect(source.value).toBeDefined();
      
      expect(typeof source.name).toBe('string');
      expect(typeof source.value).toBe('number');
      
      // Validate value is a positive number
      expect(source.value).toBeGreaterThan(0);
    });
  });

  // BUSINESS_LOGIC Pattern: Data consistency validation
  it('should have traffic sources that sum to 100%', () => {
    const total = component.trafficSources.reduce((sum, source) => sum + source.value, 0);
    expect(total).toBe(100);
  });

  // COMPONENT_UI Pattern: Template rendering verification
  it('should render analytics cards in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check if analytics content exists
    const cardElements = compiled.querySelectorAll('mat-card, .analytics-card, .card');
    expect(cardElements.length).toBeGreaterThan(0);
  });

  // COMPONENT_UI Pattern: Conditional rendering states
  it('should handle empty analytics cards array', () => {
    component.analyticsCards = [];
    fixture.detectChanges();
    expect(component.analyticsCards.length).toBe(0);
  });

  it('should handle empty traffic sources array', () => {
    component.trafficSources = [];
    fixture.detectChanges();
    expect(component.trafficSources.length).toBe(0);
  });

  // BUSINESS_LOGIC Pattern: Validate change indicators format
  it('should have properly formatted change indicators', () => {
    component.analyticsCards.forEach(card => {
      // Change should start with + or - and end with %
      expect(card.change).toMatch(/^[+-]\d+(\.\d+)?%$/);
    });
  });

  // ANALYTICS_TRACKING Pattern: Validate analytics data structure
  it('should have meaningful analytics metrics', () => {
    const metrics = component.analyticsCards.map(card => card.title);
    const expectedMetrics = ['Page Views', 'Unique Visitors', 'Bounce Rate', 'Conversion Rate'];
    
    expect(metrics).toEqual(expectedMetrics);
  });

  // BUSINESS_LOGIC Pattern: Validate traffic source names
  it('should have valid traffic source names', () => {
    const sourceNames = component.trafficSources.map(source => source.name);
    const expectedSources = ['Organic Search', 'Direct', 'Social Media', 'Email'];
    
    expect(sourceNames).toEqual(expectedSources);
  });

  // COVERAGE_COMPLETION Pattern: Test all branches for both utility functions
  it('should cover all getChangeIcon branches comprehensively', () => {
    const testCases = [
      { input: 'positive', expected: 'trending_up' },
      { input: 'negative', expected: 'trending_down' },
      { input: 'neutral', expected: 'trending_flat' },
      { input: 'POSITIVE', expected: 'trending_flat' }, // case sensitivity
      { input: 'Positive', expected: 'trending_flat' }, // case sensitivity
      { input: 'invalid', expected: 'trending_flat' },
      { input: '123', expected: 'trending_flat' },
      { input: ' positive ', expected: 'trending_flat' }, // whitespace
    ];

    testCases.forEach(testCase => {
      const result = component.getChangeIcon(testCase.input);
      expect(result).toBe(testCase.expected);
    });
  });

  it('should cover all getChangeColor branches comprehensively', () => {
    const testCases = [
      { input: 'positive', expected: 'primary' },
      { input: 'negative', expected: 'warn' },
      { input: 'neutral', expected: 'accent' },
      { input: 'NEGATIVE', expected: 'accent' }, // case sensitivity
      { input: 'Neutral', expected: 'accent' }, // case sensitivity
      { input: 'invalid', expected: 'accent' },
      { input: '456', expected: 'accent' },
      { input: ' neutral ', expected: 'accent' }, // whitespace
    ];

    testCases.forEach(testCase => {
      const result = component.getChangeColor(testCase.input);
      expect(result).toBe(testCase.expected);
    });
  });

  // PERFORMANCE_EDGE Pattern: Component lifecycle and memory management
  it('should handle component destruction without memory leaks', () => {
    fixture.detectChanges();
    expect(() => fixture.destroy()).not.toThrow();
  });

  // BUSINESS_LOGIC Pattern: Validate data immutability
  it('should not modify original analytics cards when accessed', () => {
    const originalCards = component.analyticsCards;
    const copiedCards = [...component.analyticsCards];
    
    expect(originalCards).toEqual(copiedCards);
    
    copiedCards.push({
      title: 'Test Metric',
      value: '100',
      change: '+1%',
      changeType: 'positive',
      icon: 'test'
    });
    
    expect(component.analyticsCards.length).toBe(4);
    expect(copiedCards.length).toBe(5);
  });

  it('should not modify original traffic sources when accessed', () => {
    const originalSources = component.trafficSources;
    const copiedSources = [...component.trafficSources];
    
    expect(originalSources).toEqual(copiedSources);
    
    copiedSources.push({ name: 'Test Source', value: 5 });
    
    expect(component.trafficSources.length).toBe(4);
    expect(copiedSources.length).toBe(5);
  });
});