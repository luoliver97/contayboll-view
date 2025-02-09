class Login {
  code: string;
  message: number;
  token: string;

  constructor(code: string, message: number, token: string) {
    this.code = code;
    this.message = message;
    this.token = token;
  }

  imprimir() {
    console.log(`code: ${this.code} y message:${this.message}`);
  }

  getToken() {
    console.log(`code: ${this.code} y message:${this.message}`);
  }
}