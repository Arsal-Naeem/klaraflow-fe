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

interface InviteUserModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

type InviteMode = "url" | "email"

export function InviteUserModal({ isOpen, onOpenChange }: InviteUserModalProps) {
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [mode, setMode] = React.useState<InviteMode>("url")
  
  // Generate a sample invite URL (you can replace this with your actual URL generation logic)
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
            {mode === "url" ? "Invite by URL" : "Invite by Email"}
          </DialogTitle>
          {/* <DialogDescription>
            {mode === "url" 
              ? "Share this URL to invite users to join your team."
              : "Send an invitation to join your team. Enter the email address of the person you'd like to invite."
            }
          </DialogDescription> */}
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {mode === "url" ? (
            <div className="grid gap-2">
              <div className="flex gap-2">
                <Input
                  value={inviteUrl}
                  readOnly
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleCopyUrl}
                  variant="outline"
                >
                  Copy
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Input the Email Address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
          )}
        </div>
        
        <DialogFooter>
          {mode === "url" ? (
            <Button 
              type="button" 
              onClick={() => setMode("email")}
            >
              Invite by Email
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setMode("url")}
              >
                Invite by URL
              </Button>
              <Button 
                type="button" 
                onClick={handleInviteUser}
                disabled={!inviteEmail}
              >
                Invite
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
