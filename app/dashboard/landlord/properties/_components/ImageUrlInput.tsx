"use client";

import { useState } from "react";
import { ImageOff, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

function ImageThumb({
  url,
  onRemove,
}: {
  url: string;
  onRemove: () => void;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg border border-border/70 bg-muted">
      {errored ? (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
          <ImageOff size={18} />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setErrored(true)}
        />
      )}

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 rounded-full bg-background/90 p-1 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
        aria-label="Remove image"
      >
        <X size={12} />
      </button>
    </div>
  );
}

export default function ImageUrlInput({
  value,
  onChange,
}: Props) {
  const [draft, setDraft] = useState("");

  function addImage() {
    const trimmed = draft.trim();

    if (!trimmed || value.includes(trimmed)) {
      setDraft("");
      return;
    }

    onChange([...value, trimmed]);
    setDraft("");
  }

  function removeImage(url: string) {
    onChange(value.filter((item) => item !== url));
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={draft}
          placeholder="https://example.com/photo.jpg"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addImage();
            }
          }}
        />

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={addImage}
          aria-label="Add image URL"
        >
          <Plus size={16} />
        </Button>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {value.map((url) => (
            <ImageThumb
              key={url}
              url={url}
              onRemove={() => removeImage(url)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
