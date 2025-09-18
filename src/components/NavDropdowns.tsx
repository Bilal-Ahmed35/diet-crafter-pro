import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe, MapPin } from "lucide-react";

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const regions = [
  { code: 'international', name: 'International Mix', flag: '🌍' },
  { code: 'north_america', name: 'North America', flag: '🇺🇸' },
  { code: 'latin_america', name: 'Latin America', flag: '🇲🇽' },
  { code: 'europe', name: 'Europe', flag: '🇪🇺' },
  { code: 'middle_east', name: 'Middle East & North Africa', flag: '🇸🇦' },
  { code: 'south_asia', name: 'South Asia', flag: '🇮🇳' },
  { code: 'east_asia', name: 'East Asia', flag: '🇨🇳' },
  { code: 'southeast_asia', name: 'Southeast Asia', flag: '🇹🇭' },
  { code: 'sub_saharan_africa', name: 'Sub-Saharan Africa', flag: '🇳🇬' },
  { code: 'australia_oceania', name: 'Australia & Oceania', flag: '🇦🇺' },
];

export const NavDropdowns = () => {
  const { language, region, setLanguage, setRegion, t } = useLanguage();

  const currentLanguage = languages.find(lang => lang.code === language);
  const currentRegion = regions.find(reg => reg.code === region);

  return (
    <div className="flex items-center space-x-2">
      {/* Language Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Globe className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">{currentLanguage?.flag}</span>
            <span className="hidden md:inline ml-1">{t('nav.language')}</span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background border border-border z-50">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="cursor-pointer hover:bg-muted"
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Region Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">{currentRegion?.flag}</span>
            <span className="hidden md:inline ml-1">{t('nav.region')}</span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background border border-border z-50 max-h-64 overflow-y-auto">
          {regions.map((reg) => (
            <DropdownMenuItem
              key={reg.code}
              onClick={() => setRegion(reg.code)}
              className="cursor-pointer hover:bg-muted"
            >
              <span className="mr-2">{reg.flag}</span>
              {reg.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};