import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

type ReportRangeResponse = {
  start: string;
  end: string;
};

export function useReportRange() {
  return useQuery<ReportRangeResponse>({
    queryKey: ["report-range"],
    queryFn: () =>
      api
        .get("/report/range")
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(
            err?.response?.data?.message || "Failed to fetch report range"
          );
        }),
  });
}
