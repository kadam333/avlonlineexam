import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizquestionComponent } from './quizquestion.component';

describe('QuizquestionComponent', () => {
  let component: QuizquestionComponent;
  let fixture: ComponentFixture<QuizquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
