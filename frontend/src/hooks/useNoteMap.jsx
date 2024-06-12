import NotesThumbnail from "../components/NotesThumbnail/NotesThumbnail.jsx";

export const useNoteMap = (noteArray) => {
  if (!noteArray) return [];

  return noteArray.map((note) => (
    <NotesThumbnail
      key={note.id}
      title={note.title}
      description={note.description}
      pending={note.pending}
    />
  ));
};
