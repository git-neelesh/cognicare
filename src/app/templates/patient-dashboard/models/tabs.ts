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
    stateMachine: 'chat_Interactivity',
    artboard: 'CHAT',
    status: false,
    show: false,
    svg:'chat-outline'

  },
  {
    id: 'tab_timer',
    stateMachine: 'TIMER_Interactivity',
    artboard: 'TIMER',
    status: false,
    show: false,
    svg:'time-outline'

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
