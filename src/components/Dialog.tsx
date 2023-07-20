import React from "react"

type Props = {
    children: React.ReactNode,
    toggleFunction: () => void,
}

const Dialog: React.FC<Props>= ({children, toggleFunction}) => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50">
            <div onClick={toggleFunction} className="absolute top-0 left-0 w-screen h-screen bg-black/25 backdrop-filter backdrop-blur-lg"></div>
            {children}
        </div>
    )
}

export default Dialog