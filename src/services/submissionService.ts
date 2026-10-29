import { submissionRepository } from "../repositories/submissionRepository";
import type {
  BugSubmission,
  CreateBugSubmissionInput,
} from "../types/bugSubmission";

function validateSubmission(input: CreateBugSubmissionInput): void {
  const errors: string[] = [];

  if (!input.name.trim()) {
    errors.push("Submission name is required.");
  }

  if (
    !input.requestIdentification &&
    !input.identification?.trim()
  ) {
    errors.push(
      "Identification is required unless identification help is requested.",
    );
  }

  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }
}

export const submissionService = {
  async getSubmissions(): Promise<BugSubmission[]> {
    return submissionRepository.getAll();
  },

  async addSubmission(
    input: CreateBugSubmissionInput,
  ): Promise<BugSubmission> {
    const submissionInput: CreateBugSubmissionInput = {
      ...input,
      name: input.name.trim(),
      identification: input.identification?.trim() || undefined,
    };

    validateSubmission(submissionInput);

    return submissionRepository.add({
      ...submissionInput,
      status: "pending",
    });
  },

  async removeSubmission(id: number): Promise<void> {
    if (!Number.isInteger(id) || id < 1) {
      throw new Error("Invalid submission ID.");
    }

    const removed = await submissionRepository.remove(id);

    if (!removed) {
      throw new Error("Submission not found.");
    }
  },
};