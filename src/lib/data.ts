import type {
  Course,
  Instructor,
  Testimonial,
  BlogPost,
  Branch,
} from '@/types';

/* ============================================================
   👨‍🏫 اساتید
   ============================================================ */
export const instructors: Instructor[] = [
  {
    id: '1',
    name: 'دکتر علی محمدی',
    title: 'متخصص برنامه‌نویسی و هوش مصنوعی',
    bio: 'دکترای هوش مصنوعی از دانشگاه تهران با بیش از ۱۲ سال سابقه تدریس.',
    avatar: '/images/instructors/ali-mohammadi.jpg',
    specialties: ['Python', 'Machine Learning', 'Data Science'],
    coursesCount: 15,
    studentsCount: 3240,
    rating: 4.9,
  },
  {
    id: '2',
    name: 'مهندس سارا احمدی',
    title: 'متخصص طراحی و گرافیک',
    bio: 'کارشناس ارشد گرافیک با ۱۰ سال تجربه در طراحی برند و UI/UX.',
    avatar: '/images/instructors/sara-ahmadi.jpg',
    specialties: ['Photoshop', 'Illustrator', 'Figma', 'UI/UX'],
    coursesCount: 12,
    studentsCount: 2890,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'استاد رضا کریمی',
    title: 'مدرس حسابداری و مالی',
    bio: 'حسابدار رسمی و مدرس با ۱۵ سال تجربه تدریس.',
    avatar: '/images/instructors/reza-karimi.jpg',
    specialties: ['حسابداری مالی', 'نرم‌افزار هلو', 'اکسل پیشرفته'],
    coursesCount: 10,
    studentsCount: 2150,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'خانم مریم رضایی',
    title: 'مدرس زبان انگلیسی',
    bio: 'مدرس بین‌المللی زبان انگلیسی با مدرک CELTA از کمبریج.',
    avatar: '/images/instructors/maryam-rezaei.jpg',
    specialties: ['مکالمه', 'IELTS', 'Business English'],
    coursesCount: 18,
    studentsCount: 4120,
    rating: 4.9,
  },
  {
    id: '5',
    name: 'استاد حسین نوری',
    title: 'متخصص موسیقی',
    bio: 'آهنگساز و نوازنده حرفه‌ای با ۲۰ سال تجربه.',
    avatar: '/images/instructors/hossein-nouri.jpg',
    specialties: ['گیتار', 'پیانو', 'تئوری موسیقی'],
    coursesCount: 8,
    studentsCount: 1680,
    rating: 4.8,
  },
  {
    id: '6',
    name: 'دکتر فاطمه صادقی',
    title: 'متخصص کسب‌وکار و دیجیتال مارکتینگ',
    bio: 'دکترای مدیریت کسب‌وکار و مشاور برندینگ.',
    avatar: '/images/instructors/fatemeh-sadeghi.jpg',
    specialties: ['دیجیتال مارکتینگ', 'برندینگ', 'سئو'],
    coursesCount: 11,
    studentsCount: 2450,
    rating: 4.8,
  },
];

/* ============================================================
   🎓 دوره‌ها
   ============================================================ */
