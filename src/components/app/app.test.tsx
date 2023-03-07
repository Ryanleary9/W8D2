import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "./app";

describe("Given the App component ", () => {
  describe("When ", () => {
    test("Then it should ", () => {
      render(<App></App>);
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });
  });
});
