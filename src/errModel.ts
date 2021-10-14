import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorObj {
  response(error, messageOrData) {
    if (error) return { success: false, message: messageOrData };
    else return { success: true, data: messageOrData };
  }
}
