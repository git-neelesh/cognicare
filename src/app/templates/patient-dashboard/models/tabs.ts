export interface BottomTabItem {
  id: string;
  stateMachine: string;
  artboard: string;
  status: boolean;
  show: boolean;
  svg?:string
  route?: string;

}

export const tabItemsList: BottomTabItem[] = [
  {
    id: 'tab_home',
    stateMachine: 'HOME_Interactivity',
    artboard: 'HOME',
    status: false,
    show: false,
    svg:'home-outline',
    route: 'patient-dashboard'
  },
  {
    id: 'tab_music',
    stateMachine: 'MUSIC_Interactivity',
    artboard: 'MUSIC',
    status: false,
    show: false,
    svg:'musical-notes-outline',
    route: 'patient-dashboard/music'  

  },
  {
    id: 'tab_recognize',
    stateMachine: 'CAMERA_Interactivity',
    artboard: 'CAMERA',
    status: false,
    show: false,
    svg:'camera-outline',
    route: 'patient-dashboard/camera'
  },
  {
    id: 'tab_user',
    stateMachine: 'USER_Interactivity',
    artboard: 'USER',
    status: false,
    show: false,
    svg:'people-outline',
    route: 'patient-dashboard/family'
  },
  {
    id: 'tab_logout',
    stateMachine: 'USER_Interactivity',
    artboard: 'logout',
    status: false,
    show: false,
    route: '/',
    svg:'log-out-outline'
  },
];
