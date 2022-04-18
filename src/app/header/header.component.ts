import { Component, OnInit } from '@angular/core';
import { ConverterService } from '../converter.service';
import { Rates } from '../Rates';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private converter: ConverterService) {}

  ngOnInit(): void {
    this.populateRates();
  }

  usdRate = 0;
  eurRate = 0;

  populateRates() {
    this.converter.rates$.subscribe((rates) => {
      this.usdRate = Math.round(rates['USDUAH'] * 100) / 100;
      this.eurRate = Math.round(rates['EURUAH'] * 100) / 100;
    });
  }
}
