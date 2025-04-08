
/// <reference types="vite/client" />

// Define the webkit interface for iOS WebView communication
interface WebkitHandler {
  messageHandlers?: {
    flowKitHandler?: {
      postMessage: (message: any) => void;
    };
  };
}

// Extend the Window interface to include webkit property
interface Window {
  webkit?: WebkitHandler;
}
