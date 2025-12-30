import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class AdminComponent {
  // =========================
  // FORM FIELDS
  // =========================
  question: string = '';
  options: string[] = ['', '', '', ''];
  answer: number = 0;

  // =========================
  // QUESTION LIST
  // =========================
  questions: any[] = [];

  // =========================
  // CONSTRUCTOR
  // =========================
  constructor(private quizService: QuizService, private router: Router) {
    this.loadQuestions();
  }

  // =========================
  // LOAD QUESTIONS
  // =========================
  loadQuestions() {
    this.questions = this.quizService.getQuestions();
  }

  // =========================
  // ADD QUESTION
  // =========================
  addQuestion() {
    if (!this.question || this.options.some((opt) => !opt)) {
      alert('Please fill all fields');
      return;
    }

    const newQuestion = {
      id: this.questions.length + 1,
      question: this.question,
      options: [...this.options],
      answer: Number(this.answer),
    };

    this.questions.push(newQuestion);
    this.quizService.saveQuestions(this.questions);

    alert('Question added successfully');

    // reset form
    this.question = '';
    this.options = ['', '', '', ''];
    this.answer = 0;
  }

  // =========================
  // DELETE QUESTION
  // =========================
  deleteQuestion(index: number) {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questions.splice(index, 1);
      this.quizService.saveQuestions(this.questions);
    }
  }

  // =========================
  // NAVIGATE BACK TO QUIZ
  // =========================
  goToQuiz() {
    this.router.navigate(['/']);
  }
}
