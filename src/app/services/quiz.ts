import { Injectable } from '@angular/core';
import defaultQuestions from '../../assets/questions.json';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  score = 0;

  getQuestions() {
    const stored = localStorage.getItem('questions');
    return stored ? JSON.parse(stored) : defaultQuestions;
  }

  saveQuestions(questions: any[]) {
    localStorage.setItem('questions', JSON.stringify(questions));
  }

  resetScore() {
    this.score = 0;
  }

  restartQuiz() {
    this.score = 0;
  }
}
