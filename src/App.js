import React, { useEffect, useState } from "react";
import Delete from "./assets/delete.png";
import backgroundImage from './assets/bg.jpeg';

const languageOptions = [
  { value: "en", label: "English" },
  { value: "sv", label: "Swedish" },
  { value: "de", label: "German" },
  { value: "es", label: "Spanish" },
  { value: "ar", label: "Arabic" },
];

function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const result = localStorage.getItem("summary");
    setData(result ? JSON.parse(result).reverse() : []);
  }, []);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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",
      },
      body: JSON.stringify({
        prompt: `${value}\n\nTl;dr`,
        temperature: 0.1,
        max_tokens: Math.floor(value.length / 2),
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.5,
        stop: ['"""'],
      }),
    };

    try {
      const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", requestOptions);

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const dt = await response.json();
      const text = dt.choices[0].text;

      translateResponse(text, selectedLanguage);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const translateResponse = async (text, targetLanguage) => {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: `Translate the following text to ${targetLanguage}: "${text}"`,
          temperature: 0.7,
          max_tokens: 100,
        }),
      });

      if (!response.ok) {
        throw new Error('Translation request failed');
      }

      const data = await response.json();
      const translatedText = data.choices[0].text;

      setData((prevData) => [...prevData, translatedText]);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  const fetchLocalStorage = async () => {
    const result = await localStorage.getItem("summary");
    setData(JSON.parse(result)?.reverse());
  };

  useEffect(() => {
    fetchLocalStorage();
  }, []);

  const copyTextToClipboard = async (text) => {
    if ("clipboard" in navigator) {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopy(true);
        setTimeout(() => setIsCopy(false), 1500);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCopy = (txt) => {
    copyTextToClipboard(txt);
  };

  const handleDelete = (txt) => {
    const filtered = data?.filter((d) => d !== txt);
    setData(filtered);
    localStorage.setItem("summary", JSON.stringify(filtered));
  };

  return (
    <div
      className="w-full bg-[#0f172a] h-full min-h-[100vh] py-4 px-4 md:px-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div className="w-full">
        <div className="flex flex-row justify-between items-center w-full h-10 px-5 2xl:px-40">
          <h3 className="cursor-pointer text-white text-3xl font-bold text-cyan-600">
            SwiftSynopsis!
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center mt-4 p-4">
          <h1 className="text-3xl font-bold text-blue-900 text-center leading-10 ">
            Summarizer with
            <br />
            <span className="text-5xl font-bold text-blue-900">OpenAI</span>
          </h1>
          <p className="mt-5 italic font-semibold text-lg text-white sm:text-xl text-center max-w-2xl">
            Effortlessly submit your text and receive a concise synopsis powered by OpenAI Summarizer
          </p>
        </div>

        <div className="flex flex-col w-full items-center justify-center mt-5">
          <textarea
            placeholder="Paste your content here ..."
            rows={16}
            className="block w-full md:w-[650px] rounded-md border border-slate-700 bg-slate-800 p-2 text-sm shadow-lg font-medium text-white focus:border-gray-500 focus:outline-none focus:ring-0"
            onChange={(e) => setValue(e.target.value)}
          ></textarea>

          {value?.length > 0 && (
            <div className="mt-5">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="bg-slate-800 text-white rounded-md px-4 py-3"
                style={{ width: "120px" }}
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value} style={{ color: 'white', backgroundColor: 'transparent' }}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {value?.length > 0 && (
            submitting ? (
              <p className="text-md text-cyan-500 mt-5">Please wait ....</p>
            ) : (
              <button
                className="mt-5 bg-blue-500 px-5 py-2 text-white text-md font-cursor-pointer rounded-md"
                onClick={handleSubmit}
              >
                {submitting ? "Please wait..." : "Submit"}
              </button>
            )
          )}
        </div>
      </div>

      <div className="w-full mt-10 flex flex-col gap-5 shadow-md items-center justify-center">
        {data?.length > 0 && (
          <>
            <p className="text-white font-semibold text-lg">Summary History</p>
            {data?.slice().reverse().map((d, index) => (
              <div key={index} className="max-w-2xl bg-slate-800 p-3 rounded-md">
                <p className="text-gray-400 text-lg">{d}</p>
                <div className="flex gap-5 items-center justify-end mt-2">
                  <p
                    className="text-gray-500 font-semibold cursor-pointer"
                    onClick={() => handleCopy(d)}
                  >
                    {isCopy ? "Copied" : "Copy"}
                  </p>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleDelete(d)}
                  >
                    <img src={Delete} className="w-6 h-6" alt="Delete" />
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
