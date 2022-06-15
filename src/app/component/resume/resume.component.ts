import { Component, OnInit } from '@angular/core'
import { EventModel } from 'src/app/model/event.model'
import { ProgressBarModel } from 'src/app/model/progress-bar.model'
import { TestimonialModel } from 'src/app/model/testimonial.model'

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  skills?: ProgressBarModel[]
  testimonials?: TestimonialModel[]
  eduEvents?: EventModel[]

  constructor() {}

  ngOnInit() {
    this.skills = [
      {
        title: 'ANGULAR',
        percentage: 90,
      },
      {
        title: 'C# / ASP.NET / WEBAPI',
        percentage: 80,
      },
      {
        title: 'SSIS / SSRS',
        percentage: 70,
      },
      {
        title: 'SOLID / TDD / DESIGN PATTERNS',
        percentage: 80,
      },
      {
        title: 'CSS / SASS',
        percentage: 90,
      },
      {
        title: 'JASMINE / KARMA',
        percentage: 95,
      },
      {
        title: 'PYTHON',
        percentage: 40,
      },
      {
        title: 'REACTJS',
        percentage: 50,
      },
    ]
    this.testimonials = [
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
    ]
    this.eduEvents = [
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
    ]
  }
}
