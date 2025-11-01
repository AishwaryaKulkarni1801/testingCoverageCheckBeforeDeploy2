import { Component, OnInit } from '@angular/core';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  avatar: string;
  email: string;
  status: 'online' | 'offline' | 'away';
  projects: number;
  tasksCompleted: number;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teamMembers: TeamMember[] = [
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

  displayedColumns: string[] = ['name', 'role', 'department', 'status', 'projects', 'tasks', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'online': return 'radio_button_checked';
      case 'away': return 'schedule';
      case 'offline': return 'radio_button_unchecked';
      default: return 'help';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'online': return 'primary';
      case 'away': return 'accent';
      case 'offline': return 'warn';
      default: return 'primary';
    }
  }

  getDepartmentColor(department: string): string {
    switch (department) {
      case 'Engineering': return 'primary';
      case 'Design': return 'accent';
      case 'Product': return 'warn';
      case 'Analytics': return 'primary';
      default: return 'primary';
    }
  }

}