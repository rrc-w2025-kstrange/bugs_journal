import { submissionData } from "../data/submissionData";
import type {
  BugSubmission,
  CreateBugSubmissionInput,
} from "../types/bugSubmission";

let submissions: BugSubmission[] = submissionData.map(
  (submission) => ({
    ...submission,
  }),
);

let nextId =
  Math.max(...submissions.map((submission) => submission.id), 0) +
  1;

export const submissionRepository = {
  async getAll(): Promise<BugSubmission[]> {
    return submissions.map((submission) => ({
      ...submission,
    }));
  },

  async getById(id: number): Promise<BugSubmission | null> {
    const submission = submissions.find(
      (submission) => submission.id === id,
    );

    return submission ? { ...submission } : null;
  },

  async add(
    input: CreateBugSubmissionInput & Pick<BugSubmission, "status">,
  ): Promise<BugSubmission> {
    const submission: BugSubmission = {
      id: nextId++,
      ...input,
    };

    submissions = [...submissions, submission];

    return { ...submission };
  },

  async remove(id: number): Promise<boolean> {
    const originalLength = submissions.length;

    submissions = submissions.filter(
      (submission) => submission.id !== id,
    );

    return submissions.length < originalLength;
  },
};