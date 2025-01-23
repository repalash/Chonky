import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function Icon(props: SvgIconProps) {
    return (
        <SvgIcon sx={{ width: 'auto', height: 'auto' }} {...props}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_199_3545" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                    <rect width="20" height="20" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_199_3545)">
                    <path d="M5.83325 17.5C5.37492 17.5 4.98256 17.3368 4.65617 17.0104C4.32978 16.684 4.16659 16.2917 4.16659 15.8333V5H3.33325V3.33333H7.49992V2.5H12.4999V3.33333H16.6666V5H15.8333V15.8333C15.8333 16.2917 15.6701 16.684 15.3437 17.0104C15.0173 17.3368 14.6249 17.5 14.1666 17.5H5.83325ZM14.1666 5H5.83325V15.8333H14.1666V5ZM7.49992 14.1667H9.16658V6.66667H7.49992V14.1667ZM10.8333 14.1667H12.4999V6.66667H10.8333V14.1667Z" fill="#373737"/>
                </g>
            </svg>
        </SvgIcon>
    );
}

