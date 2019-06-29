import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpireexamsComponent } from './expireexams.component';

describe('ExpireexamsComponent', () => {
  let component: ExpireexamsComponent;
  let fixture: ComponentFixture<ExpireexamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpireexamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpireexamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
