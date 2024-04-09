import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  @ViewChild('titleSection', { read: ElementRef }) titleSection: ElementRef = new ElementRef("");
  @ViewChild('navBarSection', { read: ElementRef }) navBarSection: ElementRef = new ElementRef("");
  @ViewChild('appSection', { read: ElementRef }) appSection: ElementRef = new ElementRef("");

  constructor(private renderer: Renderer2){}

  title = 'magic-bytes-updated';

  ngOnInit(): void {
  }

  @HostListener('window:resize', [])
  onResize() {
    this.setAppDimensions();
  }

  ngAfterViewChecked(): void {
    this.setAppDimensions();
  }

  setAppDimensions() {
    let height = `${this.titleSection.nativeElement.firstChild.offsetHeight}px`;
    let leftMargin = `${this.navBarSection.nativeElement.firstChild.firstChild.offsetWidth}px`;
    this.renderer.setStyle(this.titleSection.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.titleSection.nativeElement, 'z-index', 10000);
    this.renderer.setStyle(this.navBarSection.nativeElement.firstChild.firstChild, 'margin-top', height);
    this.renderer.setStyle(this.appSection.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.appSection.nativeElement, 'top', height);
    this.renderer.setStyle(this.appSection.nativeElement, 'margin-left', leftMargin);
    this.renderer.setStyle(this.appSection.nativeElement, 'z-index', 10);
  }

}
