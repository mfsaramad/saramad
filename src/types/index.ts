export type CourseMode = 'online' | 'in-person' | 'hybrid';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  mode: CourseMode;
  level: CourseLevel;
  duration: number;
  sessions: number;
  price: {
    'in-person'?: number;
    online?: number;
    hybrid?: number;
  };
  image: string;
  instructor: Instructor;
  rating: number;
  studentsCount: number;
  capacity: number;
  remainingCapacity: number;
  startDate: string;
  schedule: string;
  prerequisites: string[];
  certificate: boolean;
  tags: string[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  specialties: string[];
  coursesCount: number;
  studentsCount: number;
  rating: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  course: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  image: string;
  isActive: boolean;
}
