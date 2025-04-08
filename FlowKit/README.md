# FlowKit

FlowKit is a Swift package that allows you to easily integrate your custom onboarding flows created with the Onboarding Flow Editor into your iOS applications.

## Requirements

- iOS 14.0+
- Swift 5.7+
- Xcode 14.0+

## Installation

### Swift Package Manager

You can add FlowKit to your project using Swift Package Manager by adding it as a dependency in your `Package.swift` file:

```swift
dependencies: [
    .package(url: "https://github.com/YourUsername/FlowKit.git", from: "1.0.0")
]
```

Alternatively, you can add it directly in Xcode:

1. Select File > Add Packages...
2. Enter the repository URL: `https://github.com/YourUsername/FlowKit.git`
3. Select "Up to Next Major Version" starting from "1.0.0"
4. Click "Add Package"

## Usage

### Configuration

First, configure FlowKit with your app ID in your app's entry point:

```swift
import SwiftUI
import FlowKit

@main
struct YourApp: App {
    init() {
        FlowKit.configure(appId: "your-app-id")
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView().withOnboarding()
        }
    }
}
```

### Showing Onboarding Automatically

To automatically show the onboarding flow when your app starts, use the `.withOnboarding()` modifier on your root view:

```swift
import SwiftUI
import FlowKit

struct ContentView: View {
    var body: some View {
        NavigationView {
            Text("Welcome to My App")
        }
        .withOnboarding() // This will show the onboarding flow when the app starts
    }
}
```

### Showing Onboarding Programmatically

You can also show the onboarding flow programmatically:

```swift
import SwiftUI
import FlowKit

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Welcome to My App")
            
            Button("Show Onboarding") {
                FlowKit.showOnboarding()
            }
        }
    }
}
```

### Handling Onboarding Completion

You can listen for the onboarding completion notification:

```swift
import SwiftUI
import FlowKit

class AppViewModel: ObservableObject {
    init() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(onboardingCompleted),
            name: .onboardingCompleted,
            object: nil
        )
    }
    
    @objc func onboardingCompleted() {
        // Handle onboarding completion
        print("Onboarding completed!")
    }
}
```

## Creating Onboarding Flows

Onboarding flows are created using the Onboarding Flow Editor. Once you've designed your flow, you'll receive an app ID that you can use with FlowKit.

## License

FlowKit is available under the MIT license. See the LICENSE file for more info.
