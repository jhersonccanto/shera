import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaDialogComponent } from './carta-dialog.component';

describe('CartaDialogComponent', () => {
  let component: CartaDialogComponent;
  let fixture: ComponentFixture<CartaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
