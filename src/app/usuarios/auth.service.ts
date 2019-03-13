import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {URLSearchParams} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario:Usuario;
  private _token: string;
  private _bandera: boolean;

  constructor(private http:HttpClient) {
      this._bandera=this.isAuthenticated();
   }

  public get bandera():boolean{
    this._bandera=this.isAuthenticated();
      return this._bandera;
  }
  

  public get usuario():Usuario{
    if (this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario')){
        this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
        return this._usuario;
    }
    return new Usuario();
      
  }
public get token():string{
  if (this._token != null){
    return this._token;
  }else if(this._token == null && sessionStorage.getItem('token')){
      this._token = sessionStorage.getItem('token');
      return this._token;
  }
  return null;
}

public set usuario(usuario:Usuario):void{
    this._usuario=usuario;
}
public set token(accessToken: string):void {
  this._token=accessToken;
}

  login(usuario:Usuario): Observable<any>{
    const urlEndpoint = 'http://localhost:8061/oauth/token';
    const credenciales = btoa('angularapp'+':'+'12345');
    const httpHeaders = new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'Basic '+credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.username);
    params.set('password',usuario.password);
    console.log(params.toString());
    
    return this.http.post<any>(urlEndpoint,params.toString(),{headers: httpHeaders})

  }

  guardarUsuario(accessToken:string):void{
        this._usuario= new Usuario();
        
        let payLoad= this.obtenerDatosToken(accessToken);
      
        this._usuario.nombre=payLoad.nombre;
        this._usuario.apellido=payLoad.apellido;
        this._usuario.email=payLoad.email;
        this._usuario.username=payLoad.user_name;
        this._usuario.roles=payLoad.authorities;
        
        sessionStorage.setItem('usuario',JSON.stringify(this._usuario));

  }
  guardarToken(accessToken:string):void{
    this._token = accessToken;
    sessionStorage.setItem('token',accessToken);

  }

  eliminarUsuario(){
    sessionStorage.setItem('usuario',null);
  }
  eliminarToken(){
    sessionStorage.setItem('token',null);
  }


  obtenerDatosToken(accessToken:string):any{
    //  let payLoad=JSON.parse(atob(accessToken.split('.')[1]));
        if (accessToken!= null){
                return JSON.parse(atob(accessToken.split('.')[1]));
        }

        return null;
  }

  isAuthenticated():boolean{
    let salida = false;
    try {
      let payload = this.obtenerDatosToken(this.token);
      if (payload != null && payload.user_name && payload.user_name.length >0){
        salida=true;
      }
    } catch (error) {
      
    }
   
      return salida;
  }
  deleteAuthenticated():void{
    
   
    this._usuario = null;
    this._token = null;
    sessionStorage.clear();
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
}



}
