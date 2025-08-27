import { WelcomeEmailGenerator } from "@/components/welcome-email-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function WelcomeEmailPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <Mail className="w-6 h-6 text-primary"/>
            Welcome Email Generator
          </CardTitle>
          <CardDescription>
            Craft the perfect welcome email. Just provide the tone and keywords, and let AI do the rest.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WelcomeEmailGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
