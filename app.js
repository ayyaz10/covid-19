

// fetching confirmed, recovered and total deaths
fetch('http://api.coronastatistics.live/all').then((response) => {
    return response.json();
}).then((data) => {
    const totalConfirmed = document.getElementsByClassName('confirmed-cases')[0].innerHTML = data.cases;
    const totalRecovered = document.getElementsByClassName('recovered-cases')[0].innerHTML = data.recovered;
    const totalDeaths = document.getElementsByClassName('death-cases')[0].innerHTML = data.deaths;
    document.getElementsByClassName('active-cases')[0].innerHTML = totalConfirmed - (totalRecovered + totalDeaths);
    document.getElementsByClassName('closed-cases')[0].innerHTML = totalRecovered + totalDeaths;

})

fetch('http://api.coronastatistics.live/countries').then((response) => {
    return response.json();
}).then((data) => {
    let output = '';
    data.forEach((covid) => {
        console.log(typeof(covid.country))
        output +=
            `
            <tr>
                <td>${covid.country}</td>
                <td>${covid.cases}</td>
                <td>${covid.recovered}</td>
                <td>${covid.deaths}</td>
            </tr>
            `
    })
          document.querySelector('.fetch-content').innerHTML = output;
})
            // switch(response.countryRegion) {

            // }
        //     // let usDeaths = 0;
        //     let usConfirmed = 0;
        //     let franceConfirmed = 0;
        //     let thatCconfirmed = 0;
        //     let output = '';
        //     let array = "";
        //     const result = response.map((data)=>{
        //         array = data.countryRegion;
        //         return array;
        //     })
        //     response.forEach((res, i)=>{
        //         if(res.countryRegion.toLowerCase() === "result") {
        //             // usConfirmed = usConfirmed + res.confirmed;  
        //             // usRecovered = usRecovered + res.recovered;  
        //             usConfirmed = usConfirmed + res.confirmed;  

                   


        //         } else if(res.countryRegion.toLowerCase()=== "result"){
        //             thatCconfirmed += thatCconfirmed +res.confirmed;
                
        //     }
        //          else {
        //             output += 
        //             `<tr>
        //                 <td>${res.countryRegion}</td>
        //                 <td>${res.confirmed}</td>
        //                 </br>
        //             </tr>
        //             <tr>
        //             </tr>
        //             `
        //         }
        // })
        // output += 
        // `<tr>
        //     <td>US</td>
        //     <td>${usConfirmed}</td>
        //     </br>
        // </tr>
        // <tr>
        //     <td>France</td>

        //     </br>
        // </tr>
        // `
    
            //   document.querySelector('.fetch-content').innerHTML = output;

    //    fetch(`${data.recovered.detail}`).then((recoveredRes)=>{
    //     return recoveredRes.json();
    //     }).then((recoveredRes) => {
    //         console.log(recoveredRes)
    //     })


