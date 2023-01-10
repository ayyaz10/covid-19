let myVar;
document.querySelector(".main").style.display = "none";
document.querySelector("#load").classList.add("ldio-633k9nv1itq");

// myVar = setTimeout(showPage, 1500);

function showPage() {
  document.querySelector("#load").classList.remove("ldio-633k9nv1itq");
  document.querySelector(".main").style.display = "block";
}

const topTBody = document.querySelector(".fetch-content");
const bottomTBody = document.querySelector(".bottom-sum");
const tableHeading = document.querySelector("thead");

// fetching confirmed, recovered and total deaths

const worldDataUrl = "https://covid-19-statistics.p.rapidapi.com/reports/total";
const countriesDataUrl = "https://disease.sh/v3/covid-19/countries";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
    "X-RapidAPI-Key": "d89e92b60emsh6ce448c7f44e1edp16dd17jsn866e60a9c9bb",
  },
};

// function that adds Commas in numbers
function addComma(x) {
  if (x === null) {
    x = "";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
async function fetchApiData() {
  const worldResponse = await fetch(worldDataUrl, options);
  const countryResponse = await fetch(countriesDataUrl);
  const worldDataSummary = await worldResponse.json();
  const countryDataSummary = await countryResponse.json();
  let countriesDataArray = Object.entries(countryDataSummary);
  console.log(worldDataSummary);
  populateCountryData(countriesDataArray);
  showPage();
  // const update = new Date(summary.Afghanistan.All.updated);
  document.querySelector(".last-update").textContent =
    worldDataSummary.data.date;

  let countriesData;
  const totalConfirmed = document.getElementsByClassName("confirmed-cases")[0];
  const totalRecovered = document.getElementsByClassName("recovered-cases")[0];
  const totalDeaths = document.getElementsByClassName("death-cases")[0];
  const totalConfirmedCases = worldDataSummary.data.confirmed;
  const totalRecoveredCases = worldDataSummary.data.recovered;
  const totalDeathsConfirmed = worldDataSummary.data.deaths;
  const totalActiveCases = worldDataSummary.data.active;
  const fatilityRate = worldDataSummary.data.fatality_rate;
  totalConfirmed.innerHTML = addComma(totalConfirmedCases);
  totalRecovered.innerHTML = addComma(totalRecoveredCases);
  totalDeaths.innerHTML = addComma(totalDeathsConfirmed);

  document.getElementsByClassName("active-cases")[0].innerHTML =
    addComma(totalActiveCases);
  function createDataCell(cellData) {
    const td = document.createElement("td");
    td.textContent = cellData;
    return td;
  }

  topTBody.firstElementChild.appendChild(
    createDataCell(addComma(totalConfirmedCases))
  );
  topTBody.firstElementChild.appendChild(
    createDataCell(addComma(totalDeathsConfirmed))
  );
  topTBody.firstElementChild.appendChild(
    createDataCell(addComma(totalRecoveredCases))
  );
  topTBody.firstElementChild.appendChild(
    createDataCell(addComma(totalActiveCases))
  );
  topTBody.firstElementChild.appendChild(createDataCell(fatilityRate));
  topTBody.firstElementChild.style.background = "#dddddd";

  // bottom of the table total section
  bottomTBody.firstElementChild.appendChild(
    createDataCell(addComma(totalConfirmedCases))
  );
  bottomTBody.firstElementChild.appendChild(
    createDataCell(addComma(totalDeathsConfirmed))
  );
  bottomTBody.firstElementChild.appendChild(
    createDataCell(addComma(totalRecoveredCases))
  );
  bottomTBody.firstElementChild.appendChild(
    createDataCell(addComma(totalActiveCases))
  );
  bottomTBody.firstElementChild.appendChild(createDataCell(fatilityRate));
}

function populateCountryData(countriesDataArray) {
  // sorting by cases
  function sortByCases(countriesDataArray) {
    countriesDataArray.sort(function (a, b) {
      return b.cases - a.cases;
    });
  }
  sortByCases(countriesDataArray);

  for (let i = 0; i < countriesDataArray.length; i++) {
    const countryData = countriesDataArray[i][1];
    const confirmed = countryData.cases;
    const deaths = countryData.deaths;
    const recovered = countryData.recovered;
    const tr = document.createElement("tr");
    tr.classList.add("tr");

    // injecting data to the table
    // function that creates td's and appends td in to tr
    function createDataCell(cellData) {
      const td = document.createElement("td");
      td.textContent = cellData;
      tr.appendChild(td);
      return tr;
    }

    // Adding background color of #dddddd (light gray) to those countries who have no cases left but have more then zero deaths
    if (confirmed === deaths + recovered && deaths > 0) {
      tr.style.background = "#dddddd";
    }

    // styling --> adding background color to the countries that have no cases left
    if (confirmed === recovered) {
      tr.style.background = "#baf1a1";
    }

    // calling addComma function in order to add comma to each column
    const commaAddedCases = addComma(confirmed);
    const commaAddedDeaths = addComma(deaths);
    const commaAddedRecoveredCases = addComma(recovered);
    createDataCell(countryData.country);
    createDataCell(commaAddedCases);
    createDataCell(commaAddedDeaths);
    createDataCell(commaAddedRecoveredCases);
    createDataCell("N/A");
    createDataCell("N/A");

    topTBody.appendChild(tr);
  }
  document.querySelector(".countries-count").textContent =
    countriesDataArray.length - 1;
  // adding search functionality
  let input = document.querySelector(".search-box");

  input.addEventListener("keyup", () => {
    const tr = document.querySelectorAll(".tr");
    const filter = input.value.toLowerCase();

    for (let i = 0; i < tr.length; i++) {
      if (
        tr[i].firstElementChild.innerHTML.toLowerCase().indexOf(filter) > -1
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  });
}

// calling main function
document.addEventListener("DOMContentLoaded", fetchApiData);
