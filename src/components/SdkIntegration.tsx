
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
import { Check, Copy, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  // Swift installation instructions - simplified
  const swiftInstallation = `// Add FlowKit to your Package.swift dependencies
.package(url: "https://github.com/FlowKit/flowkit-swift.git", from: "1.0.0")

// Or add in Xcode: File > Add Packages...
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

  // React Native installation instructions - simplified
  const reactNativeInstallation = `npm install react-flowkit

// For iOS, also run
cd ios && pod install`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl">Integrate with FlowKit</DialogTitle>
          <DialogDescription>
            Add your onboarding flow to your mobile app with just a few lines of code.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* App ID Section */}
          <div className="space-y-1 bg-muted/30 p-3 rounded-lg border">
            <h3 className="text-sm font-medium">App ID</h3>
            <div className="flex space-x-2">
              <code className="flex-1 bg-muted p-2 rounded-md text-sm overflow-hidden font-mono text-xs">{appId}</code>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleCopy(appId, "appId")}
                className="shrink-0 h-8"
              >
                {copied && copiedSection === "appId" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>

          {/* Integration Code Tabs */}
          <Tabs defaultValue="swift" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-3">
              <TabsTrigger value="swift">Swift</TabsTrigger>
              <TabsTrigger value="react-native">React Native</TabsTrigger>
            </TabsList>
            
            <TabsContent value="swift" className="space-y-4 mt-0">
              {/* Swift Installation Instructions */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <span className="inline-flex justify-center items-center w-5 h-5 rounded-full bg-primary text-primary-foreground mr-2 text-xs">1</span>
                  Installation
                </h4>
                <div className="relative">
                  <pre className="bg-black text-white p-2 rounded-md text-xs overflow-x-auto font-mono max-h-20">
                    <code>{swiftInstallation}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-1 right-1 bg-primary text-primary-foreground hover:bg-primary/90 h-6 text-xs px-2"
                    onClick={() => handleCopy(swiftInstallation, "swiftInstallation")}
                  >
                    {copied && copiedSection === "swiftInstallation" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground bg-muted/30 p-2 rounded-md">
                  If you have package resolution issues, ensure you have a stable internet connection.
                </p>
              </div>

              {/* Swift Usage Code */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <span className="inline-flex justify-center items-center w-5 h-5 rounded-full bg-primary text-primary-foreground mr-2 text-xs">2</span>
                  Implementation
                </h4>
                <div className="relative">
                  <pre className="bg-black text-white p-2 rounded-md text-xs overflow-x-auto font-mono max-h-32">
                    <code>{swiftCode}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-1 right-1 bg-primary text-primary-foreground hover:bg-primary/90 h-6 text-xs px-2"
                    onClick={() => handleCopy(swiftCode, "swiftCode")}
                  >
                    {copied && copiedSection === "swiftCode" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    Copy
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="react-native" className="space-y-4 mt-0">
              {/* React Native Installation Instructions */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <span className="inline-flex justify-center items-center w-5 h-5 rounded-full bg-primary text-primary-foreground mr-2 text-xs">1</span>
                  Installation
                </h4>
                <div className="relative">
                  <pre className="bg-black text-white p-2 rounded-md text-xs overflow-x-auto font-mono max-h-16">
                    <code>{reactNativeInstallation}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-1 right-1 bg-primary text-primary-foreground hover:bg-primary/90 h-6 text-xs px-2"
                    onClick={() => handleCopy(reactNativeInstallation, "reactNativeInstallation")}
                  >
                    {copied && copiedSection === "reactNativeInstallation" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    Copy
                  </Button>
                </div>
              </div>

              {/* React Native Usage Code */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <span className="inline-flex justify-center items-center w-5 h-5 rounded-full bg-primary text-primary-foreground mr-2 text-xs">2</span>
                  Implementation
                </h4>
                <div className="relative">
                  <pre className="bg-black text-white p-2 rounded-md text-xs overflow-x-auto font-mono max-h-28">
                    <code>{reactNativeCode}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-1 right-1 bg-primary text-primary-foreground hover:bg-primary/90 h-6 text-xs px-2"
                    onClick={() => handleCopy(reactNativeCode, "reactNativeCode")}
                  >
                    {copied && copiedSection === "reactNativeCode" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    Copy
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex items-center justify-between mt-3 pt-2 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            size="sm"
          >
            Close
          </Button>
          
          <Button 
            variant="default"
            className="flex items-center gap-2"
            onClick={() => toast.success("Documentation opened in new tab")}
            size="sm"
          >
            <ExternalLink className="h-3 w-3" />
            Documentation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
