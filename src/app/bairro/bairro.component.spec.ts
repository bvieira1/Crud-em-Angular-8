import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BairroComponent } from './bairro.component';


describe('BairroComponent', () => {
  let component: BairroComponent;
  let fixture: ComponentFixture<BairroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BairroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BairroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
