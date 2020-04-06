

// fetching confirmed, recovered and total deaths
fetch('https://covid19.mathdro.id/api').then((response) => {
    return response.json();
}).then((data) => {
    // console.log(data)
    // console.log(data.recovered.value)
    const totalConfirmed = document.getElementsByClassName('confirmed-cases')[0].innerHTML = data.confirmed.value;
    const totalRecovered = document.getElementsByClassName('recovered-cases')[0].innerHTML = data.recovered.value;
    const totalDeaths = document.getElementsByClassName('death-cases')[0].innerHTML = data.deaths.value;
    document.getElementsByClassName('active-cases')[0].innerHTML = totalConfirmed - (totalRecovered + totalDeaths);
    document.getElementsByClassName('closed-cases')[0].innerHTML = totalRecovered + totalDeaths;

    fetch(`${data.deaths.detail}`).then((response)=>{
        return response.json();
        })
        .then((response) => {
            let usDeaths = 0;
            let usConfirmed = 0;
            let usRecovered = 0;
            let output = '';
            const result = response.forEach((res, i)=>{
                if(res.countryRegion.toLowerCase() === "us") {
                    usConfirmed = usConfirmed + res.confirmed;  
                    usRecovered = usRecovered + res.recovered;  
                    usDeaths = usDeaths + res.deaths;  
                }
        })
            output += 
                `<tr>
                    <td>US</td>
                    <td>${usConfirmed}</td>
                    <td>${usRecovered}</td>
                    <td>${usDeaths}</td>
                    </br>
                </tr>`;
    
              document.querySelector('.fetch-content').innerHTML = output;
       })
    })  

