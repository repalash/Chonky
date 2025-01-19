import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function Icon() {
    return (
        <SvgIcon sx={{ width: 'auto', height: 'auto' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_95_1023" style={{ maskType: "alpha", }} maskUnits="userSpaceOnUse" x="0" y="0" width="20"
                      height="20">
                    <rect width="20" height="20" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_95_1023)">
                    <path d="M10 12.8333L5 7.83329L6.16667 6.66663L10 10.5L13.8333 6.66663L15 7.83329L10 12.8333Z"
                          fill="#373737" />
                </g>
            </svg>

        </SvgIcon>
    );
}
