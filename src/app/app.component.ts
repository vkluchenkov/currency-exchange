import { Component, OnInit } from '@angular/core';
import { ConverterService } from './converter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private converter: ConverterService) {}
  ngOnInit(): void {
    this.converter.getRates('UAH').subscribe();
    this.converter.getRates('USD').subscribe();
  }

  title = 'currency-exchange';
}
