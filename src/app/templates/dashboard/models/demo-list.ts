export interface Demo {
  title: string;
  subtitle?: string;
  caption: string;
  color: string;
  image: string;
}

export const demoList: Demo[] = [
  {
    title: 'Your family',
    subtitle: 'You caring loved ones ',
    caption: '20 sections - 3 hours',
    color: '120, 80, 240',
    image: 'assets/course_rive/topic_1.svg',
  },
  {
    title: 'Caregivers',
    subtitle:
      'They will assists you with daily tasks and activities',
    caption: '47 sections - 11 hours',
    color: '103, 146, 255',
    image: 'assets/course_rive/topic_2.svg',
  },
  {
    title: 'Music you love',
    subtitle:
      'Rhythm and harmony find their way into the inward places of the Soul.',
    caption: '21 sections - 4 hours',
    color: '0, 95, 231',
    image: 'assets/course_rive/topic_1.svg',
  },
];

export const courseSectionsList: Demo[] = [
  {
    title: 'State Machine',
    caption: 'Watch video - 15 mins',
    color: '#9CC5FF',
    image: 'assets/course_rive/topic_2.svg',
  },
  {
    title: 'Animated Menu',
    caption: 'Watch video - 10 mins',
    color: '#6E6AE8',
    image: 'assets/course_rive/topic_1.svg',
  },
  {
    title: 'Tab Bar',
    caption: 'Watch video - 8 mins',
    color: '#005FE7',
    image: 'assets/course_rive/topic_2.svg',
  },
  {
    title: 'Button',
    caption: 'Watch video - 9 mins',
    color: '#BBA6FF',
    image: 'assets/course_rive/topic_1.svg',
  },
];
