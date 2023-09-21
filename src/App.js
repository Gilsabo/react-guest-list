import { useState } from 'react';

export default function App() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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
                  setGuestList([
                    ...guestList,
                    {
                      'First name': firstName,
                      'Last name': lastName,
                      attending: false,
                    },
                  ]);
                  setFirstName(''); // Clear the input after submission
                  setLastName('');
                }
              }}
            />
          </label>
        </div>
      </form>
      <div data-test-id="guest">Guests</div>
      {guestList.map((guest) => {
        return (
          <div key={`div-name-${guest['First name']}${guest['Last name']}`}>
            <div>{guest['First name']}</div>
            <div>{guest['Last name']}</div>
            {guest.attending ? <div>Attending</div> : <div>Not attending</div>}
          </div>
        );
      })}
    </div>
  );
}
