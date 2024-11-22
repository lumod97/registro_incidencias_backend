import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlpiTorresComponent } from './glpi-torres.component';

describe('GlpiTorresComponent', () => {
  let component: GlpiTorresComponent;
  let fixture: ComponentFixture<GlpiTorresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlpiTorresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlpiTorresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
