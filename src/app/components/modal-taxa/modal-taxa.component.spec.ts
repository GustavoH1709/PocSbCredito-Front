import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTaxaComponent } from './modal-taxa.component';

describe('ModalTaxaComponent', () => {
  let component: ModalTaxaComponent;
  let fixture: ComponentFixture<ModalTaxaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTaxaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTaxaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
