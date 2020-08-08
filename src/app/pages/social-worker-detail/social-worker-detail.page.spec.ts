import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocialWorkerDetailPage } from './social-worker-detail.page';

describe('SocialWorkerDetailPage', () => {
  let component: SocialWorkerDetailPage;
  let fixture: ComponentFixture<SocialWorkerDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialWorkerDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialWorkerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
