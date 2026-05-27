import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { PredictorService } from './services/predictor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  predictorService = inject(PredictorService);
  
  onYearChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.predictorService.selectedYear.set(Number(select.value));
  }
}
