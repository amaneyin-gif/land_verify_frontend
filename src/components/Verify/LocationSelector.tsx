import { MapPin, Building2, Home, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { District, SubDistrict, Village } from './village';

interface LocationSelectorProps {
  districts: District[];
  subDistricts: SubDistrict[];
  villages: Village[];
  selectedDistrict: string;
  selectedSubDistrict: string;
  selectedVillage: string;
  onDistrictChange: (value: string) => void;
  onSubDistrictChange: (value: string) => void;
  onVillageChange: (value: string) => void;
  loading?: boolean;
}

export const LocationSelector = ({
  districts,
  subDistricts,
  villages,
  selectedDistrict,
  selectedSubDistrict,
  selectedVillage,
  onDistrictChange,
  onSubDistrictChange,
  onVillageChange,
  loading,
}: LocationSelectorProps) => {
  return (
    <div className="glass-panel rounded-xl p-4 animate-slide-up">
      <div className="flex flex-wrap items-center gap-4">
        {/* District Selector */}
        <div className="flex items-center gap-2 min-w-[200px] flex-1 max-w-xs">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              District
            </label>
            <Select value={selectedDistrict} onValueChange={onDistrictChange}>
              <SelectTrigger className="h-9 border-0 bg-transparent p-0 text-sm font-medium shadow-none focus:ring-0">
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent className="bg-popover border shadow-xl">
                {districts.map((district) => (
                  <SelectItem key={district.id} value={district.id}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-border" />

        {/* Sub-District Selector */}
        <div className="flex items-center gap-2 min-w-[200px] flex-1 max-w-xs">
          <div className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
            selectedDistrict ? 'bg-primary/10' : 'bg-muted'
          }`}>
            <MapPin className={`h-4 w-4 ${selectedDistrict ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Sub-District
            </label>
            <Select 
              value={selectedSubDistrict} 
              onValueChange={onSubDistrictChange}
              disabled={!selectedDistrict}
            >
              <SelectTrigger className="h-9 border-0 bg-transparent p-0 text-sm font-medium shadow-none focus:ring-0 disabled:opacity-50">
                <SelectValue placeholder="Select sub-district" />
              </SelectTrigger>
              <SelectContent className="bg-popover border shadow-xl">
                {subDistricts.map((subDistrict) => (
                  <SelectItem key={subDistrict.id} value={subDistrict.id}>
                    {subDistrict.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-border" />

        {/* Village Selector */}
        <div className="flex items-center gap-2 min-w-[200px] flex-1 max-w-xs">
          <div className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
            selectedSubDistrict ? 'bg-primary/10' : 'bg-muted'
          }`}>
            <Home className={`h-4 w-4 ${selectedSubDistrict ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Village
            </label>
            <Select 
              value={selectedVillage} 
              onValueChange={onVillageChange}
              disabled={!selectedSubDistrict}
            >
              <SelectTrigger className="h-9 border-0 bg-translucent p-0 text-sm font-medium shadow-none focus:ring-0 disabled:opacity-50">
                <SelectValue placeholder="Select village" />
              </SelectTrigger>
              <SelectContent className="bg-popover border shadow-xl max-h-[300px]">
                {villages.map((village) => (
                  <SelectItem key={village.id} value={village.id}>
                    {village.name}{` (${village.lgdCode})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
