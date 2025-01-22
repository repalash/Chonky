import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function Icon(props: SvgIconProps) {
    return (
        <SvgIcon sx={{ width: 'auto', height: 'auto' }} {...props}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_95_627" style={{ maskType: "alpha", }} maskUnits="userSpaceOnUse" x="0" y="0" width="30"
                      height="30">
                    <rect width="30" height="30" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_95_627)">
                    <path
                        d="M4.3335 25C3.66857 25 3.11343 24.7798 2.66806 24.3393C2.22269 23.8988 2 23.3498 2 22.6921V7.30786C2 6.65024 2.22269 6.10119 2.66806 5.66071C3.11343 5.22024 3.66857 5 4.3335 5H11.5279L14.4168 7.85714H25.6665C26.3314 7.85714 26.8866 8.07738 27.3319 8.51786C27.7773 8.95833 28 9.50738 28 10.165V22.6921C28 23.3498 27.7773 23.8988 27.3319 24.3393C26.8866 24.7798 26.3314 25 25.6665 25H4.3335Z"
                        fill="#D1D1D1" />
                </g>
            </svg>
        </SvgIcon>
    );
}
