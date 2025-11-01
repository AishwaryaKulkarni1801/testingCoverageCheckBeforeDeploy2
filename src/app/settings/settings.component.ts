import { Component, OnInit } from '@angular/core';

export interface SettingCategory {
  name: string;
  icon: string;
  settings: Setting[];
}

export interface Setting {
  name: string;
  description: string;
  value: boolean | string | number;
  type: 'boolean' | 'text' | 'number' | 'select';
  options?: string[];
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settingCategories: SettingCategory[] = [
    {
      name: 'General',
      icon: 'settings',
      settings: [
        {
          name: 'Dark Mode',
          description: 'Enable dark theme for better night viewing',
          value: false,
          type: 'boolean'
        },
        {
          name: 'Language',
          description: 'Select your preferred language',
          value: 'English',
          type: 'select',
          options: ['English', 'Spanish', 'French', 'German', 'Chinese']
        },
        {
          name: 'Timezone',
          description: 'Set your local timezone',
          value: 'UTC-5 (EST)',
          type: 'select',
          options: ['UTC-8 (PST)', 'UTC-5 (EST)', 'UTC+0 (GMT)', 'UTC+1 (CET)', 'UTC+9 (JST)']
        }
      ]
    },
    {
      name: 'Notifications',
      icon: 'notifications',
      settings: [
        {
          name: 'Email Notifications',
          description: 'Receive notifications via email',
          value: true,
          type: 'boolean'
        },
        {
          name: 'Push Notifications',
          description: 'Receive browser push notifications',
          value: true,
          type: 'boolean'
        },
        {
          name: 'Notification Frequency',
          description: 'How often to receive notifications',
          value: 'Immediate',
          type: 'select',
          options: ['Immediate', 'Hourly', 'Daily', 'Weekly']
        }
      ]
    },
    {
      name: 'Security',
      icon: 'security',
      settings: [
        {
          name: 'Two-Factor Authentication',
          description: 'Add an extra layer of security to your account',
          value: false,
          type: 'boolean'
        },
        {
          name: 'Session Timeout',
          description: 'Automatically log out after inactivity (minutes)',
          value: 30,
          type: 'number'
        },
        {
          name: 'Password Strength',
          description: 'Minimum password strength requirement',
          value: 'Strong',
          type: 'select',
          options: ['Weak', 'Medium', 'Strong', 'Very Strong']
        }
      ]
    },
    {
      name: 'Performance',
      icon: 'speed',
      settings: [
        {
          name: 'Auto-Save',
          description: 'Automatically save changes as you work',
          value: true,
          type: 'boolean'
        },
        {
          name: 'Animation Effects',
          description: 'Enable smooth animations and transitions',
          value: true,
          type: 'boolean'
        },
        {
          name: 'Data Refresh Rate',
          description: 'How often to refresh dashboard data (seconds)',
          value: 30,
          type: 'number'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSettingChange(setting: Setting, value: any) {
    setting.value = value;
    console.log(`Setting "${setting.name}" changed to:`, value);
    // Here you would typically save the setting to a service or backend
  }

  resetToDefaults() {
    console.log('Resetting all settings to defaults...');
    // Reset logic would go here
  }

  exportSettings() {
    console.log('Exporting settings...');
    // Export logic would go here
  }

  importSettings() {
    console.log('Importing settings...');
    // Import logic would go here
  }

}