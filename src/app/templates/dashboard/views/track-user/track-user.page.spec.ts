import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackUserPage } from './track-user.page';

describe('TrackUserPage', () => {
  let component: TrackUserPage;
  let fixture: ComponentFixture<TrackUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
