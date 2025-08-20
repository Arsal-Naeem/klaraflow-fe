import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, Phone, Sparkles } from "lucide-react";

export const SubmissionStep = ({
  phone,
  email,
}: {
  phone: string;
  email: string;
}) => {
  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">
            Application Submitted Successfully!
          </h2>
          <p className="text-md text-muted-foreground max-w-2xl mx-auto">
            Congratulations! Your onboarding application has been submitted and
            is now under review by our HR team. Once it's approved, you'll be
            automatically redirected to your dashboard. We're excited to have
            you on board!
          </p>
        </div>
      </div>

      {/* Status Card */}
      <Card className="bg-[linear-gradient(90deg,#280595_0%,#ff2394_100%)] border-none">
        <CardContent className="px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/50 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">
                  Application Status: Under Review
                </h3>
                <p className="text-gray-600 text-white/90">
                  Your application is being processed by our HR team
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/90">Application ID</div>
              <div className="font-mono text-white font-semibold">
                #KF-{Date.now().toString().slice(-6)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardContent className="px-6">
          <h3 className="font-semibold mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <div className="font-medium">Email Support</div>
                <div className="text-sm text-muted-foreground">{email}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <div className="font-medium">Phone Support</div>
                <div className="text-sm text-muted-foreground">{phone}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
