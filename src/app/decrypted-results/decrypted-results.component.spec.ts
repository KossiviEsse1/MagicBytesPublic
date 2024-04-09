import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecryptedResultsComponent } from './decrypted-results.component';

describe('DecryptedResultsComponent', () => {
  let component: DecryptedResultsComponent;
  let fixture: ComponentFixture<DecryptedResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecryptedResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecryptedResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
