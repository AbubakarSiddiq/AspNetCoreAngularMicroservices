import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;

  constructor(private http: HttpClient)
  {}

  public incrementCounter() {
    //this.currentCount++;
    this.http.get(`http://localhost:8010/Catalog`)
    .subscribe((response: any) => {
      console.log(response);
	  });
  }
}