export const courses: Course[] = [
  {
    id: '1',
    slug: 'python-programming',
    title: 'برنامه‌نویسی پایتون از صفر تا پیشرفته',
    description:
      'دوره جامع آموزش پایتون برای ورود به دنیای برنامه‌نویسی، علم داده و هوش مصنوعی.',
    shortDescription: 'از صفر تا پیشرفته، آماده ورود به بازار کار',
    mode: 'online',
    level: 'beginner',
    duration: 60,
    sessions: 30,
    price: {
      'in-person': 4500000,
      online: 3200000,
      hybrid: 3800000,
    },
    image: '/images/courses/python.jpg',
    instructor: instructors[0],
    rating: 4.9,
    studentsCount: 1240,
    capacity: 30,
    remainingCapacity: 5,
    startDate: '۱۴۰۴/۰۸/۱۵',
    schedule: 'شنبه و دوشنبه ۱۸:۰۰ - ۲۰:۰۰',
    prerequisites: ['آشنایی مقدماتی با کامپیوتر'],
    certificate: true,
    tags: ['پایتون', 'برنامه‌نویسی', 'هوش مصنوعی'],
  },
  {
    id: '2',
    slug: 'web-design',
    title: 'طراحی سایت با HTML, CSS و JavaScript',
    description:
      'آموزش کامل طراحی وب‌سایت از پایه تا پیشرفته با پروژه‌های واقعی.',
    shortDescription: 'طراحی وب مدرن با پروژه‌های واقعی',
    mode: 'hybrid',
    level: 'beginner',
    duration: 80,
    sessions: 40,
    price: {
      'in-person': 5500000,
      online: 4200000,
      hybrid: 4800000,
    },
    image: '/images/courses/web-design.jpg',
    instructor: instructors[0],
    rating: 4.8,
    studentsCount: 980,
    capacity: 25,
    remainingCapacity: 3,
    startDate: '۱۴۰۴/۰۸/۲۰',
    schedule: 'یکشنبه و سه‌شنبه ۱۷:۰۰ - ۱۹:۰۰',
    prerequisites: ['آشنایی با کامپیوتر'],
    certificate: true,
    tags: ['HTML', 'CSS', 'JavaScript', 'وب'],
  },
  {
    id: '3',
    slug: 'graphic-design',
    title: 'طراحی گرافیک با Photoshop و Illustrator',
    description:
      'یادگیری حرفه‌ای نرم‌افزارهای گرافیکی و اصول طراحی برند و تبلیغات.',
    shortDescription: 'طراحی حرفه‌ای گرافیک و برند',
    mode: 'in-person',
    level: 'beginner',
    duration: 70,
    sessions: 35,
    price: {
      'in-person': 4800000,
      online: 3500000,
    },
    image: '/images/courses/graphic-design.jpg',
    instructor: instructors[1],
    rating: 4.9,
    studentsCount: 1120,
    capacity: 20,
    remainingCapacity: 8,
    startDate: '۱۴۰۴/۰۸/۱۲',
    schedule: 'دوشنبه و چهارشنبه ۱۶:۰۰ - ۱۸:۰۰',
    prerequisites: ['آشنایی با کامپیوتر'],
    certificate: true,
    tags: ['گرافیک', 'فتوشاپ', 'طراحی'],
  },
  {
    id: '4',
    slug: 'accounting-basics',
    title: 'حسابداری مقدماتی تا پیشرفته',
    description:
      'آموزش کامل اصول حسابداری، نرم‌افزار هلو و قوانین مالیاتی.',
    shortDescription: 'حسابداری حرفه‌ای + نرم‌افزار هلو',
    mode: 'in-person',
    level: 'beginner',
    duration: 90,
    sessions: 45,
    price: {
      'in-person': 5200000,
      online: 3800000,
      hybrid: 4500000,
    },
    image: '/images/courses/accounting.jpg',
    instructor: instructors[2],
    rating: 4.7,
    studentsCount: 890,
    capacity: 25,
    remainingCapacity: 10,
    startDate: '۱۴۰۴/۰۸/۱۸',
    schedule: 'شنبه تا چهارشنبه ۱۸:۳۰ - ۲۰:۳۰',
    prerequisites: ['آشنایی با ریاضیات پایه'],
    certificate: true,
    tags: ['حسابداری', 'هلو', 'مالیات'],
  },
  {
    id: '5',
    slug: 'english-conversation',
    title: 'مکالمه زبان انگلیسی فشرده',
    description:
      'دوره فشرده مکالمه انگلیسی برای همه سطوح با تمرکز بر مکالمه روزمره.',
    shortDescription: 'مکالمه روان در ۳ ماه',
    mode: 'online',
    level: 'intermediate',
    duration: 50,
    sessions: 25,
    price: {
      'in-person': 4200000,
      online: 2800000,
    },
    image: '/images/courses/english.jpg',
    instructor: instructors[3],
    rating: 4.9,
    studentsCount: 1560,
    capacity: 15,
    remainingCapacity: 2,
    startDate: '۱۴۰۴/۰۸/۱۰',
    schedule: 'یکشنبه و سه‌شنبه ۱۹:۰۰ - ۲۱:۰۰',
    prerequisites: ['سطح مبتدی زبان انگلیسی'],
    certificate: true,
    tags: ['انگلیسی', 'مکالمه', 'زبان'],
  },
  {
    id: '6',
    slug: 'digital-marketing',
    title: 'دیجیتال مارکتینگ و کسب‌وکار آنلاین',
    description:
      'آموزش کامل بازاریابی دیجیتال، شبکه‌های اجتماعی، سئو و راه‌اندازی کسب‌وکار آنلاین.',
    shortDescription: 'بازاریابی حرفه‌ای در فضای دیجیتال',
    mode: 'online',
    level: 'intermediate',
    duration: 55,
    sessions: 28,
    price: {
      online: 3600000,
      hybrid: 4200000,
    },
    image: '/images/courses/digital-marketing.jpg',
    instructor: instructors[5],
    rating: 4.8,
    studentsCount: 720,
    capacity: 30,
    remainingCapacity: 12,
    startDate: '۱۴۰۴/۰۸/۲۵',
    schedule: 'دوشنبه و چهارشنبه ۲۰:۰۰ - ۲۲:۰۰',
    prerequisites: ['آشنایی با اینترنت'],
    certificate: true,
    tags: ['دیجیتال مارکتینگ', 'سئو', 'کسب‌وکار'],
  },
  {
    id: '7',
    slug: 'guitar-basics',
    title: 'آموزش گیتار از مبتدی تا پیشرفته',
    description:
      'یادگیری گیتار از صفر شامل تئوری موسیقی، آکوردها، ریتم و نوازندگی حرفه‌ای.',
    shortDescription: 'گیتار حرفه‌ای از صفر',
    mode: 'in-person',
    level: 'beginner',
    duration: 40,
    sessions: 20,
    price: {
      'in-person': 3800000,
      online: 2600000,
    },
    image: '/images/courses/guitar.jpg',
    instructor: instructors[4],
    rating: 4.9,
    studentsCount: 540,
    capacity: 10,
    remainingCapacity: 4,
    startDate: '۱۴۰۴/۰۸/۱۴',
    schedule: 'پنجشنبه ۱۶:۰۰ - ۱۸:۰۰',
    prerequisites: ['علاقه به موسیقی'],
    certificate: true,
    tags: ['گیتار', 'موسیقی', 'ساز'],
  },
  {
    id: '8',
    slug: 'excel-advanced',
    title: 'اکسل پیشرفته و تحلیل داده',
    description:
      'آموزش اکسل از مقدماتی تا پیشرفته، شامل فرمول‌های پیچیده، پیوت‌تیبل و داشبوردسازی.',
    shortDescription: 'اکسل حرفه‌ای برای بازار کار',
    mode: 'hybrid',
    level: 'intermediate',
    duration: 45,
    sessions: 22,
    price: {
      'in-person': 3200000,
      online: 2200000,
      hybrid: 2800000,
    },
    image: '/images/courses/excel.jpg',
    instructor: instructors[2],
    rating: 4.8,
    studentsCount: 1340,
    capacity: 30,
    remainingCapacity: 6,
    startDate: '۱۴۰۴/۰۸/۱۶',
    schedule: 'شنبه و دوشنبه ۱۹:۰۰ - ۲۱:۰۰',
    prerequisites: ['آشنایی مقدماتی با اکسل'],
    certificate: true,
    tags: ['اکسل', 'تحلیل داده', 'داشبورد'],
  },
];

