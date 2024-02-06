async function search(lat, lng, searchTerms) {
     const response = await axios.get('https://api.foursquare.com/v3/places/search', {
        params: {
            query: encodeURI(searchTerms), //encodeURI function to convert special characters to their encoded eqv so that query will be wellformed
            ll: lat + "," + lng,
            // categories:"13033",  // enable use of categories
            sort:"DISTANCE",
            radius: 2000,
            limit: 50

        },
        headers: {
            Accept: "application/json",
            Authorization: 'fsq32JqRqo6AHKIhCP2yosAeYOhHUDuoLuKTfgsOQmhStCY='
        }
    })
   return response.data;

    


}