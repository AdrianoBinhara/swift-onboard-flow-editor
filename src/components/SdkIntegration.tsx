
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
import { Check, Copy, Code, ExternalLink } from "lucide-react";
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
  const [copiedSection, setCopiedSection] = useState("");

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopiedSection(section);
    toast.success("Copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
      setCopiedSection("");
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

  // Swift installation instructions
  const swiftInstallation = `// Add FlowKit to your Package.swift dependencies
dependencies: [
    .package(url: "https://github.com/FlowKit/flowkit-swift.git", from: "1.0.0")
]

// Or add directly in Xcode:
// File > Add Packages... > Search or enter package URL
// https://github.com/FlowKit/flowkit-swift.git`;

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

  // React Native installation instructions
  const reactNativeInstallation = `// Install FlowKit using npm
npm install react-flowkit

// Or using yarn
yarn add react-flowkit

// For iOS, also run
cd ios && pod install && cd ..`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl">Integrate with FlowKit</DialogTitle>
          <DialogDescription>
            Add your onboarding flow to your mobile app with just a few lines of code.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* App ID Section */}
          <div className="space-y-2 bg-muted/30 p-4 rounded-lg border">
            <h3 className="text-sm font-medium">App ID</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Use this ID to integrate the onboarding into your app
            </p>
            <div className="flex space-x-2">
              <code className="flex-1 bg-muted p-3 rounded-md text-sm overflow-hidden font-mono">{appId}</code>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleCopy(appId, "appId")}
                className="shrink-0 h-full"
              >
                {copied && copiedSection === "appId" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>

          {/* Integration Code Tabs */}
          <Tabs defaultValue="swift" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="swift">Swift</TabsTrigger>
              <TabsTrigger value="react-native">React Native</TabsTrigger>
            </TabsList>
            
            <TabsContent value="swift" className="space-y-6 mt-0">
              {/* Swift Installation Instructions */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center">
                  <span className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2 text-xs">1</span>
                  Installation
                </h4>
                <div className="relative">
                  <pre className="bg-black text-white p-4 rounded-md text-sm overflow-x-auto font-mono">
                    <code>{swiftInstallation}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-2 right-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => handleCopy(swiftInstallation, "swiftInstallation")}
                  >
                    {copied && copiedSection === "swiftInstallation" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
                  If you encounter package resolution issues, make sure you have a stable internet connection and correct access rights.
                </p>
              </div>

              {/* Swift Usage Code */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center">
                  <span className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2 text-xs">2</span>
                  Implementation
                </h4>
                <div className="relative">
                  <pre className="bg-black text-white p-4 rounded-md text-sm overflow-x-auto font-mono">
                    <code>{swiftCode}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-2 right-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => handleCopy(swiftCode, "swiftCode")}
                  >
                    {copied && copiedSection === "swiftCode" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    Copy
                  </Button>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border">
                <h4 className="text-sm font-medium mb-2">How it works</h4>
                <ol className="text-xs space-y-2 text-muted-foreground list-decimal pl-5">
                  <li>Import the FlowKit SDK</li>
                  <li>Configure with your app ID</li>
                  <li>Add <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">.withOnboarding()</code> to any view</li>
                  <li>Access user data via <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">FlowKit.userData</code></li>
                </ol>
              </div>
            </TabsContent>
            
            <TabsContent value="react-native" className="space-y-6 mt-0">
              {/* React Native Installation Instructions */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center">
                  <span className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2 text-xs">1</span>
                  Installation
                </h4>
                <div className="relative">
                  <pre className="bg-black text-white p-4 rounded-md text-sm overflow-x-auto font-mono">
                    <code>{reactNativeInstallation}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-2 right-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => handleCopy(reactNativeInstallation, "reactNativeInstallation")}
                  >
                    {copied && copiedSection === "reactNativeInstallation" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    Copy
                  </Button>
                </div>
              </div>

              {/* React Native Usage Code */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center">
                  <span className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2 text-xs">2</span>
                  Implementation
                </h4>
                <div className="relative">
                  <pre className="bg-black text-white p-4 rounded-md text-sm overflow-x-auto font-mono">
                    <code>{reactNativeCode}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-2 right-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => handleCopy(reactNativeCode, "reactNativeCode")}
                  >
                    {copied && copiedSection === "reactNativeCode" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    Copy
                  </Button>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border">
                <h4 className="text-sm font-medium mb-2">How it works</h4>
                <ol className="text-xs space-y-2 text-muted-foreground list-decimal pl-5">
                  <li>Install with <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">npm install react-flowkit</code></li>
                  <li>Wrap your app with the FlowKitProvider</li>
                  <li>Configure with your app ID</li>
                  <li>Access user responses via <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">useFlowKit()</code> hook</li>
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex items-center justify-between mt-6 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          
          <Button 
            variant="default"
            className="flex items-center gap-2"
            onClick={() => toast.success("Documentation opened in new tab")}
          >
            <ExternalLink className="h-4 w-4" />
            Documentation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
