import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

titulo:String = 'Por favor Sign In';
usuario :Usuario;

  constructor(private authServices: AuthService,private router: Router) { 
      this.usuario = new Usuario();
  }

  ngOnInit() {
        if(this.authServices.isAuthenticated()){
          swal('Login',`Hola ${this.authServices.usuario.username} ya estás autenticado `,'info');
          this.router.navigate(['/clientes']);
        }

  }

  login() : void{
     console.log(this.usuario);

     if (this.usuario.username == null || this.usuario.password == null){
       swal('Error Login','Username o password vacias','error');
       return;
     }
    
      this.authServices.login(this.usuario).subscribe(response => {
            console.log(response);
            console.log(response.access_token.split('.')[1]);
            //
            //console.log(`datos: ${payLoad}`);
         

            this.authServices.guardarUsuario(response.access_token);
            this.authServices.guardarToken(response.access_token);
            let usuario = this.authServices.usuario.username;
            
            console.log(`el valor de la respuesta ${this.authServices.bandera}`);
            
            
            swal('Login',`Hola ${this.authServices.usuario.username}, has iniciado session con exito!!`);
            
           this.router.navigate(['/clientes']);
          
          

      }, err =>{
              if(err.status==400){
                swal('Error Login','Username o password incorrectas','error');
              }

      } 
      
      );
     
  }

}
