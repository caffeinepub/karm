import { useInstallCount } from '@/hooks/useInstallCount';

/**
 * Top-of-page installs counter bar that displays the total number of installs
 * Reads from the persisted backend count with a base value of 24
 */
export default function InstallsCounterBar() {
  const { installCount, isLoading } = useInstallCount();

  return (
    <div className="w-full bg-black/80 backdrop-blur-sm border-b border-white/5 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <p className="text-white/60 text-sm font-medium tracking-wide">
            Installs: <span className="text-white font-semibold">{isLoading ? '...' : installCount.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
