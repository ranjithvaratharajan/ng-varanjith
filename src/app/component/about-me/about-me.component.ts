import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  imports: [CommonModule],
})
export class AboutMeComponent {
  // Data for services, work process, and clients
  services = [
    {
      icon: 'pencil_tip.svg',
      title: 'UI / UX Developer',
      description:
        'In the ever-evolving digital landscape, a captivating user interface (UI) and seamless user experience (UX) are paramount. As a UI/UX developer, I specialize in crafting visually appealing, intuitive websites that leave a lasting impression. Leveraging the latest versions of Angular and React, I ensure that your website not only looks cutting-edge but also functions flawlessly.',
    },
    {
      icon: 'laptop.svg',
      title: 'Backend Developer',
      description:
        'Behind every great frontend, there\'s a robust backend, and I\'ve got that covered. With extensive experience in backend technologies such as C#, SQL Server, SSIS, and SSRS, I build the strong foundation your application needs to thrive. From data management to server-side logic, I handle it all, ensuring your application runs seamlessly and securely.',
    },
    {
      icon: 'lightbulb_idea.svg',
      title: 'TTD & SOLID',
      description:
        'Coding isn\'t just about writing lines of code; it\'s about crafting reliable, maintainable, and scalable solutions. That\'s why I\'m committed to TTD and adhere to organizational coding standards rigorously. Every line of code I write is backed by tests, guaranteeing its correctness and performance. I follow the SOLID principles to create code that\'s not just functional but also elegant and easy to maintain.',
    },
    {
      icon: 'camera.svg',
      title: 'Problem Solver',
      description:
        'Challenges are opportunities in disguise, and I thrive on solving them. Whether it\'s a technical roadblock or a complex puzzle, I\'m here to find solutions that make a difference. Recently, I had the honor of winning a hackathon at GE Healthcare by tackling their most dreaded iframe problems head-on. If you have a problem, consider it half-solved when you reach out to me.',
    },
  ];

  workProcess = [
    { icon: 'process-01.svg', title: 'DISCUSS' },
    { icon: 'process-02.svg', title: 'IDEA' },
    { icon: 'process-03.svg', title: 'DESIGN' },
    { icon: 'process-04.svg', title: 'DEVELOP' },
    { icon: 'process-05.svg', title: 'TEST' },
    { icon: 'process-06.svg', title: 'LAUNCH' },
  ];

  clients = [
    'client-01.png',
    'client-02.png',
    'client-03.png',
    'client-04.png',
    'client-05.jpg',
    'client-06.jpg',
    'client-07.jpg',
  ];
}
