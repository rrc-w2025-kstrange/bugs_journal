import { useState } from 'react';
import type { FormEvent } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useBugs } from '../../hooks/useBugs';

// Temporary: there is no login yet, so everyone is user 1
const CURRENT_USER_ID = 1;

export default function Collection() {
  const { collectedBugs, addBug, removeBug } = useCollection();
  const { bugs } = useBugs(); 

  const [selectedBugId, setSelectedBugId] = useState('');
  const [error, setError] = useState('');

  // Only offer bugs that are not collected yet
  const collectedIds = new Set(collectedBugs.map((item) => item.bugId));
  const availableBugs = bugs.filter((bug) => !collectedIds.has(bug.id));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedBugId) {
      setError('Please choose a bug.');
      return;
    }

    setError('');
    await addBug({ userId: CURRENT_USER_ID, bugId: Number(selectedBugId) });
    setSelectedBugId('');
  };

  return (
    <section className="collection">
      <h2>My Bug Collection</h2>
      <p>Total Bugs Discovered: {collectedBugs.length}</p>

      <form onSubmit={handleSubmit}>
        <h3>Collect a Bug</h3>
        <select
          value={selectedBugId}
          onChange={(e) => setSelectedBugId(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option value="">Choose a bug...</option>
          {availableBugs.map((bug) => (
            <option key={bug.id} value={bug.id}>
              {bug.name}
            </option>
          ))}
        </select>
        
        <button type="submit">Add Bug</button>
        
        {error && <span style={{ color: 'red', fontSize: '12px', display: 'block', marginTop: '5px' }}> {error} </span>}
      </form>
      
      <br />
      <br />

      <ul>
        {collectedBugs.map((item) => (
          <li key={item.id} style={{ marginBottom: '15px' }}>
            <strong>{item.name}</strong> ({item.scientificName ?? 'no scientific name'})
            <br />
            Category: {item.category} | Collected: {item.dateCollected.split('T')[0]}
            <br />
            <button
              onClick={() => removeBug(item.id)}
              style={{ color: 'red', marginTop: '5px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}