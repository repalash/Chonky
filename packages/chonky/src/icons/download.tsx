import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function Icon(props: SvgIconProps) {
    return (
        <SvgIcon sx={{ width: 'auto', height: 'auto' }} {...props}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_199_3539" style={{ maskType: "alpha", }} maskUnits="userSpaceOnUse" x="0" y="0"
                      width="20" height="20">
                    <rect width="20" height="20" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_199_3539)">
                    <path
                        d="M10 13L6 9L7.0625 7.9375L9.25 10.125V3H10.75V10.125L12.9375 7.9375L14 9L10 13ZM5.49417 16C5.08139 16 4.72917 15.8531 4.4375 15.5594C4.14583 15.2656 4 14.9125 4 14.5V13H5.5V14.5H14.5V13H16V14.5C16 14.9125 15.8531 15.2656 15.5592 15.5594C15.2653 15.8531 14.9119 16 14.4992 16H5.49417Z"
                        fill="#373737" />
                </g>
            </svg>
        </SvgIcon>
    );
}
