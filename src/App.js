import { useState } from 'react';

export default function App() {
  const [guestList, setGuestList] = useState([{}]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  console.log(guestList);
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
                  setGuestList((oldSetGuestList) => [
                    ...oldSetGuestList,
                    {
                      'First Name': firstName,
                      'Last name': lastName,
                      attending: false,
                    },
                  ]);
                }
              }}
            />
          </label>
        </div>
      </form>
      <div data-test-id="guest">Guests</div>
      <div>{guestList[firstName]}</div>
    </div>
  );
}
