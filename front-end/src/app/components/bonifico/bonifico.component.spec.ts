import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonificoComponent } from './bonifico.component';

describe('BonificoComponent', () => {
  let component: BonificoComponent;
  let fixture: ComponentFixture<BonificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BonificoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
