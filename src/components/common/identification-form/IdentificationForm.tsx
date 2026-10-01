import React from "react";

interface IdentificationFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;

  identification: string;
  setIdentification: React.Dispatch<React.SetStateAction<string>>;

  setPhoto: React.Dispatch<React.SetStateAction<File | null>>;

  requestIdentification: boolean;
  setRequestIdentification: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function IdentificationForm({
  name,
  setName,
  identification,
  setIdentification,
  setPhoto,
  requestIdentification,
  setRequestIdentification,
  handleSubmit,
}: IdentificationFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="bug-name">Submission Name</label>

        <input
          id="bug-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter a name for your submission"
          required
        />
      </div>

      <div>
        <label htmlFor="bug-photo">Bug Photo</label>

        <input
          id="bug-photo"
          type="file"
          accept="image/*"
          onChange={(event) =>
            setPhoto(event.target.files?.[0] ?? null)
          }
        />
      </div>

      <div>
        <label htmlFor="bug-identification">
          What kind of bug do you think it is?
        </label>

        <input
          id="bug-identification"
          type="text"
          value={identification}
          onChange={(event) =>
            setIdentification(event.target.value)
          }
          placeholder="Example: Ladybug"
          disabled={requestIdentification}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={requestIdentification}
            onChange={(event) => {
              setRequestIdentification(event.target.checked);

              if (event.target.checked) {
                setIdentification("");
              }
            }}
          />

          I don't know what kind of bug this is
        </label>
      </div>

      <button type="submit">Submit Bug</button>
    </form>
  );
}