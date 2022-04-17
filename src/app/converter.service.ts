import { Injectable } from '@angular/core';
import { Input } from './input';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  constructor(private http: HttpClient) {}

  rates: any = {};

  private baseUrl = 'https://api.exchangerate.host/latest?';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  setRates(data: any) {
    if (data.base === 'UAH') {
      this.rates['UAHEUR'] = data.rates.EUR;
      this.rates['UAHUSD'] = data.rates.USD;
      this.rates['EURUAH'] = 1 / data.rates.EUR;
      this.rates['USDUAH'] = 1 / data.rates.USD;
    }
    if (data.base === 'USD') {
      this.rates['USDEUR'] = data.rates.EUR;
      this.rates['EURUSD'] = 1 / data.rates.EUR;
    }
    return this.rates;
  }

  getRates(baseCurrency: string) {
    return this.http
      .get<any>(`${this.baseUrl}base=${baseCurrency}&symbols=USD,EUR,UAH`)
      .pipe(
        tap((data) => this.setRates(data)),
        catchError(this.handleError('getHeroes', {}))
      );
  }

  convertRates(activeInput: Input, passiveInput: Input): number {
    if (activeInput.currency == passiveInput.currency) return activeInput.value;

    const key = activeInput.currency + passiveInput.currency;
    const rate = Math.round(this.rates[key] * 100);
    const inputValue = Math.round(activeInput.value * 100);
    return Math.round((rate * inputValue) / 100) / 100;
  }
}
