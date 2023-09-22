import { useEffect, useState } from 'react';

export default function App() {
  const [formSubmitted, setFormSubmitted] = useState('');
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [id, setId] = useState(0);

  const baseUrl = 'http://localhost:4000';

  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      console.log(allGuests);
      setGuestList(allGuests);
    };
    console.log(getGuests());
  }, []);

  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      console.log(allGuests);
      setGuestList(allGuests);
    };
    console.log(getGuests());
    setFormSubmitted(false);
  }, [formSubmitted]);

  const handleRemove = (guestId) => {
    const guestListUpdated = guestList.filter((guest) => guest.id !== guestId);
    setGuestList(guestListUpdated);
  };

  return (
    <div className="App">
      <header>React guest list</header>
      <form /* ---------------------begining of the form----------- */
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
                /* -------------------------------enter---------------*/
                if (e.key === 'Enter') {
                  /* setId(id + 1);
                  setGuestList([
                    ...guestList,
                    {
                      id: id,
                      FirstName: firstName,
                      LastName: lastName,
                      attending: false,
                    },
                  ]); */

                  setFormSubmitted(true);
                  setFirstName('');
                  setLastName('');

                  // console.log(id);
                  const post = async () => {
                    const response = await fetch(`${baseUrl}/guests`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                      }),
                    });
                    const createdGuest = await response.json();
                    console.log(createdGuest);
                  };
                  console.log(post());
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
            <div>{guest.firstName}</div>
            <div>{guest.lastName}</div>
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
                  // guest.attending = !guest.attending;
                  // setGuestList([...guestList]);
                }}
              />
              <label htmlFor="attendingCheckbox">Attending to the event</label>
            </div>
            <button
              type="button"
              onClick={() => {
                handleRemove(guest.id);
                const deleteGuest = async () => {
                  const response = await fetch(
                    `${baseUrl}/guests/${guest.id}`,
                    {
                      method: 'DELETE',
                    },
                  );
                  const deletedGuest = await response.json();
                  console.log(deletedGuest);
                };
                console.log(deleteGuest());
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}
