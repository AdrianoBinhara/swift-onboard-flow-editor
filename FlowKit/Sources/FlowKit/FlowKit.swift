
import SwiftUI
import WebKit

/// FlowKit is the main class for integrating onboarding flows into your Swift app
public class FlowKit {
    /// Shared instance for accessing FlowKit functionality
    public static let shared = FlowKit()
    
    /// The app ID that identifies your onboarding flow
    private var appId: String?
    
    /// The base URL for the onboarding flow service
    private let baseUrl = "https://swift-onboard-flow-editor.lovable.app"
    
    /// Callback for handling network connectivity errors
    public typealias ErrorHandler = (Error) -> Void
    
    /// Default error handler
    private var errorHandler: ErrorHandler?
    
    /// Private initializer to enforce singleton pattern
    private init() {}
    
    /// Configure FlowKit with your app ID and optional error handler
    /// - Parameters:
    ///   - appId: The unique identifier for your onboarding flow
    ///   - errorHandler: Optional handler for network connectivity errors
    public static func configure(appId: String, errorHandler: ErrorHandler? = nil) {
        shared.appId = appId
        shared.errorHandler = errorHandler
    }
    
    /// Show the onboarding flow programmatically
    /// - Parameter presentingViewController: The view controller to present the onboarding flow from
    public static func showOnboarding(from presentingViewController: UIViewController? = nil) {
        guard let appId = shared.appId else {
            print("FlowKit Error: You must call FlowKit.configure(appId:) before showing onboarding")
            return
        }
        
        let onboardingViewController = OnboardingViewController(appId: appId)
        onboardingViewController.errorHandler = shared.errorHandler
        
        if let presenter = presentingViewController {
            onboardingViewController.modalPresentationStyle = .fullScreen
            presenter.present(onboardingViewController, animated: true)
        } else {
            // Use the key window's root view controller as a fallback
            if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
               let rootViewController = windowScene.windows.first?.rootViewController {
                onboardingViewController.modalPresentationStyle = .fullScreen
                rootViewController.present(onboardingViewController, animated: true)
            } else if let rootViewController = UIApplication.shared.windows.first?.rootViewController {
                // Fallback for older iOS versions
                onboardingViewController.modalPresentationStyle = .fullScreen
                rootViewController.present(onboardingViewController, animated: true)
            }
        }
    }
    
    /// Get the onboarding flow URL for the configured app ID
    /// - Returns: URL for the onboarding flow
    internal func getOnboardingUrl() -> URL? {
        guard let appId = appId else { return nil }
        
        // First try to use local HTML file for development
        if let htmlURL = Bundle.module.url(forResource: "onboarding", withExtension: "html", subdirectory: "Web") {
            // For local development, uncomment this line
            // return htmlURL
        }
        
        // Use the direct URL format that works with the web app
        return URL(string: "\(baseUrl)/\(appId)?sdk=ios")
    }
}
