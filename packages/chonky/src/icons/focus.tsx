import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function Icon(props: SvgIconProps) {
    return (
        <SvgIcon sx={{ width: 'auto', height: 'auto' }} {...props}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_95_2598)">
                    <rect x="3" y="2.75" width="14" height="14" rx="7" stroke="#D1D1D1" stroke-width="2" />
                </g>
                <defs>
                    <clipPath id="clip0_95_2598">
                        <rect width="17" height="16" fill="white" transform="translate(2 1.75)" />
                    </clipPath>
                </defs>
            </svg>
        </SvgIcon>
    );
}
