/** Every home-page section is positioned and annotated by the lens layer. */
export type SectionProps = {
  /** Running index, assigned by the page in the current reading order. */
  num?: string;
  /** Section note, possibly rewritten for the active lens. */
  note?: string;
  /** True when the active lens says this section answers the reader. */
  spotlight?: boolean;
};
