import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOnePostComponent } from './get-one-post.component';

describe('GetOnePostComponent', () => {
  let component: GetOnePostComponent;
  let fixture: ComponentFixture<GetOnePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetOnePostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetOnePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
