'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SPACING,
  TYPOGRAPHY,
  cn,
} from "@/lib/design-constants";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  tags?: string[];
  children?: React.ReactNode;
}

export default function ProjectDialog({
  open,
  onOpenChange,
  title,
  description,
  tags,
  children,
}: ProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className={cn(TYPOGRAPHY.fontFamily.mono, TYPOGRAPHY.fontSize["2xl"], "text-card-foreground")}>
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className={cn(TYPOGRAPHY.fontFamily.mono, "text-muted-foreground")}>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {tags && tags.length > 0 && (
          <div className={cn("flex flex-wrap py-2", SPACING.gap.xs)}>
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className={TYPOGRAPHY.fontFamily.mono}>
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="py-4 text-card-foreground">
          {children}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={() => onOpenChange(false)}
            variant="secondary"
            className={TYPOGRAPHY.fontFamily.mono}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
