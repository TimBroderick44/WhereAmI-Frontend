export interface SearchBarProps {
  onSearch: (searchTerm: string, searchType: 'suburb' | 'postcode') => void;
}