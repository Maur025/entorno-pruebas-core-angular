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


  /* readXLSX(event: any, type: string, functionCallback): void {
    if(type == event['target']['files'][0].type){
      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1) {
        throw new Error('Cannot use multiple files');
      }
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(target.files[0]);
      reader.onload = (e: any) => {
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        functionCallback(data);
      };
    }else{
      functionCallback(['error',"El archivo no corresponde con el formato requerido."]);
    }
 } */
  /*
   generarArchivo = (function () {
    return function (data, fileName) {
      const a: any = document.createElement('a');
        a.href = environment.archivosUrl+'/'+data.ruta;
        a.download = fileName;
        document.body.appendChild(a);
        a.style = 'display: none';
        a.target = '_blank';
        a.click();
        a.remove();;
    };
  }()); */


}
