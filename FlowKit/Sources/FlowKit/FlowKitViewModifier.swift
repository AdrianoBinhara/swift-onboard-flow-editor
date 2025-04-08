import SwiftUI

/// A notification that is posted when the onboarding flow is completed
public extension Notification.Name {
    static let onboardingCompleted = Notification.Name("flowkit.onboardingCompleted")
}

/// A SwiftUI view modifier that adds onboarding to a view
public struct FlowKitViewModifier: ViewModifier {
    @State private var showOnboarding = true
    
    public init() {}
    
    public func body(content: Content) -> some View {
        content
            .onAppear {
                if showOnboarding {
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                        FlowKit.showOnboarding()
                        showOnboarding = false
                    }
                }
            }
    }
}

/// Extension to make it easier to add onboarding to any SwiftUI view
public extension View {
    /// Adds onboarding to this view
    /// - Returns: A view with onboarding support
    func withOnboarding() -> some View {
        modifier(FlowKitViewModifier())
    }
}
