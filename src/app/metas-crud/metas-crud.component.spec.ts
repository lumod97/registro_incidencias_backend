import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetasCrudComponent } from './metas-crud.component';

describe('MetasCrudComponent', () => {
  let component: MetasCrudComponent;
  let fixture: ComponentFixture<MetasCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetasCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetasCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
