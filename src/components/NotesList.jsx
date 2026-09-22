import React from 'react';
import NoteItem from './NoteItem';

/**
 * Mengelompokkan daftar catatan berdasarkan bulan-tahun (createdAt).
 * Mengembalikan object { "YYYY-MM": [note, ...] } terurut descending.
 */
function groupNotesByMonth(notes) {
  return notes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(note);
    return groups;
  }, {});
}

/**
 * Format kunci grup (YYYY-MM) menjadi label bulan-tahun (contoh: "April 2025").
 */
function formatGroupHeader(key) {
  const [year, month] = key.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
}

function NotesList({ notes, onDelete, onArchive, searchKeyword = '', dataTestId = 'notes-list' }) {
  const hasNotes = notes?.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan.
        </p>
      </div>
    );
  }

  // Kelompokkan catatan per bulan-tahun
  const groupedNotes = groupNotesByMonth(notes);
  // Urutkan kunci grup descending (bulan terbaru di atas)
  const sortedGroupKeys = Object.keys(groupedNotes).sort((a, b) => b.localeCompare(a));

  return (
    <div className="notes-list notes-list--grouped" data-testid={dataTestId}>
      {sortedGroupKeys.map((groupKey) => {
        const groupNotes = groupedNotes[groupKey];
        return (
          <section
            key={groupKey}
            className="notes-group"
            data-testid={`${groupKey}-group`}
          >
            <div className="notes-group__header">
              <h3 className="notes-group__title">{formatGroupHeader(groupKey)}</h3>
              <span
                className="notes-group__count"
                data-testid={`${groupKey}-group-count`}
              >
                {groupNotes.length} catatan
              </span>
            </div>
            <div className="notes-group__items">
              {groupNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onDelete={onDelete}
                  onArchive={onArchive}
                  searchKeyword={searchKeyword}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default NotesList;

