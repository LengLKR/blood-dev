import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Drown } from './drown';

describe('Drown', () => {
  let component: Drown;
  let fixture: ComponentFixture<Drown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Drown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Drown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
