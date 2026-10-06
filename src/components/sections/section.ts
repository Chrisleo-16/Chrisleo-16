/** Every home-page section is numbered by the page in reading order. */
export type SectionProps = {
  /** Running index, assigned by the page. */
  num?: string;
  /** Optional one-line note under the section label. */
  note?: string;
  /** Kept for the shared SectionHead signature; unused on the home page. */
  spotlight?: boolean;
};
