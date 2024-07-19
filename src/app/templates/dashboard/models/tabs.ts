export interface BottomTabItem {
  id: string;
  stateMachine: string;
  artboard: string;
  status: boolean;
  show: boolean;
  svg?:string
}

export const tabItemsList: BottomTabItem[] = [
  {
    id: 'tab_home',
    stateMachine: 'HOME_Interactivity',
    artboard: 'HOME',
    status: false,
    show: false,
    svg:'home-outline'

  },
  {
    id: 'tab_chat',
    stateMachine: 'CHAT_Interactivity',
    artboard: 'CHAT',
    status: false,
    show: false,
    svg:'chatbubbles-outline'

  },
  {
    id: 'tab_bell',
    stateMachine: 'BELL_Interactivity',
    artboard: 'Notifications will be here',
    status: false,
    show: false,
    svg:'notifications-outline'

  },
  {
    id: 'tab_logout',
    stateMachine: 'USER_Interactivity',
    artboard: 'USER',
    status: false,
    show: false,
    svg:'log-out-outline'

  },
];
