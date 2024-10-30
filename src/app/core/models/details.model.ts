export enum TypeErrorEnum {
  WARNING = "WARNING",
  DANGER = "DANGER",
}

export enum FileTypeEnum {
  pdf = "pdf",
  xlsx = "xlsx",
}

export enum ActionTypeEnum {
  exportar = "exportar",
  importar = "importar",
}

export interface ItemOptionInterface {
  label: string;
  icon?: string;
  image?: string;
  stateImage: boolean;
  accion: ActionTypeEnum;
  archivo: FileTypeEnum;
  endPoint?: string;
  paramsEndPoint?: { [key: string]: any };
  id?: number;
}
