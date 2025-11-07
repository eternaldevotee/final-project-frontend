import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentNotificationsComponent } from './agent-notifications.component';
import { ShareloginService } from '../../../core/services/loginstate/sharelogin.service';
import { NotificationServiceService } from '../../../core/services/notification-service.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AgentNotificationModel } from '../../../core/models/AgentNotificationModel';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AgentNotificationsComponent', () => {
  let component: AgentNotificationsComponent;
  let fixture: ComponentFixture<AgentNotificationsComponent>;
  let mockLoginService: jasmine.SpyObj<ShareloginService>;
  let mockNotificationService: jasmine.SpyObj<NotificationServiceService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockLoginService = jasmine.createSpyObj('ShareloginService', ['getUserId']);
    mockNotificationService = jasmine.createSpyObj('NotificationServiceService', ['getNotifications']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AgentNotificationsComponent],
      providers: [
        { provide: ShareloginService, useValue: mockLoginService },
        { provide: NotificationServiceService, useValue: mockNotificationService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentNotificationsComponent);
    component = fixture.componentInstance;
  });

  const mockNotifications: AgentNotificationModel[] = [
    {
      notificationID: 'n1',
      userID: 'admin123',
      type: 'create',
      message: 'Package pkg001 created',
      timestamp: new Date()
    },
    {
      notificationID: 'n2',
      userID: 'admin123',
      type: 'update',
      message: 'Package pkg002 updated',
      timestamp: new Date()
    },
    {
      notificationID: 'n3',
      userID: 'admin123',
      type: 'delete',
      message: 'Package pkg003 deleted',
      timestamp: new Date()
    }
  ];

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch notifications on init', () => {
    mockLoginService.getUserId.and.returnValue('admin123');
    mockNotificationService.getNotifications.and.returnValue(of(mockNotifications));

    component.ngOnInit();

    expect(mockLoginService.getUserId).toHaveBeenCalled();
    expect(mockNotificationService.getNotifications).toHaveBeenCalledWith('admin123');
    expect(component.notifications).toEqual(mockNotifications);
    expect(component.filteredNotifications).toEqual(mockNotifications);
  });

  it('should filter notifications by selected action', () => {
    component.notifications = mockNotifications;
    component.selectedAction = 'update';

    component.applyFilters();

    expect(component.filteredNotifications.length).toBe(1);
    expect(component.filteredNotifications[0].type).toBe('update');
  });

  it('should reset filters when selectedAction is empty', () => {
    component.notifications = mockNotifications;
    component.selectedAction = '';

    component.applyFilters();

    expect(component.filteredNotifications).toEqual(mockNotifications);
  });

  it('should filter notifications by package ID in message', () => {
    component.notifications = mockNotifications;
    component.pkgId = 'pkg002';

    component.filterById();

    expect(component.filteredNotifications.length).toBe(1);
    expect(component.filteredNotifications[0].message).toContain('pkg002');
  });

  it('should navigate back to agent home', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/agent/home']);
  });

  it('should return correct color for notification type', () => {
    expect(component.getTypeColor('create')).toBe('green');
    expect(component.getTypeColor('update')).toBe('orange');
    expect(component.getTypeColor('delete')).toBe('red');
    expect(component.getTypeColor('unknown')).toBe('grey');
  });
});
