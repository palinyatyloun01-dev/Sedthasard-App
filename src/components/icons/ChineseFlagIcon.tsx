import type { SVGProps } from 'react';

const ChineseFlagIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" {...props}>
        <rect width="900" height="600" fill="#ee1c25"/>
        <g fill="#ffde00">
            <path d="m225 150 42.865 138.197-112.13-85.39h138.53l-112.13 85.39z"/>
            <path d="m316.33 223.32 10.71-34.54-28.03-21.34h34.63l-28.03 21.34z" transform="rotate(23.32 300 225)"/>
            <path d="m338.99 289.04 10.71-34.54-28.03-21.34h34.63l-28.03 21.34z" transform="rotate(46.64 300 225)"/>
            <path d="m328.67 353.48 10.71-34.54-28.03-21.34h34.63l-28.03 21.34z" transform="rotate(69.96 300 225)"/>
        </g>
    </svg>
);

export default ChineseFlagIcon;
