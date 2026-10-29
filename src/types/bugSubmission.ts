export type BugSubmissionStatus =
  | "pending"
  | "approved"
  | "disapproved";

export type BugSubmission = {
  id: number;
  name: string;
  photo?: string;
  identification?: string;
  requestIdentification: boolean;
  status: BugSubmissionStatus;
};

export type CreateBugSubmissionInput = Omit<
  BugSubmission,
  "id" | "status"
>;