import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpCentersPage } from './help-centers.page';

describe('HelpCentersPage', () => {
  let component: HelpCentersPage;
  let fixture: ComponentFixture<HelpCentersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpCentersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpCentersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
