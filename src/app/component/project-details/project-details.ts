import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { signal } from '@angular/core';

interface ProjectDetails {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  teamMembers: string[];
  clients: string[];
  rolesAndResponsibilities: string[];
  screenshots: string[];
  description: string;
}

@Component({
  standalone: true,
  selector: 'app-project-details',
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
  imports: [CommonModule, RouterModule],
})
export class ProjectDetailsComponent implements OnInit {
  project = signal<ProjectDetails | null>(null);
  prevProjectId = signal<string | null>(null);
  nextProjectId = signal<string | null>(null);

  private projects: ProjectDetails[] = [
    {
      id: '1',
      name: 'Personal CV Project',
      startDate: '2023-01-01',
      endDate: '2023-03-31',
      teamMembers: ['Ranjith Varadan', 'Jane Doe'],
      clients: ['Self'],
      rolesAndResponsibilities: ['UI/UX Design', 'Angular Development', 'API Integration'],
      screenshots: [
        'assets/images/screenshots/project1-1.jpg',
        'assets/images/screenshots/project1-2.jpg',
      ],
      description:
        'A personal portfolio website showcasing skills and projects using Angular and Bootstrap.',
    },
    {
      id: '2',
      name: 'E-Commerce Platform',
      startDate: '2022-06-01',
      endDate: '2022-12-31',
      teamMembers: ['Ranjith Varadan', 'John Smith', 'Alice Brown'],
      clients: ['Retail Inc.'],
      rolesAndResponsibilities: ['Frontend Lead', 'Performance Optimization', 'Payment Integration'],
      screenshots: [
        'assets/images/screenshots/project2-1.jpg',
        'assets/images/screenshots/project2-2.jpg',
      ],
      description:
        'A scalable e-commerce platform with product listings, cart, and checkout features.',
    },
    {
      id: '3',
      name: 'Task Management App',
      startDate: '2023-04-01',
      endDate: '2023-09-30',
      teamMembers: ['Ranjith Varadan', 'Bob Wilson'],
      clients: ['Startup Ltd.'],
      rolesAndResponsibilities: ['Flutter Development', 'Firebase Integration', 'Workflow Design'],
      screenshots: [
        'assets/images/screenshots/project3-1.jpg',
        'assets/images/screenshots/project3-2.jpg',
      ],
      description:
        'A mobile app for task management with real-time collaboration features.',
    },
    {
      id: '4',
      name: 'AI Analytics Dashboard',
      startDate: '2023-10-01',
      endDate: '2024-03-31',
      teamMembers: ['Ranjith Varadan', 'Emma Davis'],
      clients: ['TechCorp'],
      rolesAndResponsibilities: ['Chart Development', 'AI API Integration', 'Data Security'],
      screenshots: [
        'assets/images/screenshots/project4-1.jpg',
        'assets/images/screenshots/project4-2.jpg',
      ],
      description:
        'A dashboard for visualizing AI-driven analytics with interactive charts.',
    },
    {
      id: '5',
      name: 'Travel Booking System',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      teamMembers: ['Ranjith Varadan', 'Mike Chen'],
      clients: ['Adventure Co.'],
      rolesAndResponsibilities: ['Booking System Development', 'Responsive UI Design', 'SEO Optimization'],
      screenshots: [
        'assets/images/screenshots/project5-1.jpg',
        'assets/images/screenshots/project5-2.jpg',
      ],
      description:
        'A travel booking website for adventure tours.',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const project = this.projects.find((p) => p.id === id);
      this.project.set(project || null);
      const currentIndex = this.projects.findIndex((p) => p.id === id);
      this.prevProjectId.set(currentIndex > 0 ? this.projects[currentIndex - 1].id : null);
      this.nextProjectId.set(currentIndex < this.projects.length - 1 ? this.projects[currentIndex + 1].id : null);
    }
  }

  navigateToProject(id: string | null): void {
    if (id) {
      this.router.navigate(['/portfolio/item', id]);
    }
  }

  navigateBack(): void {
    this.router.navigate(['/home/portfolio']);
  }
}
