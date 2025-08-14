import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Drop } from './drop';

describe('Drop', () => {
  let component: Drop;
  let fixture: ComponentFixture<Drop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Drop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Drop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
