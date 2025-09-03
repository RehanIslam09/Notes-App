import React from 'react';
import Trash from '../assets/icons/Trash';
import { db } from '../appwrite/databases.js';

const DeleteButton = ({ noteId, setNotes }) => {

  const handleDelete = async () => {
      setNotes((prevState) =>
          prevState.filter((note) => note.$id !== noteId)
      );
  };

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
