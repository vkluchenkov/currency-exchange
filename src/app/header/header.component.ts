import { Component, OnInit } from '@angular/core';
import { ConverterService } from '../converter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private converter: ConverterService) {}

  ngOnInit(): void {
    console.log(this.converter.rates);
  }

  // usdRate = this.converter.rates.USDUAH;
  // eurRate = this.converter.rates.EURUAH;
}