/* ============================================================
   💬 نظرات دانشجویان
   ============================================================ */
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'محمد حسینی',
    avatar: '/images/avatars/user1.jpg',
    course: 'برنامه‌نویسی پایتون',
    rating: 5,
    comment:
      'بهترین تصمیمی که گرفتم ثبت‌نام در آموزشگاه سرآمد بود. استاد فوق‌العاده تدریس می‌کنند و پشتیبانی کلاس آنلاین هم عالی بود.',
    date: '۱۴۰۴/۰۷/۱۵',
  },
  {
    id: '2',
    name: 'زهرا کریمی',
    avatar: '/images/avatars/user2.jpg',
    course: 'طراحی گرافیک',
    rating: 5,
    comment:
      'کلاس حضوری باعث شد خیلی سریع‌تر یاد بگیرم. محیط آموزشگاه فوق‌العاده حرفه‌ای و دوستانه است.',
    date: '۱۴۰۴/۰۶/۲۸',
  },
  {
    id: '3',
    name: 'رضا محمدی',
    avatar: '/images/avatars/user3.jpg',
    course: 'دیجیتال مارکتینگ',
    rating: 5,
    comment:
      'دوره آنلاین دیجیتال مارکتینگ خیلی کاربردی بود. الان کسب‌وکار خودم رو راه انداختم و درآمدم چند برابر شده.',
    date: '۱۴۰۴/۰۷/۰۲',
  },
  {
    id: '4',
    name: 'فاطمه احمدی',
    avatar: '/images/avatars/user4.jpg',
    course: 'مکالمه انگلیسی',
    rating: 5,
    comment:
      'من از شهرستان در کلاس آنلاین شرکت کردم. کیفیت تصویر و صدا عالی بود. الان راحت انگلیسی صحبت می‌کنم.',
    date: '۱۴۰۴/۰۵/۲۰',
  },
  {
    id: '5',
    name: 'حسین نوری',
    avatar: '/images/avatars/user5.jpg',
    course: 'حسابداری',
    rating: 4,
    comment:
      'دوره حسابداری خیلی کامل و کاربردی بود. فقط کاش تعداد جلسات بیشتری داشت. در کل راضی هستم.',
    date: '۱۴۰۴/۰۶/۱۰',
  },
  {
    id: '6',
    name: 'مریم صادقی',
    avatar: '/images/avatars/user6.jpg',
    course: 'اکسل پیشرفته',
    rating: 5,
    comment:
      'دوره ترکیبی اکسل برام عالی بود. الان در شرکتم به عنوان کارشناس تحلیل داده مشغولم.',
    date: '۱۴۰۴/۰۷/۱۸',
  },
];

