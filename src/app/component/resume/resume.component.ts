import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventModel } from 'src/app/model/event.model';
import { ProgressBarModel } from 'src/app/model/progress-bar.model';
import { TestimonialModel } from 'src/app/model/testimonial.model';
import { EventComponent } from '../helper/event/event.component'
import { ProgressBarComponent } from '../helper/progress-bar/progress-bar.component'
import { TestimonialComponent } from '../helper/testimonial/testimonial.component'

@Component({
  standalone: true,
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  imports: [CommonModule, EventComponent, ProgressBarComponent, TestimonialComponent],
})
export class ResumeComponent {
  private itemsPerPage = 7;

  // Signals for reactive state
  skills = signal<ProgressBarModel[]>([
    { title: 'ANGULAR', percentage: 90 },
    { title: 'C# / ASP.NET / WEBAPI', percentage: 80 },
    { title: 'SSIS / SSRS', percentage: 70 },
    { title: 'SOLID / TDD / DESIGN PATTERNS', percentage: 80 },
    { title: 'CSS / SASS', percentage: 90 },
    { title: 'JASMINE / KARMA', percentage: 95 },
    { title: 'PYTHON', percentage: 40 },
    { title: 'REACTJS', percentage: 50 },
  ]);

  testimonials = signal<TestimonialModel[]>([
    {
      name: 'MEGANATHAN RAVINDRAN',
      position: 'TECHNOLOGY DELIVERY ASSOC. LEAD MANAGER / ACCENTURE',
      image: '../../../assets/images/site/author-1.jpg',
      comments:
        "Ranjith serves as a senior developer and technical lead for the WPD/CMA MUT Modernization program. His exceptional work includes rewriting the UI screens using Angular texh stack for both the WPD and CMA MUT applications. Additionally, he has mentored and supported over 4 ASEs in Angular, ensuring timely completion of tasks. Ranjith's dedication and quick learning abilities make him a valuable resource.",
    },
    {
      name: 'NIMEL THOMAS',
      position: 'TECHNOLOGY DELIVERY LEAD MANAGER / ACCENTURE',
      image: '../../../assets/images/site/author-1.jpg',
      comments:
        'RV thank you for your leadership in the sprint 0 space for the frontend and also for helping out the broader team with issues. we have a' +
        'long ways to go and your leadership will be key for successfull delivery. Thank you',
    },
    {
      name: 'JOEL BRANZINE DSOUZA',
      position: 'PACKAGED APP DEVELOPMENT ASSOC MANAGER / ACCENTURE',
      image: '../../../assets/images/site/author-1.jpg',
      comments:
        'Your effort for sprint 0 during release 1.2.0, 1.2.1 and 1.2.2 has been exceptional. Your guidance for developers preparing sprint 0' +
        'document was very effective which helped us to improve quality of technical documents. Sometimes when we could not put frontend developers' +
        'for a theme, you took up that responsibility & was performing dual roles of preparing sa well assisting in preparing documents, which added' +
        'great value & increased flexibility of sprint 0 team. Thank you for your contributions to sprint 0 team',
    },
    {
      name: 'SUGUNA BHUSHAN',
      position: 'STAFF SOFTWARE ENGINEER / SYMPLR',
      image: '../../../assets/images/site/Suguna.jpg',
      comments:
        'He is a full stack developer with .NET and UI Skill set. He is always given challenging UI styling work, ' +
        'he has always overcome the challenges and delivered the work on time with quality.\n' +
        'As his team lead, I am always confident to take up challenging tasks for the team and will be delivered with quality.\n' +
        'Wish him all the luck ahead.',
    },
    {
      name: 'VIJAYA KUMAR PALANISAMY',
      position: 'SUPERVISING ASSOCIATE / EY.',
      image: '../../../assets/images/site/vijayakumar.jpg',
      comments:
        'Quick learner and smart worker. Ready to accept the challenges and ' +
        'deliver it on time... Good Team player.',
    },
    {
      name: 'SELVAKUMAR VADAMALAI',
      position: 'LEAD TESTING / SAGGEZZA',
      image: '../../../assets/images/site/selvakumar.jpg',
      comments:
        'I rarely come across real talents who stand out like Ranjith. ' +
        'Genuine expert’ is the phrase that comes to mind when I think about him.',
    },
    {
      name: 'GAFOOR SHAIK',
      position: 'STAFF SOFTWARE ENGINEER / GE',
      image: '../../../assets/images/site/gafoor.jpeg',
      comments:
        'Ranjith is a proactive and self motivated team player with good Technical skills. ' +
        'His expertisation on front end technoligies like angular 7 and ' +
        'server side technlogies Web Api helped the team to solve complex issues.' +
        'He is flexible and has excellent problem solving skills. I would recommend him as a full stack .net developer.',
    },
    {
      name: 'SARBAJIT DASH',
      position: 'SENIOR SOFTWARE ENGINEER / GE',
      image: '../../../assets/images/site/sarbajit.jpg',
      comments:
        'Working with Ranjith is a wonderful experience.' +
        'He is very organized and dedicated. ' +
        'He make sure he completes task on time and without compromising any quality. ' +
        'He contributed many ideas out of the box. ' +
        'He has good sense of humor and strong work ethics.',
    },
    {
      name: 'SHRAVIL',
      position: 'SOFTWARE ENGINEER / GE',
      image: '../../../assets/images/site/shravil.jpg',
      comments:
        'Ranjith is a extra ordinary guy, who always thinks out of the box. ' +
        'His mind blowing ideas have lead our team to Hackathon winners. ' +
        'He always keeps his work environment cool. His skills are amazing. ' +
        'He is a quick learner. He is the guy who never fears difficulties.',
    },
    {
      name: 'RAGUVENTHAN',
      position: 'HEAD OF IT / FIRST STEPS',
      image: '../../../assets/images/site/raguventhan.jpg',
      comments:
        'The most energetic person I have ever met. ' +
        'He is a quick learner, get complete all the works before deadline.',
    },
    {
      name: 'PRABHAKARAN SATHASIVAM',
      position: 'PROJECT MANAGER / SIVASAKTHI SOFTWARES',
      image: '../../../assets/images/site/prabakaran.jpg',
      comments:
        'Ranjith was my colleague at Sivasakthi Software. ' +
        'He is sincere, dedicated in his work. I wish him all good luck ',
    },
  ]);

