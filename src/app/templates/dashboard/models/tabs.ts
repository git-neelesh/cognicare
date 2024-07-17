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
    id: 'tab_chat',
    stateMachine: 'HOME_Interactivity',
    artboard: 'HOME',
    status: false,
    show: false,
    svg:'assets/home.svg'

  },
  {
    id: 'tab_search',
    stateMachine: 'SEARCH_Interactivity',
    artboard: 'SEARCH',
    status: false,
    show: false,
    svg:'assets/home.svg'

  },
  {
    id: 'tab_timer',
    stateMachine: 'TIMER_Interactivity',
    artboard: 'TIMER',
    status: false,
    show: false,
    svg:'assets/home.svg'

  },
  {
    id: 'tab_bell',
    stateMachine: 'BELL_Interactivity',
    artboard: 'BELL',
    status: false,
    show: false,
    svg:'assets/home.svg'

  },
  {
    id: 'tab_user',
    stateMachine: 'USER_Interactivity',
    artboard: 'USER',
    status: false,
    show: false,
    svg:'assets/home.svg'

  },
];
