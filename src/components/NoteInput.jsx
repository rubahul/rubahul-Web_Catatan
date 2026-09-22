import React from 'react';

const TITLE_MAX_LENGTH = 50;
const BODY_MIN_LENGTH = 10;

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      bodyError: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const value = event.target.value;
    // Batasi judul maksimal 50 karakter via state (bukan maxLength HTML)
    if (value.length <= TITLE_MAX_LENGTH) {
      this.setState({ title: value });
    }
  }

  onBodyChangeEventHandler(event) {
    const value = event.target.value;
    this.setState({
      body: value,
      // Hapus error saat user mulai mengetik dan sudah >= 10 karakter
      bodyError: value.length > 0 && value.length < BODY_MIN_LENGTH
        ? `Isi catatan minimal harus ${BODY_MIN_LENGTH} karakter`
        : '',
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { title, body } = this.state;

    // Tolak submit jika isi catatan kurang dari 10 karakter
    if (body.length < BODY_MIN_LENGTH) {
      this.setState({
        bodyError: `Isi catatan minimal harus ${BODY_MIN_LENGTH} karakter`,
      });
      return;
    }

    // Tambahkan catatan dan reset form
    this.props.addNote({ title, body });
    this.setState({ title: '', body: '', bodyError: '' });
  }

  render() {
    const { title, body, bodyError } = this.state;
    const remainingChars = TITLE_MAX_LENGTH - title.length;
    const isWarn = remainingChars < 10;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {bodyError && (
          <p className="note-input__feedback note-input__feedback--error">
            {bodyError}
          </p>
        )}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          <p
            className={`note-input__title__char-limit${isWarn ? ' note-input__title__char-limit--warn' : ''}`}
            data-testid="note-input-title-remaining"
          >
            Sisa karakter: {remainingChars}
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
