import { useState } from "react";
import { useFieldValue } from "../../hooks/useFieldValue";
import { bugService } from "../../services/bugService";

interface FormErrors {
  commonName?: string;
  order?: string;
}

interface CollectedBug {
  id: number;
  userId: number;
  commonName: string;
  scientificName: string;
  order: string;
  habitat: string;
  dateCollected: string;
}

interface CollectionProps {
  collectedSpecimens: CollectedBug[];
  setCollectedSpecimens: React.Dispatch<React.SetStateAction<CollectedBug[]>>;
  bugCount: number;
  setBugCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function Collection({ collectedSpecimens, setCollectedSpecimens, bugCount, setBugCount }: CollectionProps) {
  
  // state for form inputs
  const commonNameField = useFieldValue("");
  const scientificNameField = useFieldValue("");
  const orderField = useFieldValue("");
  const habitatField = useFieldValue("");

  // state for validating errors
  const [errors, setErrors] = useState<FormErrors>({} as FormErrors);

  // handle validation and adding
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation logic (using service)
    const newErrors = bugService.validateCollectedBug({
        commonName: commonNameField.value,
        order: orderField.value
    });
    
    setErrors(newErrors as FormErrors);

    // if no errors, add the bug
    if (Object.keys(newErrors).length === 0) {
      // USE SERVICE TO BUILD BUG
      const newBug: CollectedBug = bugService.buildCollectedBug(
        commonNameField.value,
        scientificNameField.value,
        orderField.value,
        habitatField.value
      );

      // Update the list
      setCollectedSpecimens([...collectedSpecimens, newBug]);

      // USE SERVICE TO UPDATE COUNT
      setBugCount((current) => bugService.adjustCount(current, 1));

      // clear form
      commonNameField.resetValue();
      scientificNameField.resetValue();
      orderField.resetValue();
      habitatField.resetValue();
    }
  };

  // for deleting bug 
  const handleDelete = (idToDelete: number) => {
    // USE SERVICE TO REMOVE
    const updatedList = bugService.removeById(collectedSpecimens, idToDelete);
    setCollectedSpecimens(updatedList);

    // USE SERVICE TO UPDATE COUNT
    setBugCount((current) => bugService.adjustCount(current, -1));
  };

  return (
    <section className="collection">
      <h2>My Bug Collection</h2>
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
        {collectedSpecimens.map((specimen) => (
          <li key={specimen.id} style={{ marginBottom: "15px" }}>
            <strong>{specimen.commonName}</strong> ({specimen.scientificName})
            <br />
            Order: {specimen.order} | Habitat: {specimen.habitat} | Collected: {specimen.dateCollected}
            <br />
            
            <button 
              onClick={() => handleDelete(specimen.id)}
              style={{ color: "red", marginTop: "5px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}