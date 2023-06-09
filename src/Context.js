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
  const categories = ["hot", "new", "top", ,];
  const [listings, setListings] = useState([]);
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString, 500);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const didMount = useRef(false);
  const [category, setCategory] = useState(categories[0]);

  const handleChangeSearchString = useCallback(
    (newSearchString) => setSearchString(newSearchString),
    []
  );

  const handleChangeCategory = useCallback(
    (newCategory) => setCategory(newCategory),
    []
  );

  const getHotPosts = useCallback(async () => {
    console.log("getHotPosts");
    const response = await fetch(`https://api.reddit.com/${category}.json`);
    const data = await response.json();
    setListings(data.data.children);
  }, [category]);

  const getPostsBySearchString = useCallback(async () => {
    console.log("getPostsBySearchString");
    if (pathname !== "/") {
      navigate("/");
    }
    console.log(debouncedSearchString);
    if (debouncedSearchString) {
      const response = await fetch(
        `https://www.reddit.com/search.json?q=${debouncedSearchString}&sort=${category}`
      );
      const data = await response.json();
      setListings(data.data.children);
    } else {
      getHotPosts();
    }
  }, [debouncedSearchString, getHotPosts, category]);

  useEffect(() => {
    if (!searchString) {
      getHotPosts();
    }
  }, [getHotPosts, category]);

  useEffect(() => {
    if (didMount.current) {
      getPostsBySearchString();
    } else {
      didMount.current = true;
    }
  }, [debouncedSearchString, getPostsBySearchString, category]);

  const providerValue = useMemo(
    () => ({
      listings,
      searchString,
      handleChangeSearchString,
      category,
      categories,
      handleChangeCategory,
    }),
    [
      listings,
      searchString,
      handleChangeSearchString,
      category,
      categories,
      handleChangeCategory,
    ]
  );

  return (
    <Context.Provider value={providerValue}>{props.children}</Context.Provider>
  );
};

export default Context;
