export interface Props {
  tags: string[];
  editable?: boolean;
  onFocus?: () => void;
  onChange?: (tags: string[]) => void;
}
