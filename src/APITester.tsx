import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParsedContent } from "@/hooks/useParsedContent";
import { cn } from "@/lib/utils";
import { useState, type FormEvent } from "react";

export function APITester() {
  const [responseContent, setResponseContent] = useState<string | null>(null);
  const parsedContent = useParsedContent("/", responseContent, [], true);

  const testEndpoint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const endpoint = formData.get("endpoint") as string;
      const url = new URL(endpoint, location.href);
      const method = formData.get("method") as string;
      const res = await fetch(url, { method });

      const data = await res.json();
      setResponseContent("```json\n" + JSON.stringify(data, null, 2) + "\n```");
    } catch (error) {
      setResponseContent(String(error));
    }
  };

  return (
    <div className="mt-8 mx-auto w-full max-w-2xl text-left flex flex-col gap-4">
      <form
        onSubmit={testEndpoint}
        className="flex items-center gap-2 bg-card p-3 rounded-xl font-mono border border-input w-full"
      >
        <Select name="method" defaultValue="GET">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          name="endpoint"
          defaultValue="/api/hello"
          className={cn(
            "flex-1 font-mono",
            "bg-transparent border-0 shadow-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
          placeholder="/api/hello"
        />

        <Button type="submit" variant="secondary">
          Send
        </Button>
      </form>

      <div
        className={cn(
          "w-full min-h-[140px] bg-card",
          "border border-input rounded-xl p-3",
          "resize-y overflow-auto",
        )}
      >
        {parsedContent ? (
          <div className="text-sm">{parsedContent}</div>
        ) : (
          <span className="text-muted-foreground">
            Response will appear here...
          </span>
        )}
      </div>
    </div>
  );
}
