import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import Banks from "../components/Dashboard/Content/Banks";

describe("Banks", () => {
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();

  test("check if renders", () => {
    const { getByTestId } = render(<Banks />);
    const Paper = getByTestId("banks-paper");

    expect(Paper).toBeInTheDocument();
  });

  test("Create an empty Bank is not valid", async () => {
    render(<Banks />);
    fireEvent.click(screen.getByTitle("Add"));
    fireEvent.click(screen.getByTitle("Save"));

    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByText("All fields are required")).toBeInTheDocument();
  });

  test("Create a Bank only with the Id is not valid", async () => {
    render(<Banks />);
    fireEvent.click(screen.getByTitle("Add"));
    const idInput = screen.getByPlaceholderText("Identification");

    expect(idInput).toHaveValue(null);
    fireEvent.change(idInput, { value: "test" });

    fireEvent.click(screen.getByTitle("Save"));
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByText("All fields are required")).toBeInTheDocument();
  });

  test("Create a Bank only with the Name is not valid", async () => {
    render(<Banks />);
    fireEvent.click(screen.getByTitle("Add"));
    const idInput = screen.getByPlaceholderText("Name");

    expect(idInput).toHaveValue("");
    fireEvent.change(idInput, { value: "Citibank" });

    fireEvent.click(screen.getByTitle("Save"));
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByText("All fields are required")).toBeInTheDocument();
  });

  // [Jem Pool] Pending...
  // test("Create a Bank with valid information", async () => {
  //   render(<Banks />);
  //   fireEvent.click(screen.getByTitle("Add"));

  //   const idInput = screen.getByPlaceholderText("Identification");
  //   fireEvent.change(idInput, { value: 100 });

  //   const idInput = screen.getByPlaceholderText("Name");
  //   fireEvent.change(idInput, { value: "Citibank" });

  //   fireEvent.click(screen.getByTitle("Save")); //mock funcion for axios.post needed!
  //   await new Promise((r) => setTimeout(r, 2000));
  //   expect(screen.getByText("The Bank was successfully created")).toBeInTheDocument();
  // });
});
