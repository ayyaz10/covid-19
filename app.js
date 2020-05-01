    let myVar;
    document.querySelector(".main").style.display = "none";
    document.querySelector("#load").classList.add('ldio-633k9nv1itq');

    myVar = setTimeout(showPage, 3000);

    function showPage() {
        document.querySelector("#load").classList.remove('ldio-633k9nv1itq');
        document.querySelector(".main").style.display = "block";
      }

const topTBody = document.querySelector('.fetch-content');
const bottomTBody = document.querySelector('.bottom-sum');
const tableHeading = document.querySelector('thead');


// fetching confirmed, recovered and total deaths

function fetchApiData(){
        fetch('https://corona.lmao.ninja/v2/all').then((response) => {
        return response.json();
    }).then(summary => {
        const update = new Date(summary.updated)
        console.log(summary.updated)
        document.querySelector('.last-update').textContent = update;
        document.querySelector('.countries-count').textContent = summary.affectedCountries;
        function addComma(x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const totalConfirmed = document.getElementsByClassName('confirmed-cases')[0];
        const totalRecovered = document.getElementsByClassName('recovered-cases')[0];
        const totalDeaths = document.getElementsByClassName('death-cases')[0];

        totalConfirmed.innerHTML = addComma(summary.cases);
        totalRecovered.innerHTML = addComma(summary.recovered);
        totalDeaths.innerHTML = addComma(summary.deaths);

        const totalActiveCases = summary.cases - (summary.recovered + summary.deaths);
        const totalClosedCases = summary.recovered  + summary.deaths;

        document.getElementsByClassName('active-cases')[0].innerHTML = addComma(totalActiveCases)
        document.getElementsByClassName('closed-cases')[0].innerHTML = addComma(totalClosedCases);

        
        function createDataCell(cellData){
            const td = document.createElement('td');
            td.textContent = cellData;
            return td;
        }   

        function addComma(x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        function addPlus(input){
            if(input === 0){
                input = "";
                return input;
            } 
             else {
                return `+${input}`;
            }
        }

        // countries data
        const totalCases = addComma(summary.cases);
        const totalNewCases = addComma(summary.todayCases);
        const totalOfDeaths = addComma(summary.deaths);
        const totalNewDeaths = addComma(summary.todayDeaths);
        const totalOfRecovered = addComma(summary.recovered);
        const totalOfActiveCases = addComma(summary.active);
        const totalCriticalCases = addComma(summary.critical);
        const totalCasesPerMillion = addComma(summary.casesPerOneMillion);
        const totalDeathsPerMillion = addComma(summary.deathsPerOneMillion);
        const totalTests = addComma(summary.tests);
        const totalTestsPerMillion = addComma(summary.testsPerOneMillion);

        const plusAddedTotalNewCases = addPlus(totalNewCases);
        const plusAddedTotalNewDeaths = addPlus(totalNewDeaths);

        topTBody.firstElementChild.appendChild(createDataCell(totalCases));
        topTBody.firstElementChild.appendChild(createDataCell(plusAddedTotalNewCases));
        topTBody.firstElementChild.appendChild(createDataCell(totalOfDeaths));
        topTBody.firstElementChild.appendChild(createDataCell(plusAddedTotalNewDeaths));
        topTBody.firstElementChild.appendChild(createDataCell(totalOfRecovered));
        topTBody.firstElementChild.appendChild(createDataCell(totalOfActiveCases));
        topTBody.firstElementChild.appendChild(createDataCell(totalCriticalCases));
        topTBody.firstElementChild.appendChild(createDataCell(totalCasesPerMillion));
        topTBody.firstElementChild.appendChild(createDataCell(totalDeathsPerMillion));
        topTBody.firstElementChild.appendChild(createDataCell(totalTests));
        topTBody.firstElementChild.appendChild(createDataCell(totalTestsPerMillion));

        topTBody.firstElementChild.style.background = "#dddddd";

        // adding plus "+" to the bottom new cases and new deaths cells
        const bottomPlusAddedTotalNewCases = addPlus(totalNewCases);
        const bottomPlusAddedTotalNewDeaths = addPlus(totalNewDeaths);

        // styling new cases and new deaths cells 
        const colorAddedtotalNewCases = createDataCell(bottomPlusAddedTotalNewCases);
        const colorAddedtotalNewDeaths = createDataCell(bottomPlusAddedTotalNewDeaths);
        colorAddedtotalNewCases.style.background = "#f4f9a7";
        colorAddedtotalNewDeaths.style.background = "#ff0000";
        colorAddedtotalNewDeaths.style.color = "#ffffff";
        console.log(colorAddedtotalNewCases.textContent)


        // bottom of the table total section
        bottomTBody.firstElementChild.appendChild(createDataCell(totalCases))
        bottomTBody.firstElementChild.appendChild(colorAddedtotalNewCases)
        bottomTBody.firstElementChild.appendChild(createDataCell(totalOfDeaths))
        bottomTBody.firstElementChild.appendChild(colorAddedtotalNewDeaths)
        bottomTBody.firstElementChild.appendChild(createDataCell(totalOfRecovered))
        bottomTBody.firstElementChild.appendChild(createDataCell(totalActiveCases))
        bottomTBody.firstElementChild.appendChild(createDataCell(totalCriticalCases))
        bottomTBody.firstElementChild.appendChild(createDataCell(totalCasesPerMillion))
        bottomTBody.firstElementChild.appendChild(createDataCell(totalDeathsPerMillion))
        bottomTBody.firstElementChild.appendChild(createDataCell(totalTests))
        bottomTBody.firstElementChild.appendChild(createDataCell(totalTestsPerMillion))
    })

        fetch('https://corona.lmao.ninja/v2/countries/').then(response => {
            return response.json();
        })
        .then(countriesData => populateCountryData(countriesData))
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
        tr.classList.add('tr');
        
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

        // function that removes zero 
        function removeZero(input) {
            if(input === 0) {
                input = "";
                return input;
            } else {
                return input;
            }
        }

        // calling addPlus and removeZero functions

        const plusAddedtodayCases = addPlus(covid.todayCases);
        const removedZeroDeaths = removeZero(covid.deaths)
        const plusAddedTodayDeaths = addPlus(covid.todayDeaths);
        const removedZeroRecoveredCases = removeZero(covid.recovered)
        const removedZeroActiveCases = removeZero(covid.active)
        const removedZeroCriticalCases = removeZero(covid.critical)
        const removedZeroCasesPerOneMillionCases = removeZero(covid.casesPerOneMillion)
        const removedZeroDeathsPerOneMillionCases = removeZero(covid.deathsPerOneMillion)
        const removedZeroCasesTested = removeZero(covid.tests)
        const removedZeroPerOneMillionTestedCases = removeZero(covid.testsPerOneMillion)

        // injecting data to the table
        // function that creates td's and appends td in to tr
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
        const commaAddedTests = addComma(removedZeroCasesTested);
        const commaAddedTestsPerOneMillion = addComma(removedZeroPerOneMillionTestedCases);
            
            // console.log(commaAddedCases)
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
        createDataCell(commaAddedTests);
        createDataCell(commaAddedTestsPerOneMillion);

        topTBody.appendChild(tr);

        // styling --> styling new cases and new deaths cells + styling international conveyances to distinguish them from other countries.
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

        // styling --> adding background color to the countries that have no cases left

        if(commaAddedCases === commaAddedRecoveredCases) {
            tr.style.background = "#baf1a1";
        }
    });  

    // adding search functionality
    let input = document.querySelector('.search-box');

    input.addEventListener("keyup", () => {
        const tr = document.querySelectorAll(".tr");
        const filter = input.value.toLowerCase();

        for (let i = 0; i < tr.length; i++) {
            if (tr[i].firstElementChild.innerHTML.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    })
} 

// calling main function
document.addEventListener('DOMContentLoaded', () => { fetchApiData(); });