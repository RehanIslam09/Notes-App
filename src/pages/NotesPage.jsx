import { useState, useEffect } from 'react';
// import { fakeData as notes } from '../assets/fakeData.js'
import NoteCard from '../components/NoteCard.jsx';
import { databases } from '../appwrite/config.js';
import { db } from '../appwrite/databases.js';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await db.notes.list();
    setNotes(response.documents);

    console.log(response);
  };

  return (
    <div>
      {notes.map((note) => (
        <NoteCard key={note.$id} note={note} />
      ))}
    </div>
  );
};

export default NotesPage;
