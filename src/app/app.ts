import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {}
