

const tBody = document.querySelector('.fetch-content');
const bottomTBody = document.querySelector('.bottom-sum');
const tableHeading = document.querySelector('thead');


// console.log(topToTh)
// fetching confirmed, recovered and total deaths
function fetchApiData(){
        fetch('http://api.coronastatistics.live/all').then((response) => {
        return response.json();
    }).then(data => {

        function addComma(x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        const totalConfirmed = document.getElementsByClassName('confirmed-cases')[0];
        const totalRecovered = document.getElementsByClassName('recovered-cases')[0];
        const totalDeaths = document.getElementsByClassName('death-cases')[0];

        totalConfirmed.innerHTML = addComma(data.cases);
        totalRecovered.innerHTML = addComma(data.recovered);
        totalDeaths.innerHTML = addComma(data.deaths);

        const totalActiveCases = data.cases - (data.recovered + data.deaths);
        const totalClosedCases = data.recovered  + data.deaths;

        document.getElementsByClassName('active-cases')[0].innerHTML = addComma(totalActiveCases)
        document.getElementsByClassName('closed-cases')[0].innerHTML = addComma(totalClosedCases);
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
            // let tTests = 0;
            // let tTestsPMillion = 0;
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
                //  tests,
                //  testsPerOneMillion   
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

                
                // tTests += tests;
                // tTestsPMillion += testsPerOneMillion;
                
                obj.totalCases = tCases;
                obj.totalNewCases = tNewCases;
                obj.totalDeaths = tDeaths;
                obj.totalNewDeaths = tNDeaths;
                obj.totalRecovered = tRecovered;
                obj.totalActiveCases = tActiveCases;
                obj.totalCriticalCases = tCriticalCases;
                obj.totalCasesPerMillion = tCasesPMillion.toFixed(2);
                obj.totalDeathsPerMillion = tDeathsPMillion.toFixed(2);
                // obj.totalTests = tTests;
                // obj.totalTestsPerMillion = tTestsPMillion;
             
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
                    //  data[i].tests,
                    //  data[i].testsPerOneMillion
                );}
                const tr = document.createElement('tr');  

                function createDataCell(cellData){
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    return td;
                }   

                function addComma(x){
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                const totalCases = addComma(obj.totalCases);
                const totalNewCases = addComma(obj.totalNewCases);
                const totalDeaths = addComma(obj.totalDeaths);
                const totalNewDeaths = addComma(obj.totalNewDeaths);
                const totalRecovered = addComma(obj.totalRecovered);
                const totalActiveCases = addComma(obj.totalActiveCases);
                const totalCriticalCases = addComma(obj.totalCriticalCases);
                const totalCasesPerMillion = addComma(obj.totalCasesPerMillion);
                const totalDeathsPerMillion = addComma(obj.totalDeathsPerMillion);
                // const totalTests = addComma(obj.totalTests);
                // const totalTestsPerMillion = addComma(obj.totalTestsPerMillion);


                tBody.firstElementChild.appendChild(createDataCell(totalCases));
                tBody.firstElementChild.appendChild(createDataCell(totalNewCases));
                tBody.firstElementChild.appendChild(createDataCell(totalDeaths));
                tBody.firstElementChild.appendChild(createDataCell(totalNewDeaths));
                tBody.firstElementChild.appendChild(createDataCell(totalRecovered));
                tBody.firstElementChild.appendChild(createDataCell(totalActiveCases));
                tBody.firstElementChild.appendChild(createDataCell(totalCriticalCases));
                tBody.firstElementChild.appendChild(createDataCell(totalCasesPerMillion));
                tBody.firstElementChild.appendChild(createDataCell(totalDeathsPerMillion));
                // tBody.firstElementChild.appendChild(createDataCell(totalTests));
                // tBody.firstElementChild.appendChild(createDataCell(totalTestsPerMillion));
                tBody.firstElementChild.style.background = "#dddddd";
                
                // styling new cases and new deaths cells 
                const colorAddedtotalNewCases = createDataCell(totalNewCases);
                const colorAddedtotalNewDeaths = createDataCell(totalNewDeaths);
                colorAddedtotalNewCases.style.background = "#f4f9a7";
                colorAddedtotalNewDeaths.style.background = "#ff0000";
                colorAddedtotalNewDeaths.style.color = "#ffffff";

                // bottom of the table total section
                bottomTBody.firstElementChild.appendChild(createDataCell(totalCases))
                bottomTBody.firstElementChild.appendChild(colorAddedtotalNewCases)
                bottomTBody.firstElementChild.appendChild(createDataCell(totalDeaths))
                bottomTBody.firstElementChild.appendChild(colorAddedtotalNewDeaths)
                bottomTBody.firstElementChild.appendChild(createDataCell(totalRecovered))
                bottomTBody.firstElementChild.appendChild(createDataCell(totalActiveCases))
                bottomTBody.firstElementChild.appendChild(createDataCell(totalCriticalCases))
                bottomTBody.firstElementChild.appendChild(createDataCell(totalCasesPerMillion))
                bottomTBody.firstElementChild.appendChild(createDataCell(totalDeathsPerMillion))
                // bottomTBody.firstElementChild.appendChild(createDataCell(totalTests))
                // bottomTBody.firstElementChild.appendChild(createDataCell(totalTestsPerMillion))

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

        // sorting by cases
        function sortByCases(data){
        data.sort(function(a, b){
            return b.cases - a.cases;
        })
    }
    sortByCases(data);

    data.forEach(covid => {
        const tr = document.createElement('tr');
        tr.classList.add('tr')

        
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
        const plusAddedtodayCases = addPlus(covid.todayCases);
        const removedZeroDeaths = removeZero(covid.deaths)
        const plusAddedTodayDeaths = addPlus(covid.todayDeaths);
        const removedZeroRecoveredCases = removeZero(covid.recovered)
        const removedZeroActiveCases = removeZero(covid.active)
        const removedZeroCriticalCases = removeZero(covid.critical)
        const removedZeroCasesPerOneMillionCases = removeZero(covid.casesPerOneMillion)
        const removedZeroDeathsPerOneMillionCases = removeZero(covid.deathsPerOneMillion)
        // const removedZeroCasesTested = removeZero(covid.tests)
        // const removedZeroPerOneMillionTestedCases = removeZero(covid.testsPerOneMillion)

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
            if(x === null){
                x = "";
            }
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        // calling addComma function in order to add comma to each column
        const commaAddedCases = addComma(covid.cases);
        const commaAddedTodayCases = addComma(plusAddedtodayCases);
        const commaAddedDeaths = addComma(removedZeroDeaths);
        const commaAddedTodayDeaths = addComma(plusAddedTodayDeaths);
        const commaAddedRecoveredCases = addComma(removedZeroRecoveredCases);
        const commaAddedActiveCases = addComma(removedZeroActiveCases);
        const commaAddedCriticalCases = addComma(removedZeroCriticalCases);
        const commaAddedPerOneMillionCases = addComma(removedZeroCasesPerOneMillionCases);
        const commaAddedPerOneMillionDeaths = addComma(removedZeroDeathsPerOneMillionCases);
        // const commaAddedTests = addComma(removedZeroCasesTested);
        // const commaAddedTestsPerOneMillion = addComma(removedZeroPerOneMillionTestedCases);
            
            
        const countries = createDataCell(covid.country).children[0];
        createDataCell(commaAddedCases);
        const newCases = createDataCell(commaAddedTodayCases).children[2];
        createDataCell(commaAddedDeaths);
        const newDeaths = createDataCell(commaAddedTodayDeaths).children[4];
        createDataCell(commaAddedRecoveredCases);
        createDataCell(commaAddedActiveCases);
        createDataCell(commaAddedCriticalCases);
        createDataCell(commaAddedPerOneMillionCases);
        createDataCell(commaAddedPerOneMillionDeaths);
        // createDataCell(commaAddedTests);
        // createDataCell(commaAddedTestsPerOneMillion);

        tBody.appendChild(tr);

        // styling new cases and new deaths cells + styling international conveyances to distinguish them from other countries.
        if(newCases.textContent.includes('+')){
            newCases.style.background = "#f4f9a7";
        } 
        if( newDeaths.textContent.includes('+')){
            newDeaths.style.background = "#ff0000";
            newDeaths.style.color = "#ffffff";
        } else if (covid.country.toLowerCase().includes('diamond princess') || covid.country.toLowerCase().includes('ms zaandam')){
            countries.style.color= "blue";
            countries.style.fontStyle = "italic";
        }
    });  

    // adding search functionality
    let input = document.querySelector('.search-box');

    input.addEventListener("keyup", function(){

        const tr = document.querySelectorAll(".tr");
        let filter;
        filter = input.value.toLowerCase();

        for (let i = 0; i < tr.length; i++) {
            if (tr[i].firstElementChild.innerHTML.toLowerCase().indexOf(filter) > -1) {
                console.log(tr[i])
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    })
    
} 



// calling main function
document.addEventListener('DOMContentLoaded', () => { fetchApiData(); });