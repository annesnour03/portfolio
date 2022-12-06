import React from "react"
import {
    GoogleMap,
    LoadScript,
    Marker,
    MarkerClusterer,
} from "@react-google-maps/api"
import JSConfetti from "js-confetti"

const mapOptions = {
    styles: [
        {
            elementType: "labels",
            featureType: "poi",
            stylers: [{ visibility: "off" }],
        },
        {
            elementType: "labels",
            featureType: "transit",
            stylers: [{ visibility: "off" }],
        },
    ],
    streetViewControl: false,
}
const locations = [
    {
        lat: 51.49837146846761,
        lng: 3.614952668089537,
    },
    {
        lat: 53.198874127369535,
        lng: 5.788635021723723,
    },
    {
        lat: 52.739741667085006,
        lng: 6.060637014279985,
    },
]

function Birthday() {
    const mapCenter = {
        lat: 52.087893817043714,
        lng: 5.400443370751108,
    }
    const mapZoom = 7
    const jsConfetti = new JSConfetti()

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}>
                <GoogleMap
                    mapContainerStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                    center={mapCenter}
                    zoom={mapZoom}
                    options={mapOptions}
                    onLoad={() => {
                        jsConfetti.addConfetti({
                            emojis: ["🥳", "🎉"],
                            emojiSize: 100,
                        })
                    }}
                >
                    <MarkerClusterer
                        options={{
                            imagePath:
                                "https://s3.eu-central-1.amazonaws.com/cdn.wepartynow.com/assets/mapcluster2/m",
                            imageSizes: [48],
                        }}
                    >
                        {(clusterer) =>
                            locations.map((location) => {
                                return (
                                    <Marker
                                        clusterer={clusterer}
                                        position={location}
                                        icon={{
                                            url: "https://s3.eu-central-1.amazonaws.com/cdn.wepartynow.com/assets/mobile_map/pin80.png",
                                            anchor: new window.google.maps.Point(
                                                20,
                                                40
                                            ),
                                            scaledSize:
                                                new window.google.maps.Size(
                                                    40,
                                                    40
                                                ),
                                        }}
                                        clickable={true}
                                    />
                                )
                            })
                        }
                    </MarkerClusterer>
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default Birthday
