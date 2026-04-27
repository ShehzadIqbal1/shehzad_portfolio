import { ProjectCategory } from '@/data/projects';

interface IconProps {
  className?: string;
  size?: number;
}

const sizeClass = (size: number) => ({ width: size, height: size });

export function IconWordPress({ className = '', size = 20 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...sizeClass(size)}>
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-.685.069-1.354.2-2H8.5l1.5 4.5-2.25 6.75C4.954 19.34 4 15.856 4 12zm12.618 5.5L14 10.5 12 6H9.75L14.25 18l1.75-5.25L15 10.5l2.618 7zm.282-1.5L16 10l-1-3h2.2c.131.646.2 1.315.2 2 0 2.382-.832 4.575-2.3 6z" />
    </svg>
  );
}

export function IconFullStack({ className = '', size = 20 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...sizeClass(size)}>
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}

export function IconPlugins({ className = '', size = 20 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...sizeClass(size)}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconAchievement({ className = '', size = 20 }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...sizeClass(size)}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M6 5V3m0 2v2m0-2h12v2M6 19h12v-6.5a2.5 2.5 0 0 0-5 0V19" />
      <path d="M6 9v10h12V9" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

const FILTER_ICONS: Record<ProjectCategory, React.ComponentType<{ className?: string; size?: number }>> = {
  wordpress: IconWordPress,
  'full-stack': IconFullStack,
  plugins: IconPlugins,
  achievement: IconAchievement,
};

export function FilterIcon({ category, className = '', size = 20 }: { category: ProjectCategory } & IconProps) {
  const Icon = FILTER_ICONS[category];
  return Icon ? <Icon className={className} size={size} /> : null;
}
