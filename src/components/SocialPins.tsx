import { Mail, Github, Linkedin } from "lucide-react";
import { cn, COLORS, INTERACTIONS } from "@/lib/design-constants";

interface SocialPinProps {
  icon: "email" | "github" | "linkedin";
  href: string;
}

export function SocialPin({ icon, href }: SocialPinProps) {
  const iconMap = {
    email: Mail,
    github: Github,
    linkedin: Linkedin,
  };

  const Icon = iconMap[icon];

  return (
    <a
      href={href}
      target={icon !== "email" ? "_blank" : undefined}
      rel={icon !== "email" ? "noopener noreferrer" : undefined}
      className={cn(
        "relative flex items-center justify-center",
        "bg-card rounded-lg p-3",
        COLORS.shadows.lg,
        INTERACTIONS.transition.all,
        INTERACTIONS.hover.lift,
        INTERACTIONS.cursor.pointer
      )}>
      {/* Icon */}
      <Icon className="w-6 h-6 text-foreground" />
    </a>
  );
}

interface SocialPinsGroupProps {
  email?: string;
  github?: string;
  linkedin?: string;
}

export function SocialPinsGroup({
  email,
  github,
  linkedin,
}: SocialPinsGroupProps) {
  return (
    <div className="flex flex-col gap-5">
      {email && <SocialPin icon="email" href={`mailto:${email}`} />}
      {github && <SocialPin icon="github" href={github} />}
      {linkedin && <SocialPin icon="linkedin" href={linkedin} />}
    </div>
  );
}
