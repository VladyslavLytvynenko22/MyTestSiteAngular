import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
    lastLog: string;
    count = 0;

    printLog(message: string): void {
        this.count++;
        console.log(message + this.count);
        console.log(this.lastLog + this.count);
        this.lastLog = message + this.count;
    }
}
