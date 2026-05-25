import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { PlayoffsComponent } from './components/playoffs/playoffs';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'playoffs', component: PlayoffsComponent },
  { path: '**', redirectTo: '' }
];
