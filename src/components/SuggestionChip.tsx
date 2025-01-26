import { Button } from "@/components/ui/button";

interface SuggestionChipProps {
  text: string;
  onClick: (text: string) => void;
}

const SuggestionChip = ({ text, onClick }: SuggestionChipProps) => {
  return (
    <Button
      variant="outline"
      className="rounded-full bg-white/80 hover:bg-white transition-colors px-4 py-2 text-sm animate-fade-in"
      onClick={() => onClick(text)}
    >
      {text}
    </Button>
  );
};

export default SuggestionChip;