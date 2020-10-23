import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  unidades = [{ value: 'Cachorros' }, { value: 'Lobatos' },
   { value: 'Webelos' }, { value: 'Tropa' }, { value: 'Sociedad' },
    { value: 'Clan' }, { value: 'Consejo' }, { value: 'Jefatura Grupo' }];

  constructor() { }

  ngOnInit(): void {
  }

}
