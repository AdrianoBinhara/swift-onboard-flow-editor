import Foundation

/// Service for fetching onboarding flow data
internal class OnboardingService {
    /// Shared instance
    static let shared = OnboardingService()
    
    /// Base URL for the onboarding service
    private let baseUrl = "https://flowkit-service.example.com"
    
    /// Private initializer to enforce singleton pattern
    private init() {}
    
    /// Fetch onboarding flow data for the given app ID
    /// - Parameters:
    ///   - appId: The unique identifier for the onboarding flow
    ///   - completion: Completion handler with result
    func fetchOnboardingFlow(appId: String, completion: @escaping (Result<OnboardingFlow, Error>) -> Void) {
        guard let url = URL(string: "\(baseUrl)/api/flows/\(appId)") else {
            completion(.failure(OnboardingError.invalidURL))
            return
        }
        
        let task = URLSession.shared.dataTask(with: url) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            
            guard let httpResponse = response as? HTTPURLResponse,
                  (200...299).contains(httpResponse.statusCode) else {
                completion(.failure(OnboardingError.serverError))
                return
            }
            
            guard let data = data else {
                completion(.failure(OnboardingError.noData))
                return
            }
            
            do {
                let flow = try JSONDecoder().decode(OnboardingFlow.self, from: data)
                completion(.success(flow))
            } catch {
                completion(.failure(error))
            }
        }
        
        task.resume()
    }
}

/// Errors that can occur during onboarding flow operations
enum OnboardingError: Error {
    case invalidURL
    case serverError
    case noData
    case decodingError
}

/// Model representing an onboarding flow
struct OnboardingFlow: Codable {
    let id: String
    let name: String
    let slides: [Slide]
    let globalStyles: GlobalStyles
}

/// Model representing a slide in the onboarding flow
struct Slide: Codable {
    let id: String
    let type: String
    let title: String?
    let description: String?
    let verticalAlignment: String
    let horizontalAlignment: String
    
    // Optional properties based on slide type
    let options: [String]?
    let datePlaceholder: String?
    let defaultDate: String?
    let dateRequired: Bool?
    let minDate: String?
    let maxDate: String?
}

/// Model representing global styles for the onboarding flow
struct GlobalStyles: Codable {
    let buttonColor: String
    let buttonTextColor: String
    let buttonPosition: String
    let buttonSize: String
    let buttonIcon: String
    let showProgressBar: Bool
    let progressBarColor: String
    let progressBarHeight: String
    let animation: String
    let titleFontSize: String
    let descriptionFontSize: String
}
