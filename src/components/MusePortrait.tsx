import { portraitSvg, type MuseLook, type PortraitMode } from "@/lib/portrait";

type Props = {
  look: MuseLook;
  /** unique per instance on a page (contestant id) */
  uid: string;
  name: string;
  sash?: number;
  mode?: PortraitMode;
  className?: string;
};

/**
 * Inline procedural portrait — self-generated SVG, no network, no real faces.
 * The markup comes from our own generator, never user input.
 */
export function MusePortrait({ look, uid, name, sash, mode = "portrait", className = "" }: Props) {
  const svg = portraitSvg(look, mode, uid, sash);
  return (
    <div
      role="img"
      aria-label={`Stylized synthetic portrait of ${name}`}
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
