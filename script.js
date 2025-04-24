function init() {
    renderRegions();
    document.getElementById('province').addEventListener('change', updateCities);
    document.getElementById('city').addEventListener('change', updateBarangays);
}

async function fetchAPIData(endpoint) {
    const API_URL = 'https://psgc.gitlab.io/api/';

    const response = await fetch(`${API_URL}${endpoint}.json`);

    const results = await response.json();

    return results;
}

async function renderRegions() {
    const response = await fetchAPIData('provinces');

    const provinceDropdown = document.getElementById('province');

    provinceDropdown.innerHTML = `<option value="">-- Select Province --</option>`;

    const div = document.createElement('option');
    div.value = `${NCR.code}`;
    div.innerHTML = `${NCR.regionName} (${NCR.name})`;
    provinceDropdown.appendChild(div);

    response.map((province) => {
        const div = document.createElement('option');
        div.value = `${province.code}`;
        div.innerHTML = `${province.name}`;
        provinceDropdown.appendChild(div);
    });
}

async function renderCities(code) {
    const cityDropdown = document.getElementById('city');
    cityDropdown.innerHTML = `<option value="">-- Select City/Municipality --</option>`;

    // Hardcoded asf
    if (code == NCR.code) {
        const response = await fetchAPIData(`regions/${code}/cities-municipalities`);

        response.map((city) => {
            const div = document.createElement('option');
            div.value = `${city.code}`;
            div.innerHTML = `${city.name}`;
            cityDropdown.appendChild(div);
        });
    } else {
        const response = await fetchAPIData(`provinces/${code}/cities-municipalities`);

        response.map((city) => {
            const div = document.createElement('option');
            div.value = `${city.code}`;
            div.innerHTML = `${city.name}`;
            cityDropdown.appendChild(div);
        });
    }
}

function updateCities() {
    var regions = document.getElementById('province');
    if (regions.selectedIndex > 0) {
        renderCities(regions.options[regions.selectedIndex].value);
    }
}

async function renderBarangays(code) {
    const response = await fetchAPIData(`cities-municipalities/${code}/barangays`);

    // console.log(response);

    const barangayDropdown = document.getElementById('barangay');

    barangayDropdown.innerHTML = `<option value="">-- Select Barangay --</option>`;

    response.map((barangay) => {
        const div = document.createElement('option');
        div.value = `${barangay.code}`;
        div.innerHTML = `${barangay.name}`;
        barangayDropdown.appendChild(div);
    });
}

function updateBarangays() {
    var cities = document.getElementById('city');
    if (cities.selectedIndex > 0) {
        renderBarangays(cities.options[cities.selectedIndex].value);
    }
}

init();

const NCR = {
    code: '130000000',
    name: 'NCR',
    regionName: 'National Capital Region',
    islandGroupCode: 'luzon',
    psgc10DigitCode: '1300000000',
};
