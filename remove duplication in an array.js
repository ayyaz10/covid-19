fetch('http://api.coronastatistics.live/countries').then((response)=>{
    return response.json();
    })
    .then((response) => {
        let countries = [];
        for(let i=0; i < response.length; i++){
         countries.push(response[i].countryRegion.toLowerCase());
    }
    // console.log(countries)
    function removeDuplicates(countries) {
        let count = countries.filter((a, b) => countries.indexOf(a) === b)
        console.log(count)
      };
      removeDuplicates(countries)
