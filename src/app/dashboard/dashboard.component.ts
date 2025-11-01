import { Component, OnInit } from '@angular/core';

export interface DashboardCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  trend: string;
  trendIcon: string;
}

export interface RecentActivity {
  action: string;
  user: string;
  time: string;
  icon: string;
}

export interface ProjectStatus {
  name: string;
  progress: number;
  status: string;
  dueDate: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardCards: DashboardCard[] = [
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

  recentActivities: RecentActivity[] = [
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

  projectStatus: ProjectStatus[] = [
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

  constructor() { }

  ngOnInit(): void {
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed': return 'primary';
      case 'In Progress': return 'accent';
      case 'Planning': return 'warn';
      default: return 'primary';
    }
  }

}