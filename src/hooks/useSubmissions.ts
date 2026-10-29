import { useEffect, useState } from "react";
import { submissionService } from "../services/submissionService";
import type {
  BugSubmission,
  CreateBugSubmissionInput,
} from "../types/bugSubmission";

/**
 * Provides submissions, loading and error state, plus actions for adding and
 * removing identification submissions through the submission service.
 */
export function useSubmissions() {
  const [submissions, setSubmissions] = useState<BugSubmission[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadSubmissions() {
      try {
        const loadedSubmissions =
          await submissionService.getSubmissions();

        if (!ignore) {
          setSubmissions(loadedSubmissions);
        }
      } catch {
        if (!ignore) {
          setError("Unable to load bug submissions.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadSubmissions();

    return () => {
      ignore = true;
    };
  }, []);

  async function addSubmission(
    input: CreateBugSubmissionInput,
  ): Promise<boolean> {
    setError(null);

    try {
      const submission =
        await submissionService.addSubmission(input);

      setSubmissions((current) => [...current, submission]);
      return true;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to add bug submission.",
      );
      return false;
    }
  }

  async function removeSubmission(id: number): Promise<boolean> {
    setError(null);

    try {
      await submissionService.removeSubmission(id);
      setSubmissions((current) =>
        current.filter((submission) => submission.id !== id),
      );
      return true;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to remove bug submission.",
      );
      return false;
    }
  }

  return {
    submissions,
    loading,
    error,
    addSubmission,
    removeSubmission,
  };
}