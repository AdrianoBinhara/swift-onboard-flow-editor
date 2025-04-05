
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy, Code } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SdkIntegrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appId: string;
  appName: string;
}

export function SdkIntegration({ open, onOpenChange, appId, appName }: SdkIntegrationProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Swift code sample with new SDK name
  const swiftCode = `import SwiftUI
import FlowKit

@main
struct ${appName.replace(/\s+/g, '')}App: App {
    init() {
        FlowKit.configure(
            appId: "${appId}"
        )
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView().withOnboarding()
        }
    }
}`;

  // React Native code sample with new SDK name
  const reactNativeCode = `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FlowKitProvider } from 'react-flowkit';

export default function App() {
  return (
    <FlowKitProvider appId="${appId}">
      <NavigationContainer>
        {/* Your app content */}
      </NavigationContainer>
    </FlowKitProvider>
  );
}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Integrate with your app</DialogTitle>
          <DialogDescription>
            Add your onboarding flow to your mobile app with just a few lines of code.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* App ID Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">App ID</h3>
            <p className="text-xs text-muted-foreground">
              Use this ID to integrate the onboarding into your app
            </p>
            <div className="flex space-x-2">
              <code className="flex-1 bg-muted p-2 rounded-md text-sm overflow-hidden">{appId}</code>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleCopy(appId)}
                className="shrink-0"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>

          {/* Integration Code Tabs */}
          <Tabs defaultValue="swift" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="swift">Swift</TabsTrigger>
              <TabsTrigger value="react-native">React Native</TabsTrigger>
            </TabsList>
            
            <TabsContent value="swift" className="mt-2">
              <div className="relative">
                <pre className="bg-black text-white p-4 rounded-md text-sm overflow-x-auto">
                  <code>{swiftCode}</code>
                </pre>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="absolute top-2 right-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => handleCopy(swiftCode)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-md">
                <h4 className="text-sm font-medium mb-2">How it works</h4>
                <ol className="text-xs space-y-1 text-muted-foreground list-decimal pl-4">
                  <li>Import the FlowKit SDK</li>
                  <li>Configure with your app ID</li>
                  <li>Add <code className="text-xs bg-muted-foreground/20 px-1 rounded">.withOnboarding()</code> to any view</li>
                  <li>Access user data via <code className="text-xs bg-muted-foreground/20 px-1 rounded">FlowKit.userData</code></li>
                </ol>
              </div>
            </TabsContent>
            
            <TabsContent value="react-native" className="mt-2">
              <div className="relative">
                <pre className="bg-black text-white p-4 rounded-md text-sm overflow-x-auto">
                  <code>{reactNativeCode}</code>
                </pre>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="absolute top-2 right-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => handleCopy(reactNativeCode)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-md">
                <h4 className="text-sm font-medium mb-2">How it works</h4>
                <ol className="text-xs space-y-1 text-muted-foreground list-decimal pl-4">
                  <li>Install with <code className="text-xs bg-muted-foreground/20 px-1 rounded">npm install react-flowkit</code></li>
                  <li>Wrap your app with the FlowKitProvider</li>
                  <li>Configure with your app ID</li>
                  <li>Access user responses via <code className="text-xs bg-muted-foreground/20 px-1 rounded">useFlowKit()</code> hook</li>
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          
          <Button 
            variant="default"
            className="flex items-center gap-2"
            onClick={() => toast.success("View documentation for more details")}
          >
            <Code className="h-4 w-4" />
            Documentation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
