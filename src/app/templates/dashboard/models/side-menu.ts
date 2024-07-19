export interface MenuItem {
  id: string;
  stateMachine: string;
  artboard: string;
  status: boolean;
  show: boolean;
  svg?:string
  url?: string;
}

export const menuItemsList: MenuItem[] = [
  {
    id: 'Home',
    stateMachine: 'HOME_interactivity',
    artboard: 'HOME',
    status: false,
    show: false,
    svg:'assets/logo.jpeg'
  },
  {
    id: 'Add Patient',
    stateMachine: 'STAR_Interactivity',
    artboard: 'LIKE/STAR',
    status: false,
    show: false,
    url: 'add-patient'
  },
  {
    id: 'Help',
    stateMachine: 'CHAT_Interactivity',
    artboard: 'CHAT',
    status: false,
    show: false,
  },
];
export const menuItems2List: MenuItem[] = [
  {
    id: 'Notification',
    stateMachine: 'BELL_Interactivity',
    artboard: 'BELL',
    status: false,
    show: false,
  },
];
export const menuItems3List: MenuItem[] = [
  {
    id: 'Dark Mode',
    stateMachine: 'SETTINGS_Interactivity',
    artboard: 'SETTINGS',
    status: false,
    show: false,
  },
];
