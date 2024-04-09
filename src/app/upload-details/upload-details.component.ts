import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UploadService } from '../upload.service';
import { MagicByte, magic_bytes_data } from './magic_bytes_data';
import { fileExtensionMimeTypeMap } from './fileExtensionMimeType';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent implements AfterViewInit{

  saveForm: FormGroup = this.formBuilder.group({
    magicBytes: [''],
    fileHex: [''],
    fileExtension: ['']
  });
  bytes: MagicByte[] = magic_bytes_data;
  columnsToDisplay = ['hex', 'file_extension'];
  clickedRow: MagicByte = {};
  dataSource = new MatTableDataSource<MagicByte>(magic_bytes_data);
  isDisabled = true;

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) {
  }

  @ViewChild('paginator')
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  updateClickedRow(row: MagicByte): void {
    if(this.clickedRow==row){
      this.clickedRow = {};
      this.saveForm.patchValue({
        magicBytes: "",
        fileExtension: "",
      });
    } else {
      this.clickedRow = row;
      this.saveForm.patchValue({
        magicBytes: this.clickedRow.hex?.replace(/\s+/g, "").toLocaleLowerCase(),
        fileExtension: this.clickedRow.file_extension?.replace(/\s+/g, ""),
      });
      if(this.saveForm.get("fileHex")?.value){
        this.isDisabled = false;
      }
    }
  }

  manageFile(event: any): void {
    const file:File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      //Reads the uploaded file as an ArrayBuffer
      //Converts that Buffer to a byteArray using Uint8Array
      //Each byte is then converted to hexadecimal with the toString(16) call
      //We use padStart to make sure the hex is two digits
      const hexString = Array.from(new Uint8Array(reader.result as ArrayBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
      this.saveForm.patchValue({
        fileHex: hexString
      })
      if(this.saveForm.get("magicBytes")?.value){
        this.isDisabled = false;
      }
    };

    reader.readAsArrayBuffer(file);
  }

  hexStringToBinary(hexString: string) {
    // Remove any prefix if present (e.g., "0x" for C-style languages)
    // hexString = hexString.trim().toLowerCase().replace("0x", "");

    // Create a dictionary to map hexadecimal digits to their binary representations
    const hexToBin: any = {
      '0': '0000', '1': '0001', '2': '0010', '3': '0011',
      '4': '0100', '5': '0101', '6': '0110', '7': '0111',
      '8': '1000', '9': '1001', 'a': '1010', 'b': '1011',
      'c': '1100', 'd': '1101', 'e': '1110', 'f': '1111'
    };

    // Convert each hexadecimal digit to its binary representation
    const binaryData = Array.from(hexString).map(digit => hexToBin[digit]).join('');

    return binaryData;
  }

  hexStringToBlob(hexString: string, mimeType: string): Blob {
    // Convert the hexadecimal string to binary data
    const binaryData = this.hexStringToBinary(hexString);

    // Convert the binary data to an ArrayBuffer
    const arrayBuffer = new Uint8Array(binaryData.length / 8);
    for (let i = 0; i < binaryData.length; i += 8) {
      arrayBuffer[i / 8] = parseInt(binaryData.substr(i, 8), 2);
    }

    // Create a Blob object from the ArrayBuffer
    return new Blob([arrayBuffer], { type: mimeType });
  }

  downloadFile(result: any, fileExtension: string): void {
    let fileMimeType: string = fileExtensionMimeTypeMap[fileExtension];
    var hexString = result["body"]["event-fileHex"];
    let blob = this.hexStringToBlob(hexString, fileMimeType);
    saveAs(blob, "YourFile"+fileExtension);
  }

  submit(formData: any): void {
    var rawData: any = formData;
    this.uploadService.makeFile(formData).subscribe(
      res => {
        var result: any = res;
        this.downloadFile(result, "." + rawData["fileExtension"]);
      }
    )
  }
}
