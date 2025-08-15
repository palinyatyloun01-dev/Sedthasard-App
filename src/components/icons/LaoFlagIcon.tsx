import type { SVGProps } from 'react';

const LaoFlagIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" {...props}>
    <rect width="900" height="600" fill="#ce1126"/>
    <rect width="900" height="300" y="150" fill="#002868"/>
    <circle cx="450" cy="300" r="120" fill="#fff"/>
  </svg>
);

export default LaoFlagIcon;
