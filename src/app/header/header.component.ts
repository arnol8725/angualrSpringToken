import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
 title: string = 'App Angular';
 loggeado : boolean = false;

 

 constructor(private authServices: AuthService,private router: Router){}

 ngOnInit() {
  
  console.log('Header');
    this.loggeado=this.authServices.bandera;

    console.log(this.loggeado);
   
  

}

cerrarSeccion(){
 
  let usuario = this.authServices.usuario.username;
  this.authServices.deleteAuthenticated();
  
  swal('Login',`Hola ${usuario} has  Session con exito !!`,'info');
  console.log(`El valor de la variable username ${this.authServices.usuario.username}`);
  this.router.navigate(['/login']);
  
}

boton(){
 
  console.log('boton');
  this.loggeado=this.authServices.bandera;
  console.log(this.loggeado);
  this.router.navigate(['/login']);

}

}


