export const bugService = {
  // Just validates the bug name length
  validateBugName(name: string): string | null {
    if (name.trim().length < 3) {
      return "Bug name must be at least 3 characters.";
    }
    return null;
  },

  adjustCount(currentCount: number, adjustment: number): number {
    return Math.max(0, currentCount + adjustment);
  },

  // calculates the next available ID for the new bug
  getNextBugId(bugs: { id: number }[]): number {
    if (bugs.length === 0) return 0;
    return Math.max(...bugs.map((b) => b.id)) + 1;
  },

  // Unique ID for collection and identification (it replaces Date.now())
  generateUniqueId(): number {
    return Date.now();
  },

  // Checking the category
  isValidCategory(category: string, validCategories: string[]): boolean {
    return validCategories.includes(category);
  },

  // New Bug Object
  buildNewBug(id: number, name: string, scientificName: string, category: string) {
    return {
        id: id,
        name: name.trim(),
        scientificName: scientificName.trim() || undefined,
        category: category
    };
  },

  // Validates the form in collection page
  validateCollectedBug(data: { commonName: string; order: string }): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!data.commonName.trim()) errors.commonName = "Common name is required";
    if (!data.order.trim()) errors.order = "Order is required";
    return errors;
  },

  // This just formats the date to YYYY-MM-DD
  getFormattedDate(): string {
    return new Date().toISOString().split("T")[0];
  },

  // Build collection object
  buildCollectedBug(commonName: string, order: string, scientificName: string, habitat: string) {
    return {
      id: this.generateUniqueId(),
      userId: 1, // Temporary user ID, replace with actual user ID when available
      commonName,
      scientificName,
      order,
      habitat,
      dateCollected: this.getFormattedDate()
    };
  },

  // For identification object (which moves ID and "pending status out of the page")
  buildSubmission(name: string, identification: string, photoUrl: string | undefined, requestIdentification: boolean) {
    return {
      id: this.generateUniqueId(),
      name,
      identification: identification || undefined,
      photo: photoUrl,
      requestIdentification,
      status: "pending" as const,
    };
  },

  // Shared removed function for all 3 pages
  removeById<T extends { id: number }>(items: T[], idToRemove: number): T[] {
    return items.filter(item => item.id !== idToRemove);  
  }
};