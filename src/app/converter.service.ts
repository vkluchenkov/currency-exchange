import { Injectable } from '@angular/core';
import { Input } from './input';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Rates } from './Rates';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  constructor(private http: HttpClient) {}

  private ratesSubj = new BehaviorSubject<Rates>({});
  rates$ = this.ratesSubj.asObservable();

  private baseUrl = 'https://api.exchangerate.host/latest?';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  setRates(data: any) {
    const prevRates = this.ratesSubj.getValue();
    if (data.base === 'UAH')
      this.ratesSubj.next({
        ...prevRates,
        UAHEUR: data.rates.EUR,
        UAHUSD: data.rates.USD,
        EURUAH: 1 / data.rates.EUR,
        USDUAH: 1 / data.rates.USD,
      });
    if (data.base === 'USD')
      this.ratesSubj.next({
        ...prevRates,
        USDEUR: data.rates.EUR,
        EURUSD: 1 / data.rates.EUR,
      });
  }

  getRates(baseCurrency: string) {
    return this.http
      .get<any>(`${this.baseUrl}base=${baseCurrency}&symbols=USD,EUR,UAH`)
      .pipe(
        tap((data) => this.setRates(data)),
        catchError(this.handleError('getRates', {}))
      );
  }

  convertRates(activeInput: Input, passiveInput: Input): number {
    if (activeInput.currency == passiveInput.currency) return activeInput.value;
    const key = activeInput.currency + passiveInput.currency;
    const rate = Math.round(this.ratesSubj.getValue()[key] * 100);
    const inputValue = Math.round(activeInput.value * 100);
    return Math.round((rate * inputValue) / 100) / 100;
  }
}
