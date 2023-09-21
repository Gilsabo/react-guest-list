import { useState } from 'react';

export default function App() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState(0);
  console.log(guestList);

  const handleRemove = (guestId) => {
    const guestListUpdated = guestList.filter((guest) => guest.id !== guestId);
    setGuestList(guestListUpdated);
  };

  return (
    <div className="App">
      <header>React guest list</header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <label>
            First Name:
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setId(id + 1);
                  setGuestList([
                    ...guestList,
                    {
                      id: id,
                      'First name': firstName,
                      'Last name': lastName,
                      attending: false,
                    },
                  ]);
                  setFirstName('');
                  setLastName('');
                  console.log(id);
                }
              }}
            />
          </label>
        </div>
      </form>
      <div data-test-id="guest">Guests</div>
      {guestList.map((guest) => {
        return (
          <div
            key={`div-name-${guest['First name']}${guest['Last name']}`}
            data-test-id="guest"
          >
            <div>{guest['First name']}</div>
            <div>{guest['Last name']}</div>

            <div>
              {guest.attending ? (
                <div>Attending</div>
              ) : (
                <div>Not attending</div>
              )}
              <input
                type="checkbox"
                id="attendingCheckbox"
                aria-label="attending"
                onChange={() => {
                  guest.attending = !guest.attending;
                  setGuestList([...guestList]);
                }}
              />
              <label htmlFor="attendingCheckbox">Attending to the event</label>
            </div>
            <button type="button" onClick={() => handleRemove(guest.id)}>
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}
