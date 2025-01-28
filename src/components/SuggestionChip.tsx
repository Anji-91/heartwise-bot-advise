import { Button } from "@/components/ui/button";

interface SuggestionChipProps {
  text: string;
  onClick: (text: string) => void;
}

const SuggestionChip = ({ text, onClick }: SuggestionChipProps) => {
  return (
    <Button
      variant="outline"
      className="rounded-full bg-white/80 hover:bg-white hover:shadow-md transition-all duration-200 px-4 py-2 text-sm animate-fade-in border-purple-100 hover:border-purple-200 text-gray-700"
      onClick={() => onClick(text)}
    >
      {text}
    </Button>
  );
};

export default SuggestionChip;