import { creatorMarkSvg } from "@/lib/portrait";

type Props = {
  name: string;
  uid: string;
  size?: number;
  className?: string;
};

/** Studio medallion — procedural initials mark, replaces external avatars. */
export function CreatorMark({ name, uid, size = 40, className = "" }: Props) {
  const svg = creatorMarkSvg(name, uid);
  return (
    <div
      role="img"
      aria-label={`${name} studio mark`}
      style={{ width: size, height: size }}
      className={`shrink-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
