import SwiftUI
import WebKit

/// FlowKit is the main class for integrating onboarding flows into your Swift app
public class FlowKit {
    /// Shared instance for accessing FlowKit functionality
    public static let shared = FlowKit()
    
    /// The app ID that identifies your onboarding flow
    private var appId: String?
    
    /// The base URL for the onboarding flow service
    private let baseUrl = "https://flowkit-service.example.com"
    
    /// Private initializer to enforce singleton pattern
    private init() {}
    
    /// Configure FlowKit with your app ID
    /// - Parameter appId: The unique identifier for your onboarding flow
    public static func configure(appId: String) {
        shared.appId = appId
    }
    
    /// Show the onboarding flow programmatically
    /// - Parameter presentingViewController: The view controller to present the onboarding flow from
    public static func showOnboarding(from presentingViewController: UIViewController? = nil) {
        guard let appId = shared.appId else {
            print("FlowKit Error: You must call FlowKit.configure(appId:) before showing onboarding")
            return
        }
        
        let onboardingViewController = OnboardingViewController(appId: appId)
        
        if let presenter = presentingViewController {
            onboardingViewController.modalPresentationStyle = .fullScreen
            presenter.present(onboardingViewController, animated: true)
        } else if let rootViewController = UIApplication.shared.windows.first?.rootViewController {
            onboardingViewController.modalPresentationStyle = .fullScreen
            rootViewController.present(onboardingViewController, animated: true)
        }
    }
    
    /// Get the onboarding flow URL for the configured app ID
    /// - Returns: URL for the onboarding flow
    internal func getOnboardingUrl() -> URL? {
        guard let appId = appId else { return nil }
        return URL(string: "\(baseUrl)/flow/\(appId)")
    }
}
