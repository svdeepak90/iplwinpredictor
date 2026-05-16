import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictorService, Match } from '../../services/predictor';

export type MatchFilter = 'ALL' | 'UPCOMING' | 'COMPLETED';

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
  
  matchFilter = signal<MatchFilter>('ALL');

  filteredMatches = computed(() => {
    const matches = this.matches();
    const filter = this.matchFilter();
    
    if (filter === 'ALL') return matches;
    
    return matches.filter(match => {
      const isPast = this.isPastMatch(match);
      return filter === 'COMPLETED' ? isPast : !isPast;
    });
  });

  setFilter(filter: MatchFilter) {
    this.matchFilter.set(filter);
  }

  selectWinner(matchId: number, teamId: string, match: Match) {
    if (this.isPastMatch(match)) {
      return;
    }
    this.predictorService.predictMatch(matchId, teamId);
  }

  isPastMatch(match: Match): boolean {
    const parts = match.date.split('-');
    if (parts.length !== 3) return false;
    
    const day = parseInt(parts[0], 10);
    const monthStr = parts[1];
    const year = 2000 + parseInt(parts[2], 10);
    
    const months: { [key: string]: number } = {
      'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
      'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
    };
    
    const month = months[monthStr.toUpperCase()];
    if (month === undefined) return false;

    const matchDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return matchDate < today;
  }

  getTeamLogo(teamId: string): string {
    return this.predictorService.getTeam(teamId)?.logoUrl || '';
  }
}