/* ============================================================
   📰 وبلاگ
   ============================================================ */
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'why-learn-python-2025',
    title: 'چرا یادگیری پایتون در سال ۱۴۰۴ ضروری است؟',
    excerpt:
      'پایتون محبوب‌ترین زبان برنامه‌نویسی جهان است. در این مقاله بررسی می‌کنیم چرا یادگیری آن می‌تواند مسیر شغلی شما را تغییر دهد.',
    cover: '/images/blog/python.jpg',
    category: 'برنامه‌نویسی',
    author: 'دکتر علی محمدی',
    date: '۱۴۰۴/۰۷/۲۰',
    readTime: 8,
  },
  {
    id: '2',
    slug: 'ui-ux-design-trends',
    title: 'ترندهای طراحی UI/UX در سال جدید',
    excerpt:
      'با جدیدترین ترندهای طراحی رابط کاربری و تجربه کاربری آشنا شوید و مهارت‌های خود را به‌روز نگه دارید.',
    cover: '/images/blog/ui-ux.jpg',
    category: 'طراحی',
    author: 'مهندس سارا احمدی',
    date: '۱۴۰۴/۰۷/۱۵',
    readTime: 6,
  },
  {
    id: '3',
    slug: 'digital-marketing-guide',
    title: 'راهنمای کامل شروع دیجیتال مارکتینگ',
    excerpt:
      'از کجا شروع کنیم؟ چه ابزارهایی لازم است؟ در این مقاله گام‌به‌گام با دنیای دیجیتال مارکتینگ آشنا می‌شوید.',
    cover: '/images/blog/digital-marketing.jpg',
    category: 'کسب‌وکار',
    author: 'دکتر فاطمه صادقی',
    date: '۱۴۰۴/۰۷/۱۰',
    readTime: 10,
  },
];

/* ============================================================
   🏢 شعبه‌ها
   ============================================================ */
export const branches: Branch[] = [
  {
    id: '1',
    name: 'شعبه مرکزی سرآمد',
    address: 'تبریز، خیابان بهار، روبروی تعاون روستایی',
    phone: '۰۹۳۶۲۸۴۷۹۲۲',
    mapUrl: 'https://maps.google.com/?q=38.0800,46.2919',
    image: '/images/branches/main.jpg',
    isActive: true,
  },
];

/* ============================================================
   📊 آمار کلی
   ============================================================ */
export const stats = [
  { value: 5000, suffix: '+', label: 'دانشجوی موفق' },
  { value: 80, suffix: '+', label: 'دوره تخصصی' },
  { value: 15, suffix: '+', label: 'سال تجربه' },
  { value: 50, suffix: '+', label: 'استاد حرفه‌ای' },
];

/* ============================================================
   🎯 دسته‌بندی مهارت‌ها
   ============================================================ */
export const skillCategories = [
  {
    id: 'programming',
    title: 'برنامه‌نویسی',
    icon: 'code',
    color: 'brand',
    coursesCount: 15,
    href: '/courses?category=programming',
  },
  {
    id: 'design',
    title: 'گرافیک و طراحی',
    icon: 'palette',
    color: 'teal',
    coursesCount: 12,
    href: '/courses?category=design',
  },
  {
    id: 'accounting',
    title: 'حسابداری',
    icon: 'calculator',
    color: 'accent',
    coursesCount: 8,
    href: '/courses?category=accounting',
  },
  {
    id: 'language',
    title: 'زبان خارجی',
    icon: 'languages',
    color: 'brand',
    coursesCount: 10,
    href: '/courses?category=language',
  },
  {
    id: 'music',
    title: 'موسیقی',
    icon: 'music',
    color: 'teal',
    coursesCount: 6,
    href: '/courses?category=music',
  },
  {
    id: 'business',
    title: 'کسب‌وکار',
    icon: 'briefcase',
    color: 'accent',
    coursesCount: 9,
    href: '/courses?category=business',
  },
];

/* ============================================================
   📝 آزمون‌های آنلاین
   ============================================================ */
export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Exam {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  type: 'level' | 'mock' | 'free';
  typeLabel: string;
  icon: string;
  color: 'brand' | 'teal' | 'accent';
  questions: number;
  duration: number;
  level: string;
  price: number;
  participants: number;
  rating: number;
  reviewsCount: number;
  successRate: number;
  certificate: boolean;
  tags: string[];
  examData: {
    id: string;
    title: string;
    description: string;
    duration: number;
    level: string;
    icon: string;
    questions: ExamQuestion[];
  };
}

