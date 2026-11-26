import React, { useState } from "react";
import { useFieldValue } from "../../hooks/useFieldValue";
import { useCollection } from "../../hooks/useCollection";
import type { CollectedBug, NewCollectedBug } from "../../types/collectedBug";

interface FormErrors {
  commonName?: string;
  order?: string;
}

export default function Collection() {
  const commonNameField = useFieldValue("");
  const scientificNameField = useFieldValue("");
  const orderField = useFieldValue("");
  const habitatField = useFieldValue("");

  const [errors, setErrors] = useState<FormErrors>({} as FormErrors);

  const { collectedBugs, addBug, removeBug } = useCollection();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple manual check to keep the presentation smooth
    if (!commonNameField.value || !orderField.value) {
        setErrors({
            commonName: !commonNameField.value ? "Common name is required" : undefined,
            order: !orderField.value ? "Order is required" : undefined
        });
        return;
    }
    
    setErrors({});

    const newBugPayload: NewCollectedBug = {
        userId: 1, 
        commonName: commonNameField.value,
        scientificName: scientificNameField.value,
        order: orderField.value,
        habitat: habitatField.value,
        dateCollected: new Date().toISOString() // Fixed!
    };

    await addBug(newBugPayload);

    commonNameField.resetValue();
    scientificNameField.resetValue();
    orderField.resetValue();
    habitatField.resetValue();
};

  const handleDelete = async (idToDelete: number) => {
    await removeBug(idToDelete);
  };

  return (
    <section className="collection">
      <h2>My Bug Collection</h2>
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
        {collectedBugs.map((specimen: CollectedBug) => (
          <li key={specimen.id} style={{ marginBottom: "15px" }}>
            <strong>{specimen.commonName}</strong> ({specimen.scientificName})
            <br />
            Order: {specimen.order} | Habitat: {specimen.habitat} | Collected: {specimen.dateCollected}
            <br />
            <button onClick={() => handleDelete(specimen.id)} style={{ color: "red", marginTop: "5px" }}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}