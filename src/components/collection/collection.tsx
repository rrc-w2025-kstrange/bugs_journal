import { useState } from "react";

interface FormErrors {
  commonName: string;
  order: string;
}

// defines what bug look like
interface Bug {
  id: number;
  userId: number;
  commonName: string;
  scientificName: string;
  order: string;
  habitat: string;
}

// this define what form data looks like
interface FormData {
  commonName: string;
  scientificName: string;
  order: string;
  habitat: string;
}
export default function Collection() {
  const [collectedSpecimens, setCollectedSpecimens] = useState<Bug[]>([
    { 
      id: 1, 
      userId: 1,
      commonName: "Placeholder beetle", 
      scientificName: "Species placeholder", 
      order: "Coleoptera", 
      habitat: "Garden" 
    }
  ]);
  
  // state for form inputs
  const [formData, setFormData] = useState<FormData>({
    commonName: "",
    scientificName: "",
    order: "",
    habitat: ""
  });

  // state for validating errors
  const [errors, setErrors] = useState<FormErrors>({} as FormErrors);

  // handle typing in form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle validation and adding
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation logic
    let newErrors: FormErrors = {} as FormErrors;
    if (!formData.commonName.trim()) newErrors.commonName = "Common name is required";
    if (!formData.order.trim()) newErrors.order = "Order is required";
    
    setErrors(newErrors);

    // if no errors, add the bug
    if (Object.keys(newErrors).length === 0) {
      const newBug = {
        id: Date.now(), 
        userId: 1, // Added fake user here too
        ...formData
      };

      // Update the list
      setCollectedSpecimens([...collectedSpecimens, newBug]);

      // clear form
      setFormData({ commonName: "", scientificName: "", order: "", habitat: "" });
    }
  };

  // for deleting bug 
  const handleDelete = (idToDelete: number) => {
    const updatedList = collectedSpecimens.filter((bug) => bug.id !== idToDelete);
    setCollectedSpecimens(updatedList);
  };

  return (
    <section className="collection">
      <h2>My Bug Collection</h2>
      <p>Total Specimens Collected: {collectedSpecimens.length}</p>

      
      <form onSubmit={handleSubmit}>
        <h3>Add a New Bug</h3>
        
        <div>
          <input 
            name="commonName" 
            placeholder="Common Name" 
            value={formData.commonName} 
            onChange={handleChange} 
          />
          {/* Show validation error if it exists */}
          {errors.commonName && <span style={{ color: "red", fontSize: "12px" }}> {errors.commonName}</span>}
        </div>
        <br />

        <div>
          <input 
            name="scientificName" 
            placeholder="Scientific Name" 
            value={formData.scientificName} 
            onChange={handleChange} 
          />
        </div>
        <br />

        <div>
          <input 
            name="order" 
            placeholder="Order (e.g. Coleoptera)" 
            value={formData.order} 
            onChange={handleChange} 
          />
          {errors.order && <span style={{ color: "red", fontSize: "12px" }}> {errors.order}</span>}
        </div>
        <br />

        <div>
          <input 
            name="habitat" 
            placeholder="Habitat" 
            value={formData.habitat} 
            onChange={handleChange} 
          />
        </div>
        <br />

        <button type="submit">Add Bug</button>
      </form>

      /* list */
      <ul>
        {collectedSpecimens.map((specimen) => (
          <li key={specimen.id} style={{ marginBottom: "15px" }}>
            <strong>{specimen.commonName}</strong> ({specimen.scientificName})
            <br />
            Order: {specimen.order} | Habitat: {specimen.habitat} 
            <br />
            
            /*Delete button*/
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