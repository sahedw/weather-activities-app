import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Form from "@/components/Form";
import { useState, useEffect } from "react";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

const inter = Inter({ subsets: ["latin"] });

const isGoodWeather = true;

export default function Home() {
  const [activity, setActivity] = useLocalStorageState("activities", {
    defaultValue: [],
  });

  const [weatherData, setWeatherData] = useState();

  const [location, setLocation] = useState();

  function handleAddActivity(newActivity) {
    setActivity([...activity, { ...newActivity, id: uid() }]);
  }

  function handleDeleteActivity(id) {
    setActivity(activity.filter((element) => element.id !== id));
  }

  const filteredWeatherActivities = activity.filter(
    (element) => element.checkedWeather === weatherData.isGoodWeather
  );

  const url = `https://example-apis.vercel.app/api/weather/${location}`;

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchWeather();
  }, [url]);

  return (
    <>
      <Head>
        <title>Activity App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="display">
          {weatherData?.condition} {weatherData?.temperature}˚
        </h1>
        <section>
          <p>Pick your location:</p>
          <button
            onClick={() => {
              setLocation("europe");
            }}
          >
            Europe
          </button>
          <button
            onClick={() => {
              setLocation("arctic");
            }}
          >
            Artic
          </button>
          <button
            onClick={() => {
              setLocation("rainforest");
            }}
          >
            Rainforest
          </button>
          <button
            onClick={() => {
              setLocation("sahara");
            }}
          >
            Sahara
          </button>
        </section>

        <h3>
          {" "}
          {weatherData.isGoodWeather
            ? "Currently we're having good weather"
            : "Currently we're having bad weather"}
        </h3>
        <ul className="activities-list">
          {filteredWeatherActivities.map((element) => {
            return (
              <li className="activities" key={element.id}>
                {element.inputText}{" "}
                <span
                  onClick={() => {
                    handleDeleteActivity(element.id);
                  }}
                  className="delete-button"
                >
                  {" "}
                  ❌{" "}
                </span>
              </li>
            );
          })}
        </ul>
        <Form onAddActivity={handleAddActivity} />
      </main>
    </>
  );
}
