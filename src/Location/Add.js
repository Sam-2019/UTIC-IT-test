import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Button } from "reactstrap";
import Form from "./Form";

import { useSelector, useDispatch } from "react-redux";
import { add } from "../utils/redux/locationSlice";
import { categoryData } from "../utils/redux/categorySlice";

export default function Add({ close }) {
  const CategoryData = useSelector(categoryData);
  const dispatch = useDispatch();

  const [form, setForm] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinate] = useState("");
  const [category, setCategory] = useState(CategoryData);

  useEffect(() => {
    function populateSelect() {
      if (CategoryData.length === 0) {
        setForm(true);
      }

      if (CategoryData.length > 0) {
        setForm(false);
      }
    }

    populateSelect();
  }, [CategoryData]);

  const onSubmit = () => {
    let empty = name && address && coordinates && category;

    if (empty === "") {
      return;
    }

    if (empty !== "") {
      const data = {
        id: uuid(),
        name,
        address,
        coordinates,
        category
      };

      dispatch(add(data));
      close();
    }
  };

  let showEmpty;
  let showForm;

  showEmpty = (
    <div>
      <h2>Please add a Category first!</h2>
      <Button color="danger" onClick={close}>
        Cancel
      </Button>
    </div>
  );

  showForm = (
    <>
      <h5>Add Location</h5>
      <Form
        name={name}
        nameOnChange={(e) => setName(e.target.value)}
        address={address}
        addressOnChange={(e) => setAddress(e.target.value)}
        coordinates={coordinates}
        coordinatenChange={(e) => setCoordinate(e.target.value)}
        category={category}
        categoryOnChange={(e) => setCategory(e.target.value)}
        submit={onSubmit}
        close={close}
        categoryData={CategoryData}
      />
    </>
  );

  return (
    <>
      {form && showEmpty}

      {!form && showForm}
    </>
  );
}
