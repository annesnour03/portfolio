import React, { useEffect } from "react"

const RouteExpo = ({ platform }) => {
    useEffect(() => {
        window.location.replace(
            `http://5p-gm3.annes.mobile-new.exp.direct:80/_expo/loading?platform=${platform}`
        )
    }, [])
    return <div>Redirecting!</div>
}

export default RouteExpo
