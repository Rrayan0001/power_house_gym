"use client";

import * as React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export type ActionModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  confirmVariant?: "primary" | "secondary" | "ghost" | "danger";
  onConfirm?: () => void;
  children?: React.ReactNode;
  footer?: boolean;
};

export function ActionModal({
  open,
  onClose,
  title,
  description,
  confirmText = "Confirm",
  confirmVariant = "primary",
  onConfirm,
  children,
  footer = true,
}: ActionModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description}>
      <div className="space-y-4">
        {children}
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
            {onConfirm && (
              <Button variant={confirmVariant} type="button" onClick={onConfirm}>
                {confirmText}
              </Button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
