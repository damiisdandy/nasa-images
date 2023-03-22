import { Item } from "@/types";
import { render, screen } from "@testing-library/react";
import Card from ".";

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

test("Ensure <Card /> loads correctly", () => {
  render(<Card {...cardItem} />);

  const cardTitle = screen.getByText(cardItem.data[0].title);

  expect(cardTitle).toBeInTheDocument();
});

test("Render `unknown` when location isn't provided", () => {
  render(<Card {...cardItem} data={[{ ...cardItem.data[0], location: "" }]} />);

  const location = screen.getByText("unknown");

  expect(location).toBeInTheDocument();
});
