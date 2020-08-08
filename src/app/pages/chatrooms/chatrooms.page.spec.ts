import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatroomsPage } from './chatrooms.page';

describe('ChatroomsPage', () => {
  let component: ChatroomsPage;
  let fixture: ComponentFixture<ChatroomsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatroomsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatroomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
