import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpireexamComponent } from './expireexam.component';

describe('ExpireexamComponent', () => {
  let component: ExpireexamComponent;
  let fixture: ComponentFixture<ExpireexamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpireexamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpireexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
