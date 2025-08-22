import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

type DynamicContentToggleProps = {
  onProfileChange: (profile: string) => void;
  isLoading: boolean;
};

const profiles = [
  { value: 'Default', label: 'Default View' },
  { value: 'Recruiter', label: 'For Recruiters' },
  { value: 'Developer', label: 'For Developers' },
  { value: 'Project Manager', label: 'For PMs' },
];

export default function DynamicContentToggle({ onProfileChange, isLoading }: DynamicContentToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={onProfileChange} defaultValue="Default">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tailor Content For..." />
        </SelectTrigger>
        <SelectContent>
          {profiles.map(profile => (
            <SelectItem key={profile.value} value={profile.value}>
              {profile.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isLoading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
    </div>
  );
}
