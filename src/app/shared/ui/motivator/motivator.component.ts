import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-motivator',
  standalone: false,
  templateUrl: './motivator.component.html',
  styleUrl: './motivator.component.css'
})
export class MotivatorComponent implements OnInit {

 quotes: string[] = [
    "✨ 92% of travelers choose packages with personalized touches. Let’s make yours unforgettable.",
    "🌍 Travel agents who personalize packages see 3x more repeat bookings.",
    "📦 Your next package could be someone's dream vacation—make it count!",
    "🚀 Agents who update packages weekly increase visibility by 45%.",
    "💡 A small tweak can turn a good itinerary into a great experience."
  ];

  currentQuote: string = '';
  index : number = 0;

  ngOnInit(): void {
    this.currentQuote = this.quotes[this.index];
    setInterval(() => {
      this.index = (this.index + 1) % this.quotes.length;
      this.currentQuote = this.quotes[this.index];
    }, 3000)
  }
}
