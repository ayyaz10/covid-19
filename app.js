

// fetching confirmed, recovered and total deaths
fetch('https://covid19.mathdro.id/api').then((response) => {
    return response.json();
}).then((data)=>{
    console.log(data)
    // console.log(data.recovered.value)
    const totalConfirmed = document.getElementsByClassName('confirmed-cases')[0].innerHTML = data.confirmed.value;
    const totalRecovered = document.getElementsByClassName('recovered-cases')[0].innerHTML = data.recovered.value;
    const totalDeaths = document.getElementsByClassName('death-cases')[0].innerHTML = data.deaths.value;
    document.getElementsByClassName('active-cases')[0].innerHTML = totalConfirmed - (totalRecovered + totalDeaths);
    document.getElementsByClassName('closed-cases')[0].innerHTML = totalRecovered + totalDeaths;

    fetch(`${data.confirmed.detail}`).then((response)=>{
        return response.json();
}).then((response)=>{
        let output = '';
    response.forEach(country => {
       output += 
       `<tr>
            <td>${country.countryRegion}</td>
            <td>${country.confirmed}</td>
            <td>${country.recovered}</td>
            <td>${country.deaths}</td>  
            </br>
        </tr>`
    });
    
    document.querySelector('.fetch-content').innerHTML = output;
})
})



// globalXhr.onload = () => {
//     const response = JSON.parse(globalXhr.responseText);
//     // console.log(response);
//     const totalConfirmed = document.getElementsByClassName('confirmed-cases')[0].innerHTML = response.confirmed.value;
//     const totalRecovered = document.getElementsByClassName('recovered-cases')[0].innerHTML = response.recovered.value;
//     const totalDeaths = document.getElementsByClassName('death-cases')[0].innerHTML = response.deaths.value;
//     document.getElementsByClassName('active-cases')[0].innerHTML = totalConfirmed - (totalRecovered + totalDeaths);
//     document.getElementsByClassName('closed-cases')[0].innerHTML = totalRecovered + totalDeaths;
// }

// globalXhr.send();


// // fetching details country vise
// const countriesXhr = new XMLHttpRequest();

// countriesXhr.open('GET', 'https://covid19.mathdro.id/api/confirmed', true);
// countriesXhr.onload = () => {
//     const response = JSON.parse(countriesXhr.responseText);
//     let output = '';
//     response.forEach(country => {
//        output += 
//        `<tr>
//             <td>${country.countryRegion}</td>
//             <td>${country.confirmed}</td>
//             <td>${country.recovered}</td>
//             <td>${country.deaths}</td>  
//             </br>
//         </tr>`
//     });
    
//     document.querySelector('.fetch-content').innerHTML = output;

// }

// countriesXhr.send();
