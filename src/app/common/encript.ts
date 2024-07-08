import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
declare var $: any

@Injectable()
export class Encript {
  a2hex(str: string) {
    const arr = [];
    for (let i = 0, l = str.length; i < l; i++) {
      const hex = Number(str.charCodeAt(i)).toString(16);
      arr.push(hex);
    }
    return arr.join('');
  }
  dehex2(hexx: string) {
    const hex = hexx.toString(); // force conversion
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }
  a2oct(str: string) {
    const arr = [];
    for (let i = 0, l = str.length; i < l; i++) {
      const hex = Number(str.charCodeAt(i)).toString(8);
      arr.push(hex);
    }
    return arr.join('');
  }
  deoct2(hexx: string) {
    const hex = hexx.toString(); // force conversion
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 8));
    }
    return str;
  }
  encriptar(value: string): string | null {
    let newLetter = '';
    // valor string a base 64
    value = btoa(value);
    // valor de base 64 a hexadecimal
    value = this.a2hex(value);
    // value = this.a2oct(value);
    // valor de hexadecimal a octal
    // value = (Number(this.a2oct(value)) * 7) + '';
    // valor hexadecimal con el salt a base 64
    const salt = environment.salt.trim();
    value = btoa(btoa(value) + '@:@' + salt);
    // newLetter = value ? CryptoJS.AES.encrypt(value, salt, {
    //   keySize: 128 / 8,
    //   mode: CryptoJS.mode.CTR
    // }).toString() : null;
    newLetter = value;
    return newLetter;
  }
  desencriptar(value: string | null): string | null {
    let newLetter = '';
    let compare = false;
    if (value) {
      try {
        const salt = environment.salt.trim();
        // get valor con salt
        value = atob(value);
        // compare salt
        const newSalt = value.split('@:@')[1];
        value = value.split('@:@')[0];
        compare = newSalt === salt;
        // get valor octal
        value = atob(value);
        // valor de octal a hexadecimal
        //  value =this.deoct2(value);
        //  value = (Number(this.dehex2(value)) / 7) + '';
        // valor de hexadecimal a base 64
        value = this.dehex2(value);
        // valor de hexadecimal decifrar base 64
        value = atob(value);
        // valor hexadecimal con el salt a base 64
        // value = CryptoJS.AES.decrypt(value, salt, {
        //   keySize: 128 / 8,
        //   mode: CryptoJS.mode.CTR
        // }).toString(CryptoJS.enc.Utf8);
        // newLetter = value ? CryptoJS.enc.Base64.parse(value).toString(CryptoJS.enc.Utf8) : null
      } catch (e) {
        return null;
      }
      newLetter = value;
    }
    return compare ? newLetter : null;
  }

  decode(value: string | any): any {
    if (value.data && typeof value.data === 'string') {
      value.data = JSON.parse(value.data);
    } else if (typeof value === 'string') {
      value = JSON.parse(value);
    }
    return value;
  }

  encode(value: any): string {
    if (value.data && typeof value.data !== 'string') {
      value.data = JSON.stringify(value.data);
    } else if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    return value;
  }
}
