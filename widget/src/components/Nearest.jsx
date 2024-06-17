import React from 'react'

export default function Nearest() {
    function getLocationName() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    
    function showPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
    
        // Use the OpenStreetMap Nominatim API to get the location name
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const locationName = data.display_name;
                console.log("Location Name: ", locationName);
            })
            .catch(error => console.error('Error:', error));
    }
    
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                break;
        }
    }
    
    // Call the function to get the location name
    getLocationName();
    
  return (
    <div>Nearest</div>
  )
}
