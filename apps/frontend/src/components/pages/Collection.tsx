/** 
 * Architechture component: 
 * This component uses the useBugs hook for react state,
 * the bugService for business logic (validation/counts),
<<<<<<< HEAD
 * The bugRepository for test data access.
=======
 * The bugRepository for test data access.  
>>>>>>> develop
*/
import React, { useState } from "react";
import { useFieldValue } from "../../hooks/useFieldValue";
import { useCollection } from "../../hooks/useCollection";
import { bugService } from "../../services/bugService";
<<<<<<< HEAD
import type { CollectedBug, NewCollectedBug } from "../../types/collectedBug";
=======
import type { CollectedBug } from "../../types/collectedBug";
>>>>>>> develop

interface FormErrors {
  commonName?: string;
  order?: string;
}

<<<<<<< HEAD
export default function Collection() {
  
=======
export default function Collection({ bugCount, setBugCount }: {bugCount: number, setBugCount: React.Dispatch<React.SetStateAction<number>>}) {
  
  // state for form inputs
>>>>>>> develop
  const commonNameField = useFieldValue("");
  const scientificNameField = useFieldValue("");
  const orderField = useFieldValue("");
  const habitatField = useFieldValue("");

<<<<<<< HEAD
  const [errors, setErrors] = useState<FormErrors>({} as FormErrors);

  // This is now using the updated async hook
  const { collectedBugs, addBug, removeBug } = useCollection();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

=======
  // state for validating errors
  const [errors, setErrors] = useState<FormErrors>({} as FormErrors);

  // USE THE HOOK HERE
  const { collectedBugs, addBug, removeBug } = useCollection();

  // handle validation and adding
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation logic (using service)
>>>>>>> develop
    const newErrors = bugService.validateCollectedBug({
        commonName: commonNameField.value,
        order: orderField.value
    });
    
    setErrors(newErrors as FormErrors);

<<<<<<< HEAD
    if (Object.keys(newErrors).length === 0) {
      
      const newBugPayload: NewCollectedBug = {
        userId: 1, 
        commonName: commonNameField.value,
        scientificName: scientificNameField.value,
        order: orderField.value,
        habitat: habitatField.value,
        dateCollected: new Date().toISOString().split('T')[0]
      };

      await addBug(newBugPayload);


=======
    // if no errors, add the bug
    if (Object.keys(newErrors).length === 0) {
      // USE SERVICE TO BUILD BUG
      const newBug: CollectedBug = bugService.buildCollectedBug(
        commonNameField.value,
        scientificNameField.value,
        orderField.value,
        habitatField.value
      );

      // USE HOOK TO ADD BUG
      addBug(newBug);

      // USE SERVICE TO UPDATE COUNT
      setBugCount((current) => bugService.adjustCount(current, 1));

      // clear form
>>>>>>> develop
      commonNameField.resetValue();
      scientificNameField.resetValue();
      orderField.resetValue();
      habitatField.resetValue();
    }
  };

<<<<<<< HEAD
  const handleDelete = async (idToDelete: number) => {
    await removeBug(idToDelete);
=======
  // for deleting bug 
  const handleDelete = (idToDelete: number) => {
    // USE HOOK TO REMOVE BUG
    removeBug(idToDelete);

    // USE SERVICE TO UPDATE COUNT
    setBugCount((current) => bugService.adjustCount(current, -1));
>>>>>>> develop
  };

  return (
    <section className="collection">
      <h2>My Bug Collection</h2>
<<<<<<< HEAD
      <p>Total Bugs Discovered: {collectedBugs.length}</p>

      <form onSubmit={handleSubmit}>
        <h3>Add a New Bug</h3>
        <div>
          <input name="commonName" placeholder="Common Name" value={commonNameField.value} onChange={e => commonNameField.setValue(e.target.value)} />
          {errors.commonName && <span style={{ color: "red", fontSize: "12px" }}> {errors.commonName}</span>}
        </div>
        <br />
        <div>
          <input name="scientificName" placeholder="Scientific Name" value={scientificNameField.value} onChange={e => scientificNameField.setValue(e.target.value)} />
        </div>
        <br />
        <div>
          <input name="order" placeholder="Order (e.g. Coleoptera)" value={orderField.value} onChange={e => orderField.setValue(e.target.value)} />
          {errors.order && <span style={{ color: "red", fontSize: "12px" }}> {errors.order}</span>}
        </div>
        <br />
        <div>
          <input name="habitat" placeholder="Habitat" value={habitatField.value} onChange={e => habitatField.setValue(e.target.value)} />
        </div>
        <br />
        <button type="submit">Add Bug</button>
      </form>

      <ul>
        {/* FIXED: Added the type : CollectedBug here */}
        {collectedBugs.map((specimen: CollectedBug) => (
=======
      <p>Total Bugs Discovered: {bugCount}</p>

      <form onSubmit={handleSubmit}>
        <h3>Add a New Bug</h3>
        
        <div>
          <input 
            name="commonName" 
            placeholder="Common Name" 
            value={commonNameField.value} 
            onChange={e => commonNameField.setValue(e.target.value)} 
          />
          {errors.commonName && <span style={{ color: "red", fontSize: "12px" }}> {errors.commonName}</span>}
        </div>
        <br />

        <div>
          <input 
            name="scientificName" 
            placeholder="Scientific Name" 
            value={scientificNameField.value} 
            onChange={e => scientificNameField.setValue(e.target.value)} 
          />
        </div>
        <br />

        <div>
          <input 
            name="order" 
            placeholder="Order (e.g. Coleoptera)" 
            value={orderField.value} 
            onChange={e => orderField.setValue(e.target.value)} 
          />
          {errors.order && <span style={{ color: "red", fontSize: "12px" }}> {errors.order}</span>}
        </div>
        <br />

        <div>
          <input 
            name="habitat" 
            placeholder="Habitat" 
            value={habitatField.value} 
            onChange={e => habitatField.setValue(e.target.value)} 
          />
        </div>
        <br />

        <button type="submit">Add Bug</button>
      </form>

      {/* List */}
      <ul>
        {/* NOTICE: we map over collectedBugs now, not collectedSpecimens! */}
        {collectedBugs.map((specimen) => (
>>>>>>> develop
          <li key={specimen.id} style={{ marginBottom: "15px" }}>
            <strong>{specimen.commonName}</strong> ({specimen.scientificName})
            <br />
            Order: {specimen.order} | Habitat: {specimen.habitat} | Collected: {specimen.dateCollected}
            <br />
<<<<<<< HEAD
            <button onClick={() => handleDelete(specimen.id)} style={{ color: "red", marginTop: "5px" }}>Delete</button>
=======
            
            <button 
              onClick={() => handleDelete(specimen.id)}
              style={{ color: "red", marginTop: "5px" }}
            >
              Delete
            </button>
>>>>>>> develop
          </li>
        ))}
      </ul>
    </section>
  );
}