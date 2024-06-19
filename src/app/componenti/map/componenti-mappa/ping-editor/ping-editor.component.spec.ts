import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingEditorComponent } from './ping-editor.component';

describe('PingEditorComponent', () => {
  let component: PingEditorComponent;
  let fixture: ComponentFixture<PingEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PingEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