export const exams: Exam[] = [
  {
    id: '1',
    slug: 'programming-level-test',
    title: 'آزمون تعیین سطح برنامه‌نویسی',
    description:
      'سطح دانش خود را در برنامه‌نویسی بسنجید و مسیر یادگیری مناسب را انتخاب کنید',
    longDescription:
      'این آزمون تعیین سطح شامل سوالاتی در زمینه مبانی برنامه‌نویسی، الگوریتم، ساختمان داده و زبان‌های محبوب مانند پایتون و جاوااسکریپت است.',
    type: 'level',
    typeLabel: 'تعیین سطح',
    icon: '💻',
    color: 'brand',
    questions: 30,
    duration: 45,
    level: 'مقدماتی تا پیشرفته',
    price: 0,
    participants: 3240,
    rating: 4.9,
    reviewsCount: 234,
    successRate: 78,
    certificate: false,
    tags: ['برنامه‌نویسی', 'پایتون', 'تعیین سطح'],
    examData: {
      id: '1',
      title: 'آزمون تعیین سطح برنامه‌نویسی',
      description: 'سطح دانش خود را در برنامه‌نویسی بسنجید',
      duration: 45,
      level: 'مقدماتی تا پیشرفته',
      icon: '💻',
      questions: [
        {
          id: 1,
          question: 'زبان پایتون در چه سالی معرفی شد؟',
          options: ['۱۹۸۹', '۱۹۹۱', '۱۹۹۵', '۲۰۰۰'],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: 'کدام یک از موارد زیر یک نوع داده در پایتون نیست؟',
          options: ['List', 'Tuple', 'Array', 'Dictionary'],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: 'خروجی دستور print(2 ** 3) چیست؟',
          options: ['6', '8', '9', '23'],
          correctAnswer: 1,
        },
        {
          id: 4,
          question:
            'در جاوااسکریپت، کدام کلمه کلیدی برای تعریف متغیر با قابلیت تغییر استفاده می‌شود؟',
          options: ['const', 'let', 'final', 'static'],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: 'HTML مخفف چیست؟',
          options: [
            'Hyper Text Markup Language',
            'High Tech Modern Language',
            'Hyper Transfer Markup Language',
            'Home Tool Markup Language',
          ],
          correctAnswer: 0,
        },
      ],
    },
  },
  {
    id: '2',
    slug: 'technical-mock-exam',
    title: 'آزمون آزمایشی فنی و حرفه‌ای',
    description: 'خودت را در شرایط واقعی آزمون قرار بده و آماده شو',
    longDescription:
      'این آزمون آزمایشی دقیقاً مشابه آزمون‌های رسمی فنی و حرفه‌ای طراحی شده است.',
    type: 'mock',
    typeLabel: 'آزمایشی',
    icon: '📋',
    color: 'teal',
    questions: 60,
    duration: 90,
    level: 'متوسط',
    price: 150000,
    participants: 1890,
    rating: 4.8,
    reviewsCount: 145,
    successRate: 65,
    certificate: true,
    tags: ['فنی و حرفه‌ای', 'آزمایشی', 'مدرک'],
    examData: {
      id: '2',
      title: 'آزمون آزمایشی فنی و حرفه‌ای',
      description: 'خودت را در شرایط واقعی آزمون قرار بده',
      duration: 90,
      level: 'متوسط',
      icon: '📋',
      questions: [
        {
          id: 1,
          question: 'کدام یک از موارد زیر یک سیستم‌عامل نیست؟',
          options: ['Windows', 'Linux', 'macOS', 'Photoshop'],
          correctAnswer: 3,
        },
        {
          id: 2,
          question: 'واحد اندازه‌گیری سرعت اینترنت چیست؟',
          options: ['مگابایت', 'مگابیت', 'گیگابایت', 'کیلوبایت'],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: 'کدام یک از موارد زیر نرم‌افزار گرافیکی است؟',
          options: ['Excel', 'Word', 'Photoshop', 'PowerPoint'],
          correctAnswer: 2,
        },
      ],
    },
  },
  {
    id: '3',
    slug: 'english-level-test',
    title: 'آزمون تعیین سطح زبان انگلیسی',
    description: 'سطح زبان خود را بسنجید و کلاس مناسب را انتخاب کنید',
    longDescription:
      'این آزمون تعیین سطح زبان انگلیسی شامل سوالات گرامر، واژگان، درک مطلب و مکالمه است.',
    type: 'level',
    typeLabel: 'تعیین سطح',
    icon: '🌍',
    color: 'accent',
    questions: 40,
    duration: 50,
    level: 'همه سطوح',
    price: 0,
    participants: 4520,
    rating: 4.9,
    reviewsCount: 412,
    successRate: 82,
    certificate: false,
    tags: ['انگلیسی', 'تعیین سطح', 'زبان'],
    examData: {
      id: '3',
      title: 'آزمون تعیین سطح زبان انگلیسی',
      description: 'سطح زبان خود را بسنجید',
      duration: 50,
      level: 'همه سطوح',
      icon: '🌍',
      questions: [
        {
          id: 1,
          question: 'معنی کلمه "Book" چیست؟',
          options: ['کتاب', 'دفتر', 'قلم', 'میز'],
          correctAnswer: 0,
        },
        {
          id: 2,
          question: 'کدام گزینه صحیح است؟ I ___ a student.',
          options: ['is', 'am', 'are', 'be'],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: 'گذشته فعل "go" چیست؟',
          options: ['goed', 'gone', 'went', 'going'],
          correctAnswer: 2,
        },
      ],
    },
  },
  {
    id: '4',
    slug: 'accounting-final-exam',
    title: 'آزمون پایانی دوره حسابداری',
    description: 'آزمون جامع پایان دوره حسابداری با صدور مدرک معتبر',
    longDescription:
      'آزمون پایانی دوره حسابداری سرآمد، شامل سوالات جامع از تمام مباحث دوره است.',
    type: 'mock',
    typeLabel: 'پایان دوره',
    icon: '🧮',
    color: 'brand',
    questions: 50,
    duration: 75,
    level: 'پیشرفته',
    price: 200000,
    participants: 890,
    rating: 4.7,
    reviewsCount: 98,
    successRate: 70,
    certificate: true,
    tags: ['حسابداری', 'پایان دوره', 'مدرک'],
    examData: {
      id: '4',
      title: 'آزمون پایانی دوره حسابداری',
      description: 'آزمون جامع پایان دوره حسابداری',
      duration: 75,
      level: 'پیشرفته',
      icon: '🧮',
      questions: [
        {
          id: 1,
          question: 'معادله اصلی حسابداری چیست؟',
          options: [
            'دارایی = بدهی + سرمایه',
            'دارایی = بدهی - سرمایه',
            'سرمایه = دارایی + بدهی',
            'بدهی = دارایی + سرمایه',
          ],
          correctAnswer: 0,
        },
        {
          id: 2,
          question: 'کدام یک از موارد زیر جزء دارایی‌ها نیست؟',
          options: ['نقد', 'بانک', 'حساب‌های پرداختنی', 'موجودی کالا'],
          correctAnswer: 2,
        },
      ],
    },
  },
  {
    id: '5',
    slug: 'computer-skills-free',
    title: 'آزمون رایگان مهارت‌های کامپیوتری',
    description: 'سطح مهارت‌های پایه کامپیوتری خود را محک بزنید',
    longDescription:
      'این آزمون رایگان، سطح آشنایی شما با مفاهیم پایه کامپیوتر، سیستم‌عامل، نرم‌افزارهای اداری و اینترنت را می‌سنجد.',
    type: 'free',
    typeLabel: 'رایگان',
    icon: '⚡',
    color: 'teal',
    questions: 25,
    duration: 30,
    level: 'مقدماتی',
    price: 0,
    participants: 6780,
    rating: 4.8,
    reviewsCount: 534,
    successRate: 85,
    certificate: false,
    tags: ['کامپیوتر', 'رایگان', 'مقدماتی'],
    examData: {
      id: '5',
      title: 'آزمون رایگان مهارت‌های کامپیوتری',
      description: 'سطح مهارت‌های پایه کامپیوتری خود را محک بزنید',
      duration: 30,
      level: 'مقدماتی',
      icon: '💻',
      questions: [
        {
          id: 1,
          question: 'کدام کلید برای کپی استفاده می‌شود؟',
          options: ['Ctrl + V', 'Ctrl + C', 'Ctrl + X', 'Ctrl + Z'],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: 'کدام یک سیستم‌عامل است؟',
          options: ['Word', 'Excel', 'Windows', 'Photoshop'],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: 'RAM مخفف چیست؟',
          options: [
            'Random Access Memory',
            'Read Access Memory',
            'Rapid Access Memory',
            'Real Access Memory',
          ],
          correctAnswer: 0,
        },
      ],
    },
  },
  {
    id: '6',
    slug: 'graphic-design-mock',
    title: 'آزمون آزمایشی گرافیک و طراحی',
    description: 'دانش خود را در زمینه گرافیک و طراحی محک بزنید',
    longDescription:
      'این آزمون آزمایشی شامل سوالات تخصصی گرافیک، طراحی، رنگ‌شناسی و نرم‌افزارهای گرافیکی است.',
    type: 'mock',
    typeLabel: 'آزمایشی',
    icon: '🎨',
    color: 'accent',
    questions: 35,
    duration: 60,
    level: 'متوسط',
    price: 120000,
    participants: 1240,
    rating: 4.8,
    reviewsCount: 127,
    successRate: 72,
    certificate: true,
    tags: ['گرافیک', 'طراحی', 'آزمایشی'],
    examData: {
      id: '6',
      title: 'آزمون آزمایشی گرافیک و طراحی',
      description: 'دانش خود را در زمینه گرافیک و طراحی محک بزنید',
      duration: 60,
      level: 'متوسط',
      icon: '🎨',
      questions: [
        {
          id: 1,
          question: 'کدام نرم‌افزار برای طراحی گرافیکی استفاده می‌شود؟',
          options: ['Excel', 'Photoshop', 'Word', 'Notepad'],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: 'RGB مخفف چیست؟',
          options: [
            'Red Green Blue',
            'Red Gray Black',
            'Random Green Blue',
            'Red Gold Blue',
          ],
          correctAnswer: 0,
        },
      ],
    },
  },
];

