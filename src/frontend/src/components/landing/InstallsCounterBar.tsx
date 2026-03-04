import { useInstallCount } from "@/hooks/useInstallCount";

/**
 * Top-of-page installs counter bar that displays the total number of installs
 * Reads from the persisted backend count with a base value of 62
 */
export default function InstallsCounterBar() {
  const { installCount, isLoading } = useInstallCount();

  return (
    <div
      className="w-full backdrop-blur-sm py-3 sticky top-0 z-50"
      style={{
        background: "rgba(3, 5, 20, 0.88)",
        borderBottom: "1px solid rgba(100, 150, 255, 0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "rgba(100, 200, 255, 0.7)" }}
          />
          <p
            className="text-sm font-medium tracking-widest"
            style={{ color: "rgba(150, 200, 255, 0.55)" }}
          >
            INSTALLS:{" "}
            <span
              className="font-semibold"
              style={{ color: "rgba(220, 235, 255, 0.92)" }}
            >
              {isLoading ? "..." : installCount.toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
