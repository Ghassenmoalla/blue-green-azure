# 🔵🟢 Azure Blue-Green Deployment Demo

This repository contains the sample application and GitHub Actions workflow to accompany the "Step-by-Step Setup — Blue-Green Deployment on Azure" guide.

## 🚀 How to Use

1.  **Push to GitHub:** Create a new, empty GitHub repository and push the files (`app/index.html`, `.github/workflows/deploy.yml`, and `README.md`) to it.

2.  **Follow Azure Setup (Steps 1-4):** Follow your guide to create the Resource Group, App Service Plan, and "Blue" Web App.

3.  **Connect GitHub (Step 3):**
    * In the Azure Portal, go to your new Web App (`webapp-blue-ghassen`).
    * Go to **Deployment Center**.
    * Select **GitHub** as the source.
    * Authorize and select this repository and the `main` branch.
    * **This initial sync will fail, or might deploy the wrong thing. This is OK.** The *real* workflow is the `.yml` file we just added.
    * **Crucially:** Go back to the **Deployment Center** -> **Settings** tab. You should see it has configured a **Publish Profile**. This automatically creates the `AZURE_WEBAPP_PUBLISH_PROFILE` secret in your GitHub repo, which our `deploy.yml` workflow needs.

4.  **Create Green Slot (Step 4):** Go to **Deployment slots** and create the `green` slot as instructed.

5.  **Test the First Deployment (Step 5):**
    * At this point, your `main` branch has the "Blue Version".
    * Pushing it (or the initial link) should have triggered the GitHub Action.
    * Go to your GitHub repo's **Actions** tab.
    * Check the workflow run. It should deploy the "Blue Version" to your `green` slot URL (`https...-green.azurewebsites.net`).
    * Your production URL (`https...azurewebsites.net`) might be empty or have a default page.

6.  **Test the "Green" Deployment:**
    * Edit `app/index.html` to the "Green Version" (change the color class and text).
    * Commit and push the change to `main`.
    * Watch the GitHub Action run again.
    * Your `green` slot URL will update to show the "Green Version".
    * Your `production` URL will remain unchanged (still empty or default).

7.  **Perform the Swap (Step 6):**
    * In the Azure portal, go to **Deployment slots** and click **Swap**.
    * Your production URL will now instantly show the "Green Version".
    * Your `green` slot URL will now show the (empty/default) app that was in production.

8.  **Automate the Swap (Optional - Step 9):**
    * To enable the automatic swap, you must create an **Azure Service Principal** (a separate credential).
    * Run this in Azure Cloud Shell:
        ```bash
        az ad sp create-for-rbac --name "github-swap-sp" --role contributor --scopes /subscriptions/{subscription-id}/resourceGroups/rg-bluegreen-demo --json-auth
        ```
    * Copy the entire JSON output.
    * In your GitHub repo, go to **Settings** > **Secrets and variables** > **Actions**.
    * Create a new secret named `AZURE_CREDENTIALS` and paste the JSON output.
    * Uncomment the "OPTIONAL: AUTO-SWAP" steps in your `deploy.yml` file.
    * Commit and push. The next deployment to `green` will automatically swap to production.README.md
