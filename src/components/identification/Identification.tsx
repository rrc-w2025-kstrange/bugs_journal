import "../../App.css";
import identificationTraits from "./identificationTraits.json";
import IdentificationTrait from "./identificationTrait";

interface Trait {
  id: number;
  feature: string;
  description: string;
}

export default function Identification() {
  const traits: Trait[] = identificationTraits;

  const traitItems: JSX.Element[] = [];

  traits.forEach((trait) => {
    traitItems.push(
      <IdentificationTrait
        key={trait.id}
        feature={trait.feature}
        description={trait.description}
      />
    );
  });

  return (
    <section className="identification">
      <h2>Bug Identification Guide</h2>

      <p>
        Use the following characteristics to help identify different insects.
      </p>

      <ul>{traitItems}</ul>
    </section>
  );
}