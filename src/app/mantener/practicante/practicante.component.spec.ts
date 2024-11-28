import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticanteComponent } from './practicante.component';

describe('PracticanteComponent', () => {
  let component: PracticanteComponent;
  let fixture: ComponentFixture<PracticanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
