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
  recentForm: ('W' | 'L' | 'NR')[];
  isEliminated?: boolean;
  isQualified?: boolean;
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
    { id: 'RCB', shortName: 'RCB', name: 'Royal Challengers Bengaluru', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Royal_Challengers_Bengaluru_Logo.svg', matchesPlayed: 0, wins: 0, losses: 0, nrr: 1.103, points: 0, initialNrr: 1.065, recentForm: ['W', 'W', 'L', 'L', 'W'], isQualified: true },
    { id: 'SRH', shortName: 'SRH', name: 'Sunrisers Hyderabad', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/51/Sunrisers_Hyderabad_Logo.svg', matchesPlayed: 0, wins: 0, losses: 0, nrr: 0.737, points: 0, initialNrr: 0.350, recentForm: ['W', 'W', 'L', 'W', 'L'], isQualified: true },
    { id: 'GT', shortName: 'GT', name: 'Gujarat Titans', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/0/09/Gujarat_Titans_Logo.svg', matchesPlayed: 0, wins: 0, losses: 0, nrr: 0.228, points: 0, initialNrr: 0.400, recentForm: ['W', 'W', 'W', 'W', 'W'], isQualified: true },
    { id: 'PBKS', shortName: 'PBKS', name: 'Punjab Kings', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.svg', matchesPlayed: 0, wins: 0, losses: 0, nrr: 0.428, points: 0, initialNrr: 0.227, recentForm: ['W', 'L', 'L', 'L', 'L'], isQualified: false },
    { id: 'CSK', shortName: 'CSK', name: 'Chennai Super Kings', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2b/Chennai_Super_Kings_Logo.svg', matchesPlayed: 0, wins: 0, losses: 0, nrr: 0.185, points: 0, initialNrr: -0.016, recentForm: ['W', 'L', 'W', 'W', 'W'], isQualified: false },
    { id: 'RR', shortName: 'RR', name: 'Rajasthan Royals', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5c/This_is_the_logo_for_Rajasthan_Royals%2C_a_cricket_team_playing_in_the_Indian_Premier_League_%28IPL%29.svg', matchesPlayed: 0, wins: 0, losses: 0, nrr: 0.082, points: 0, initialNrr: 0.083, recentForm: ['W', 'L', 'W', 'L', 'L'], isQualified: false },
    { id: 'KKR', shortName: 'KKR', name: 'Kolkata Knight Riders', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Kolkata_Knight_Riders_Logo.svg', matchesPlayed: 0, wins: 0, losses: 0, nrr: -0.169, points: 0, initialNrr: -0.038, recentForm: ['L', 'W', 'W', 'W', 'W'] },
    { id: 'DC', shortName: 'DC', name: 'Delhi Capitals', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Delhi_Capitals.svg', matchesPlayed: 0, wins: 0, losses: 0, nrr: -0.993, points: 0, initialNrr: -0.871, recentForm: ['L', 'W', 'L', 'L', 'W'] },
    { id: 'MI', shortName: 'MI', name: 'Mumbai Indians', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Mumbai_Indians_Logo.svg', matchesPlayed: 0, wins: 0, losses: 0, nrr: -0.585, points: 0, initialNrr: -0.504, recentForm: ['L', 'L', 'L', 'W', 'L'], isEliminated: true },
    { id: 'LSG', shortName: 'LSG', name: 'Lucknow Super Giants', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/3/34/Lucknow_Super_Giants_Logo.svg', matchesPlayed: 0, wins: 0, losses: 0, nrr: -0.907, points: 0, initialNrr: -0.702, recentForm: ['L', 'L', 'L', 'W', 'L'], isEliminated: true },
  ];

  private readonly initialMatches: Match[] = [
    { id: 1, matchNo: 1, date: '28-MAR-26', day: 'Sat', team1Id: 'RCB', team2Id: 'SRH', winnerId: 'RCB', toWin: 'RCB won' },
    { id: 2, matchNo: 2, date: '29-MAR-26', day: 'Sun', team1Id: 'MI', team2Id: 'KKR', winnerId: 'MI', toWin: 'MI won' },
    { id: 3, matchNo: 3, date: '30-MAR-26', day: 'Mon', team1Id: 'RR', team2Id: 'CSK', winnerId: 'RR', toWin: 'RR won' },
    { id: 4, matchNo: 4, date: '31-MAR-26', day: 'Tue', team1Id: 'PBKS', team2Id: 'GT', winnerId: 'PBKS', toWin: 'PBKS won' },
    { id: 5, matchNo: 5, date: '01-APR-26', day: 'Wed', team1Id: 'LSG', team2Id: 'DC', winnerId: 'DC', toWin: 'DC won' },
    { id: 6, matchNo: 6, date: '02-APR-26', day: 'Thu', team1Id: 'KKR', team2Id: 'SRH', winnerId: 'SRH', toWin: 'SRH won' },
    { id: 7, matchNo: 7, date: '03-APR-26', day: 'Fri', team1Id: 'CSK', team2Id: 'PBKS', winnerId: 'PBKS', toWin: 'PBKS won' },
    { id: 8, matchNo: 8, date: '04-APR-26', day: 'Sat', team1Id: 'DC', team2Id: 'MI', winnerId: 'DC', toWin: 'DC won' },
    { id: 9, matchNo: 9, date: '04-APR-26', day: 'Sat', team1Id: 'GT', team2Id: 'RR', winnerId: 'RR', toWin: 'RR won' },
    { id: 10, matchNo: 10, date: '05-APR-26', day: 'Sun', team1Id: 'SRH', team2Id: 'LSG', winnerId: 'LSG', toWin: 'LSG won' },
    { id: 11, matchNo: 11, date: '05-APR-26', day: 'Sun', team1Id: 'RCB', team2Id: 'CSK', winnerId: 'RCB', toWin: 'RCB won' },
    { id: 12, matchNo: 12, date: '06-APR-26', day: 'Mon', team1Id: 'KKR', team2Id: 'PBKS', winnerId: 'NR', toWin: 'No Result (Rain)' },
    { id: 13, matchNo: 13, date: '07-APR-26', day: 'Tue', team1Id: 'RR', team2Id: 'MI', winnerId: 'RR', toWin: 'RR won' },
    { id: 14, matchNo: 14, date: '08-APR-26', day: 'Wed', team1Id: 'DC', team2Id: 'GT', winnerId: 'GT', toWin: 'GT won' },
    { id: 15, matchNo: 15, date: '09-APR-26', day: 'Thu', team1Id: 'KKR', team2Id: 'LSG', winnerId: 'LSG', toWin: 'LSG won' },
    { id: 16, matchNo: 16, date: '10-APR-26', day: 'Fri', team1Id: 'RR', team2Id: 'RCB', winnerId: 'RR', toWin: 'RR won' },
    { id: 17, matchNo: 17, date: '11-APR-26', day: 'Sat', team1Id: 'PBKS', team2Id: 'SRH', winnerId: 'PBKS', toWin: 'PBKS won' },
    { id: 18, matchNo: 18, date: '11-APR-26', day: 'Sat', team1Id: 'CSK', team2Id: 'DC', winnerId: 'CSK', toWin: 'CSK won' },
    { id: 19, matchNo: 19, date: '12-APR-26', day: 'Sun', team1Id: 'LSG', team2Id: 'GT', winnerId: 'GT', toWin: 'GT won' },
    { id: 20, matchNo: 20, date: '12-APR-26', day: 'Sun', team1Id: 'MI', team2Id: 'RCB', winnerId: 'RCB', toWin: 'RCB won' },
    { id: 21, matchNo: 21, date: '13-APR-26', day: 'Mon', team1Id: 'SRH', team2Id: 'RR', winnerId: 'SRH', toWin: 'SRH won' },
    { id: 22, matchNo: 22, date: '14-APR-26', day: 'Tue', team1Id: 'CSK', team2Id: 'KKR', winnerId: 'CSK', toWin: 'CSK won' },
    { id: 23, matchNo: 23, date: '15-APR-26', day: 'Wed', team1Id: 'RCB', team2Id: 'LSG', winnerId: 'RCB', toWin: 'RCB won' },
    { id: 24, matchNo: 24, date: '16-APR-26', day: 'Thu', team1Id: 'MI', team2Id: 'PBKS', winnerId: 'PBKS', toWin: 'PBKS won' },
    { id: 25, matchNo: 25, date: '17-APR-26', day: 'Fri', team1Id: 'GT', team2Id: 'KKR', winnerId: 'GT', toWin: 'GT won' },
    { id: 26, matchNo: 26, date: '18-APR-26', day: 'Sat', team1Id: 'RCB', team2Id: 'DC', winnerId: 'DC', toWin: 'DC won' },
    { id: 27, matchNo: 27, date: '18-APR-26', day: 'Sat', team1Id: 'SRH', team2Id: 'CSK', winnerId: 'SRH', toWin: 'SRH won' },
    { id: 28, matchNo: 28, date: '19-APR-26', day: 'Sun', team1Id: 'KKR', team2Id: 'RR', winnerId: 'KKR', toWin: 'KKR won' },
    { id: 29, matchNo: 29, date: '19-APR-26', day: 'Sun', team1Id: 'PBKS', team2Id: 'LSG', winnerId: 'PBKS', toWin: 'PBKS won' },
    { id: 30, matchNo: 30, date: '20-APR-26', day: 'Mon', team1Id: 'GT', team2Id: 'MI', winnerId: 'MI', toWin: 'MI won' },
    { id: 31, matchNo: 31, date: '21-APR-26', day: 'Tue', team1Id: 'SRH', team2Id: 'DC', winnerId: 'SRH', toWin: 'SRH won' },
    { id: 32, matchNo: 32, date: '22-APR-26', day: 'Wed', team1Id: 'LSG', team2Id: 'RR', winnerId: 'RR', toWin: 'RR won' },
    { id: 33, matchNo: 33, date: '23-APR-26', day: 'Thu', team1Id: 'MI', team2Id: 'CSK', winnerId: 'CSK', toWin: 'CSK won' },
    { id: 34, matchNo: 34, date: '24-APR-26', day: 'Fri', team1Id: 'RCB', team2Id: 'GT', winnerId: 'RCB', toWin: 'RCB won' },
    { id: 35, matchNo: 35, date: '25-APR-26', day: 'Sat', team1Id: 'DC', team2Id: 'PBKS', winnerId: 'PBKS', toWin: 'PBKS won' },
    { id: 36, matchNo: 36, date: '25-APR-26', day: 'Sat', team1Id: 'RR', team2Id: 'SRH', winnerId: 'SRH', toWin: 'SRH won' },
    { id: 37, matchNo: 37, date: '26-APR-26', day: 'Sun', team1Id: 'CSK', team2Id: 'GT', winnerId: 'GT', toWin: 'GT won' },
    { id: 38, matchNo: 38, date: '26-APR-26', day: 'Sun', team1Id: 'LSG', team2Id: 'KKR', winnerId: 'KKR', toWin: 'KKR won' },
    { id: 39, matchNo: 39, date: '27-APR-26', day: 'Mon', team1Id: 'DC', team2Id: 'RCB', winnerId: 'RCB', toWin: 'RCB won' },
    { id: 40, matchNo: 40, date: '28-APR-26', day: 'Tue', team1Id: 'PBKS', team2Id: 'RR', winnerId: 'RR', toWin: 'RR won' },
    { id: 41, matchNo: 41, date: '29-APR-26', day: 'Wed', team1Id: 'MI', team2Id: 'SRH', winnerId: 'SRH', toWin: 'SRH won' },
    { id: 42, matchNo: 42, date: '30-APR-26', day: 'Thu', team1Id: 'GT', team2Id: 'RCB', winnerId: 'GT', toWin: 'GT won' },
    { id: 43, matchNo: 43, date: '01-MAY-26', day: 'Fri', team1Id: 'RR', team2Id: 'DC', winnerId: 'DC', toWin: 'DC won' },
    { id: 44, matchNo: 44, date: '02-MAY-26', day: 'Sat', team1Id: 'CSK', team2Id: 'MI', winnerId: 'CSK', toWin: 'CSK won' },
    { id: 45, matchNo: 45, date: '03-MAY-26', day: 'Sun', team1Id: 'SRH', team2Id: 'KKR', winnerId: 'KKR', toWin: 'KKR won' },
    { id: 46, matchNo: 46, date: '03-MAY-26', day: 'Sun', team1Id: 'GT', team2Id: 'PBKS', winnerId: 'GT', toWin: 'GT won' },
    { id: 47, matchNo: 47, date: '04-MAY-26', day: 'Mon', team1Id: 'MI', team2Id: 'LSG', winnerId: 'MI', toWin: 'MI won' },
    { id: 48, matchNo: 48, date: '05-MAY-26', day: 'Tue', team1Id: 'DC', team2Id: 'CSK', winnerId: 'CSK', toWin: 'CSK won' },
    { id: 49, matchNo: 49, date: '06-MAY-26', day: 'Wed', team1Id: 'SRH', team2Id: 'PBKS', winnerId: 'SRH', toWin: 'SRH won' },
    { id: 50, matchNo: 50, date: '07-MAY-26', day: 'Thu', team1Id: 'LSG', team2Id: 'RCB', winnerId: 'LSG', toWin: 'LSG won' },
    { id: 51, matchNo: 51, date: '08-MAY-26', day: 'Fri', team1Id: 'DC', team2Id: 'KKR', winnerId: 'KKR', toWin: 'KKR won' },
    { id: 52, matchNo: 52, date: '09-MAY-26', day: 'Sat', team1Id: 'RR', team2Id: 'GT', winnerId: 'GT', toWin: 'GT won' },
    { id: 53, matchNo: 53, date: '10-MAY-26', day: 'Sun', team1Id: 'CSK', team2Id: 'LSG', winnerId: 'CSK', toWin: 'CSK won' },
    { id: 54, matchNo: 54, date: '10-MAY-26', day: 'Sun', team1Id: 'RCB', team2Id: 'MI', winnerId: 'RCB', toWin: 'RCB won' },
    { id: 55, matchNo: 55, date: '11-MAY-26', day: 'Mon', team1Id: 'PBKS', team2Id: 'DC', winnerId: 'DC', toWin: 'DC won' },
    { id: 56, matchNo: 56, date: '12-MAY-26', day: 'Tue', team1Id: 'GT', team2Id: 'SRH', winnerId: 'GT', toWin: 'GT won' },
    { id: 57, matchNo: 57, date: '13-MAY-26', day: 'Wed', team1Id: 'RCB', team2Id: 'KKR', winnerId: 'RCB', toss: 'RCB chose to bowl', toWin: 'RCB won' },
    { id: 58, matchNo: 58, date: '14-MAY-26', day: 'Thu', team1Id: 'PBKS', team2Id: 'MI', winnerId: 'MI', toWin: 'MI won' },
    { id: 59, matchNo: 59, date: '15-MAY-26', day: 'Fri', team1Id: 'LSG', team2Id: 'CSK', winnerId: 'LSG', toWin: 'LSG won' },
    { id: 60, matchNo: 60, date: '16-MAY-26', day: 'Sat', team1Id: 'KKR', team2Id: 'GT', winnerId: 'KKR', toWin: 'KKR won' },
    { id: 61, matchNo: 61, date: '17-MAY-26', day: 'Sun', team1Id: 'PBKS', team2Id: 'RCB', winnerId: 'RCB', toWin: 'RCB won' },
    { id: 62, matchNo: 62, date: '17-MAY-26', day: 'Sun', team1Id: 'DC', team2Id: 'RR', winnerId: 'DC', toWin: 'DC won' },
    { id: 63, matchNo: 63, date: '18-MAY-26', day: 'Mon', team1Id: 'CSK', team2Id: 'SRH', winnerId: 'SRH', toWin: 'SRH won' },
    { id: 64, matchNo: 64, date: '19-MAY-26', day: 'Tue', team1Id: 'RR', team2Id: 'LSG', winnerId: 'RR', toWin: 'RR won' },
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
      if (match.winnerId === 'NR') {
        const team1 = teamsData[match.team1Id];
        const team2 = teamsData[match.team2Id];

        team1.matchesPlayed++;
        team1.points += 1;
        team1.recentForm.push('NR');
        if (team1.recentForm.length > 5) team1.recentForm.shift();

        team2.matchesPlayed++;
        team2.points += 1;
        team2.recentForm.push('NR');
        if (team2.recentForm.length > 5) team2.recentForm.shift();
      } else if (match.winnerId) {
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
