export class User {
  authorisation: any;
  user: {
      id: number;
      username: string;
      password: string;
      firstName?: string;
      lastName?: string;
      token?: string;
      email: string;
  }
}
export class Log {
  empresa: {
      id: number;
      nombre: string;
  }
}
