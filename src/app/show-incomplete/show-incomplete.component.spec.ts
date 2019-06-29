import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIncompleteComponent } from './show-incomplete.component';

describe('ShowIncompleteComponent', () => {
  let component: ShowIncompleteComponent;
  let fixture: ComponentFixture<ShowIncompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowIncompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIncompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
