
import SwiftUI

/// A notification that is posted when the onboarding flow is completed
public extension Notification.Name {
    static let onboardingCompleted = Notification.Name("flowkit.onboardingCompleted")
}

/// A SwiftUI view modifier that adds onboarding to a view
public struct FlowKitViewModifier: ViewModifier {
    @State private var showOnboarding = true
    @State private var hasShownOnboarding = false
    
    /// Optional delay before showing onboarding
    private let delay: Double
    
    /// Initialize with optional delay
    /// - Parameter delay: Time to wait before showing onboarding (in seconds)
    public init(delay: Double = 0.5) {
        self.delay = delay
    }
    
    public func body(content: Content) -> some View {
        content
            .onAppear {
                if showOnboarding && !hasShownOnboarding {
                    // Set hasShownOnboarding immediately to prevent multiple shows
                    hasShownOnboarding = true
                    
                    DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
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
    /// - Parameter delay: Optional delay before showing onboarding (in seconds)
    /// - Returns: A view with onboarding support
    func withOnboarding(delay: Double = 0.5) -> some View {
        modifier(FlowKitViewModifier(delay: delay))
    }
}
