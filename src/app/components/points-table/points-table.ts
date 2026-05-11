import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictorService } from '../../services/predictor';

@Component({
  selector: 'app-points-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './points-table.html',
  styleUrls: ['./points-table.scss']
})
export class PointsTableComponent {
  predictorService = inject(PredictorService);
  pointsTable = this.predictorService.pointsTable;

  reset() {
    this.predictorService.reset();
  }
}
