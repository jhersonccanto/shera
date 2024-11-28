import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenerComponent } from './mantener.component';

describe('MantenerComponent', () => {
  let component: MantenerComponent;
  let fixture: ComponentFixture<MantenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
