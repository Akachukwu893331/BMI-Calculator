export type ActivityLevel =
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active'
  | 'extra_active';

export const getActivityLevelDescription = (level: ActivityLevel): string => {
  switch (level) {
    case 'sedentary':
      return 'Little or no exercise. Typical for desk jobs and minimal movement.';
    case 'lightly_active':
      return 'Light exercise 1–3 days/week. E.g., casual walking or light sports.';
    case 'moderately_active':
      return 'Moderate exercise 3–5 days/week. E.g., gym sessions or active jobs.';
    case 'very_active':
      return 'Hard exercise 6–7 days/week or physically demanding job.';
    case 'extra_active':
      return 'Very hard exercise & physical job. E.g., athletes or manual laborers.';
    default:
      return '';
  }
};

export const getActivityLevelMultiplier = (level: ActivityLevel): number => {
  switch (level) {
    case 'sedentary':
      return 1.2;
    case 'lightly_active':
      return 1.375;
    case 'moderately_active':
      return 1.55;
    case 'very_active':
      return 1.725;
    case 'extra_active':
      return 1.9;
    default:
      return 1.2;
  }
};

export const getActivityLevelLabel = (level: ActivityLevel): string => {
  switch (level) {
    case 'sedentary':
      return 'Sedentary';
    case 'lightly_active':
      return 'Lightly Active';
    case 'moderately_active':
      return 'Moderately Active';
    case 'very_active':
      return 'Very Active';
    case 'extra_active':
      return 'Extra Active';
    default:
      return '';
  }
};

export const activityLevels: ActivityLevel[] = [
  'sedentary',
  'lightly_active',
  'moderately_active',
  'very_active',
  'extra_active',
];
