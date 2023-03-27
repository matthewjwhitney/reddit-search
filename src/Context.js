import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

const Context = createContext();

export const ContextProvider = (props) => {
  const [listings, setListings] = useState([]);
  const [searchString, setSearchString] = useState("");

  const handleChangeSearchString = useCallback(
    (event) => setSearchString(event.target.value),
    []
  );

  const getData = async () => {
    const response = await fetch(`https://api.reddit.com/hot.json`);
    const data = await response.json();
    console.log(data);
    setListings(data.data.children);
  };

  useEffect(() => {
    getData();
  }, []);

  const submitSearchRequest = useCallback(
    async (e) => {
      e.preventDefault();
      if (searchString) {
        const response = await fetch(
          `https://www.reddit.com/search.json?q=${searchString}`
        );
        const data = await response.json();
        console.log(data);
        setListings(data.data.children);
      } else {
        getData();
      }
    },
    [searchString]
  );

  const providerValue = useMemo(
    () => ({
      listings,
      submitSearchRequest,
      searchString,
      handleChangeSearchString
    }),
    [listings, submitSearchRequest, searchString, handleChangeSearchString]
  );

  return (
    <Context.Provider value={providerValue}>{props.children}</Context.Provider>
  );
};

export default Context;
