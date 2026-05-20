import { TestBed } from '@angular/core/testing';

import { PredictorService } from './predictor';

describe('PredictorService', () => {
  let service: PredictorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredictorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dynamically set qualification status of top four and elimination status of others when all matches are completed', () => {
    // Initially not all matches are completed
    let table = service.pointsTable();
    
    // Check initial status
    expect(table.find(t => t.id === 'RCB')?.isQualified).toBe(true);
    expect(table.find(t => t.id === 'MI')?.isEliminated).toBe(true);
    expect(table.find(t => t.id === 'KKR')?.isQualified).toBeUndefined();

    // Predict all remaining matches (matches 53, 65 to 70)
    service.predictMatch(53, 'CSK');
    service.predictMatch(65, 'KKR');
    service.predictMatch(66, 'GT');
    service.predictMatch(67, 'RCB');
    service.predictMatch(68, 'PBKS');
    service.predictMatch(69, 'RR');
    service.predictMatch(70, 'KKR');

    // Now all matches are completed
    table = service.pointsTable();
    
    // Top 4 should have isQualified = true, isEliminated = false
    // Ranks 5-10 should have isQualified = false, isEliminated = true
    table.forEach((team, index) => {
      if (index < 4) {
        expect(team.isQualified).toBe(true);
        expect(team.isEliminated).toBe(false);
      } else {
        expect(team.isQualified).toBe(false);
        expect(team.isEliminated).toBe(true);
      }
    });

    // Resetting should revert them to initial status
    service.reset();
    table = service.pointsTable();
    expect(table.find(t => t.id === 'RCB')?.isQualified).toBe(true);
    expect(table.find(t => t.id === 'MI')?.isEliminated).toBe(true);
    expect(table.find(t => t.id === 'KKR')?.isQualified).toBeUndefined();
  });

  it('should correctly identify initially undecided matches', () => {
    expect(service.isInitiallyUndecided(52)).toBe(false);
    expect(service.isInitiallyUndecided(53)).toBe(true);
    expect(service.isInitiallyUndecided(65)).toBe(true);
  });
});
