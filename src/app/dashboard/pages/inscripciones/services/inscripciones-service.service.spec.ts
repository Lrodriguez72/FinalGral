import { TestBed } from '@angular/core/testing';

import { InscripcionesServiceService } from './inscripciones-service.service';

describe('InscripcionesServiceService', () => {
  let service: InscripcionesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
