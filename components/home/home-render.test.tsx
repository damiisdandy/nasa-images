import { APIRoot, Item } from "@/types";
import { render, screen } from "@testing-library/react";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from ".";
import "@/__mocks__/intersectionObserverMock";
import { UseFetchReturnType } from "@/hooks/useFetch";
import useForm from "@/hooks/useForm";

const queryClient = new QueryClient();

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const cardItem: Item = {
  href: "https://images-assets.nasa.gov/image/APOLLO 50th_FULL COLOR_300DPI/collection.json",
  data: [
    {
      center: "HQ",
      title: "APOLLO 50th_FULL COLOR_300DPI",
      keywords: ["Apollo", "anniversary", "logo", "color"],
      nasa_id: "APOLLO 50th_FULL COLOR_300DPI",
      date_created: "2018-06-18T00:00:00Z",
      media_type: "image",
      description:
        "Full color ogo for the 50th anniversary of the Apollo program",
      album: ["Random Album"],
      location: "Berlin",
      photographer: "Damilola Jerugba",
    },
  ],
  links: [
    {
      href: "https://images-assets.nasa.gov/image/APOLLO 50th_FULL COLOR_300DPI/APOLLO 50th_FULL COLOR_300DPI~thumb.jpg",
      rel: "preview",
      render: "image",
    },
  ],
};

const useFetchReturnData: UseFetchReturnType<APIRoot>["data"] = {
  pages: [
    {
      collection: {
        version: "1.0",
        href: "http://images-api.nasa.gov/search?q=Apollo&media_type=image&page_size=20&page=1",
        items: [cardItem],
        metadata: {
          total_hits: 1,
        },
        links: [
          {
            rel: "next",
            prompt: "Next",
            href: "http://images-api.nasa.gov/search?q=Apollo&media_type=image&page_size=20&page=2",
          },
        ],
      },
    },
  ],
  pageParams: [null],
};

const useFetchReturn: Partial<UseFetchReturnType<APIRoot>> = {
  isLoading: false,
  error: undefined,
  data: useFetchReturnData,
  isFetching: false,
  isFetchingNextPage: false,
  fetchNextPage: jest.fn(),
  remove: jest.fn(),
};

jest.mock("../../hooks/useFetch", () => {
  return jest.fn(() => useFetchReturn);
});

const useFormReturn: Partial<ReturnType<typeof useForm>> = {
  query: "",
  startYear: "",
  endYear: "",
  onEndYearChange: jest.fn(),
  onStartYearChange: jest.fn(),
  onQueryChange: jest.fn(),
  validate: () => [],
  searchEnabled: false,
  enableSearch: jest.fn(),
};

jest.mock("../../hooks/useForm", () => {
  return jest.fn(() => useFormReturn);
});

test("Expect collections to render", () => {
  render(<Home />, {
    wrapper: Wrapper,
  });

  const paginationInfo = screen.getByText(/Displaying 1 of 1/);

  expect(paginationInfo).toBeInTheDocument();
});
