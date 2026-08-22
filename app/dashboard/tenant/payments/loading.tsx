export default function PaymentsLoading() {
  return (
    <div className="space-y-8 animate-pulse">

      {/* Page Header */}
      <div className="space-y-3">
        <div className="h-9 w-40 rounded-md bg-muted" />

        <div className="h-5 w-72 rounded-md bg-muted" />
      </div>

      {/* Payment Table */}
      <div className="overflow-hidden rounded-2xl border border-border/70">

        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 bg-muted/50 px-5 py-4">

          <div className="h-4 w-20 rounded bg-muted" />

          <div className="h-4 w-16 rounded bg-muted" />

          <div className="h-4 w-16 rounded bg-muted" />

          <div className="h-4 w-16 rounded bg-muted" />

          <div className="ml-auto h-4 w-16 rounded bg-muted" />

        </div>

        {/* Rows */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center gap-4 border-t px-5 py-5"
          >
            {/* Property */}
            <div className="space-y-2">
              <div className="h-4 w-36 rounded bg-muted" />
              <div className="h-3 w-24 rounded bg-muted" />
            </div>

            {/* Amount */}
            <div className="h-4 w-20 rounded bg-muted" />

            {/* Status */}
            <div className="h-6 w-20 rounded-full bg-muted" />

            {/* Date */}
            <div className="h-4 w-24 rounded bg-muted" />

            {/* Action */}
            <div className="ml-auto h-8 w-16 rounded-md bg-muted" />
          </div>
        ))}

      </div>

    </div>
  );
}