/* ============================================================
   🛍️ محصولات فروشگاه
   ============================================================ */
export interface ProductReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  type: 'questions' | 'book' | 'video' | 'package';
  typeLabel: string;
  price: number;
  originalPrice?: number;
  icon: string;
  color: 'brand' | 'teal' | 'accent';
  rating: number;
  reviewsCount: number;
  salesCount: number;
  badge?: string;
  features: string[];
  format?: string;
  fileSize?: string;
  pages?: number;
  duration?: number;
  tags: string[];
  reviews: ProductReview[];
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'tech-vocational-exam-questions',
    title: 'پکیج سوالات آزمون فنی و حرفه‌ای',
    description: 'مجموعه کامل سوالات آزمون‌های فنی و حرفه‌ای با پاسخ تشریحی',
    longDescription:
      'این پکیج شامل ۱۰ سال سوالات آزمون‌های فنی و حرفه‌ای در تمام رشته‌ها است. تمام سوالات دارای پاسخ تشریحی کامل هستند و به‌صورت PDF قابل دانلود می‌باشند.',
    type: 'questions',
    typeLabel: 'سوالات',
    price: 350000,
    originalPrice: 500000,
    icon: '📝',
    color: 'brand',
    rating: 4.9,
    reviewsCount: 234,
    salesCount: 1240,
    badge: 'پرفروش',
    features: [
      '۱۰ سال سوالات آزمون',
      'پاسخ تشریحی کامل',
      'فرمت PDF قابل چاپ',
      'دسترسی مادام‌العمر',
      'بروزرسانی رایگان',
    ],
    format: 'PDF',
    fileSize: '۴۵ مگابایت',
    pages: 850,
    tags: ['سوالات', 'فنی و حرفه‌ای', 'آزمون'],
    reviews: [
      {
        id: '1',
        name: 'علی محمدی',
        rating: 5,
        comment: 'عالی بود! سوالات دقیقاً مشابه آزمون اصلی بود و من قبول شدم.',
        date: '۱۴۰۴/۰۶/۱۵',
      },
      {
        id: '2',
        name: 'زهرا احمدی',
        rating: 5,
        comment: 'پاسخ‌های تشریحی خیلی کمکم کرد. ارزش خرید داشت.',
        date: '۱۴۰۴/۰۵/۲۰',
      },
    ],
  },
  {
    id: '2',
    slug: 'python-programming-book',
    title: 'جزوه جامع برنامه‌نویسی پایتون',
    description: 'جزوه PDF کامل آموزش پایتون همراه با تمرین و پروژه‌های عملی',
    longDescription:
      'جزوه‌ای ۴۰۰ صفحه‌ای که از صفر تا پیشرفته پایتون رو آموزش می‌ده. شامل ۵۰ پروژه عملی، ۲۰۰ تمرین، و کدهای آماده برای دانلود.',
    type: 'book',
    typeLabel: 'جزوه',
    price: 280000,
    icon: '📚',
    color: 'teal',
    rating: 4.8,
    reviewsCount: 156,
    salesCount: 890,
    features: [
      '۴۰۰ صفحه محتوای کامل',
      '۵۰ پروژه عملی',
      '۲۰۰ تمرین با پاسخ',
      'کدهای آماده دانلود',
      'پشتیبانی رایگان',
    ],
    format: 'PDF',
    fileSize: '۲۵ مگابایت',
    pages: 400,
    tags: ['پایتون', 'برنامه‌نویسی', 'جزوه'],
    reviews: [
      {
        id: '1',
        name: 'رضا کریمی',
        rating: 5,
        comment: 'بهترین جزوه پایتونی که خوندم. خیلی روان و کامل.',
        date: '۱۴۰۴/۰۷/۰۱',
      },
    ],
  },
  {
    id: '3',
    slug: 'graphic-design-videos',
    title: 'ویدیوهای ضبط‌شده دوره طراحی گرافیک',
    description: 'دسترسی مادام‌العمر به ویدیوهای ضبط‌شده دوره گرافیک',
    longDescription:
      'این پکیج شامل ۴۵ ساعت ویدیوی آموزشی HD از دوره طراحی گرافیک سرآمد است. تمام جلسات ضبط شده و با کیفیت بالا در اختیار شما قرار می‌گیرد.',
    type: 'video',
    typeLabel: 'ویدیو',
    price: 1200000,
    originalPrice: 1800000,
    icon: '🎬',
    color: 'accent',
    rating: 5.0,
    reviewsCount: 89,
    salesCount: 560,
    badge: 'تخفیف ویژه',
    features: [
      '۴۵ ساعت ویدیو HD',
      'دسترسی مادام‌العمر',
      'فایل‌های پروژه',
      'پشتیبانی آنلاین',
      'گواهی پایان دوره',
    ],
    format: 'MP4',
    fileSize: '۱۲ گیگابایت',
    duration: 45,
    tags: ['گرافیک', 'ویدیو', 'طراحی'],
    reviews: [
      {
        id: '1',
        name: 'سارا حسینی',
        rating: 5,
        comment: 'کیفیت ویدیوها عالیه. انگار توی کلاس حضوری نشسته بودم.',
        date: '۱۴۰۴/۰۶/۱۰',
      },
      {
        id: '2',
        name: 'مریم رضایی',
        rating: 5,
        comment: 'بهترین سرمایه‌گذاری زندگیم بود.',
        date: '۱۴۰۴/۰۵/۰۵',
      },
    ],
  },
  {
    id: '4',
    slug: 'programming-exam-questions',
    title: 'پکیج سوالات آزمون برنامه‌نویسی',
    description: 'مجموعه سوالات تخصصی برنامه‌نویسی با پاسخ‌های تشریحی',
    longDescription:
      'پکیجی شامل ۱۵۰۰ سوال تخصصی برنامه‌نویسی در زبان‌های پایتون، جاوا، و ++C به همراه پاسخ‌های تشریحی.',
    type: 'questions',
    typeLabel: 'سوالات',
    price: 320000,
    originalPrice: 450000,
    icon: '📝',
    color: 'brand',
    rating: 4.7,
    reviewsCount: 112,
    salesCount: 780,
    features: [
      '۱۵۰۰ سوال تخصصی',
      'پاسخ تشریحی',
      'شامل ۳ زبان',
      'آزمون‌های شبیه‌سازی شده',
      'دسترسی مادام‌العمر',
    ],
    format: 'PDF',
    fileSize: '۱۸ مگابایت',
    pages: 520,
    tags: ['برنامه‌نویسی', 'سوالات', 'آزمون'],
    reviews: [
      {
        id: '1',
        name: 'حسین نوری',
        rating: 5,
        comment: 'سوالات خیلی خوب و متنوع بودن. ممنون!',
        date: '۱۴۰۴/۰۷/۰۸',
      },
    ],
  },
  {
    id: '5',
    slug: 'accounting-basics-book',
    title: 'جزوه اصول حسابداری',
    description: 'جزوه کامل اصول حسابداری ویژه دانشجویان و علاقه‌مندان',
    longDescription:
      'جزوه‌ای ۳۵۰ صفحه‌ای که اصول حسابداری رو از پایه تا پیشرفته آموزش می‌ده. شامل مثال‌های واقعی، تمرین‌های حل‌شده، و نمونه سوالات امتحانی.',
    type: 'book',
    typeLabel: 'جزوه',
    price: 220000,
    icon: '📚',
    color: 'teal',
    rating: 4.8,
    reviewsCount: 178,
    salesCount: 1120,
    features: [
      '۳۵۰ صفحه',
      'مثال‌های واقعی',
      'تمرین‌های حل‌شده',
      'نمونه سوالات امتحانی',
      'فرمت PDF',
    ],
    format: 'PDF',
    fileSize: '۲۰ مگابایت',
    pages: 350,
    tags: ['حسابداری', 'جزوه', 'مالی'],
    reviews: [
      {
        id: '1',
        name: 'فاطمه صادقی',
        rating: 5,
        comment: 'خیلی کامل و روان. برای امتحان‌ها عالیه.',
        date: '۱۴۰۴/۰۶/۲۵',
      },
    ],
  },
  {
    id: '6',
    slug: 'advanced-excel-videos',
    title: 'ویدیوهای آموزش اکسل پیشرفته',
    description: 'آموزش اکسل از مقدماتی تا پیشرفته با پروژه‌های واقعی',
    longDescription:
      'این دوره شامل ۲۰ ساعت ویدیوی آموزشی اکسل از سطح مقدماتی تا پیشرفته است. با پروژه‌های واقعی و کاربردی برای بازار کار.',
    type: 'video',
    typeLabel: 'ویدیو',
    price: 950000,
    originalPrice: 1400000,
    icon: '🎬',
    color: 'accent',
    rating: 4.9,
    reviewsCount: 134,
    salesCount: 670,
    badge: 'پرفروش',
    features: [
      '۲۰ ساعت ویدیو HD',
      'پروژه‌های واقعی',
      'فایل‌های تمرینی',
      'دسترسی مادام‌العمر',
      'پشتیبانی رایگان',
    ],
    format: 'MP4',
    fileSize: '۸ گیگابایت',
    duration: 20,
    tags: ['اکسل', 'آفیس', 'ویدیو'],
    reviews: [
      {
        id: '1',
        name: 'محمد رضایی',
        rating: 5,
        comment: 'بعد از این دوره توی شرکتم ارتقا گرفتم!',
        date: '۱۴۰۴/۰۷/۱۲',
      },
      {
        id: '2',
        name: 'نرگس کریمی',
        rating: 5,
        comment: 'آموزش‌ها خیلی کاربردی و عملی بودن.',
        date: '۱۴۰۴/۰۶/۱۸',
      },
    ],
  },
];

