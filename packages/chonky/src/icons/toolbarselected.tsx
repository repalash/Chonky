import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function Icon(props: SvgIconProps) {
    return (
        <SvgIcon sx={{ width: 'auto', height: 'auto' }} {...props}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_199_2396)">
                    <rect x="1" y="1" width="18" height="18" rx="8.6" stroke="#F1F2FE" strokeWidth="2" />
                    <rect width="20" height="20" rx="9.6" fill="#6E72F2" />
                    <path d="M14.5 10H5.5" stroke="white" strokeWidth="1.5" />
                </g>
                <defs>
                    <clipPath id="clip0_199_2396">
                        <rect width="20" height="20" rx="9.6" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </SvgIcon>
    );
}
