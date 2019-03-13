import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirecion',
  templateUrl: './redirecion.component.html',
  styleUrls: ['./redirecion.component.css']
})
export class RedirecionComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit() {
    console.log('Entro en el metodo RedirecionComponent');
    this.router.navigate(['/clientes']);
  }

}
