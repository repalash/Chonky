import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function Icon() {
    return (
        <SvgIcon sx={{ width: 'auto', height: 'auto' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_157_4624" style={{ maskType: "alpha", }} maskUnits="userSpaceOnUse" x="0" y="0"
                      width="20" height="20">
                    <rect width="20" height="20" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_157_4624)">
                    <path
                        d="M7.95831 15.0001L3.20831 10.2501L4.39581 9.06258L7.95831 12.6251L15.6041 4.97925L16.7916 6.16675L7.95831 15.0001Z"
                        fill="#373737" />
                </g>
            </svg>
        </SvgIcon>
    );
}
