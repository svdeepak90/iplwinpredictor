import { Injectable, signal, computed } from '@angular/core';

export interface Team {
  id: string;
  shortName: string;
  name: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  nrr: number;
  points: number;
  initialNrr: number;
}

export interface Match {
  id: number;
  matchNo: number;
  team1Id: string;
  team2Id: string;
  winnerId: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PredictorService {
  private readonly initialTeams: Team[] = [
    { id: 'RCB', shortName: 'RCB', name: 'Royal Challengers Bengaluru', matchesPlayed: 11, wins: 7, losses: 4, nrr: 1.103, points: 14, initialNrr: 1.103 },
    { id: 'SRH', shortName: 'SRH', name: 'Sunrisers Hyderabad', matchesPlayed: 11, wins: 7, losses: 4, nrr: 0.737, points: 14, initialNrr: 0.737 },
    { id: 'GT', shortName: 'GT', name: 'Gujarat Titans', matchesPlayed: 11, wins: 7, losses: 4, nrr: 0.228, points: 14, initialNrr: 0.228 },
    { id: 'PBKS', shortName: 'PBKS', name: 'Punjab Kings', matchesPlayed: 10, wins: 6, losses: 3, nrr: 0.571, points: 13, initialNrr: 0.571 },
    { id: 'CSK', shortName: 'CSK', name: 'Chennai Super Kings', matchesPlayed: 11, wins: 6, losses: 5, nrr: 0.185, points: 12, initialNrr: 0.185 },
    { id: 'RR', shortName: 'RR', name: 'Rajasthan Royals', matchesPlayed: 11, wins: 6, losses: 5, nrr: 0.082, points: 12, initialNrr: 0.082 },
    { id: 'KKR', shortName: 'KKR', name: 'Kolkata Knight Riders', matchesPlayed: 10, wins: 4, losses: 5, nrr: -0.169, points: 9, initialNrr: -0.169 },
    { id: 'DC', shortName: 'DC', name: 'Delhi Capitals', matchesPlayed: 11, wins: 4, losses: 7, nrr: -1.154, points: 8, initialNrr: -1.154 },
    { id: 'MI', shortName: 'MI', name: 'Mumbai Indians', matchesPlayed: 11, wins: 3, losses: 8, nrr: -0.585, points: 6, initialNrr: -0.585 },
    { id: 'LSG', shortName: 'LSG', name: 'Lucknow Super Giants', matchesPlayed: 11, wins: 3, losses: 8, nrr: -0.907, points: 6, initialNrr: -0.907 },
  ];

  private readonly initialMatches: Match[] = [
    { id: 55, matchNo: 55, team1Id: 'PBKS', team2Id: 'DC', winnerId: null },
    { id: 56, matchNo: 56, team1Id: 'GT', team2Id: 'SRH', winnerId: null },
    { id: 57, matchNo: 57, team1Id: 'RCB', team2Id: 'KKR', winnerId: null },
    { id: 58, matchNo: 58, team1Id: 'PBKS', team2Id: 'MI', winnerId: null },
    { id: 59, matchNo: 59, team1Id: 'LSG', team2Id: 'CSK', winnerId: null },
    { id: 60, matchNo: 60, team1Id: 'KKR', team2Id: 'GT', winnerId: null },
    { id: 61, matchNo: 61, team1Id: 'PBKS', team2Id: 'RCB', winnerId: null },
    { id: 62, matchNo: 62, team1Id: 'DC', team2Id: 'RR', winnerId: null },
    { id: 63, matchNo: 63, team1Id: 'CSK', team2Id: 'SRH', winnerId: null },
    { id: 64, matchNo: 64, team1Id: 'RR', team2Id: 'LSG', winnerId: null },
    { id: 65, matchNo: 65, team1Id: 'KKR', team2Id: 'MI', winnerId: null },
    { id: 66, matchNo: 66, team1Id: 'GT', team2Id: 'CSK', winnerId: null },
    { id: 67, matchNo: 67, team1Id: 'SRH', team2Id: 'RCB', winnerId: null },
    { id: 68, matchNo: 68, team1Id: 'LSG', team2Id: 'PBKS', winnerId: null },
    { id: 69, matchNo: 69, team1Id: 'MI', team2Id: 'RR', winnerId: null },
    { id: 70, matchNo: 70, team1Id: 'KKR', team2Id: 'DC', winnerId: null },
  ];

  matches = signal<Match[]>(this.initialMatches);

  pointsTable = computed(() => {
    const currentMatches = this.matches();
    const teamsData: Record<string, Team> = {};
    
    this.initialTeams.forEach(t => {
      teamsData[t.id] = { ...t };
    });

    currentMatches.forEach(match => {
      if (match.winnerId) {
        const winner = teamsData[match.winnerId];
        const loserId = match.team1Id === match.winnerId ? match.team2Id : match.team1Id;
        const loser = teamsData[loserId];

        winner.matchesPlayed++;
        winner.wins++;
        winner.points += 2;

        loser.matchesPlayed++;
        loser.losses++;
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

  reset() {
    this.matches.set(this.initialMatches);
  }
}
