import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './result.html',
  styleUrls: ['./result.css'],
})
export class ResultComponent {
  score: number;
  total: number;

  percentage = 0;
  status = '';

  constructor(private quizService: QuizService, private router: Router) {
    this.score = quizService.score;
    this.total = quizService.getQuestions().length;

    this.percentage = (this.score / this.total) * 100;
    this.status = this.percentage >= 40 ? 'PASS' : 'FAIL';
  }

  restartQuiz() {
    this.quizService.restartQuiz();
    this.router.navigate(['/']);
  }
}
