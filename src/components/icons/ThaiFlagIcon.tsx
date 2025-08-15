import type { SVGProps } from 'react';

const ThaiFlagIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" {...props}>
        <rect width="900" height="600" fill="#a51931"/>
        <rect width="900" height="400" y="100" fill="#f4f5f8"/>
        <rect width="900" height="200" y="200" fill="#2d2a4a"/>
    </svg>
);

export default ThaiFlagIcon;
