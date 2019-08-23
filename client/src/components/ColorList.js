import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(true);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [color, setColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setAdding(false);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    // e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('PUT response', res)

      })
      .catch(err => console.log(err.response))
  };

  const addNewColor = e => {
    axiosWithAuth()
    .post(`http://localhost:5000/api/colors`, color)
    .then(res => {
      console.log('POST response', res)
      updateColors(...colors, color)
    })
    .catch(err => console.log(err.response))
  }

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        const newColorArr = colors.filter(i => i.id !== color.id)
        updateColors(newColorArr)
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit" onClick={() => saveEdit()}>save</button>
            <button onClick={() => {
                setEditing(false)
                setAdding(true)
              }}>cancel</button>
          </div>
        </form>
      )}
      

{/* // New Color Form // */}
        {adding && (
        <form onSubmit={addNewColor}>
          <legend>add new color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColor({ ...color, color: e.target.value })
              }
              value={color.color}
            />
          </label>
          <label>
            hex code:
            <input
              placeholder="#"
              onChange={e =>
                setColor({
                  ...color,
                  code: { hex: e.target.value }
                })
              }
              value={color.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit" onClick={() => saveEdit()}>save</button>
            <button onClick={() => {
              setEditing(false)
              setAdding(true)
            }}>cancel</button>
          </div>
        </form>
        )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
