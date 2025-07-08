import React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M0.5 7.16667V0.5H7.16667V7.16667H0.5ZM0.5 15.5V8.83333H7.16667V15.5H0.5ZM8.83333 7.16667V0.5H15.5V7.16667H8.83333ZM8.83333 15.5V8.83333H15.5V15.5H8.83333ZM2.16667 5.5H5.5V2.16667H2.16667V5.5ZM10.5 5.5H13.8333V2.16667H10.5V5.5ZM10.5 13.8333H13.8333V10.5H10.5V13.8333ZM2.16667 13.8333H5.5V10.5H2.16667V13.8333Z" fill="#373737" />
    </svg>

)
export default SvgComponent
