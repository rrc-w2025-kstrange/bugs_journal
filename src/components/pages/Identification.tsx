import "../../app.css";
import identificationTraits from "./identificationTraits.json";

export default function Identification() {
  return (
    <section className="identification">
      <h2>Bug Identification Guide</h2>

      <p>
        Use the following characteristics to help identify different insects.
      </p>

      <ul>
        {identificationTraits.map((trait) => (
          <li key={trait.id}>
            <h3>{trait.feature}</h3>
            <p>{trait.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}