/* ============================================================
   🎯 توابع کمکی
   ============================================================ */
export function getPopularCourses(limit = 6): Course[] {
  return [...courses]
    .sort((a, b) => b.studentsCount - a.studentsCount)
    .slice(0, limit);
}

export function getCoursesByMode(
  mode: 'online' | 'in-person' | 'hybrid'
): Course[] {
  return courses.filter((c) => c.mode === mode);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getCoursesByInstructor(instructorId: string): Course[] {
  return courses.filter((c) => c.instructor.id === instructorId);
}

export function getRelatedCourses(course: Course, limit = 3): Course[] {
  return courses
    .filter((c) => c.id !== course.id && c.mode === course.mode)
    .slice(0, limit);
}

export function getCoursesByCategory(tag: string): Course[] {
  return courses.filter((c) => c.tags.includes(tag));
}

export function getLatestPosts(limit = 3): BlogPost[] {
  return blogPosts.slice(0, limit);
}

export function getExamBySlug(slug: string): Exam | undefined {
  return exams.find((e) => e.slug === slug);
}

export function getRelatedExams(exam: Exam, limit = 3): Exam[] {
  return exams
    .filter((e) => e.id !== exam.id && e.type === exam.type)
    .slice(0, limit);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.type === product.type)
    .slice(0, limit);
}