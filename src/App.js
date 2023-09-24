import { useEffect, useState } from 'react';

// I need to get the data also when I update the checkboxes
export default function App() {
  const [isLoading, setIsloading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState('');
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [id, setId] = useState(0);

  const baseUrl = 'http://localhost:4000';

  useEffect(() => {
    const getGuests = async () => {
      try {
        const response = await fetch(`${baseUrl}/guests`);
        const allGuests = await response.json();
        console.log(allGuests);
        setIsloading(false);
        setGuestList([...allGuests]);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(getGuests());
  }, []);

  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      console.log(allGuests);
      setGuestList([...allGuests]);
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
      {isLoading ? <div>Loading...</div> : null}
      {guestList.map((guest) => {
        return (
          <div
            key={`div-name-${guest.firstName}${guest.lastName}`}
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
              <input /* ------------------------attending ------------- */
                type="checkbox"
                id={`attendingCheckbox-${guest.id}`}
                checked={guest.attending}
                aria-label="attending"
                onChange={() => {
                  const updateAttendance = async () => {
                    const response = await fetch(
                      `${baseUrl}/guests/${guest.id}`,
                      {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ attending: !guest.attending }),
                      },
                    );
                    const updatedGuest = await response.json();
                    console.log(updatedGuest);
                  };
                  updateAttendance();
                  const getGuests = async () => {
                    const response = await fetch(`${baseUrl}/guests`);
                    const allGuests = await response.json();
                    console.log(allGuests);
                    setGuestList([...allGuests]);
                  };
                  console.log(getGuests());
                  // guest.attending = !guest.attending;
                  // setGuestList([...guestList]);
                  getGuests();
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
