import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have 'magic-bytes-updated' as title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('magic-bytes-updated');
  });

  it('should call setAppDimensions', () => {
    const fixture = TestBed.createComponent(AppComponent);
    let component: AppComponent = fixture.componentInstance;
    spyOn(component, 'setAppDimensions');
    component.ngAfterViewChecked();
    expect(component.setAppDimensions).toHaveBeenCalled();
  });

});
