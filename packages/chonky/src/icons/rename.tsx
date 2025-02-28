import React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <mask id="mask0_825_1055" style={{ maskType: "alpha", }}  maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
            <rect width="20" height="20" fill="#373737"/>
        </mask>
        <g mask="url(#mask0_825_1055)">
            <path d="M11.7516 6.06055H4.50535C4.08844 6.06055 3.73333 6.20721 3.44 6.50054C3.14667 6.79387 3 7.14899 3 7.56589V12.0464C3 12.4633 3.14667 12.8185 3.44 13.1118C3.73333 13.4051 4.08844 13.5518 4.50535 13.5518H11.7516V12.0464H4.50535V7.56589H11.7516V6.06055Z" fill="#373737"/>
            <path d="M13.3025 7.56589V6.06055H16.1976C16.6145 6.06055 16.9696 6.20721 17.2629 6.50054C17.5563 6.79387 17.7029 7.14899 17.7029 7.56589V12.0464C17.7029 12.4633 17.5563 12.8185 17.2629 13.1118C16.9696 13.4051 16.6145 13.5518 16.1976 13.5518H13.3025V12.0464H16.1976V7.56589H13.3025Z" fill="#373737"/>
            <path d="M12.7872 3.99996H9.23138V5.45979H10.2062V14.8112H9.23138V16H12.7872V14.8112H11.7571V5.45979H12.7872V3.99996Z" fill="#373737"/>
        </g>
    </svg>
)
export default SvgComponent
