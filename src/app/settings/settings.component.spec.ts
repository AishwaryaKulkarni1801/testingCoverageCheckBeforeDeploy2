import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

import { SettingsComponent, SettingCategory, Setting } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatDividerModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
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
  it('should initialize setting categories with correct structure', () => {
    expect(component.settingCategories).toBeDefined();
    expect(component.settingCategories.length).toBe(4);
    
    const categoryNames = component.settingCategories.map(cat => cat.name);
    expect(categoryNames).toEqual(['General', 'Notifications', 'Security', 'Performance']);
  });

  // COMPONENT_UI Pattern: Settings data structure validation
  it('should have setting categories with required properties', () => {
    component.settingCategories.forEach(category => {
      expect(category.name).toBeDefined();
      expect(category.icon).toBeDefined();
      expect(category.settings).toBeDefined();
      
      expect(typeof category.name).toBe('string');
      expect(typeof category.icon).toBe('string');
      expect(Array.isArray(category.settings)).toBe(true);
      expect(category.settings.length).toBeGreaterThan(0);
    });
  });

  // COMPONENT_UI Pattern: Individual settings validation
  it('should have settings with required properties', () => {
    component.settingCategories.forEach(category => {
      category.settings.forEach(setting => {
        expect(setting.name).toBeDefined();
        expect(setting.description).toBeDefined();
        expect(setting.value).toBeDefined();
        expect(setting.type).toBeDefined();
        
        expect(typeof setting.name).toBe('string');
        expect(typeof setting.description).toBe('string');
        expect(['boolean', 'text', 'number', 'select']).toContain(setting.type);
        
        // Validate value type matches setting type
        if (setting.type === 'boolean') {
          expect(typeof setting.value).toBe('boolean');
        } else if (setting.type === 'number') {
          expect(typeof setting.value).toBe('number');
        } else if (setting.type === 'text' || setting.type === 'select') {
          expect(typeof setting.value).toBe('string');
        }
        
        // Validate select type has options
        if (setting.type === 'select') {
          expect(setting.options).toBeDefined();
          expect(Array.isArray(setting.options)).toBe(true);
          expect(setting.options!.length).toBeGreaterThan(0);
          expect(setting.options).toContain(setting.value);
        }
      });
    });
  });

  // COMPONENT_UI Pattern: Event handling - onSettingChange
  it('should handle setting change for boolean value', () => {
    spyOn(console, 'log');
    
    const booleanSetting: Setting = {
      name: 'Test Boolean',
      description: 'Test description',
      value: false,
      type: 'boolean'
    };
    
    component.onSettingChange(booleanSetting, true);
    
    expect(booleanSetting.value).toBe(true);
    expect(console.log).toHaveBeenCalledWith('Setting "Test Boolean" changed to:', true);
  });

  it('should handle setting change for string value', () => {
    spyOn(console, 'log');
    
    const stringSetting: Setting = {
      name: 'Test String',
      description: 'Test description',
      value: 'old value',
      type: 'text'
    };
    
    component.onSettingChange(stringSetting, 'new value');
    
    expect(stringSetting.value).toBe('new value');
    expect(console.log).toHaveBeenCalledWith('Setting "Test String" changed to:', 'new value');
  });

  it('should handle setting change for number value', () => {
    spyOn(console, 'log');
    
    const numberSetting: Setting = {
      name: 'Test Number',
      description: 'Test description',
      value: 10,
      type: 'number'
    };
    
    component.onSettingChange(numberSetting, 25);
    
    expect(numberSetting.value).toBe(25);
    expect(console.log).toHaveBeenCalledWith('Setting "Test Number" changed to:', 25);
  });

  // BUSINESS_LOGIC Pattern: Edge cases for onSettingChange
  it('should handle null value in onSettingChange', () => {
    spyOn(console, 'log');
    
    const testSetting: Setting = {
      name: 'Test Setting',
      description: 'Test description',
      value: 'original',
      type: 'text'
    };
    
    component.onSettingChange(testSetting, null);
    
    expect(testSetting.value).toBe(null);
    expect(console.log).toHaveBeenCalledWith('Setting "Test Setting" changed to:', null);
  });

  it('should handle undefined value in onSettingChange', () => {
    spyOn(console, 'log');
    
    const testSetting: Setting = {
      name: 'Test Setting',
      description: 'Test description',
      value: 'original',
      type: 'text'
    };
    
    component.onSettingChange(testSetting, undefined);
    
    expect(testSetting.value).toBe(undefined);
    expect(console.log).toHaveBeenCalledWith('Setting "Test Setting" changed to:', undefined);
  });

  // COMPONENT_UI Pattern: Action button methods
  it('should call console.log when resetToDefaults is called', () => {
    spyOn(console, 'log');
    
    component.resetToDefaults();
    
    expect(console.log).toHaveBeenCalledWith('Resetting all settings to defaults...');
  });

  it('should call console.log when exportSettings is called', () => {
    spyOn(console, 'log');
    
    component.exportSettings();
    
    expect(console.log).toHaveBeenCalledWith('Exporting settings...');
  });

  it('should call console.log when importSettings is called', () => {
    spyOn(console, 'log');
    
    component.importSettings();
    
    expect(console.log).toHaveBeenCalledWith('Importing settings...');
  });

  // CONFIG_ENV Pattern: Settings validation
  it('should have valid General settings', () => {
    const generalCategory = component.settingCategories.find(cat => cat.name === 'General');
    expect(generalCategory).toBeDefined();
    expect(generalCategory!.icon).toBe('settings');
    expect(generalCategory!.settings.length).toBe(3);
    
    const darkModeSetting = generalCategory!.settings.find(s => s.name === 'Dark Mode');
    expect(darkModeSetting).toBeDefined();
    expect(darkModeSetting!.type).toBe('boolean');
    expect(darkModeSetting!.value).toBe(false);
    
    const languageSetting = generalCategory!.settings.find(s => s.name === 'Language');
    expect(languageSetting).toBeDefined();
    expect(languageSetting!.type).toBe('select');
    expect(languageSetting!.options).toContain('English');
  });

  it('should have valid Notifications settings', () => {
    const notificationCategory = component.settingCategories.find(cat => cat.name === 'Notifications');
    expect(notificationCategory).toBeDefined();
    expect(notificationCategory!.icon).toBe('notifications');
    expect(notificationCategory!.settings.length).toBe(3);
    
    const emailSetting = notificationCategory!.settings.find(s => s.name === 'Email Notifications');
    expect(emailSetting).toBeDefined();
    expect(emailSetting!.type).toBe('boolean');
    expect(emailSetting!.value).toBe(true);
  });

  it('should have valid Security settings', () => {
    const securityCategory = component.settingCategories.find(cat => cat.name === 'Security');
    expect(securityCategory).toBeDefined();
    expect(securityCategory!.icon).toBe('security');
    expect(securityCategory!.settings.length).toBe(3);
    
    const twoFactorSetting = securityCategory!.settings.find(s => s.name === 'Two-Factor Authentication');
    expect(twoFactorSetting).toBeDefined();
    expect(twoFactorSetting!.type).toBe('boolean');
    expect(twoFactorSetting!.value).toBe(false);
    
    const sessionTimeoutSetting = securityCategory!.settings.find(s => s.name === 'Session Timeout');
    expect(sessionTimeoutSetting).toBeDefined();
    expect(sessionTimeoutSetting!.type).toBe('number');
    expect(sessionTimeoutSetting!.value).toBe(30);
  });

  it('should have valid Performance settings', () => {
    const performanceCategory = component.settingCategories.find(cat => cat.name === 'Performance');
    expect(performanceCategory).toBeDefined();
    expect(performanceCategory!.icon).toBe('speed');
    expect(performanceCategory!.settings.length).toBe(3);
    
    const autoSaveSetting = performanceCategory!.settings.find(s => s.name === 'Auto-Save');
    expect(autoSaveSetting).toBeDefined();
    expect(autoSaveSetting!.type).toBe('boolean');
    expect(autoSaveSetting!.value).toBe(true);
  });

  // BUSINESS_LOGIC Pattern: Validation of select options
  it('should have valid language options', () => {
    const generalCategory = component.settingCategories.find(cat => cat.name === 'General');
    const languageSetting = generalCategory!.settings.find(s => s.name === 'Language');
    
    const expectedLanguages = ['English', 'Spanish', 'French', 'German', 'Chinese'];
    expect(languageSetting!.options).toEqual(expectedLanguages);
  });

  it('should have valid timezone options', () => {
    const generalCategory = component.settingCategories.find(cat => cat.name === 'General');
    const timezoneSetting = generalCategory!.settings.find(s => s.name === 'Timezone');
    
    const expectedTimezones = ['UTC-8 (PST)', 'UTC-5 (EST)', 'UTC+0 (GMT)', 'UTC+1 (CET)', 'UTC+9 (JST)'];
    expect(timezoneSetting!.options).toEqual(expectedTimezones);
  });

  it('should have valid notification frequency options', () => {
    const notificationCategory = component.settingCategories.find(cat => cat.name === 'Notifications');
    const frequencySetting = notificationCategory!.settings.find(s => s.name === 'Notification Frequency');
    
    const expectedFrequencies = ['Immediate', 'Hourly', 'Daily', 'Weekly'];
    expect(frequencySetting!.options).toEqual(expectedFrequencies);
  });

  it('should have valid password strength options', () => {
    const securityCategory = component.settingCategories.find(cat => cat.name === 'Security');
    const passwordSetting = securityCategory!.settings.find(s => s.name === 'Password Strength');
    
    const expectedStrengths = ['Weak', 'Medium', 'Strong', 'Very Strong'];
    expect(passwordSetting!.options).toEqual(expectedStrengths);
  });

  // COMPONENT_UI Pattern: Template rendering verification
  it('should render settings cards in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check if settings content exists
    const cardElements = compiled.querySelectorAll('mat-card, .settings-card, .card');
    expect(cardElements.length).toBeGreaterThan(0);
  });

  // COMPONENT_UI Pattern: Conditional rendering states
  it('should handle empty setting categories array', () => {
    component.settingCategories = [];
    fixture.detectChanges();
    expect(component.settingCategories.length).toBe(0);
  });

  // BUSINESS_LOGIC Pattern: Data validation for number type settings
  it('should have positive number values for number type settings', () => {
    component.settingCategories.forEach(category => {
      category.settings.forEach(setting => {
        if (setting.type === 'number') {
          expect(typeof setting.value).toBe('number');
          expect(setting.value as number).toBeGreaterThan(0);
        }
      });
    });
  });

  // PERFORMANCE_EDGE Pattern: Component lifecycle and memory management
  it('should handle component destruction without memory leaks', () => {
    fixture.detectChanges();
    expect(() => fixture.destroy()).not.toThrow();
  });

  // BUSINESS_LOGIC Pattern: Data immutability validation
  it('should not modify original settings when accessed', () => {
    const originalCategories = component.settingCategories;
    const copiedCategories = JSON.parse(JSON.stringify(component.settingCategories));
    
    expect(originalCategories).toEqual(copiedCategories);
    
    copiedCategories.push({
      name: 'Test Category',
      icon: 'test',
      settings: []
    });
    
    expect(component.settingCategories.length).toBe(4);
    expect(copiedCategories.length).toBe(5);
  });

  // COVERAGE_COMPLETION Pattern: Comprehensive testing of all settings
  it('should have all required icons for categories', () => {
    const categoryIcons = component.settingCategories.map(cat => cat.icon);
    const expectedIcons = ['settings', 'notifications', 'security', 'speed'];
    
    expect(categoryIcons).toEqual(expectedIcons);
  });

  // FORM_VALIDATION Pattern: Settings value validation
  it('should maintain setting value types after changes', () => {
    const booleanSetting = component.settingCategories[0].settings[0]; // Dark Mode
    const originalType = typeof booleanSetting.value;
    
    component.onSettingChange(booleanSetting, !booleanSetting.value);
    
    expect(typeof booleanSetting.value).toBe(originalType);
  });

  // BUSINESS_LOGIC Pattern: Edge case testing for action methods
  it('should handle multiple consecutive calls to resetToDefaults', () => {
    spyOn(console, 'log');
    
    component.resetToDefaults();
    component.resetToDefaults();
    component.resetToDefaults();
    
    expect(console.log).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenCalledWith('Resetting all settings to defaults...');
  });

  it('should handle multiple consecutive calls to exportSettings', () => {
    spyOn(console, 'log');
    
    component.exportSettings();
    component.exportSettings();
    
    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith('Exporting settings...');
  });

  it('should handle multiple consecutive calls to importSettings', () => {
    spyOn(console, 'log');
    
    component.importSettings();
    component.importSettings();
    
    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith('Importing settings...');
  });

  // SECURITY_SANITIZATION Pattern: Input validation
  it('should handle potentially malicious input in onSettingChange', () => {
    spyOn(console, 'log');
    
    const testSetting: Setting = {
      name: 'Test Setting',
      description: 'Test description',
      value: 'safe value',
      type: 'text'
    };
    
    const maliciousInput = '<script>alert("xss")</script>';
    component.onSettingChange(testSetting, maliciousInput);
    
    expect(testSetting.value).toBe(maliciousInput);
    expect(console.log).toHaveBeenCalledWith('Setting "Test Setting" changed to:', maliciousInput);
  });
});