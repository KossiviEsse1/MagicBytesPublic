import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadDetailsComponent } from './upload-details.component';
import { MagicByte } from './magic_bytes_data';
import { FormBuilder } from '@angular/forms';
import { UploadService } from '../upload.service';

describe('UploadDetailsComponent', () => {
  const spy = jasmine.createSpyObj('UploadService', ['makeFile']);
  let component: UploadDetailsComponent;
  let fixture: ComponentFixture<UploadDetailsComponent>;
  let uploadService: jasmine.SpyObj<UploadService>;
  let magicByte: MagicByte = {ascii: "....",
    description: "RedHat Package Manager (RPM) package",
    file_extension: "rpm",
    hex: "ed ab ee db",
    offset: "0"};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDetailsComponent ],
      providers: [ FormBuilder, { provide: UploadService, useValue: spy } ]
    })
    .compileComponents();
    uploadService = TestBed.inject(UploadService) as jasmine.SpyObj<UploadService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create UploadDetailsComponent', () => {
    expect(component).toBeDefined();
  });

  it('updateClickedRow() should update clickedRow with selected magicByte', () => {
    component.updateClickedRow(magicByte);
    expect(component.clickedRow).toEqual(magicByte);
  });

  it('updateClickedRow() should populate saveForm fields when clicked', () => {
    component.updateClickedRow(magicByte);
    expect(component.saveForm.controls['magicBytes'].value)
    .toEqual(magicByte.hex?.replace(/\s+/g, "").toLocaleLowerCase());
    expect(component.saveForm.controls['fileExtension'].value)
    .toEqual(magicByte.file_extension?.replace(/\s+/g, "").toLocaleLowerCase());
  });

  it('updateClickedRow() should depopulate saveForm fields when clicked twice', () => {
    component.updateClickedRow(magicByte);
    component.updateClickedRow(magicByte);
    expect(component.saveForm.controls['magicBytes'].value).toEqual("");
    expect(component.saveForm.controls['fileExtension'].value).toEqual("");
  });

  it('updateClickedRow() should make clickedRow empty when clicked twice', () => {
    component.updateClickedRow(magicByte);
    expect(component.clickedRow).toEqual(magicByte);
    component.updateClickedRow(magicByte);
    expect(component.clickedRow).toEqual({});
  });

  it('updateClickedRow() should set isDisabled to true with empty fileHex', () => {
    component.updateClickedRow(magicByte);
    expect(component.saveForm.controls['fileHex'].value).toEqual("");
    expect(component.isDisabled).toEqual(true);
  });

  it('updateClickedRow() should set isDisabled to false with populated fileHex', () => {
    component.saveForm.patchValue({
      fileHex: "oijawefop208950q39485-340582-34980341"
    });
    component.updateClickedRow(magicByte);
    expect(component.isDisabled).toEqual(false);
    component.saveForm.patchValue({
      fileHex: ""
    });
  });

  it('hexStringToBinary() should return binary String for hexString input', () => {
    let hexString = "0123456789abcdef";
    let binaryString = "0000000100100011010001010110011110001001101010111100110111101111";
    expect(component.hexStringToBinary(hexString)).toEqual(binaryString);
  });

  it('hexStringToBlob() should return new Blob for hexString input', () => {
    let hexString = "0123456789abcdef";
    let arrayBuff = new Uint8Array([1, 35, 69, 103, 137, 171, 205, 239]);
    let newBlog = new Blob([arrayBuff], {type: "image/jpg"});
    expect(component.hexStringToBlob(hexString, "image/jpg")).toEqual(newBlog);
  });

  //Todo: Test manageFile(), downloadFile(), and submit()

});

