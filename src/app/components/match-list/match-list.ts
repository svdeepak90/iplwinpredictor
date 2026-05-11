import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictorService, Match } from '../../services/predictor';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-list.html',
  styleUrls: ['./match-list.scss']
})
export class MatchListComponent {
  predictorService = inject(PredictorService);
  matches = this.predictorService.matches;

  selectWinner(matchId: number, teamId: string) {
    this.predictorService.predictMatch(matchId, teamId);
  }
}
