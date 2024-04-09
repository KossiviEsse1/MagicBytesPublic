import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
  })
};

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  public baseURL:string = 'https://o7dim135id.execute-api.us-east-2.amazonaws.com/test/decrypt';
  constructor( private http: HttpClient) { }

  makeFile(data_: any){
      let params3 = {
        key: "fileDecrypter",
        fileHex: data_.fileHex,
        magicBytes: data_.magicBytes
      };
      return this.http.post(this.baseURL, params3, httpOptions);
  }
}
