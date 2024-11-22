import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlpiNewTrabajadoresTorreComponent } from './glpi-new-trabajadores-torre.component';

describe('GlpiNewTrabajadoresTorreComponent', () => {
  let component: GlpiNewTrabajadoresTorreComponent;
  let fixture: ComponentFixture<GlpiNewTrabajadoresTorreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlpiNewTrabajadoresTorreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlpiNewTrabajadoresTorreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
