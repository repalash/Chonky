import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function Icon() {
    return (
        <SvgIcon sx={{ width: 'auto', height: 'auto' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_95_2581)">
                    <rect x="1" y="1" width="18" height="18" rx="9" stroke="#E8E8E8" stroke-width="2" />
                    <rect width="20" height="20" rx="10" fill="#6E72F2" />
                    <path d="M5 9.99984L9 13.3332L14.3333 6.6665" stroke="white" stroke-width="1.33333"
                          stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_95_2581">
                        <rect width="20" height="20" rx="9.6" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </SvgIcon>
    );
}
