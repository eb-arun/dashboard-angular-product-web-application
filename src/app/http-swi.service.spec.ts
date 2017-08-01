import { TestBed, inject } from '@angular/core/testing';

import { HttpSwiService } from './http-swi.service';

describe('HttpSwiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpSwiService]
    });
  });

  it('should be created', inject([HttpSwiService], (service: HttpSwiService) => {
    expect(service).toBeTruthy();
  }));
});
