
import UIKit
import WebKit

/// View controller that displays the onboarding flow in a WebView
internal class OnboardingViewController: UIViewController {
    private let appId: String
    private var webView: WKWebView!
    private var loadingIndicator: UIActivityIndicatorView!
    
    /// Error handler callback
    internal var errorHandler: FlowKit.ErrorHandler?
    
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
        
        // Additional configurations to improve the experience
        configuration.allowsInlineMediaPlayback = true
        configuration.mediaTypesRequiringUserActionForPlayback = []
        
        webView = WKWebView(frame: view.bounds, configuration: configuration)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        webView.navigationDelegate = self
        
        // Add close button
        let closeButton = UIButton(type: .system)
        closeButton.setTitle("Close", for: .normal)
        closeButton.addTarget(self, action: #selector(closeButtonTapped), for: .touchUpInside)
        closeButton.translatesAutoresizingMaskIntoConstraints = false
        
        view.addSubview(webView)
        view.addSubview(closeButton)
        
        NSLayoutConstraint.activate([
            closeButton.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 16),
            closeButton.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -16)
        ])
    }
    
    @objc private func closeButtonTapped() {
        dismiss(animated: true)
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
        
        print("FlowKit: Loading onboarding from URL: \(url.absoluteString)")
        let request = URLRequest(url: url)
        webView.load(request)
    }
    
    private func showError(message: String, error: Error? = nil) {
        // Call error handler if available
        if let error = error, let errorHandler = errorHandler {
            errorHandler(error)
        }
        
        let errorMessage = error != nil ? "\(message): \(error!.localizedDescription)" : message
        
        let alert = UIAlertController(
            title: "Error",
            message: errorMessage,
            preferredStyle: .alert
        )
        
        alert.addAction(UIAlertAction(
            title: "Try Again",
            style: .default,
            handler: { [weak self] _ in
                self?.loadOnboardingFlow()
            }
        ))
        
        alert.addAction(UIAlertAction(
            title: "Cancel",
            style: .cancel,
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
        
        // Inject script for communication between WebView and native app
        let script = """
        window.addEventListener('message', function(event) {
            window.webkit.messageHandlers.flowKitHandler.postMessage(event.data);
        });
        
        // Inform the site it's running inside the iOS SDK
        if (window.postMessage) {
            window.postMessage({ source: 'FlowKit-iOS', appId: '\(appId)' }, '*');
        }
        
        // Hide any editor elements that might be visible
        document.addEventListener('DOMContentLoaded', function() {
            // Hide editor elements if any
            const editorElements = document.querySelectorAll('.editor-only, .admin-only');
            editorElements.forEach(function(el) {
                el.style.display = 'none';
            });
        });
        """
        
        webView.evaluateJavaScript(script) { _, error in
            if let error = error {
                print("Error injecting script: \(error.localizedDescription)")
            }
        }
    }
    
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        loadingIndicator.stopAnimating()
        
        // Check for network connectivity errors
        let nsError = error as NSError
        if nsError.domain == NSURLErrorDomain {
            let errorMessage: String
            switch nsError.code {
            case NSURLErrorNotConnectedToInternet:
                errorMessage = "No internet connection"
            case NSURLErrorCannotFindHost, NSURLErrorCannotConnectToHost:
                errorMessage = "Could not connect to server"
            case NSURLErrorTimedOut:
                errorMessage = "Connection timed out"
            default:
                errorMessage = "Failed to load onboarding"
            }
            showError(message: errorMessage, error: error)
        } else {
            showError(message: "Failed to load onboarding", error: error)
        }
    }
    
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        loadingIndicator.stopAnimating()
        showError(message: "Failed to load onboarding", error: error)
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
