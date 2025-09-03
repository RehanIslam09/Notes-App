import React from 'react';
import Plus from '../assets/icons/Plus.jsx';
import colors from '../assets/colors.json';
import { useRef } from 'react';
import { db } from '../appwrite/databases.js';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext.jsx';

const AddButton = () => {
  const { setNotes } = useContext(NoteContext);
  const startingPos = useRef(100);

  const addNote = async () => {
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      colors: JSON.stringify(colors[0]),
    };
    startingPos.current += 10;

    const response = await db.notes.create(payload);
    setNotes((prevState) => [response, ...prevState]);
  };

  return (
    <div id="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};

export default AddButton;
