export const Loader = ({ className = 'h-28' }) => (
  <div className={`glass-panel shimmer ${className} w-full rounded-[28px]`} />
);

export const AppShellLoader = () => (
  <div className="min-h-screen bg-mesh-soft p-6">
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <Loader className="h-20" />
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Loader className="h-[520px]" />
        <div className="grid gap-6">
          <Loader className="h-56" />
          <Loader className="h-56" />
        </div>
      </div>
    </div>
  </div>
);
