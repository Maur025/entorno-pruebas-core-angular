export interface Proveedor {
  codigoProveedor: string;
  razonSocial: string;
  numeroDocumento: string;
}
export interface DataImporAnticipoProveedor {
  filaError: number | null;
  error: boolean | null;
  descripcion: string | null;
  monto: number | null;
  fecha: Date | null;
  centroCosto: string | null;
  nroReferencia: string | null;
  messageError: string | null;
  columnError: { [key: string]: any } | null;
}
export interface DataImporPagosProveedor {
  filaError: number | null;
  error: boolean | null;
  descripcion: string | null;
  tipoDocumento: number | null;
  nroFacturaRecibo: string | null;
  totalCompra: number | null;
  fechaCompra: Date | null;
  centroCosto: string | null;
  montoPagar: number | null;
  fechaPago: Date | null;
  messageError: string | null;
  columnError: { [key: string]: any } | null;
}

export interface Cliente {
  codigoCliente: string;
  razonSocial: string;
  numeroDocumento: string;
}
export interface DataImporAnticipoCliente {
  filaError: number | null;
  error: boolean | null;
  descripcion: string | null;
  monto: number | null;
  fecha: Date | null;
  centroCosto: string | null;
  nroReferencia: string | null;
  messageError: string | null;
  columnError: { [key: string]: any } | null;
}
export interface DataImporCobrosCliente {
  filaError: number | null;
  error: boolean | null;
  descripcion: string | null;
  tipoDocumento: number | null;
  nroFacturaRecibo: string | null;
  totalVenta: number | null;
  fechaVenta: Date | null;
  centroCosto: string | null;
  montoCobrar: number | null;
  fechaCobrar: Date | null;
  messageError: string | null;
  columnError: { [key: string]: any } | null;
}

