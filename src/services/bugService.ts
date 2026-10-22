export const bugService = {
  validateBugName(name: string): string | null {
    if (name.trim().length < 3) {
      return "Bug name must be at least 3 characters.";
    }
    return null;
  },

  getNextBugId(bugs: { id: number }[]): number {
    if (bugs.length === 0) return 0;
    return Math.max(...bugs.map((b) => b.id)) + 1;
  },

  validateCollectedBug(data: { commonName: string; order: string }): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!data.commonName.trim()) errors.commonName = "Common name is required";
    if (!data.order.trim()) errors.order = "Order is required";
    return errors;
  },

  getFormattedDate(): string {
    return new Date().toISOString().split("T")[0];
  }
};