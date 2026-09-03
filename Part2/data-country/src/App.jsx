import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetail = ({ data }) => {
  const { name, capital, area, languages, flags } = data[0];
  try {
    if (!name || !capital || !area || !languages || !flags) {
      console.error("Missing required props in CountryDetail:", { name, capital, area, languages, flags });
      return null;
    }
    return (
      <div>
        <h1>{name}</h1>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(languages)?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <img src={flags?.png} alt="flag" />
      </div>
    )
  } catch (error) {
    console.error("Error in CountryDetail:", error);
    return null;
  }
};

const showCountryDetail = (data) => {
  if (data.length === 0) {
    return null;
  }
  return (<Display dataFilter={data} />);
  // (<CountryDetail data={dataFilter} />);
};
const Display = ({ dataFilter, setSearchTxt }) => {
  if (dataFilter) {
    if (dataFilter.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    }
    else if (dataFilter.length > 1) {
      return (
        <div>
          {dataFilter.map((item, index) => (
            <div key={item.name}>{item.name} <button onClick={() => setSearchTxt(item.name)}>Show</button></div>
          ))}
        </div>
      );
    }
    else if (dataFilter.length === 1) {
      return (<CountryDetail data={dataFilter} />);
    }
  }
  return null;
};
const App = () => {
  const [searchTxt, setSearchTxt] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  const [dateCountries, setDateCountries] = useState([]);


  const handleOnchange = (e) => {
    setSearchTxt(e.target.value);
  };

  useEffect(() => {
    const tempArray = [];
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then((response) => {
      // setDataCountry(response.data);
      let data = response.data;
      data.map((item) => {
        let infoCountry = { name: item.name.common, capital: item.capital, area: item.area, languages: item.languages, flags: item.flags };
        tempArray.push(infoCountry);
      })
      setDateCountries(tempArray);
    })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    ;
  }, []);

  useEffect(() => {
    let temp = [];
    let text = searchTxt.trim();
    if (text !== '') {
      dateCountries.map((item) => {
        const txt = item?.name.toLowerCase();
        if (txt?.includes(searchTxt.toLowerCase())) {
          temp.push(item);
        }
      });
      setDataFilter(temp);
    }
  }, [searchTxt]);
  return (
    <div>
      <span>Search:</span>
      <input type="text" value={searchTxt} onChange={(e) => handleOnchange(e)} />
      <Display dataFilter={dataFilter} setSearchTxt={setSearchTxt} />
    </div>
  );
};
export default App;
