

const tBody = document.querySelector('.fetch-content')
// fetching confirmed, recovered and total deaths
function fetchApiData(){
        fetch('http://api.coronastatistics.live/all').then((response) => {
        return response.json();
    }).then((data) => {
        const totalConfirmed = document.getElementsByClassName('confirmed-cases')[0].innerHTML = data.cases;
        const totalRecovered = document.getElementsByClassName('recovered-cases')[0].innerHTML = data.recovered;
        const totalDeaths = document.getElementsByClassName('death-cases')[0].innerHTML = data.deaths;
        document.getElementsByClassName('active-cases')[0].innerHTML = totalConfirmed - (totalRecovered + totalDeaths);
        document.getElementsByClassName('closed-cases')[0].innerHTML = totalRecovered + totalDeaths;
    })

        fetch('http://api.coronastatistics.live/countries').then(response => {
            return response.json();
        })
        .then(data => {
            populateCountryData(data);
        })
        // .catch((e) => {
        //     // console.log(`opps ${e}`)
        // })
    }

    function populateCountryData(data){
    //     function sortByCases(data){
    //     data.sort(function(a, b){
    //         return b.cases - a.cases;
    //     })
    // }

     

        data.forEach(covid => {
            const tr = document.createElement('tr');   
        // adding '+' sign to new to today new cases and today new deaths
        function addPlus(input){
            if(input === 0){
                input = " ";
                return input;
            } else {
                input += "+";
                return input;
            }
        }
        function createTd(){
            return document.createElement('td');
        }
        const countriesCell = createTd();
        const totalCasesCell = createTd();
        const todayCasesCell = createTd();
        const totalDeathsCell = createTd();
        const todayDeathsCell = createTd();
        const totalRecoveredCell = createTd();
        const activeCell = createTd();
        const criticalCell = createTd();
        const casesPerMillionCell = createTd();
        const deathsPerMillionCell = createTd();

        // const td1 = document.createElement('td')
        countriesCell.textContent = covid.country;
        totalCasesCell.textContent = covid.cases;
        todayCasesCell.textContent = covid.todayCases;
        totalDeathsCell.textContent = covid.deaths;
        todayDeathsCell.textContent = covid.todayDeaths;
        totalRecoveredCell.textContent = covid.recovered;
        activeCell.textContent = covid.active;
        criticalCell.textContent = covid.critical;
        casesPerMillionCell.textContent = covid.casesPerOneMillion;
        deathsPerMillionCell.textContent = covid.deathsPerOneMillion;


        tr.appendChild(countriesCell)
        tr.appendChild(totalCasesCell)
        tr.appendChild(todayCasesCell)
        tr.appendChild(totalDeathsCell)
        tr.appendChild(todayDeathsCell)
        tr.appendChild(totalRecoveredCell)
        tr.appendChild(activeCell)
        tr.appendChild(criticalCell)
        tr.appendChild(casesPerMillionCell)
        tr.appendChild(deathsPerMillionCell)
        
        // createTd().textContent = covid.country;
        // createTd().textContent = covid.cases;
        console.log(createTd())

        // tr.appendChild(createTd())

        // console.log(createTd())
        // const td2 = document.createElement('td');
        // const td3 = document.createElement('td');
        // td.textContent = covid.country;
        // td2.textContent = covid.cases;
        // td3.textContent = covid.todayCases;
        // console.log(covid)
       
        
        // tr.appendChild(td);
        // tr.appendChild(td2);
        // tr.appendChild(td3);
        tBody.appendChild(tr);
        
        // console.log(covid.country)
        
        const todayCases = addPlus(covid.todayCases);
        const todayDeaths = addPlus(covid.todayDeaths);
        // console.log(sortByCases(data))

    });  
}  


document.addEventListener('DOMContentLoaded', () => { fetchApiData(); });


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




    // function sortTableByColumn(table, column, asc = "true"){
    //     const dirModifier = asc ? 1 : -1;
    //     const tBody = table.tBodies [0];
    //     const rows = Array.from(tBody.querySelectorAll('tr'))
    //     console.log(rows)
    //     const sortedRow = rows.sort((a, b) => { 
    //       console.log(a)
    //       console.log(b)
    //   })   
    //    sortTableByColumn(document.querySelector("table"), 1)   
    // }


        // output +=
        //     `
        //     <tr>
        //         <td>${covid.country}</td>
        //         <td>${covid.cases}</td>
        //         <td>${todayCases}</td>
        //         <td>${covid.deaths}</td>
        //         <td>${todayDeaths}</td>
        //         <td>${covid.recovered}</td>
        //         <td>${covid.active}</td>
        //         <td>${covid.critical}</td>
        //         <td>${covid.casesPerOneMillion}</td>
        //         <td>${covid.deathsPerOneMillion}</td>
        //     </tr>

        //     `

       //   document.querySelector('.fetch-content').innerHTML = output;