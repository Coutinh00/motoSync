const colors = {
  primary: '#1e88e5',
  background: '#f6f8fb',
  surface: '#ffffff',
  text: '#222222',
  muted: '#6b7280',
  danger: '#e53935',
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
};

const typography = {
  h1: 28,
  h2: 22,
  body: 16,
  small: 12,
};

const theme = { colors, spacing, typography } as const;

export default theme;


