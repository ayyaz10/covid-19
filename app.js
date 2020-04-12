

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

    function populateCountryData(data)
        {
        function sortByCases(data){
        data.sort(function(a, b){
            return b.cases - a.cases;
        })
    }

    sortByCases(data);
     

    data.forEach(covid => {
        const tr = document.createElement('tr');   

        // adding '+' sign to new to today new cases and today new deaths
        function addPlus(input){
            if(input === 0){
                input = "";
                return input;
            } 
             else {
                input += "+";
                return input;
            }
        }

        function removeZero(input) {
            if(input === 0) {
                input = "";
                return input;
            } else {
                return input;
            }
        }

        const todayCases = addPlus(covid.todayCases);
        const todayDeaths = addPlus(covid.todayDeaths);
        const peopleDied = removeZero(covid.deaths)
        const recoveredCases = removeZero(covid.recovered)
        const activeCases = removeZero(covid.active)
        const criticalCases = removeZero(covid.critical)
        const casesPerOneMillionCases = removeZero(covid.casesPerOneMillion)
        const deathsPerOneMillionCases = removeZero(covid.deathsPerOneMillion)
        const casesTested = removeZero(covid.tests)
        const perOneMillionTestedCases = removeZero(covid.testsPerOneMillion)


        // function that creates td's
        function createDataCell(cellData){
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td)
            return tr;
        }


        createDataCell(covid.country);
        createDataCell(covid.cases);
        const newCases = createDataCell(todayCases).children[2];
        createDataCell(peopleDied);
        const newDeaths = createDataCell(todayDeaths).children[4];
        createDataCell(recoveredCases);
        createDataCell(activeCases);
        createDataCell(criticalCases);
        createDataCell(casesPerOneMillionCases);
        createDataCell(deathsPerOneMillionCases);
        createDataCell(casesTested);
        createDataCell(perOneMillionTestedCases);

        tBody.appendChild(tr);

        if(newCases.textContent.includes('+')){
            newCases.style.background = "#f4f9a7";
            // ff0000
        } 
        if( newDeaths.textContent.includes('+')){
            newDeaths.style.background = "#ff0000";
            newDeaths.style.color = "#ffffff";
        }
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

               // console.log(createTd(covid.country))
        // const countriesCell = createTd(covid.country);
        // console.log(countriesCell)
        

        // const countriesCell = createDataCell(covid.country);
        // const totalCasesCell = createDataCell(covid.country);
        // const todayCasesCell = createDataCell(covid.country);
        // const totalDeathsCell = createDataCell(covid.country);
        // const todayDeathsCell = createDataCell(covid.country);
        // const totalRecoveredCell = createDataCell(covid.country);
        // const activeCell = createDataCell(covid.country);
        // const criticalCell = createDataCell(covid.country);
        // const casesPerMillionCell = createDataCell(covid.country);
        // const deathsPerMillionCell = createDataCell(covid.country);

        // tr.appendChild(countriesCell)
        
        // tr.appendChild(totalCasesCell)
        // tr.appendChild(todayCasesCell)
        // tr.appendChild(totalDeathsCell)
        // tr.appendChild(todayDeathsCell)
        // tr.appendChild(totalRecoveredCell)
        // tr.appendChild(activeCell)
        // tr.appendChild(criticalCell)
        // tr.appendChild(casesPerMillionCell)
        // tr.appendChild(deathsPerMillionCell)