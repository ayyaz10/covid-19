

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

            // calculating all cases and adding the total (world) section at the top and the end of the table
            let tCases = 0;
            let tNewCases = 0;
            let tDeaths = 0;
            let tNDeaths = 0;
            let tRecovered  = 0;
            let tActiveCases = 0;
            let tCriticalCases = 0;
            let tCasesPMillion = 0;
            let tDeathsPMillion = 0;
            let tTests = 0;
            let tTestsPMillion = 0;
            let obj = {};

            function sumWorldData(
                 cases,
                 newCases,
                 deaths,
                 todayDeaths,
                 recovered,
                 active,
                 critical,
                 casesPerOneMillion,
                 deathsPerOneMillion,
                 tests,
                 testsPerOneMillion   
                 ){
                // here 't' means total
                tCases += cases;
                tNewCases += newCases;
                tDeaths += deaths;
                tNDeaths += todayDeaths;
                tRecovered += recovered;
                tActiveCases += active;
                tCriticalCases += critical;
                tCasesPMillion += casesPerOneMillion;
                tDeathsPMillion += deathsPerOneMillion;
                tTests += tests;
                tTestsPMillion += testsPerOneMillion;
                
                obj.totalCases = tCases;
                obj.totalNewCases = tNewCases;
                obj.totalDeaths = tDeaths;
                obj.totalNewDeaths = tNDeaths;
                obj.totalRecovered = tRecovered;
                obj.totalActiveCases = tActiveCases;
                obj.totalCriticalCases = tCriticalCases;
                obj.totalCasesPerMillion = tCasesPMillion;
                obj.totalDeathsPerMillion = tDeathsPMillion;
                obj.totalTests = tTests;
                obj.totalTestsPerMillion = tTestsPMillion;
             
            }
            for(let i = 0; i < data.length; i ++){
                sumWorldData(
                     data[i].cases,
                     data[i].todayCases,
                     data[i].deaths,
                     data[i].todayDeaths,
                     data[i].recovered,
                     data[i].active,
                     data[i].critical,
                     data[i].casesPerOneMillion,
                     data[i].deathsPerOneMillion,
                     data[i].tests,
                     data[i].testsPerOneMillion
                );}
                const tr = document.createElement('tr');  

                function createDataCell(cellData){
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    return td;
                }   

                tBody.firstElementChild.appendChild(createDataCell(obj.totalCases))
                tBody.firstElementChild.appendChild(createDataCell(obj.totalNewCases))
                tBody.firstElementChild.appendChild(createDataCell(obj.totalDeaths))
                tBody.firstElementChild.appendChild(createDataCell(obj.totalNewDeaths))
                tBody.firstElementChild.appendChild(createDataCell(obj.totalRecovered))
                tBody.firstElementChild.appendChild(createDataCell(obj.totalActiveCases))
                tBody.firstElementChild.appendChild(createDataCell(obj.totalCriticalCases))
                tBody.firstElementChild.appendChild(createDataCell(obj.totalCasesPerMillion))
                tBody.firstElementChild.appendChild(createDataCell(obj.totalDeathsPerMillion))
                tBody.firstElementChild.appendChild(createDataCell(obj.totalTests))
                tBody.firstElementChild.appendChild(createDataCell(obj.totalTestsPerMillion))
                tBody.firstElementChild.style.background = "#dddddd";

                
           
            function countriesCount(){
            let i;
            for(i = 0; i < data.length - 2; i++){}
            return i;
        }
        document.querySelector('.countries-count').textContent = countriesCount();
            populateCountryData(data);
        })
    }

    function populateCountryData(data){
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
                return `+${input}`;
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
        // calling addPlus and remove zero functions
        const todayCases = addPlus(covid.todayCases);
        // console.log(parseInt(todayCommaAddedCases))
        const todayDeaths = addPlus(covid.todayDeaths);
        const peopleDied = removeZero(covid.deaths)
        const recoveredCases = removeZero(covid.recovered)
        const activeCases = removeZero(covid.active)
        const criticalCases = removeZero(covid.critical)
        const casesPerOneMillionCases = removeZero(covid.casesPerOneMillion)
        const deathsPerOneMillionCases = removeZero(covid.deathsPerOneMillion)
        const casesTested = removeZero(covid.tests)
        const perOneMillionTestedCases = removeZero(covid.testsPerOneMillion)

        // injecting data to the table
        
        // function that creates td's
        function createDataCell(cellData){
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td)
            return tr;
        }

                // function that adds Commas in numbers

                function addComma(x){
                    return x.toLocaleString();
                }
                const commaAddedCases =  addComma(covid.cases)
                const todayCommaAddedCases =  addComma(todayCases)
                // console.log(typeof(todayCases))
                console.log(parseFloat(commaAddedCases))
            
        // createDataCell("world")
        const countries = createDataCell(covid.country).children[0];
        createDataCell(commaAddedCases);
        const newCases = createDataCell(todayCommaAddedCases).children[2];
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

        // styling new cases and new deaths cells + styling international conveyances to distinguish them from other countries.
        if(newCases.textContent.includes('+')){
            newCases.style.background = "#f4f9a7";
            // ff0000
        } 
        if( newDeaths.textContent.includes('+')){
            newDeaths.style.background = "#ff0000";
            newDeaths.style.color = "#ffffff";
        } else if (covid.country.toLowerCase().includes('diamond princess') || covid.country.toLowerCase().includes('ms zaandam')){
            countries.style.color= "blue";
            countries.style.fontStyle = "italic";
        }
    });  
}  

// calling main function
document.addEventListener('DOMContentLoaded', () => { fetchApiData(); });