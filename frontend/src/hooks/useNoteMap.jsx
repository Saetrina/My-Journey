import NotesThumbnail from "../components/NotesThumbnail/NotesThumbnail.jsx";

export const useNoteMap = (noteArray) => {
  if (!noteArray) return [];

  console.log(noteArray[0]);

  return noteArray.map((note) => (
    <NotesThumbnail
      key={note.id}
      title={note.title}
      description={note.description}
      pending={note.pending}
      id={note.id}
      type={note.type}
    />
  ));
};
