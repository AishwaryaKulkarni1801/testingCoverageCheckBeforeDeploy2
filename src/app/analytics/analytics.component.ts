import { Component, OnInit } from '@angular/core';

export interface AnalyticsCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  analyticsCards: AnalyticsCard[] = [
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

  trafficSources: ChartData[] = [
    { name: 'Organic Search', value: 45 },
    { name: 'Direct', value: 25 },
    { name: 'Social Media', value: 20 },
    { name: 'Email', value: 10 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getChangeIcon(changeType: string): string {
    return changeType === 'positive' ? 'trending_up' : 
           changeType === 'negative' ? 'trending_down' : 'trending_flat';
  }

  getChangeColor(changeType: string): string {
    return changeType === 'positive' ? 'primary' : 
           changeType === 'negative' ? 'warn' : 'accent';
  }

}