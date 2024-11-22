import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlpiUsersComponent } from './glpi-users.component';

describe('GlpiUsersComponent', () => {
  let component: GlpiUsersComponent;
  let fixture: ComponentFixture<GlpiUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlpiUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlpiUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
