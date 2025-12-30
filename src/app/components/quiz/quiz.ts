import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
  ],

  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css'],
})
export class QuizComponent implements OnDestroy {
  questions: any[] = [];
  currentQuestion = 0;
  selectedOption: number | null = null;

  timeLeft = 30;
  timer: any;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.currentQuestion = 0;
    this.selectedOption = null;
    this.questions = this.quizService.getQuestions();
    this.quizService.resetScore();
    this.startTimer();
  }

  startTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timeLeft = 30;

    this.timer = setInterval(() => {
      this.timeLeft--;

      this.cdr.detectChanges();

      if (this.timeLeft === 0) {
        clearInterval(this.timer);
        this.goToNextQuestionAutomatically();
      }
    }, 1000);
  }

  goToNextQuestionAutomatically() {
    this.selectedOption = null;
    this.currentQuestion++;

    if (this.currentQuestion >= this.questions.length) {
      this.router.navigate(['/result']);
    } else {
      this.startTimer();
    }
  }

  nextQuestion() {
    // Stop current timer
    clearInterval(this.timer);

    if (Number(this.selectedOption) === Number(this.questions[this.currentQuestion].answer)) {
      this.quizService.score++;
    }

    this.selectedOption = null;
    this.currentQuestion++;

    if (this.currentQuestion >= this.questions.length) {
      this.router.navigate(['/result']);
    } else {
      this.startTimer(); // ⏱ restart timer for next question
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
