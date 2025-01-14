import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function Icon() {
    return (
        <SvgIcon sx={{ width: 'auto', height: 'auto' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_199_3484" style={{maskType: "alpha",}} maskUnits="userSpaceOnUse" x="0" y="0" width="20"
                      height="20">
                    <rect width="20" height="20" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_199_3484)">
                    <path d="M7.88788 16L7 15.1284L12.2242 10L7 4.87159L7.88788 4L14 10L7.88788 16Z" fill="#1C1B1F"/>
                </g>
            </svg>
        </SvgIcon>
    );
}
