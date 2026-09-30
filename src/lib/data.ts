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
    bio: 'دکترای هوش مصنوعی از دانشگاه تهران با بیش از ۱۲ سال سابقه تدریس و همکاری با شرکت‌های بزرگ فناوری.',
    avatar: '/images/instructors/ali-mohammadi.jpg',
    specialties: ['Python', 'Machine Learning', 'Deep Learning', 'Data Science'],
    coursesCount: 15,
    studentsCount: 3240,
    rating: 4.9,
  },
  {
    id: '2',
    name: 'مهندس سارا احمدی',
    title: 'متخصص طراحی و گرافیک',
    bio: 'کارشناس ارشد گرافیک با ۱۰ سال تجربه در طراحی برند و UI/UX. همکار با استارتاپ‌های موفق ایرانی.',
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
    bio: 'حسابدار رسمی و مدرس با ۱۵ سال تجربه تدریس. مشاور مالی چند شرکت تولیدی و بازرگانی.',
    avatar: '/images/instructors/reza-karimi.jpg',
    specialties: ['حسابداری مالی', 'نرم‌افزار هلو', 'اکسل پیشرفته', 'مالیات'],
    coursesCount: 10,
    studentsCount: 2150,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'خانم مریم رضایی',
    title: 'مدرس زبان انگلیسی',
    bio: 'مدرس بین‌المللی زبان انگلیسی با مدرک CELTA از کمبریج. متخصص آموزش مکالمه و آیلتس.',
    avatar: '/images/instructors/maryam-rezaei.jpg',
    specialties: ['مکالمه', 'IELTS', 'TOEFL', 'Business English'],
    coursesCount: 18,
    studentsCount: 4120,
    rating: 4.9,
  },
  {
    id: '5',
    name: 'استاد حسین نوری',
    title: 'متخصص موسیقی',
    bio: 'آهنگساز و نوازنده حرفه‌ای با ۲۰ سال تجربه. مدرس گیتار، پیانو و تئوری موسیقی.',
    avatar: '/images/instructors/hossein-nouri.jpg',
    specialties: ['گیتار', 'پیانو', 'تئوری موسیقی', 'آهنگسازی'],
    coursesCount: 8,
    studentsCount: 1680,
    rating: 4.8,
  },
  {
    id: '6',
    name: 'دکتر فاطمه صادقی',
    title: 'متخصص کسب‌وکار و دیجیتال مارکتینگ',
    bio: 'دکترای مدیریت کسب‌وکار و مشاور برندینگ. متخصص بازاریابی دیجیتال و رشد استارتاپ.',
    avatar: '/images/instructors/fatemeh-sadeghi.jpg',
    specialties: ['دیجیتال مارکتینگ', 'برندینگ', 'کسب‌وکار آنلاین', 'سئو'],
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
      'دوره جامع آموزش پایتون برای ورود به دنیای برنامه‌نویسی، علم داده و هوش مصنوعی. از مفاهیم پایه تا پروژه‌های واقعی.',
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
    startDate: '1404/08/15',
    schedule: 'شنبه و دوشنبه ۱۸:۰۰ - ۲۰:۰۰',
    prerequisites: ['آشنایی مقدماتی با کامپیوتر'],
    certificate: true,
    tags: ['پایتون', 'برنامه‌نویسی', 'هوش مصنوعی', 'دیتا ساینس'],
  },
  {
    id: '2',
    slug: 'web-design',
    title: 'طراحی سایت با HTML, CSS و JavaScript',
    description:
      'آموزش کامل طراحی وب‌سایت از پایه تا پیشرفته. ساخت پروژه‌های واقعی و آماده‌سازی برای ورود به بازار کار.',
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
    startDate: '1404/08/20',
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
      'یادگیری حرفه‌ای نرم‌افزارهای گرافیکی و اصول طراحی. مناسب برای علاقه‌مندان به طراحی برند و تبلیغات.',
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
    startDate: '1404/08/12',
    schedule: 'دوشنبه و چهارشنبه ۱۶:۰۰ - ۱۸:۰۰',
    prerequisites: ['آشنایی با کامپیوتر'],
    certificate: true,
    tags: ['گرافیک', 'فتوشاپ', 'ایلاستریتور', 'طراحی'],
  },
  {
    id: '4',
    slug: 'accounting-basics',
    title: 'حسابداری مقدماتی تا پیشرفته',
    description:
      'آموزش کامل اصول حسابداری، نرم‌افزار هلو و قوانین مالیاتی. مناسب برای ورود به بازار کار حسابداری.',
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
    startDate: '1404/08/18',
    schedule: 'شنبه تا چهارشنبه ۱۸:۳۰ - ۲۰:۳۰',
    prerequisites: ['آشنایی با ریاضیات پایه'],
    certificate: true,
    tags: ['حسابداری', 'هلو', 'مالیات', 'اکسل'],
  },
  {
    id: '5',
    slug: 'english-conversation',
    title: 'مکالمه زبان انگلیسی فشرده',
    description:
      'دوره فشرده مکالمه انگلیسی برای همه سطوح. با تمرکز بر مکالمه روزمره و موقعیت‌های واقعی.',
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
    startDate: '1404/08/10',
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
    startDate: '1404/08/25',
    schedule: 'دوشنبه و چهارشنبه ۲۰:۰۰ - ۲۲:۰۰',
    prerequisites: ['آشنایی با اینترنت و شبکه‌های اجتماعی'],
    certificate: true,
    tags: ['دیجیتال مارکتینگ', 'سئو', 'کسب‌وکار', 'برندینگ'],
  },
  {
    id: '7',
    slug: 'guitar-basics',
    title: 'آموزش گیتار از مبتدی تا پیشرفته',
    description:
      'یادگیری گیتار از صفر. شامل تئوری موسیقی، آکوردها، ریتم و نوازندگی حرفه‌ای.',
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
    startDate: '1404/08/14',
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
    startDate: '1404/08/16',
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
      'بهترین تصمیمی که گرفتم ثبت‌نام در آموزشگاه سرآمد بود. استاد علی محمدی فوق‌العاده تدریس می‌کنند و پشتیبانی کلاس آنلاین هم عالی بود. الان به عنوان برنامه‌نویس پایتون مشغول کارم.',
    date: '1404/07/15',
  },
  {
    id: '2',
    name: 'زهرا کریمی',
    avatar: '/images/avatars/user2.jpg',
    course: 'طراحی گرافیک',
    rating: 5,
    comment:
      'کلاس حضوری باعث شد خیلی سریع‌تر یاد بگیرم. محیط آموزشگاه فوق‌العاده حرفه‌ای و دوستانه است. خانم احمدی واقعاً استاد خوبی هستن.',
    date: '1404/06/28',
  },
  {
    id: '3',
    name: 'رضا محمدی',
    avatar: '/images/avatars/user3.jpg',
    course: 'دیجیتال مارکتینگ',
    rating: 5,
    comment:
      'دوره آنلاین دیجیتال مارکتینگ خیلی کاربردی بود. الان کسب‌وکار خودم رو راه انداختم و درآمدم چند برابر شده. ممنون از تیم سرآمد.',
    date: '1404/07/02',
  },
  {
    id: '4',
    name: 'فاطمه احمدی',
    avatar: '/images/avatars/user4.jpg',
    course: 'مکالمه انگلیسی',
    rating: 5,
    comment:
      'من از شهرستان در کلاس آنلاین شرکت کردم. کیفیت تصویر و صدا عالی بود و خانم رضایی خیلی صبورانه تدریس می‌کنند. الان راحت انگلیسی صحبت می‌کنم.',
    date: '1404/05/20',
  },
  {
    id: '5',
    name: 'حسین نوری',
    avatar: '/images/avatars/user5.jpg',
    course: 'حسابداری',
    rating: 4,
    comment:
      'دوره حسابداری خیلی کامل و کاربردی بود. فقط کاش تعداد جلسات بیشتری داشت. در کل از کیفیت آموزش راضی هستم.',
    date: '1404/06/10',
  },
  {
    id: '6',
    name: 'مریم صادقی',
    avatar: '/images/avatars/user6.jpg',
    course: 'اکسل پیشرفته',
    rating: 5,
    comment:
      'دوره ترکیبی اکسل برام عالی بود. بخش حضوری برای رفع اشکال و بخش آنلاین برای مرور. الان در شرکتم به عنوان کارشناس تحلیل داده مشغولم.',
    date: '1404/07/18',
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
    date: '1404/07/20',
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
    date: '1404/07/15',
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
    date: '1404/07/10',
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
    address: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۳، طبقه ۳',
    phone: '۰۲۱-۱۲۳۴۵۶۷۸',
    mapUrl: 'https://maps.google.com/?q=35.7575,51.4100',
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
   🎯 توابع کمکی برای Mock Data
   ============================================================ */

// دریافت دوره‌های محبوب
export function getPopularCourses(limit = 6): Course[] {
  return [...courses]
    .sort((a, b) => b.studentsCount - a.studentsCount)
    .slice(0, limit);
}

// دریافت دوره‌ها بر اساس نوع
export function getCoursesByMode(
  mode: 'online' | 'in-person' | 'hybrid'
): Course[] {
  return courses.filter((c) => c.mode === mode);
}

// دریافت دوره بر اساس slug
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

// دریافت دوره‌های یک استاد
export function getCoursesByInstructor(instructorId: string): Course[] {
  return courses.filter((c) => c.instructor.id === instructorId);
}

// دریافت ۳ مقاله آخر
export function getLatestPosts(limit = 3): BlogPost[] {
  return blogPosts.slice(0, limit);
}