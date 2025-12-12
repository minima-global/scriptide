// Import types
import { IAppLogoProps } from '@/types';

// App logo component
function AppLogo({
  size = 24,
  color = 'currentColor',
  ...props
}: IAppLogoProps) {
  // Render
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 300 300"
      fill={color}
      stroke="none"
      {...props}
    >
      <g>
        <path d="M0 0L300 0L300 300L0 300L0 0Z" stroke="none" fill="none" />
        <path d="M20 224.754L93.6432 182.229L224.127 257.351L149.703 300L20 224.754Z" />
        <path d="M56.7017 53.4076L280 182.714L280 225.848L242.305 247.173L20 117.286L20 75.1212L56.7017 53.4076Z" />
        <path d="M75.8735 42.5247L149.517 0L280 75.1212L205.576 117.771L75.8735 42.5247Z" />
      </g>
    </svg>
  );
}

// Export
export default AppLogo;
