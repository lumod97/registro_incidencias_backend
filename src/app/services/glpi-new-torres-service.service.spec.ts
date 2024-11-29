import { TestBed } from '@angular/core/testing';

import { GlpiNewTorresServiceService } from './glpi-new-torres-service.service';

describe('GlpiNewTorresServiceService', () => {
  let service: GlpiNewTorresServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlpiNewTorresServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
