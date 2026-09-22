import React from 'react';

class NoteSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    this.onClearHandler = this.onClearHandler.bind(this);
  }

  onKeywordChangeHandler(event) {
    const keyword = event.target.value;
    this.setState({ keyword });
    this.props.onSearch(keyword);
  }

  onClearHandler() {
    this.setState({ keyword: '' });
    this.props.onSearch('');
  }

  render() {
    const { keyword } = this.state;

    return (
      <div className="note-search" data-testid="note-search">
        <input
          type="text"
          placeholder="Cari catatan ..."
          value={keyword}
          onChange={this.onKeywordChangeHandler}
          data-testid="note-search-input"
        />
        {keyword && (
          <button
            className="note-search__clear"
            type="button"
            onClick={this.onClearHandler}
            aria-label="Hapus pencarian"
          >
            ×
          </button>
        )}
      </div>
    );
  }
}

export default NoteSearch;
