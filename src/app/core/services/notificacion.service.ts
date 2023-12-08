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

  alertError(message) {
    if (typeof message != 'string') {
      let msg = [];
      Object.keys(message).forEach((e, i) => {
        msg.push(`${message[e]} `);
      });
      message = msg.join('<br>');
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

  alertaSimpleConfirmacion(functionCallback,message='¿Esta seguro(a) que desea realizar el registro?'): void {
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
        title: '¿Esta seguro(a) que desea eliminar '+messageValue+' definitivamente?',
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

}
