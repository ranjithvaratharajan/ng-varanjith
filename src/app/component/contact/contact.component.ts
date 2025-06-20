import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [CommonModule],
})
export class ContactComponent {
  socialLinks = [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ranjithvaratharajan',
      class: 'linkedin',
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/ranjithvaratharajan',
      class: 'github',
    },
    {
      platform: 'Stack Overflow',
      url: 'https://stackoverflow.com/users/4365228/ranjith-varadan',
      class: 'stack-overflow',
    },
  ];

  contactInfo = [
    {
      icon: 'icon-location.svg',
      text: 'BASED IN COIMBATORE, IN',
    },
    {
      icon: 'icon-phone.svg',
      text: 'TEL : +91 9514771988',
    },
    {
      icon: 'icon-mail.svg',
      text: 'HELLO@RANJITHVARATHARAJAN.COM',
    },
    {
      icon: 'icon-check.svg',
      text: 'FREELANCE AVAILABLE',
    },
  ];
}
