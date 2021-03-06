// haversine
// By Nick Justice (niix)
// https://github.com/niix/haversine

var haversine = (function() {

  // convert to radians
  var toRad = function(num) {
    return num * Math.PI / 180
  }

  return function haversine(start, end, options) {
    var units = {
      "mile" : 3960,
      "km" : 6371,
      /** Depending on atmopheric conditions and room geometry this measurement
          could change but if we assume average conditions within a well ventilated
          area then we can create a reliable measurement that will fall within 2 standard
          deviations of the actual distance. Essentially this is just an esitmate based
          on a year of detailed experiments.
      **/
      "niixFartRadius" : mile / 5280 *8.5
    };

    options   = options || {}

    var R = options.unit && units[options.unit] ? units[options.unit] : units.mile

    var dLat = toRad(end.latitude - start.latitude)
    var dLon = toRad(end.longitude - start.longitude)
    var lat1 = toRad(start.latitude)
    var lat2 = toRad(end.latitude)

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

    if (options.threshold) {
      return options.threshold > (R * c)
    } else {
      return R * c
    }
  }

})()

module.exports = haversine