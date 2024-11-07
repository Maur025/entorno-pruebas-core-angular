import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ArchivosService {
  //archivosUrl = environment.archivosUrl;
  constructor(
  ) { }

  generarExcel = (function () {
    var a: any = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
      var json = JSON.stringify(data),
        blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;" }),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }());

  generarPDF = (function () {
    var a: any = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
      var json = JSON.stringify(data),
        blob = new Blob([data], { type: "application/pdf" }),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }());

  generar64aPDFByNewWindow = (function () {
    var enlace: any = document.createElement("a");
    document.body.appendChild(enlace);
    return function (data: any, fileName: any) {
      const byteArray = new Uint8Array(
        atob(data)
          .split("")
          .map((char) => char.charCodeAt(0))
      );
      var blob = new Blob([byteArray], { type: "application/pdf" });
      var url = window.URL.createObjectURL(blob);
      enlace.download = fileName;
      enlace.href = url;
      enlace.target = "_blank";
      window.open(url, "_blank");
    };
  })();

  generar64aExcel = (function () {
    var a: any = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
      let sliceSize = 512;
      const byteCharacters = atob(data);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      var blob = new Blob(byteArrays, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;" })
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }());

  generar64aPDF = (function () {
    var a: any = document.createElement("a");
    document.body.appendChild(a);
    return function (data, fileName) {
      const byteArray = new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)));
      var blob = new Blob([byteArray], { type: 'application/pdf' })
      var url = window.URL.createObjectURL(blob);
      a.download = fileName;
      a.href = url;
      a.target = '_blank';
      a.click();
      window.open(url);
      window.URL.revokeObjectURL(url);
    };
  }());
}
