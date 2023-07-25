import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apiservicio } from './apiservicio';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesService {
  comprasApiKerno = environment.comprasApiKerno;
  datos:any;
  total:number;
  paginaActual = 1;
  porPagina = 10;

  constructor(private http: HttpClient) { }

  getTipoCompra(params: string) {
    return this.http.get(this.comprasApiKerno + `/tipo_compra?keyword=`+params);
  }

  getConfiguraciones() {
    return this.http.get(this.comprasApiKerno + `/variables_configuracion?page=0&size=10&sortBy=id&descending=false`);
  }
  public verificarVarConfiguracion(){
    if(this.varConfiguracionValue() == null){
      this.getConfiguraciones().subscribe( data => {
        localStorage.setItem('variables_configuracion', JSON.stringify(data['content']));
          data['content'].forEach(e => {
            if (e.nombre == 'DECIMAL_DIGITOS') {
              localStorage.setItem('digitos_decimales', e.valores);
            }
          });
        });
    }
  }

  public varConfiguracionValue(): any {
    if(localStorage.getItem('variables_configuracion') != null){
      return JSON.parse(localStorage.getItem('variables_configuracion'));
    } else {
      return null;
    }
  }

  public decDigitosValue(): any {
    if(localStorage.getItem('digitos_decimales') != null){
      return localStorage.getItem('digitos_decimales');
    } else {
      return null;
    }
  }
}
