interface IdentificationTraitProps {
  feature: string;
  description: string;
}

export default function IdentificationTrait({
  feature,
  description,
}: IdentificationTraitProps) {
  return (
    <li>
      <h3>{feature}</h3>
      <p>{description}</p>
    </li>
  );
}