import { Component, Input } from '@angular/core';
import { read, utils, writeFileXLSX,WorkBook,WorkSheet } from 'xlsx';

interface President { Name: string; Index: number };
@Component({
  selector: 'app-importar-fondo',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.scss']
})

export class ImportarComponent {

  @Input() datosService : any;
  @Input() search : string = "" ;

  rows: President[] = [ { Name: "SheetJS", Index: 0 }];
  data:any;

  ngOnInit(): void { (async() => {
    /* Download from https://sheetjs.com/pres.numbers */
   /* const f = await fetch("https://sheetjs.com/pres.numbers");
    const ab = await f.arrayBuffer();

    const wb = read(ab);

    this.rows = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]]);*/
    this.datosService.getAll(-1,1,1, );
  })(); }
  /* get state data and export to XLSX */
  onSave(): void {
    const ws = utils.json_to_sheet(this.data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "SheetJSAngularAoO.xlsx");
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const ab: ArrayBuffer = e.target.result;
      const wb: WorkBook = read(ab);

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = utils.sheet_to_json(ws, {header: 1});

      console.log(this.data);
    };
    reader.readAsArrayBuffer(target.files[0]);
  }
}
