import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BancoService } from '../../configuracion/contactobanco/servicios/banco.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';


@Component({
  selector: 'app-seleccion-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.scss']
})
export class BancosComponent implements OnInit {

  constructor(
    private BancoService:BancoService,
    private NotificacionService:NotificacionService
  ){}

  bancos_encontrados:any [] = [];
  bancos_elegidos:any = [] ;
  errores_validacion:any[] = []
  existe:boolean = false;
  keyword:string = '';

  @Input() datosentrada : any;
  @Input() datossalida : any[] = [];

  @Output() datossalidaChange = new EventEmitter<any[]>()
  @Output() completado :any = new EventEmitter();

  ngOnInit(): void {
    BancoService
  }

  buscar (e){
    this.BancoService.getAll(100, 1, 'id', false, this.keyword).subscribe(
      res => {
        res['content'].forEach(element => {
          element.seleccionado = '';
        });
        this.bancos_encontrados = res['content'];
      },
      err => {
        this.NotificacionService.alertError("Error " + JSON.stringify(err));
      }
    );
  }

  validar(){
    this.errores_validacion= [];
    if (this.bancos_elegidos.length==0) this.errores_validacion.push("No se ha selccionado ningun banco");
    if (this.existe) this.errores_validacion.push("El banco no existe");
    if (this.errores_validacion.length>0) return false;
    return true;
  }

  siguiente(event){
    event.stopPropagation();
    this.bancos_elegidos = this.bancos_encontrados.filter( b => b.seleccionado==true );
    if (this.validar()){
      //console.log("bancos_elegidos",this.bancos_elegidos);
      this.datossalidaChange.emit(this.bancos_elegidos);
      this.completado.emit(this.bancos_elegidos);
      console.log("this.completado.emit");
    }else{

      this.NotificacionService.alertError(this.errores_validacion.join("\n\r"));
    }
  }


}