  eduEvents = signal<EventModel[]>([
    {
      startYear: '2009',
      endYear: '2012',
      Title: 'MASTER OF COMPUTER APPLICATIONS',
      Name: 'HINDUSTHAN COLLEGE OF ENGINEERING AND TECHNOLOGIES',
      percentage: '9.02 CGPA',
      class: 'Distinction',
    },
    {
      startYear: '2006',
      endYear: '2006',
      Title: 'BACHELOR OF COMPUTER APPLICATIONS',
      Name: 'SMS COLLEGE OF ARTS AND SCIENCE',
      percentage: '77%',
      class: 'First Class',
    },
    {
      startYear: '2005',
      endYear: '2006',
      Title: 'HIGHER SECONDARY CERTIFICATE',
      Name: 'SN MATRICULATION HIGHER SECONDARY SCHOOL',
      percentage: '79.25%',
      class: 'First Class',
    },
    {
      startYear: '2003',
      endYear: '2004',
      Title: 'SECONDARY SCHOOL LEAVING CERTIFICATE',
      Name: 'SN MATRICULATION HIGHER SECONDARY SCHOOL',
      percentage: '74.25%',
      class: 'First Class',
    },
  ]);

  currentPage = signal(1);

  // Computed signals for pagination
  totalPages = computed(() => Math.ceil(this.testimonials().length / this.itemsPerPage));
  currentPageTestimonials = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.testimonials().slice(startIndex, endIndex);
  });

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  downloadCv() {
    console.log('Download Cv');
  }

  EduEvents() {

  }
}
