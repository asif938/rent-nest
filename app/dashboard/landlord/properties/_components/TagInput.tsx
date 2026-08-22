"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

export default function TagInput({
  value,
  onChange,
  placeholder = "Add amenity...",
}: Props) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const trimmed = draft.trim();

    if (!trimmed || value.includes(trimmed)) {
      setDraft("");
      return;
    }

    onChange([...value, trimmed]);
    setDraft("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((item) => item !== tag));
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={addTag}
          aria-label="Add"
        >
          <Plus size={16} />
        </Button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1 rounded-full py-1 pr-1"
            >
              {tag}

              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="rounded-full p-0.5 hover:bg-foreground/10"
                aria-label={`Remove ${tag}`}
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
