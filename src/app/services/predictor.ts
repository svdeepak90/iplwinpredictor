import { Injectable, signal, computed } from '@angular/core';

export interface Team {
  id: string;
  shortName: string;
  name: string;
  logoUrl: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  nrr: number;
  points: number;
  initialNrr: number;
  recentForm: ('W' | 'L')[];
}

export interface Match {
  id: number;
  matchNo: number;
  date: string;
  day: string;
  team1Id: string;
  team2Id: string;
  winnerId: string | null;
  toss?: string;
  toWin?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PredictorService {
  private readonly initialTeams: Team[] = [
    { id: 'RCB', shortName: 'RCB', name: 'Royal Challengers Bengaluru', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Royal_Challengers_Bengaluru_Logo.svg', matchesPlayed: 11, wins: 7, losses: 4, nrr: 1.103, points: 16, initialNrr: 1.053, recentForm: ['W', 'W', 'L', 'L', 'W'] },
    { id: 'SRH', shortName: 'SRH', name: 'Sunrisers Hyderabad', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/51/Sunrisers_Hyderabad_Logo.svg', matchesPlayed: 12, wins: 7, losses: 5, nrr: 0.737, points: 14, initialNrr: 0.331, recentForm: ['W', 'W', 'L', 'W', 'L'] },
    { id: 'GT', shortName: 'GT', name: 'Gujarat Titans', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/0/09/Gujarat_Titans_Logo.svg', matchesPlayed: 12, wins: 8, losses: 4, nrr: 0.228, points: 16, initialNrr: 0.551, recentForm: ['W', 'W', 'W', 'W', 'W'] },
    { id: 'PBKS', shortName: 'PBKS', name: 'Punjab Kings', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.svg', matchesPlayed: 11, wins: 6, losses: 4, nrr: 0.428, points: 13, initialNrr: 0.355, recentForm: ['W', 'L', 'L', 'L', 'L'] },
    { id: 'CSK', shortName: 'CSK', name: 'Chennai Super Kings', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2b/Chennai_Super_Kings_Logo.svg', matchesPlayed: 11, wins: 6, losses: 5, nrr: 0.185, points: 12, initialNrr: 0.185, recentForm: ['W', 'L', 'W', 'W', 'W'] },
    { id: 'RR', shortName: 'RR', name: 'Rajasthan Royals', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5c/This_is_the_logo_for_Rajasthan_Royals%2C_a_cricket_team_playing_in_the_Indian_Premier_League_%28IPL%29.svg', matchesPlayed: 11, wins: 6, losses: 5, nrr: 0.082, points: 12, initialNrr: 0.082, recentForm: ['W', 'L', 'W', 'L', 'L'] },
    { id: 'KKR', shortName: 'KKR', name: 'Kolkata Knight Riders', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Kolkata_Knight_Riders_Logo.svg', matchesPlayed: 10, wins: 4, losses: 5, nrr: -0.169, points: 9, initialNrr: -0.198, recentForm: ['L', 'W', 'W', 'W', 'W'] },
    { id: 'DC', shortName: 'DC', name: 'Delhi Capitals', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Delhi_Capitals.svg', matchesPlayed: 12, wins: 5, losses: 7, nrr: -0.993, points: 10, initialNrr: -0.993, recentForm: ['L', 'W', 'L', 'L', 'W'] },
    { id: 'MI', shortName: 'MI', name: 'Mumbai Indians', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Mumbai_Indians_Logo.svg', matchesPlayed: 11, wins: 3, losses: 8, nrr: -0.585, points: 6, initialNrr: -0.504, recentForm: ['L', 'L', 'L', 'W', 'L'] },
    { id: 'LSG', shortName: 'LSG', name: 'Lucknow Super Giants', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/3/34/Lucknow_Super_Giants_Logo.svg', matchesPlayed: 11, wins: 3, losses: 8, nrr: -0.907, points: 6, initialNrr: -0.907, recentForm: ['L', 'L', 'L', 'W', 'L'] },
  ];

  private readonly initialMatches: Match[] = [
    { id: 57, matchNo: 57, date: '13-MAY-26', day: 'Wed', team1Id: 'RCB', team2Id: 'KKR', winnerId: 'RCB', toss: 'RCB chose to bowl', toWin: 'RCB won' },
    { id: 58, matchNo: 58, date: '14-MAY-26', day: 'Thu', team1Id: 'PBKS', team2Id: 'MI', winnerId: 'MI', toWin: 'MI won' },
    { id: 59, matchNo: 59, date: '15-MAY-26', day: 'Fri', team1Id: 'LSG', team2Id: 'CSK', winnerId: null },
    { id: 60, matchNo: 60, date: '16-MAY-26', day: 'Sat', team1Id: 'KKR', team2Id: 'GT', winnerId: null },
    { id: 61, matchNo: 61, date: '17-MAY-26', day: 'Sun', team1Id: 'PBKS', team2Id: 'RCB', winnerId: null },
    { id: 62, matchNo: 62, date: '17-MAY-26', day: 'Sun', team1Id: 'DC', team2Id: 'RR', winnerId: null },
    { id: 63, matchNo: 63, date: '18-MAY-26', day: 'Mon', team1Id: 'CSK', team2Id: 'SRH', winnerId: null },
    { id: 64, matchNo: 64, date: '19-MAY-26', day: 'Tue', team1Id: 'RR', team2Id: 'LSG', winnerId: null },
    { id: 65, matchNo: 65, date: '20-MAY-26', day: 'Wed', team1Id: 'KKR', team2Id: 'MI', winnerId: null },
    { id: 66, matchNo: 66, date: '21-MAY-26', day: 'Thu', team1Id: 'GT', team2Id: 'CSK', winnerId: null },
    { id: 67, matchNo: 67, date: '22-MAY-26', day: 'Fri', team1Id: 'SRH', team2Id: 'RCB', winnerId: null },
    { id: 68, matchNo: 68, date: '23-MAY-26', day: 'Sat', team1Id: 'LSG', team2Id: 'PBKS', winnerId: null },
    { id: 69, matchNo: 69, date: '24-MAY-26', day: 'Sun', team1Id: 'MI', team2Id: 'RR', winnerId: null },
    { id: 70, matchNo: 70, date: '24-MAY-26', day: 'Sun', team1Id: 'KKR', team2Id: 'DC', winnerId: null },
  ];

  matches = signal<Match[]>(this.initialMatches);

  pointsTable = computed(() => {
    const currentMatches = this.matches();
    const teamsData: Record<string, Team> = {};

    this.initialTeams.forEach(t => {
      teamsData[t.id] = { ...t, recentForm: [...t.recentForm] };
    });

    currentMatches.forEach(match => {
      if (match.winnerId) {
        const winner = teamsData[match.winnerId];
        const loserId = match.team1Id === match.winnerId ? match.team2Id : match.team1Id;
        const loser = teamsData[loserId];

        winner.matchesPlayed++;
        winner.wins++;
        winner.points += 2;
        winner.recentForm.push('W');
        if (winner.recentForm.length > 5) {
          winner.recentForm.shift();
        }

        loser.matchesPlayed++;
        loser.losses++;
        loser.recentForm.push('L');
        if (loser.recentForm.length > 5) {
          loser.recentForm.shift();
        }
      }
    });

    const table = Object.values(teamsData);
    table.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return b.initialNrr - a.initialNrr;
    });

    return table;
  });

  predictMatch(matchId: number, winnerId: string) {
    this.matches.update(matches => {
      return matches.map(m => {
        if (m.id === matchId) {
          return { ...m, winnerId: m.winnerId === winnerId ? null : winnerId };
        }
        return m;
      });
    });
  }

  getTeam(id: string): Team | undefined {
    return this.initialTeams.find(t => t.id === id);
  }

  reset() {
    this.matches.set(this.initialMatches);
  }
}
