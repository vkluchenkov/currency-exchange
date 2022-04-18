import { Component, OnInit } from '@angular/core';
import { ConverterService } from '../converter.service';
import { Input } from '../input';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit {
  constructor(private converter: ConverterService) {}

  ngOnInit(): void {
    this.converter.getRates('UAH').subscribe();
    this.converter.getRates('USD').subscribe();
  }

  input1: Input = {
    value: 1,
    currency: 'USD',
  };

  input2: Input = {
    value: 1,
    currency: 'USD',
  };

  log() {
    console.log(this.input2);
  }

  convert(inputName: string): void {
    let activeInput = this.input1;
    let passiveInput = this.input2;

    if (inputName === 'input2') {
      activeInput = this.input2;
      passiveInput = this.input1;
    }
    passiveInput.value = this.converter.convertRates(activeInput, passiveInput);
  }
}
