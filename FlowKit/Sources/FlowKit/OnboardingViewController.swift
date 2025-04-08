import UIKit
import WebKit

/// View controller that displays the onboarding flow in a WebView
internal class OnboardingViewController: UIViewController {
    private let appId: String
    private var webView: WKWebView!
    private var loadingIndicator: UIActivityIndicatorView!
    
    /// Initialize with an app ID
    /// - Parameter appId: The unique identifier for the onboarding flow
    init(appId: String) {
        self.appId = appId
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupWebView()
        setupLoadingIndicator()
        loadOnboardingFlow()
    }
    
    private func setupWebView() {
        let configuration = WKWebViewConfiguration()
        
        // Add message handler to communicate between JS and native code
        let contentController = WKUserContentController()
        contentController.add(self, name: "flowKitHandler")
        configuration.userContentController = contentController
        
        webView = WKWebView(frame: view.bounds, configuration: configuration)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        webView.navigationDelegate = self
        view.addSubview(webView)
    }
    
    private func setupLoadingIndicator() {
        loadingIndicator = UIActivityIndicatorView(style: .large)
        loadingIndicator.center = view.center
        loadingIndicator.hidesWhenStopped = true
        view.addSubview(loadingIndicator)
        loadingIndicator.startAnimating()
    }
    
    private func loadOnboardingFlow() {
        guard let url = FlowKit.shared.getOnboardingUrl() else {
            showError(message: "Could not load onboarding flow")
            return
        }
        
        let request = URLRequest(url: url)
        webView.load(request)
    }
    
    private func showError(message: String) {
        let alert = UIAlertController(
            title: "Error",
            message: message,
            preferredStyle: .alert
        )
        
        alert.addAction(UIAlertAction(
            title: "OK",
            style: .default,
            handler: { [weak self] _ in
                self?.dismiss(animated: true)
            }
        ))
        
        present(alert, animated: true)
    }
}

// MARK: - WKNavigationDelegate
extension OnboardingViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        loadingIndicator.stopAnimating()
    }
    
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        loadingIndicator.stopAnimating()
        showError(message: "Failed to load onboarding: \(error.localizedDescription)")
    }
}

// MARK: - WKScriptMessageHandler
extension OnboardingViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == "flowKitHandler" else { return }
        
        // Handle messages from JavaScript
        if let messageBody = message.body as? [String: Any],
           let action = messageBody["action"] as? String {
            
            switch action {
            case "close":
                dismiss(animated: true)
                
            case "complete":
                // Notify the app that onboarding is complete
                NotificationCenter.default.post(name: .onboardingCompleted, object: nil)
                dismiss(animated: true)
                
            case "navigate":
                if let destination = messageBody["destination"] as? String {
                    // Handle navigation to specific app screens
                    print("Navigate to: \(destination)")
                    dismiss(animated: true)
                }
                
            default:
                print("Unknown action: \(action)")
            }
        }
    }
}
