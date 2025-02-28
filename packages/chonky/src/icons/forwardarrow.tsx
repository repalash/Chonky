import React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <mask id="mask0_85_425" style={{ maskType: "alpha", }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
            <rect width="20" height="20" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_85_425)">
            <path d="M7.76104 15L7 14.2737L11.4779 10L7 5.72633L7.76104 5L13 10L7.76104 15Z" fill="#373737"/>
        </g>
    </svg>
)
export default SvgComponent
