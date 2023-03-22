import DateRange from "@/components/date-range";
import SearchBar from "@/components/search-bar";
import useFetch, { UseFetchProps } from "@/hooks/useFetch";
import useForm from "@/hooks/useForm";
import { FC, FormEventHandler, useMemo } from "react";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-hot-toast";
import Card from "@/components/card";
import useElementInView from "@/hooks/useElementInView";

const Home: FC = () => {
  const {
    query,
    startYear,
    endYear,
    onEndYearChange,
    onStartYearChange,
    onQueryChange,
    validate,
    searchEnabled,
    enableSearch,
  } = useForm();

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    error,
    fetchNextPage,
    remove,
  } = useFetch({
    query,
    startYear,
    endYear,
    enabled: searchEnabled,
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    // on query change, only fetch first page
    remove();
    e.preventDefault();
    const errors = validate();
    // if errors, convert to string and display with toast
    if (errors.length) {
      toast.error(
        errors.reduce((a, b, index) => a + (index !== 0 ? " and " : "") + b, "")
      );
      return;
    }
    enableSearch();
  };

  // reducing data from all pages into a single array
  const mediaContent = useMemo(() => {
    if (data) {
      return data.pages.reduce(
        (a: any[], b) => [...a, ...b.collection.items],
        []
      );
    }
    return [];
  }, [data]);

  // interaction observer to fetch data as user scrolls
  const containerRef = useElementInView({
    options: {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    },
    callback: fetchNextPage,
  });

  return (
    <div className="mt-4">
      <form
        onSubmit={onSubmit}
        className="flex md:flex-row gap-3 flex-col items-center md:items-stretch justify-center w-full md:px-5"
      >
        <div className="w-[95%]">
          <SearchBar value={query} onChange={onQueryChange} />
        </div>
        <div className="flex w-[95%] items-stretch gap-5">
          <DateRange
            endYear={endYear}
            onEndYearChange={onEndYearChange}
            startYear={startYear}
            onStartYearChange={onStartYearChange}
          />
          <button type="submit" className="px-5 py-1 bg-blue-600 rounded-lg">
            Search
          </button>
        </div>
      </form>
      {isLoading || (isFetching && !isFetchingNextPage) ? (
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-[50px] spin">
            <ImSpinner8 />
          </p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-center px-4 font-bold text-red-400">
            Error fetching images :(
          </p>
        </div>
      ) : (
        data &&
        (mediaContent.length === 0 ? (
          <div className="flex items-center justify-center h-[70vh]">
            <p className="text-[#888] text-center px-4">
              Can&apos;t find anythign results for query {query}
            </p>
          </div>
        ) : (
          <div className="mt-5">
            <p className="text-right text-[#888] px-4">
              Displaying {mediaContent.length} of{" "}
              {data.pages[0].collection.metadata.total_hits}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4 md:gap-6">
              {mediaContent.map((item) => (
                <Card key={item.href} {...item} />
              ))}
            </div>
            {mediaContent.length !==
              data.pages[0].collection.metadata.total_hits && (
              <p
                ref={containerRef}
                className="text-center text-[#aaa] my-4 text-lg"
              >
                Fetching more images ...
              </p>
            )}
          </div>
        ))
      )}
      {!searchEnabled && !data && (
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-[#888] text-center px-4">
            Your search results will display here :)
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
