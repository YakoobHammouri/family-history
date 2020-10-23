const userMenuItems = () => [
  { icon: 'fas fa-home', to: '/', text: 'الرئيسة' },
  {
    icon: 'fas fa-address-card',
    to: '/user/profile',
    text: 'الملف الشخصي',
  },
  { icon: 'fas fa-sign-out-alt', to: '/user/Logout', text: 'تسجيل خروج' },
];

const anonymousMenuItems = () => [
  { icon: 'fas fa-home', to: '/', text: 'الرئيسة' },
  { icon: 'fas fa-sign-in-alt', to: '/user/login', text: ' تسجيل دخول' },
  // { icon: 'fas fa-child', to: '/user/SignUp', text: ' signUp' },
];

export { userMenuItems, anonymousMenuItems };
