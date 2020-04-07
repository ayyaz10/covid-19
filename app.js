

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

    fetch(`${data.confirmed.detail}`).then((response)=>{
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
       })
    //    fetch(`${data.recovered.detail}`).then((recoveredRes)=>{
    //     return recoveredRes.json();
    //     }).then((recoveredRes) => {
    //         console.log(recoveredRes)
    //     })

    })  

