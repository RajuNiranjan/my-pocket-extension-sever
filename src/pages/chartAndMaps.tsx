import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface CovidData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
}

const ChartAndMaps: React.FC = () => {
  const {
    data: globalData,
    error: globalError,
    isLoading: globalLoading,
  } = useQuery<CovidData, Error>({
    queryKey: ["globalCovidData"],
    queryFn: () =>
      fetchCovidData(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      ),
  });

  const {
    data: countriesData,
    error: countriesError,
    isLoading: countriesLoading,
  } = useQuery<CountryData[], Error>({
    queryKey: ["countriesCovidData"],
    queryFn: () => fetchCovidData("https://disease.sh/v3/covid-19/countries"),
  });

  async function fetchCovidData(url: string): Promise<any> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  }

  if (globalLoading || countriesLoading) return <div>Loading...</div>;
  if (globalError || countriesError)
    return (
      <div>
        An error occurred: {globalError?.message || countriesError?.message}
      </div>
    );

  const processData = (data: CovidData) => {
    const chartData = Object.keys(data.cases).map((date) => ({
      date,
      cases: data.cases[date],
      deaths: data.deaths[date],
      recovered: data.recovered[date],
    }));
    return chartData;
  };

  const globalChartData = processData(globalData!);
  console.log(globalChartData);

  return (
    <div className="flex flex-col gap-6">
      <div className="border p-2 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold my-5">Chart</h1>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={globalChartData}
            margin={{ top: 5, right: 30, left: 35, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis textAnchor="end" width={60} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="cases"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
            <Line type="monotone" dataKey="recovered" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="border p-2 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold my-5">Maps</h1>
        <MapContainer center={[20, 10]} zoom={2} className="h-[350px] w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countriesData?.map((country) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={
                new L.Icon({
                  iconUrl: country.countryInfo.flag,
                  iconSize: [25, 15],
                  iconAnchor: [12, 15],
                  popupAnchor: [1, -24],
                })
              }
            >
              <Popup>
                <div>
                  <strong>{country.country}</strong>
                  <br />
                  Cases: {country.cases}
                  <br />
                  Deaths: {country.deaths}
                  <br />
                  Recovered: {country.recovered}
                  <br />
                  Active: {country.active}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>{" "}
      </div>
    </div>
  );
};

export default ChartAndMaps;
