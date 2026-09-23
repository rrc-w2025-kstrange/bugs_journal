export default function Collection() {
  const collectedSpecimens = [
    {
      id: 1,
      commonName: "Placeholder Beetle",
      scientificName: "Species placeholder",
      order: "Coleoptera",
      habitat: "Garden",
      dateCollected: "2026-09-01",
    },
    {
      id: 2,
      commonName: "Placeholder Butterfly",
      scientificName: "Species placeholder",
      order: "Lepidoptera",
      habitat: "Meadow",
      dateCollected: "2026-09-02",
    },
    {
      id: 3,
      commonName: "Placeholder Mantis",
      scientificName: "Species placeholder",
      order: "Mantodea",
      habitat: "Shrubbery",
      dateCollected: "2026-09-03",
    },
  ];

  return (
    <section className="collection">
      <h2>My Bug Collection</h2>
      <p>Total Specimens Collected: {collectedSpecimens.length}</p>

      <ul>
        {collectedSpecimens.map((specimen) => (
          <li key={specimen.id}>
            <strong>{specimen.commonName}</strong> ({specimen.scientificName})
            <br />
            Order: {specimen.order} | Habitat: {specimen.habitat} | Collected: {specimen.dateCollected}
          </li>
        ))}
      </ul>
    </section>
  );
}