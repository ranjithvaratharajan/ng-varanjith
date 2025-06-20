import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { signal } from '@angular/core';
import Isotope from 'isotope-layout';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  filterClasses: string[];
  image: string;
  link: {
    type: 'ajax';
    url: string;
  };
}

@Component({
  standalone: true,
  selector: 'app-portfolio',
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
  imports: [CommonModule, RouterModule],
})
export class PortfolioComponent implements AfterViewInit {
  @ViewChild('portfolioGrid', { static: false }) portfolioGrid!: ElementRef;

  activeFilter = signal<string>('*');
  private isotopeInstance: Isotope | null = null; // Store Isotope instance

  portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      title: 'Personal CV Project',
      category: 'Web Development',
      filterClasses: ['web-development'],
      image: 'assets/images/portfolio/01.jpg',
      link: { type: 'ajax', url: 'item/1' },
    },
    {
      id: '2',
      title: 'E-Commerce Platform',
      category: 'Web Development',
      filterClasses: ['web-development'],
      image: 'assets/images/portfolio/02.jpg',
      link: { type: 'ajax', url: 'item/2' },
    },
    {
      id: '3',
      title: 'Task Management App',
      category: 'Mobile Apps',
      filterClasses: ['mobile-apps'],
      image: 'assets/images/portfolio/03.jpg',
      link: { type: 'ajax', url: 'item/3' },
    },
    {
      id: '4',
      title: 'AI Analytics Dashboard',
      category: 'Technology',
      filterClasses: ['technology'],
      image: 'assets/images/portfolio/04.jpg',
      link: { type: 'ajax', url: 'item/4' },
    },
    {
      id: '5',
      title: 'Travel Booking System',
      category: 'Technology',
      filterClasses: ['technology'],
      image: 'assets/images/portfolio/05.jpg',
      link: { type: 'ajax', url: 'item/5' },
    },
  ];

  ngAfterViewInit(): void {
    const grid = this.portfolioGrid?.nativeElement;
    if (grid) {
      this.isotopeInstance = new Isotope(grid, {
        itemSelector: '.media-cell',
        layoutMode: 'masonry',
        masonry: {
          columnWidth: 340,
          gutter: 20,
        },
      });
    }
  }

  setFilter(filter: string, event: Event): void {
    event.preventDefault();
    this.activeFilter.set(filter);
    if (this.isotopeInstance) {
      this.isotopeInstance.arrange({ filter });
    }
  }
}
