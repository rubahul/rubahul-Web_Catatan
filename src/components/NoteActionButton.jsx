import React from 'react';

function NoteActionButton({ variant, onClick }) {
  const isDelete = variant === 'delete';

  return (
    <button
      className={isDelete ? 'note-item__delete-button' : 'note-item__archive-button'}
      type="button"
      onClick={onClick}
      data-testid={isDelete ? 'note-item-delete-button' : 'note-item-archive-button'}
    >
      {isDelete ? 'Delete' : 'Arsip'}
    </button>
  );
}

export default NoteActionButton;
