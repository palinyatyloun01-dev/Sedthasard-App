import type { SVGProps } from 'react';

const PartyFlagIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" {...props}>
    <rect width="900" height="600" fill="#ce1126"/>
    <g transform="translate(450,320)" fill="#FFD100">
      <path d="M 0,-150 L 46.95,-46.95 H 150 L 75,18.3 L 100,125 L 0,62.5 L -100,125 L -75,18.3 L -150,-46.95 H -46.95 z" transform="scale(0.8)"/>
      <g transform="translate(-100, -60) scale(0.5)">
        <path id="hammer" d="M 20,5 L 20,55 L 45,55 L 45,75 L -5,75 L -5,55 L -40,55 L -40,30 L 0, -5 z" />
        <path id="sickle" d="M -5,-25 A 50 50 0 0 1 70,25 L 50,25 A 30 30 0 0 0 -5,-5 z" />
      </g>
    </g>
  </svg>
);

export default PartyFlagIcon;
