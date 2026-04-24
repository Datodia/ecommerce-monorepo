"use client";

import { Button } from "@/shared/components/ui/button";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <div className="grid place-items-center gap-3">
          <h2 className="font-bolt text-xl">Something went wrong!</h2>
          <Button className="text-base p-4" onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  );
}
