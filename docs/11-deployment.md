# 11. Deployment

This application is configured for deployment on **Firebase App Hosting**.

## Firebase App Hosting

App Hosting is a secure, fully-managed, serverless hosting service for web applications. It streamlines the process of deploying modern web apps built with frameworks like Next.js.

### Configuration File

The deployment is configured using the `apphosting.yaml` file in the project root.

```yaml
# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1
```

- **`runConfig.maxInstances`**: This setting controls the maximum number of server instances that can be run to handle traffic. You can increase this value for high-traffic applications.

## Pre-deployment Checklist

Before deploying your application to a live environment, ensure you have completed the following steps:

1.  **Environment Variables**:
    - You must set up all required environment variables in your hosting provider's configuration. **Do not commit your `.env` file to version control.**
    - The required variables are:
        - `MONGODB_URI`
        - `MONGODB_DB`
        - `ADMIN_USERNAME`
        - `ADMIN_PASSWORD`
        - `GOOGLE_API_KEY`
        - `NEXT_PUBLIC_SITE_URL` (Set this to your final production domain, e.g., `https://www.namanmahi.in`)

2.  **Firebase Project**:
    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Enable the **App Hosting** service for your project.

3.  **Enable Telemetry (Genkit)**:
    - The `enableFirebaseTelemetry()` plugin is included in `src/ai/genkit.ts`. This is crucial for production logging and monitoring of your AI flows. Ensure your Firebase project is correctly configured to receive this telemetry.

## Deployment Steps

1.  **Install Firebase CLI**:
    If you don't have it already, install the Firebase command-line tool.
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase**:
    ```bash
    firebase login
    ```

3.  **Initialize Firebase (if not already done)**:
    Link your local project to your Firebase project.
    ```bash
    firebase init
    ```
    Select "App Hosting" and follow the prompts to connect to your Firebase project and create a backend resource.

4.  **Deploy the Application**:
    Run the deploy command from your project root.
    ```bash
    firebase apphosting:backends:deploy
    ```
    The CLI will build your Next.js application and deploy it to Firebase App Hosting. Once complete, it will provide you with the URL to your live site.
