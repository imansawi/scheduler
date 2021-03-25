import React from "react";
import axios from "axios";
import {
  render,
  cleanup,
  waitForElement,
  waitForElementToBeRemoved,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  /* Test number one */
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  /* Test number two */
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, /Add/i));

    const input = getByPlaceholderText(appointment, /enter student name/i);

    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });

    fireEvent.click(getByAltText(appointment, /Sylvia Palmer/i));

    fireEvent.click(getByText(appointment, /save/i));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, /Lydia Miller-Jones/i));

    const day = getAllByTestId(container, "day");

    const selectedDay = day.find((item) => queryByText(item, "Monday"));
    expect(getByText(selectedDay, /no spots remaining/i)).toBeInTheDocument();
  });

  /* Test number three */
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");

    const bookedAppoint = appointments.find((item) =>
      queryByText(item, "Archie Cohen")
    );
    fireEvent.click(getByAltText(bookedAppoint, /delete/i));

    expect(
      getByText(bookedAppoint, /Delete the appointment?/i)
    ).toBeInTheDocument();

    fireEvent.click(getByText(bookedAppoint, /cancel/i));
    expect(getByText(bookedAppoint, /Archie Cohen/i)).toBeInTheDocument();

    fireEvent.click(getByAltText(bookedAppoint, /delete/i));

    fireEvent.click(getByText(bookedAppoint, /confirm/i));

    expect(getByText(bookedAppoint, /deleting/i)).toBeInTheDocument();

    await waitForElement(() => getByAltText(bookedAppoint, /add/i));

    const day = getAllByTestId(container, "day");

    const selectedDay = day.find((item) => queryByText(item, "Monday"));
    expect(getByText(selectedDay, /2 spots remaining/i)).toBeInTheDocument();
  });

  /* Test number four */
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");

    const bookedAppoint = appointments.find((item) =>
      queryByText(item, "Archie Cohen")
    );
    fireEvent.click(getByAltText(bookedAppoint, /edit/i));

    fireEvent.click(getByText(bookedAppoint, /cancel/i));
    expect(getByAltText(bookedAppoint, /edit/i)).toBeInTheDocument();
    fireEvent.click(getByAltText(bookedAppoint, /edit/i));

    expect(
      getByPlaceholderText(bookedAppoint, /Enter Student Name/i)
    ).toBeInTheDocument();
    const input = getByPlaceholderText(bookedAppoint, /Enter Student Name/i);

    fireEvent.change(input, { target: { value: "Chad Takahashi" } });
    fireEvent.click(getByText(bookedAppoint, /save/i));

    expect(getByText(bookedAppoint, /Saving/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      queryByText(bookedAppoint, /saving/i)
    );

    const day = getAllByTestId(container, "day");
    const selectedDay = day.find((item) => queryByText(item, "Monday"));
    expect(getByText(selectedDay, /1 spot remaining/i)).toBeInTheDocument();
  });

  /* Test number five */
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, /Add/i));
    const input = getByPlaceholderText(appointment, /enter student name/i);

    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });

    fireEvent.click(getByAltText(appointment, /Sylvia Palmer/i));

    fireEvent.click(getByText(appointment, /save/i));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, /Could not save appointment/i)
    );

    fireEvent.click(getByAltText(appointment, /close/i));

    expect(
      getByPlaceholderText(appointment, /enter student name/i)
    ).toBeInTheDocument();
  });

  /* Test number six */
  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");

    const bookedAppoint = appointments.find((item) =>
      queryByText(item, "Archie Cohen")
    );
    fireEvent.click(getByAltText(bookedAppoint, /delete/i));

    expect(
      getByText(bookedAppoint, /Delete the appointment?/i)
    ).toBeInTheDocument();

    fireEvent.click(getByText(bookedAppoint, /confirm/i));

    expect(getByText(bookedAppoint, /deleting/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      queryByText(bookedAppoint, /deleting/i)
    );
    expect(
      getByText(bookedAppoint, /Could not delete appointment/i)
    ).toBeInTheDocument();

    fireEvent.click(getByAltText(bookedAppoint, /close/i));

    expect(getByText(bookedAppoint, /Archie Cohen/i)).toBeInTheDocument();

    const day = getAllByTestId(container, "day");
    const selectedDay = day.find((item) => queryByText(item, "Monday"));
    expect(getByText(selectedDay, /1 Spot Remaining!/i)).toBeInTheDocument();
  });

  it("loads data, load create an interview then revert changes by clicking 'cancel'", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, /Add/i));

    const input = getByPlaceholderText(appointment, /enter student name/i);

    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });

    fireEvent.click(getByAltText(appointment, /Sylvia Palmer/i));

    fireEvent.click(getByText(appointment, /cancel/i));

    expect(getByAltText(appointment, /add/i)).toBeInTheDocument();

    const day = getAllByTestId(container, "day");

    const selectedDay = day.find((item) => queryByText(item, "Monday"));
    expect(getByText(selectedDay, /1 Spot Remaining!/i)).toBeInTheDocument();
  });
});