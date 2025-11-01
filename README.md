<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ovxozyO1XozRiHyRG5hq4j4WN09YV7bz

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Accessing the Admin Area

The administrative functions are completely separated from the main application for security purposes. To access the admin area:

1. Navigate to `/admin.html` in your browser
2. Use the following credentials to log in:
   - **Email:** admin@sonhocoletivo.com.br
   - **Password:** admin123

The admin area provides access to:
- Visual identity management (logo, favicon, colors)
- Banner and image management
- Donation tracking and financial reports
- Analytics and statistics
- General site settings

**Important:** For security reasons, regular users cannot access any admin links or pages. The admin area is completely isolated from the main application.