import React, { useState } from "react";
import { useSubmissions } from "../../hooks/useSubmissions";
import type { CreateBugSubmissionInput } from "../../types/bugSubmission";
import { useBugCount } from "../../hooks/useBugCount";

interface IdentificationFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  identification: string;
  setIdentification: React.Dispatch<React.SetStateAction<string>>;
  setPhoto: React.Dispatch<React.SetStateAction<File | null>>;
  requestIdentification: boolean;
  setRequestIdentification: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function IdentificationForm({
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
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>

      <label>
        Identification
        <input
          type="text"
          value={identification}
          onChange={(event) => setIdentification(event.target.value)}
          disabled={requestIdentification}
        />
      </label>

      <label>
        Photo
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={requestIdentification}
          onChange={(event) => setRequestIdentification(event.target.checked)}
        />
        Request identification help
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default function Identification() {
  /*
   * This component uses useSubmissions so identification data flows through
   * the submission service and repository instead of being stored in the page.
   * The hook also provides loading, error, addSubmission, and removeSubmission.
   */
  const {
    submissions,
    loading,
    error,
    addSubmission,
    removeSubmission,
  } = useSubmissions();
  const {
    bugCount,
    incrementBugCount,
    decrementBugCount,
  } = useBugCount();
  const [name, setName] = useState("");
  const [identification, setIdentification] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [requestIdentification, setRequestIdentification] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const photoUrl = photo ? URL.createObjectURL(photo) : undefined;

    const added = await addSubmission({
      name,
      identification,
      photo: photoUrl,
      requestIdentification,
    } satisfies CreateBugSubmissionInput);

    if (added) {
      incrementBugCount();
      setName("");
      setIdentification("");
      setPhoto(null);
      setRequestIdentification(false);
    }
  }

  async function handleRemove(id: number) {
    const removed = await removeSubmission(id);

    if (removed) {
      decrementBugCount();
    }
  }

  return (
    <section className="identification">
      <h2>Bug Identification</h2>

      <p>
        Upload a bug and either identify it yourself or request help
        identifying it.
      </p>

      <p>
        <strong>Total Bugs Discovered:</strong> {bugCount}
      </p>

      <IdentificationForm
        name={name}
        setName={setName}
        identification={identification}
        setIdentification={setIdentification}
        setPhoto={setPhoto}
        requestIdentification={requestIdentification}
        setRequestIdentification={setRequestIdentification}
        handleSubmit={handleSubmit}
      />

      <section className="identification-preview">
        <h2>Submission Preview</h2>

        <p>
          <strong>Name:</strong>{" "}
          {name || "Enter a submission name above"}
        </p>

        <p>
          <strong>Identification:</strong>{" "}
          {requestIdentification
            ? "Help requested"
            : identification || "Not specified"}
        </p>
      </section>

      <section className="identification-submissions">
        <h2>Submitted Bugs</h2>

        {loading ? (
          <p>Loading submissions...</p>
        ) : submissions.length === 0 ? (
          <p>No bug submissions yet.</p>
        ) : (
          submissions.map((submission) => (
            <article key={submission.id} className="submission-item">
              <p>
                <strong>Name:</strong> {submission.name}
              </p>

              {submission.photo && (
                <img src={submission.photo} alt={submission.name} />
              )}

              <p>
                <strong>Identification:</strong>{" "}
                {submission.requestIdentification
                  ? "Help requested"
                  : submission.identification || "Not specified"}
              </p>

              <p>
                <strong>Status:</strong> {submission.status}
              </p>

              <button type="button" onClick={() => handleRemove(submission.id)}>
                Remove
              </button>
            </article>
          ))
        )}

        {error && <p role="alert">{error}</p>}
      </section>
    </section>
  );
}