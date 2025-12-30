import { Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz';
import { ResultComponent } from './components/result/result';
import { AdminComponent } from './components/admin/admin';

export const routes: Routes = [
  { path: '', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: 'admin', component: AdminComponent } // ✅ new
];
