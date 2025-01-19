import React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <mask id="mask0_199_1374" style={{ maskType: "alpha", }} maskUnits="userSpaceOnUse" x="0" y="0"
              width="20" height="20">
            <rect width="20" height="20" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_199_1374)">
            <rect x="13.75" y="8.75" width="2.5" height="2.5" fill="#373737" />
            <rect x="8.75" y="8.75" width="2.5" height="2.5" fill="#373737" />
            <rect x="3.75" y="8.75" width="2.5" height="2.5" fill="#373737" />
            <rect x="13.75" y="3.75" width="2.5" height="2.5" fill="#373737" />
            <rect x="8.75" y="3.75" width="2.5" height="2.5" fill="#373737" />
            <rect x="3.75" y="3.75" width="2.5" height="2.5" fill="#373737" />
            <rect x="13.75" y="13.75" width="2.5" height="2.5" fill="#373737" />
            <rect x="8.75" y="13.75" width="2.5" height="2.5" fill="#373737" />
            <rect x="3.75" y="13.75" width="2.5" height="2.5" fill="#373737" />
        </g>
    </svg>
)
export default SvgComponent
