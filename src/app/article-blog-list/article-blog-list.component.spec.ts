import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBlogListComponent } from './article-blog-list.component';

describe('ArticleBlogListComponent', () => {
  let component: ArticleBlogListComponent;
  let fixture: ComponentFixture<ArticleBlogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleBlogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleBlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
