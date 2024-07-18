export interface Demo {
  title: string;
  subtitle?: string;
  caption: string;
  color: string;
  image: string;
  heading?: string;
  description?: string;
  contact?: string,
  email?: string,
  id?: string
}

export const demoList: Demo[] = [
  {
    id: 'helpline',
    title: 'Dementia UK Helpline',
    subtitle: `Get in touch with one of our dementia specialist Admiral Nurses.`,
    caption: '20 sections - 3 hours',
    color: '120, 80, 240',
    image: 'assets/course_rive/topic_1.svg',
    heading: 'Echoes',
    description: 'connects multidisciplinary dementia care experts with professional care providers.',
    contact: '0800 888 6678',
    email: 'helpline@dementiauk.org'
  },
  {
    id: 'caregivers',
    title: 'How can we help you?',
    subtitle:
      'They will assists you with daily tasks and activities',
    caption: '47 sections - 11 hours',
    color: '103, 146, 255',
    image: 'assets/course_rive/topic_2.svg',
    heading: 'Triangle of care',
    description: 'The disease might hide the person underneath but there is still a person who needs your love and attention.'
  },
  {
    id: 'community',
    title: 'Know your community',
    subtitle:
      'Our friendly and efficient team will be happy to help with any media enquiries.',
    caption: '21 sections - 4 hours',
    color: '0, 95, 231',
    image: 'assets/course_rive/topic_1.svg',
    heading: '',
    description: 'If you are a individual, primary care provideror family member for dementia patient, this app is for you.'
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
