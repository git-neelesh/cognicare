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
    id: 'tab_chat',
    stateMachine: 'chat_Interactivity',
    artboard: 'CHAT',
    status: false,
    show: false,
    svg:'chatbubbles-outline'

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
    id: 'tab_bell',
    stateMachine: 'BELL_Interactivity',
    artboard: 'BELL',
    status: false,
    show: false,
    svg:'notifications-outline'

  },
  {
    id: 'tab_user',
    stateMachine: 'USER_Interactivity',
    artboard: 'USER',
    status: false,
    show: false,
    svg:'person-outline'

  },
];
