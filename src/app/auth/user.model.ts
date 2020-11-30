export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date){}

    get token(): string {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }

        return this._token;
    }

    get expirationDuration(): number {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate || !this.token) {
            return -1;
        }

        return new Date(this._tokenExpirationDate).getTime() - new Date().getTime();
    }
}
