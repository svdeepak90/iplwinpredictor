import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointsTableComponent } from './components/points-table/points-table';
import { MatchListComponent } from './components/match-list/match-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PointsTableComponent, MatchListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'ipl-simulator';
}
