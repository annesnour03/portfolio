import React, { useEffect } from "react"
import { isIOS } from "react-device-detect"
const RouteExpo = () => {
    useEffect(() => {
        let type = "android"
        if (isIOS) type = "ios"
        window.location.replace(
            `http://5p-gm3.annes.mobile-new.exp.direct:80/_expo/loading?platform=${type}`
        )
    }, [])
    return <div>Redirecting shortly!</div>
}

export default RouteExpo
