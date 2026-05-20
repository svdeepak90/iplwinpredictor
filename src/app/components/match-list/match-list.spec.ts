import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchListComponent } from './match-list';

describe('MatchListComponent', () => {
  let component: MatchListComponent;
  let fixture: ComponentFixture<MatchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow prediction on past undecided matches but disable prediction on past decided matches', () => {
    // Match 52 is a past match that was initially decided
    const match52 = component.matches().find(m => m.id === 52)!;
    expect(component.isPastMatch(match52)).toBe(true);
    expect(component.canPredictMatch(match52)).toBe(false);

    // Match 53 is a past match that was initially undecided (winnerId is null in initialMatches)
    const match53 = component.matches().find(m => m.id === 53)!;
    expect(component.isPastMatch(match53)).toBe(true);
    expect(component.canPredictMatch(match53)).toBe(true);
  });
});
