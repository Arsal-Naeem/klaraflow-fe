"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

interface InviteUserModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

type InviteMode = "url" | "email"

export function InviteUserModal({ isOpen, onOpenChange }: InviteUserModalProps) {
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [mode, setMode] = React.useState<InviteMode>("url")
  const tTeam = useTranslations("team")
  const tCommon = useTranslations("common")

  // Generate a sample invite URL (replace with your actual logic)
  const inviteUrl = "https://klaraflow.com/invite?token=abc123def456"

  const handleInviteUser = () => {
    // Handle invite user logic here
    console.log("Inviting user:", inviteEmail)
    setInviteEmail("")
    onOpenChange(false)
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(inviteUrl)
    // You can add a toast notification here to show "URL copied"
    console.log("URL copied to clipboard")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "url"
              ? tTeam("inviteByLink")
              : tTeam("inviteByEmail")}
          </DialogTitle>
          <DialogDescription>
            {mode === "url"
              ? tTeam("inviteByLinkDescription", { default: "Share this URL to invite users to join your team." })
              : tTeam("inviteByEmailDescription", { default: "Send an invitation to join your team. Enter the email address of the person you'd like to invite." })}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {mode === "url" ? (
            <div className="grid gap-2">
              <div className="flex gap-2">
                <Input value={inviteUrl} readOnly className="flex-1" />
                <Button
                  type="button"
                  onClick={handleCopyUrl}
                  variant="outline"
                >
                  {tCommon("copy")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                {tCommon("email", { default: "Email" })}
              </label>
              <Input
                id="email"
                type="email"
                placeholder={tTeam("inviteByEmail", { default: "Input the Email Address" })}
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          {mode === "url" ? (
            <Button type="button" onClick={() => setMode("email")}>
              {tTeam("inviteByEmail")}
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setMode("url")}
              >
                {tTeam("inviteByLink")}
              </Button>
              <Button
                type="button"
                onClick={handleInviteUser}
                disabled={!inviteEmail}
              >
                {tTeam("invite")}
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
