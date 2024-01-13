export const AUTH_TOKEN = 'auth_token';

export const contries = ['India', 'China', 'Japan', 'Pakistan', 'Russia'];

export const cgpa = Array.from({ length: 91 }, (_, index) =>
  (10 - index / 10).toFixed(1)
);

export const educationalLevels = [
  'lower_secondary',
  'senior_secondary',
  'diploma',
  'graduation',
  'post_graduation'
];

export const degreeOptions = [
  {
    label: 'Bachelors of Technology',
    value: 'b_tech'
  },
  {
    label: 'Bachelors of Science',
    value: 'bsc'
  }
];
