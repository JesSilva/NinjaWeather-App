const key = 'HzC02gMxMBzaYGAVv9hjp3xPxyI8KczU';

// Obtém os dados do tempo por meio da API
const getWeather = async (cityId) => {

    // Parâmetros da busca
    const base_url = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const params = `${cityId}?apikey=${key}&language=pt-br`;

    // Pesquisa os dados do clima na API e converte-os em JSON
    const response = await fetch(base_url + params);
    const data = await response.json();

    // Retorna os resultados do clima
    return data[0];
};

// Obtém os dados da cidade por meio da API
const getCity = async (city) => {

    // Parâmetros da busca
    const base_url = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const params = `?apikey=${key}&q=${city}`;

    // Pesquisa os dados da cidade na API e converte-os em JSON
    const response = await fetch(base_url + params);
    const data = await response.json();

    // Retorna o resultado mais proximo do pesquisado
    return data[0];
};