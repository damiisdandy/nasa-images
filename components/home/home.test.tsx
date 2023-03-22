import { fireEvent, render, screen } from "@testing-library/react";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from ".";
import "@/__mocks__/intersectionObserverMock";

const queryClient = new QueryClient();

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test("Ensure <Home /> loads correctly", () => {
  render(<Home />, {
    wrapper: Wrapper,
  });

  const initialStateText = screen.getByText(
    "Your search results will display here :)"
  );

  expect(initialStateText).toBeInTheDocument();
});

test("Should throw error for invalid input", async () => {
  render(<Home />, {
    wrapper: Wrapper,
  });

  fireEvent.change(screen.getByTestId("search-input"), {
    target: {
      value: "No",
    },
  });

  fireEvent.change(screen.getByTestId("startYear-input"), {
    target: {
      value: 2022,
    },
  });

  fireEvent.change(screen.getByTestId("endYear-input"), {
    target: {
      value: 2001,
    },
  });

  fireEvent.click(screen.getByTestId("submit-button"));

  setTimeout(() => {
    expect(
      screen.getByText(
        "Query should have a minimum of 3 characters and Start year cannot be after End year"
      )
    ).toBeInTheDocument();
  }, 2000);
});
