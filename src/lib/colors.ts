type CardColorScheme = {
  background: string;
  text: string;
};

export const SUNRISE_SCHEME: CardColorScheme = {
  background: 'bg-gradient-to-t from-amber-200 via-orange-300 to-orange-500',
  text: 'text-amber-950'
};

export const MORNING_SCHEME: CardColorScheme = {
  background: 'bg-gradient-to-b from-sky-400 to-sky-200',
  text: 'text-sky-950'
};

export const AFTERNOON_SCHEME: CardColorScheme = {
  background: 'bg-gradient-to-t from-yellow-100 via-amber-200 to-yellow-300',
  text: 'text-yellow-900'
};

export const SUNSET_SCHEME: CardColorScheme = {
  background: 'bg-gradient-to-t from-amber-600 via-orange-700 to-amber-800',
  text: 'text-yellow-50'
};

export const EVENING_SCHEME: CardColorScheme = {
  background: 'bg-gradient-to-t from-violet-800 to-neutral-800',
  text: 'text-violet-50'
};

export const NIGHT_SCHEME = {
  background: 'bg-gradient-to-t from-gray-700 to-gray-900',
  text: 'text-white'
};

export const COLOR_SCHEMES = [
  NIGHT_SCHEME,
  NIGHT_SCHEME,
  NIGHT_SCHEME,
  NIGHT_SCHEME,
  NIGHT_SCHEME,
  SUNRISE_SCHEME,
  SUNRISE_SCHEME,
  MORNING_SCHEME,
  MORNING_SCHEME,
  MORNING_SCHEME,
  MORNING_SCHEME,
  MORNING_SCHEME,
  AFTERNOON_SCHEME,
  AFTERNOON_SCHEME,
  AFTERNOON_SCHEME,
  AFTERNOON_SCHEME,
  AFTERNOON_SCHEME,
  SUNSET_SCHEME,
  SUNSET_SCHEME,
  EVENING_SCHEME,
  EVENING_SCHEME,
  EVENING_SCHEME,
  EVENING_SCHEME,
  NIGHT_SCHEME
];
