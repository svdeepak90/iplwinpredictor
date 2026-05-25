import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictorService, Match, Team } from '../../services/predictor';

@Component({
  selector: 'app-playoffs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playoffs.html',
  styleUrls: ['./playoffs.scss'],
})
export class PlayoffsComponent {
  private predictor = inject(PredictorService);

  playoffMatches = computed(() => {
    const matches = this.predictor.derivedMatches();
    return {
      q1: matches.find(m => m.id === 71),
      eliminator: matches.find(m => m.id === 72),
      q2: matches.find(m => m.id === 73),
      final: matches.find(m => m.id === 74)
    };
  });

  getTeam(id: string | null | undefined): Team | undefined {
    if (!id || id === 'TBC') return undefined;
    return this.predictor.getTeam(id);
  }

  predictMatch(matchId: number | undefined, winnerId: string) {
    if (matchId) {
      this.predictor.predictMatch(matchId, winnerId);
    }
  }
}
