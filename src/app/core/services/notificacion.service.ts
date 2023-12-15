import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NotificacionService {
  constructor(
    public toastService: ToastrService,
    public authServices: AuthenticationService,
    private router: Router,
  ) { }

  alertError(ErrorResponse) {
    let message = '';
    var extramsg = '';
    let llamado_accion = null;

    if (typeof ErrorResponse != 'string') {
      let msg = [];
      let codigo = parseInt(ErrorResponse.status);
      extramsg = ErrorResponse.error != undefined ? ErrorResponse.error.message : '';
      message = this.getMessageCodeError(msg, codigo, extramsg, llamado_accion);

    }

    const errorMessageAlert = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });
    errorMessageAlert
      .fire({
        title: 'Error',
        html: message,
        icon: 'warning',
        confirmButtonText: 'Entiendo',
        showCancelButton: false
      }).then((result) => {
        if (result.isConfirmed && llamado_accion != null) {
          llamado_accion();
        }
      });

  }

  successStandar(text = "Registrado exitosamente.") {
    this.toastService.success(text, '', { timeOut: 10000 });
  }

  dangerStandar(text = "No se pudo registrar.") {
    this.toastService.error(text, '', { timeOut: 10000 });
  }

  warningStandar(text = "No se pudo registrar.") {
    this.toastService.warning(text, '', { timeOut: 10000 });
  }

  closetoast() {
    this.toastService.clear()
  }

  closelasttoast() {
    this.toastService.remove(this.toastService.currentlyActive)
  }

  inhabilitarAlerta(messageValue = "inhabilitar", functionCallback): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Esta seguro que desea ' + messageValue + ' el registro?',
        icon: 'warning',
        confirmButtonText: 'Sí, ' + messageValue,
        cancelButtonText: 'No, cancelar',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          functionCallback(true);
        } else {
          functionCallback(false);
        }
      });
  }

  alertaSimpleConfirmacion(functionCallback, message = '¿Esta seguro(a) que desea realizar el registro?'): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: message,
        icon: 'warning',
        confirmButtonText: 'Sí, registrar',
        cancelButtonText: 'No, cancelar',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          functionCallback(true);
        } else {
          functionCallback(false);
        }
      });
  }

  alertaEliminacion(messageValue = "el registro", functionCallback): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Esta seguro(a) que desea eliminar ' + messageValue + ' definitivamente?',
        icon: 'warning',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          functionCallback(true);
        } else {
          functionCallback(false);
        }
      });
  }

  warningMessage(mensaje) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: mensaje,
      confirmButtonText: "Aceptar",
    })
  }

  alertInhabilitarCierreApertura(estado, functionCallback): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons
      .fire({
        icon: 'warning',
        input: 'textarea',
        inputLabel: 'Por favor, introduzca el motivo de ' + estado + '.',
        inputPlaceholder: '...',
        confirmButtonText: 'Si, registrar',
        cancelButtonText: 'No, cancelar',
        showCancelButton: true,
        inputValidator: (value) => {
          return (!value || value.length < 4) && 'Debe introducir un motivo valido (minimo 4 carácteres). '
        }
      })
      .then(result => {
        functionCallback(result);
      });
  }

  alertaSimpleConfirmacionBoton(message, confirmButton, functionCallback): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: message,
        icon: 'warning',
        confirmButtonText: confirmButton,
        cancelButtonText: 'No, cancelar',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          functionCallback(true);
        } else {
          functionCallback(false);
        }
      });
  }

  alertErrorOperacion(operacion, mensaje) {

    Swal.fire({
      icon: 'error',
      title: 'La operación de ' + operacion + ' ha fallado',
      text: mensaje,
      confirmButtonText: "Aceptar",
    })
  }

  getMessageCodeError(msg: string[] = [], codigo: number, extramsg: any, llamado_accion: any): string {
    let message = '';
    switch (codigo) {
      case 0:
        msg.push(`El Servidor no pudo obtener una respuesta a la solicitud`);
        msg.push(`Es posible que el servicio no este disponible`);
        llamado_accion = () => { window.location.href = '/'; }
        break
      case 400:
        msg.push(`Se ha producido un inconveniente y el servidor ha respondido con el(los) siguiente(s) error(es):`);
        break;
      case 401:

        msg.push(`Usuario no autorizado, por favor inicie su sesión nuevamente.`);
        llamado_accion = () => window.location.reload();
        break;
      case 403:
        msg.push(`Usuario no tiene los permisos necesarios `);
        break;

      case 404:
        msg.push(`No se puedo encontrar el contenido solicitado `);
        break;
      case 500:
        console.log('New');
        msg.push(`Error interno en servidor, no puede Intepretar, o el servicio no se encuentra disponible  `);
        break;
      case 505:
        msg.push(`La versión de HTTP usada en la petición no está soportada por el servidor. `);
        console.log('New');
        break;

      default:
        msg.push(`No se podido procesar su petición, refresque la pagina e intente nuevamente `);
        llamado_accion = () => window.location.reload();
        break
    }
    msg.push(extramsg);
    message = msg.join('<br>');
    return message;
  }

}
