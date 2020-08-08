import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserReportsPage } from './user-reports.page';

describe('UserReportsPage', () => {
  let component: UserReportsPage;
  let fixture: ComponentFixture<UserReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
