import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid #ccc;
  padding: 10px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  &:disabled {
    background: gray;
  }
`;

const Box = styled.div`
  margin: 1rem 0;
`;

const ResultsList = styled.ul`
  li {
    margin-bottom: 0.5rem;
  }
`;

const Dictionary = ({ dictionary }) => {
  const [data, setData] = React.useState(dictionary);
  const [query, setQuery] = React.useState("");

  const searchResults = React.useMemo(() => {
    if (query) {
      return [...data].filter((w) => w.toLowerCase() === query.toLowerCase());
    } else {
      return [];
    }
  }, [query, JSON.stringify(data)]);

  
  const addWordToDictionary = async (word) => {
    const token = document.querySelector('meta[name="csrf-token"]').content;

    const body = {
      dictionary: {
        word,
      },
    };

    const response = await fetch("/dictionary", { 
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    });
    const newData = await response.json();

    setData(newData.dictionary);
  };

  const removeWordToDictionary = async (word) => {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const body = {
      dictionary: {
        word,
      },
    };

    const response = await fetch("/dictionary/delete", { 
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    });
    const newData = await response.json();
    setData(newData.dictionary);
  };

  return (
    <main class="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block xl:inline">Welcome to</span>
        <span className="block text-indigo-600 xl:inline"> Dictionary App</span>
      </h1>

      <Box>
        <Input className="rounded-md border-gray-300" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button
          className="rounded-md bg-indigo-600 text-white"
          type="button"
          onClick={() => addWordToDictionary(query)}
          disabled={!query || searchResults.length}
        >
          Add
        </Button>
      </Box>
      
      {searchResults.length ? (
        <ResultsList>
          <li>Your results ...</li>
          {searchResults.map((word) => {
            return (
              <li key={word}>
                {word}
                <Button className="rounded-md bg-red-600 text-white" type="button" onClick={() => removeWordToDictionary(word)}>remove</Button>
              </li>
            );
          })}
        </ResultsList>
      ) : 'No results found.' }

    </main>
  );
}

Dictionary.propTypes = {
  dictionary: PropTypes.array
}

export default Dictionary
