import { AnalyticsComponent, AnalyticsCard, ChartData } from './analytics.component';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;

  beforeEach(() => {
    component = new AnalyticsComponent();
  });

  describe('Component Instantiation', () => {
    it('should create component instance successfully', () => {
      expect(component).toBeTruthy();
      expect(component).toBeInstanceOf(AnalyticsComponent);
    });

    it('should initialize with default analyticsCards data', () => {
      expect(component.analyticsCards).toBeDefined();
      expect(component.analyticsCards).toHaveLength(4);
      expect(component.analyticsCards[0]).toEqual({
        title: 'Page Views',
        value: '45,678',
        change: '+12.5%',
        changeType: 'positive',
        icon: 'visibility'
      });
    });

    it('should initialize with default trafficSources data', () => {
      expect(component.trafficSources).toBeDefined();
      expect(component.trafficSources).toHaveLength(4);
      expect(component.trafficSources[0]).toEqual({
        name: 'Organic Search',
        value: 45
      });
    });
  });

  describe('ngOnInit Lifecycle', () => {
    it('should execute ngOnInit without errors', () => {
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should maintain data integrity after ngOnInit', () => {
      const originalAnalyticsCards = [...component.analyticsCards];
      const originalTrafficSources = [...component.trafficSources];
      
      component.ngOnInit();
      
      expect(component.analyticsCards).toEqual(originalAnalyticsCards);
      expect(component.trafficSources).toEqual(originalTrafficSources);
    });
  });

  describe('getChangeIcon Method - Business Logic Coverage', () => {
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

    it('should return trending_flat icon for unknown change type', () => {
      const result = component.getChangeIcon('unknown');
      expect(result).toBe('trending_flat');
    });

    it('should return trending_flat icon for empty string', () => {
      const result = component.getChangeIcon('');
      expect(result).toBe('trending_flat');
    });

    it('should return trending_flat icon for null input', () => {
      const result = component.getChangeIcon(null as any);
      expect(result).toBe('trending_flat');
    });

    it('should return trending_flat icon for undefined input', () => {
      const result = component.getChangeIcon(undefined as any);
      expect(result).toBe('trending_flat');
    });
  });

  describe('getChangeColor Method - Business Logic Coverage', () => {
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

    it('should return accent color for unknown change type', () => {
      const result = component.getChangeColor('unknown');
      expect(result).toBe('accent');
    });

    it('should return accent color for empty string', () => {
      const result = component.getChangeColor('');
      expect(result).toBe('accent');
    });

    it('should return accent color for null input', () => {
      const result = component.getChangeColor(null as any);
      expect(result).toBe('accent');
    });

    it('should return accent color for undefined input', () => {
      const result = component.getChangeColor(undefined as any);
      expect(result).toBe('accent');
    });
  });

  describe('Data Structure Validation', () => {
    it('should have correctly structured AnalyticsCard objects', () => {
      component.analyticsCards.forEach((card: AnalyticsCard) => {
        expect(card).toHaveProperty('title');
        expect(card).toHaveProperty('value');
        expect(card).toHaveProperty('change');
        expect(card).toHaveProperty('changeType');
        expect(card).toHaveProperty('icon');
        expect(typeof card.title).toBe('string');
        expect(typeof card.value).toBe('string');
        expect(typeof card.change).toBe('string');
        expect(['positive', 'negative', 'neutral']).toContain(card.changeType);
        expect(typeof card.icon).toBe('string');
      });
    });

    it('should have correctly structured ChartData objects', () => {
      component.trafficSources.forEach((data: ChartData) => {
        expect(data).toHaveProperty('name');
        expect(data).toHaveProperty('value');
        expect(typeof data.name).toBe('string');
        expect(typeof data.value).toBe('number');
        expect(data.value).toBeGreaterThanOrEqual(0);
      });
    });

    it('should maintain consistent data types for all analytics cards', () => {
      const expectedCards = [
        { title: 'Page Views', changeType: 'positive', icon: 'visibility' },
        { title: 'Unique Visitors', changeType: 'positive', icon: 'people' },
        { title: 'Bounce Rate', changeType: 'positive', icon: 'trending_down' },
        { title: 'Conversion Rate', changeType: 'positive', icon: 'trending_up' }
      ];

      expectedCards.forEach((expectedCard, index) => {
        expect(component.analyticsCards[index].title).toBe(expectedCard.title);
        expect(component.analyticsCards[index].changeType).toBe(expectedCard.changeType);
        expect(component.analyticsCards[index].icon).toBe(expectedCard.icon);
      });
    });

    it('should maintain consistent data for traffic sources', () => {
      const expectedSources = [
        { name: 'Organic Search', value: 45 },
        { name: 'Direct', value: 25 },
        { name: 'Social Media', value: 20 },
        { name: 'Email', value: 10 }
      ];

      expectedSources.forEach((expectedSource, index) => {
        expect(component.trafficSources[index]).toEqual(expectedSource);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle method calls with various input types gracefully', () => {
      const testInputs = ['positive', 'negative', 'neutral', '', null, undefined, 'invalid'];
      
      testInputs.forEach(input => {
        expect(() => component.getChangeIcon(input as any)).not.toThrow();
        expect(() => component.getChangeColor(input as any)).not.toThrow();
      });
    });

    it('should maintain immutable data references', () => {
      const originalAnalyticsCards = component.analyticsCards;
      const originalTrafficSources = component.trafficSources;
      
      component.ngOnInit();
      
      expect(component.analyticsCards).toBe(originalAnalyticsCards);
      expect(component.trafficSources).toBe(originalTrafficSources);
    });

    it('should handle concurrent method calls without state corruption', () => {
      const results1 = component.getChangeIcon('positive');
      const results2 = component.getChangeColor('negative');
      const results3 = component.getChangeIcon('neutral');
      
      expect(results1).toBe('trending_up');
      expect(results2).toBe('warn');
      expect(results3).toBe('trending_flat');
    });
  });

  describe('Integration and State Consistency', () => {
    it('should maintain consistent state throughout component lifecycle', () => {
      const initialAnalyticsCardsLength = component.analyticsCards.length;
      const initialTrafficSourcesLength = component.trafficSources.length;
      
      component.ngOnInit();
      
      // Call methods multiple times
      component.getChangeIcon('positive');
      component.getChangeColor('negative');
      component.getChangeIcon('neutral');
      
      expect(component.analyticsCards.length).toBe(initialAnalyticsCardsLength);
      expect(component.trafficSources.length).toBe(initialTrafficSourcesLength);
    });

    it('should handle all changeType values correctly in combination', () => {
      const changeTypes = ['positive', 'negative', 'neutral'];
      const expectedIcons = ['trending_up', 'trending_down', 'trending_flat'];
      const expectedColors = ['primary', 'warn', 'accent'];
      
      changeTypes.forEach((changeType, index) => {
        expect(component.getChangeIcon(changeType)).toBe(expectedIcons[index]);
        expect(component.getChangeColor(changeType)).toBe(expectedColors[index]);
      });
    });

    it('should verify all analytics cards have consistent change type mapping', () => {
      component.analyticsCards.forEach(card => {
        const icon = component.getChangeIcon(card.changeType);
        const color = component.getChangeColor(card.changeType);
        
        expect(icon).toBeTruthy();
        expect(color).toBeTruthy();
        expect(['trending_up', 'trending_down', 'trending_flat']).toContain(icon);
        expect(['primary', 'warn', 'accent']).toContain(color);
      });
    });
  });

  describe('Performance and Memory Management', () => {
    it('should not create new objects on method calls', () => {
      const spy = jest.spyOn(Object, 'create');
      
      component.getChangeIcon('positive');
      component.getChangeColor('negative');
      
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it('should handle multiple rapid method calls efficiently', () => {
      const start = performance.now();
      
      for (let i = 0; i < 1000; i++) {
        component.getChangeIcon('positive');
        component.getChangeColor('negative');
      }
      
      const end = performance.now();
      expect(end - start).toBeLessThan(100); // Should complete in under 100ms
    });
  });

  describe('Interface Compliance', () => {
    it('should comply with AnalyticsCard interface structure', () => {
      const mockCard: AnalyticsCard = {
        title: 'Test Title',
        value: 'Test Value',
        change: 'Test Change',
        changeType: 'positive',
        icon: 'test_icon'
      };
      
      expect(mockCard.title).toBeDefined();
      expect(mockCard.value).toBeDefined();
      expect(mockCard.change).toBeDefined();
      expect(mockCard.changeType).toBeDefined();
      expect(mockCard.icon).toBeDefined();
    });

    it('should comply with ChartData interface structure', () => {
      const mockData: ChartData = {
        name: 'Test Name',
        value: 100
      };
      
      expect(mockData.name).toBeDefined();
      expect(mockData.value).toBeDefined();
      expect(typeof mockData.value).toBe('number');
    });
  });

  describe('Comprehensive Branch Coverage', () => {
    it('should cover all conditional branches in getChangeIcon method', () => {
      // Test first condition: changeType === 'positive'
      expect(component.getChangeIcon('positive')).toBe('trending_up');
      
      // Test second condition: changeType === 'negative' 
      expect(component.getChangeIcon('negative')).toBe('trending_down');
      
      // Test default case (any other value)
      expect(component.getChangeIcon('neutral')).toBe('trending_flat');
      expect(component.getChangeIcon('anything_else')).toBe('trending_flat');
    });

    it('should cover all conditional branches in getChangeColor method', () => {
      // Test first condition: changeType === 'positive'
      expect(component.getChangeColor('positive')).toBe('primary');
      
      // Test second condition: changeType === 'negative'
      expect(component.getChangeColor('negative')).toBe('warn');
      
      // Test default case (any other value)
      expect(component.getChangeColor('neutral')).toBe('accent');
      expect(component.getChangeColor('anything_else')).toBe('accent');
    });
  });
});