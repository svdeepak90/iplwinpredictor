import { Component, inject } from '@angular/core';
import { PredictorService } from '../../services/predictor';
import { PointsTableComponent } from '../points-table/points-table';
import { MatchListComponent } from '../match-list/match-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PointsTableComponent, MatchListComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {
  predictorService = inject(PredictorService);
}
