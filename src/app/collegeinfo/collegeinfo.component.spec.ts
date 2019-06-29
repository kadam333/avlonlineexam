import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeinfoComponent } from './collegeinfo.component';

describe('CollegeinfoComponent', () => {
  let component: CollegeinfoComponent;
  let fixture: ComponentFixture<CollegeinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
