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

  // Use the new dedicated onboarding endpoint for embedding
  const directUrl = `${window.location.origin}/onboarding/${appId}`;

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

  // Swift Package Manager setup instructions
  const swiftPackageSetup = `// In Xcode:
// 1. Select File > Add Packages...
// 2. Enter this URL in the search field:
https://github.com/FlowKit/flowkit-swift.git
// 3. Select "Up to Next Major Version" starting from "1.0.0"
// 4. Click "Add Package"`;

  // Swift code sample with updated URL format
  const swiftCode = `import SwiftUI
import FlowKit

@main
struct ${appName.replace(/\s+/g, '')}App: App {
    init() {
        // Configure FlowKit with your app ID
        FlowKit.configure(
            appId: "${appId}",
            errorHandler: { error in
                // Optional: Handle network errors
                print("FlowKit error: \\(error.localizedDescription)")
            }
        )
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .withOnboarding(delay: 1.0) // Shows onboarding on app start with 1 second delay
        }
    }
}

// Example ContentView with manual trigger option
struct ContentView: View {
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("Welcome to ${appName}")
                    .font(.largeTitle)
                    .padding()
                
                // Optional: Button to manually show onboarding
                Button("Show Onboarding Again") {
                    FlowKit.showOnboarding()
                }
                .buttonStyle(.borderedProminent)
                .padding()
            }
        }
    }
}`;

  // React Native code sample with updated URL format
  const reactNativeCode = `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FlowKitProvider, useFlowKit } from 'react-flowkit';

// Configure FlowKit with your app ID
const App = () => {
  return (
    <FlowKitProvider 
      appId="${appId}"
      onError={(error) => console.log('FlowKit error:', error)}
    >
      <NavigationContainer>
        <MainApp />
      </NavigationContainer>
    </FlowKitProvider>
  );
};

// Example component that shows onboarding
const MainApp = () => {
  const { showOnboarding } = useFlowKit();
  
  // Automatically show onboarding when component mounts
  React.useEffect(() => {
    showOnboarding();
  }, []);
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to ${appName}</Text>
      
      {/* Optional: Button to manually show onboarding */}
      <Button 
        title="Show Onboarding Again" 
        onPress={() => showOnboarding()} 
      />
    </View>
  );
};

export default App;`;

  // React Native installation instructions - simplified
  const reactNativeInstallation = `npm install react-flowkit

// For iOS, also run
cd ios && pod install`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl">Integrate with FlowKit</DialogTitle>
          <DialogDescription className="text-sm">
            Add your onboarding flow to your mobile app with just a few lines of code.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {/* App ID Section */}
          <div className="bg-muted/30 p-3 rounded-lg border">
            <h3 className="text-sm font-medium mb-1">App ID</h3>
            <div className="flex space-x-2">
              <code className="flex-1 bg-muted p-2 rounded-md text-sm overflow-hidden font-mono">{appId}</code>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleCopy(appId, "appId")}
                className="shrink-0"
              >
                {copied && copiedSection === "appId" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>
          
          {/* Direct URL Section */}
          <div className="bg-muted/30 p-3 rounded-lg border">
            <h3 className="text-sm font-medium mb-1">Direct Onboarding URL</h3>
            <div className="flex space-x-2">
              <code className="flex-1 bg-muted p-2 rounded-md text-sm overflow-hidden font-mono text-xs">{directUrl}</code>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleCopy(directUrl, "directUrl")}
                className="shrink-0"
              >
                {copied && copiedSection === "directUrl" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Use this URL to display only the onboarding flow in a WebView.</p>
          </div>

          {/* Integration Code Tabs */}
          <Tabs defaultValue="swift" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-2">
              <TabsTrigger value="swift" className="py-1.5">Swift</TabsTrigger>
              <TabsTrigger value="react-native" className="py-1.5">React Native</TabsTrigger>
            </TabsList>
            
            <TabsContent value="swift" className="space-y-3 mt-0">
              {/* Swift Package Manager Installation */}
              <div className="space-y-1">
                <h4 className="text-sm font-medium flex items-center mb-1">
                  <span className="inline-flex justify-center items-center w-5 h-5 rounded-full bg-primary text-primary-foreground mr-2 text-xs">1</span>
                  Installation with Swift Package Manager
                </h4>
                <div className="relative">
                  <pre className="bg-black text-white p-2 rounded-md text-xs font-mono whitespace-pre-wrap">
                    <code>{swiftPackageSetup}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground hover:bg-primary/90 h-6"
                    onClick={() => handleCopy(swiftPackageSetup, "swiftPackageSetup")}
                  >
                    {copied && copiedSection === "swiftPackageSetup" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    Copy
                  </Button>
                </div>
              </div>

              {/* Swift App Implementation */}
              <div className="space-y-1">
                <h4 className="text-sm font-medium flex items-center mb-1">
                  <span className="inline-flex justify-center items-center w-5 h-5 rounded-full bg-primary text-primary-foreground mr-2 text-xs">2</span>
                  App Implementation
                </h4>
                <div className="relative">
                  <pre className="bg-black text-white p-2 rounded-md text-xs font-mono whitespace-pre-wrap max-h-[270px] overflow-y-auto">
                    <code>{swiftCode}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground hover:bg-primary/90 h-6"
                    onClick={() => handleCopy(swiftCode, "swiftCode")}
                  >
                    {copied && copiedSection === "swiftCode" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    Copy
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="react-native" className="space-y-3 mt-0">
              {/* React Native Installation Instructions */}
              <div className="space-y-1">
                <h4 className="text-sm font-medium flex items-center mb-1">
                  <span className="inline-flex justify-center items-center w-5 h-5 rounded-full bg-primary text-primary-foreground mr-2 text-xs">1</span>
                  Installation
                </h4>
                <div className="relative">
                  <pre className="bg-black text-white p-2 rounded-md text-xs font-mono whitespace-pre-wrap">
                    <code>{reactNativeInstallation}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground hover:bg-primary/90 h-6"
                    onClick={() => handleCopy(reactNativeInstallation, "reactNativeInstallation")}
                  >
                    {copied && copiedSection === "reactNativeInstallation" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    Copy
                  </Button>
                </div>
              </div>

              {/* React Native Usage Code */}
              <div className="space-y-1">
                <h4 className="text-sm font-medium flex items-center mb-1">
                  <span className="inline-flex justify-center items-center w-5 h-5 rounded-full bg-primary text-primary-foreground mr-2 text-xs">2</span>
                  Implementation
                </h4>
                <div className="relative">
                  <pre className="bg-black text-white p-2 rounded-md text-xs font-mono whitespace-pre-wrap max-h-[270px] overflow-y-auto">
                    <code>{reactNativeCode}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground hover:bg-primary/90 h-6"
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
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          
          <Button 
            variant="default"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => toast.success("Documentation opened in new tab")}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Documentation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
