import { Component } from '@angular/core';

import { PointsTableComponent } from './components/points-table/points-table';
import { MatchListComponent } from './components/match-list/match-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PointsTableComponent, MatchListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  title = 'ipl-simulator';
}
