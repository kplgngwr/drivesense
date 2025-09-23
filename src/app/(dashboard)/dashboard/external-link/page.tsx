'use client'

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink } from "lucide-react";

export default function ExternalLinkPage() {
  // You can replace this URL with your actual link
  const externalUrl = "https://example.com"; // Replace with your link
  
  useEffect(() => {
    // Automatically redirect to external link
    // Remove this if you want to show a page first
    // window.open(externalUrl, '_blank');
  }, []);

  const handleRedirect = () => {
    window.open(externalUrl, '_blank');
  };

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center gap-3 mb-8">
          <ExternalLink className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-gray-800">External Link</h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Redirect to External Site
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Click the button below to open the external link in a new tab.
            </p>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Current link:</p>
              <p className="font-mono text-sm break-all">{externalUrl}</p>
            </div>

            <button
              onClick={handleRedirect}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open External Link
            </button>

            <div className="text-xs text-gray-500 text-center">
              The link will open in a new tab
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}