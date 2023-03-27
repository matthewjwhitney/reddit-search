import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useDebounce from "./useDebounce";

const Context = createContext();

export const ContextProvider = (props) => {
  const [listings, setListings] = useState([]);
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString, 500);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const didMount = useRef(false);

  const handleChangeSearchString = useCallback(
    (event) => setSearchString(event.target.value),
    []
  );

  const getHotPosts = useCallback(async () => {
    console.log("getHotPosts");
    const response = await fetch(`https://api.reddit.com/hot.json`);
    const data = await response.json();
    setListings(data.data.children);
  }, []);

  const getPostsBySearchString = useCallback(async () => {
    console.log("getPostsBySearchString");
    if (pathname !== "/") {
      navigate("/");
    }
    if (debouncedSearchString) {
      const response = await fetch(
        `https://www.reddit.com/search.json?q=${debouncedSearchString}`
      );
      const data = await response.json();
      setListings(data.data.children);
    } else {
      getHotPosts();
    }
  }, [debouncedSearchString, getHotPosts]);

  useEffect(() => {
    getHotPosts();
  }, [getHotPosts]);

  useEffect(() => {
    if (didMount.current) {
      getPostsBySearchString();
    } else {
      didMount.current = true;
    }
  }, [debouncedSearchString, getPostsBySearchString]);

  const providerValue = useMemo(
    () => ({
      listings,
      searchString,
      handleChangeSearchString,
    }),
    [listings, searchString, handleChangeSearchString]
  );

  return (
    <Context.Provider value={providerValue}>{props.children}</Context.Provider>
  );
};

export default Context;
