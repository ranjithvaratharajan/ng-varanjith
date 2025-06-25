import { TestBed } from '@angular/core/testing';

import { AboutMe } from './about-me';

describe('AboutMe', () => {
  let service: AboutMe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutMe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
