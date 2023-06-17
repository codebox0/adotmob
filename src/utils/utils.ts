export const distanceFromLatLonInKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = degToRad(lat2 - lat1);  // deg2rad below
    const dLon = degToRad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

export const findNearlyPoint = (points: { event: { lat: number, lng: number }, point1: { lat: number, lng: number }, point2: { lat: number, lng: number } }) => {
    const d1 = distanceFromLatLonInKm(points.event.lat, points .event.lng, points.point1.lat, points.point2.lng);
    const d2 = distanceFromLatLonInKm(points.event.lat, points.event.lng, points.point2.lat, points.point2.lng);
    return d1 < d2 ? points.point1 : points.point2;
}


const degToRad = (deg:number) => {
    return (deg * Math.PI) / 180
}
