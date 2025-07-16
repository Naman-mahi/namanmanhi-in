# 13. VPS Deployment Guide

This guide provides step-by-step instructions for deploying the NamanMahi.in Next.js application to a Virtual Private Server (VPS) running a Linux distribution like Ubuntu.

This setup uses **Nginx** as a reverse proxy to handle incoming web traffic and **PM2** as a process manager to keep the Next.js application running in the background.

## Prerequisites

- **A VPS**: A server from a provider like DigitalOcean, Vultr, Linode, or AWS Lightsail with root/sudo access.
- **A Domain Name**: A registered domain that you can point to your VPS's IP address.
- **SSH Access**: An SSH client (like Terminal on macOS/Linux or PuTTY/WSL on Windows) to connect to your server.

---

## Step 1: Server Setup

First, connect to your VPS via SSH:
```bash
ssh root@YOUR_SERVER_IP
```

### 1.1. Install Node.js

We recommend using `nvm` (Node Version Manager) to install and manage Node.js versions.

```bash
# Install curl to download nvm installer
sudo apt update
sudo apt install -y curl

# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load nvm into the current shell session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Verify nvm installation by running `nvm` - if it doesn't work, you may need to close and reopen your terminal.

# Install Node.js (version 20 is recommended for this project)
nvm install 20

# Set Node.js v20 as the default
nvm use 20
nvm alias default 20
```

### 1.2. Install PM2

PM2 is a process manager for Node.js applications that will keep your app running forever, even if it crashes or the server reboots.

```bash
# Install PM2 globally using npm
npm install pm2 -g
```

### 1.3. Install Nginx

Nginx will act as a reverse proxy, directing traffic from the public internet (port 80 for HTTP, 443 for HTTPS) to your Next.js application running on a local port (e.g., 9002).

```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx to run on server boot
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## Step 2: Deploy the Application

### 2.1. Clone the Repository

Clone your project from GitHub onto the server. A good location is `/var/www/`.

```bash
# Create a directory for your projects
sudo mkdir -p /var/www/namanmahi.in
sudo chown -R $USER:$USER /var/www/namanmahi.in

# Clone the project
git clone https://github.com/Naman-mahi/namanmanhi-in.git /var/www/namanmahi.in
cd /var/www/namanmahi.in
```

### 2.2. Install Dependencies

```bash
npm install
```

### 2.3. Set Up Environment Variables

Create a `.env` file in the project root to store your sensitive information. **Do not commit this file to Git.**

```bash
# Create and open the .env file with nano
nano .env
```

Paste the following content into the file, replacing the placeholder values:

```env
# MongoDB Configuration
MONGODB_URI="your_mongodb_connection_string"
MONGODB_DB="your_database_name"

# Admin Panel Credentials
ADMIN_USERNAME="your_secure_admin_username"
ADMIN_PASSWORD="your_secure_admin_password"

# Google AI API Key
GOOGLE_API_KEY="your_google_api_key"

# Site URL for production
NEXT_PUBLIC_SITE_URL="https://your_domain.com"
```
Save the file by pressing `Ctrl+X`, then `Y`, then `Enter`.

### 2.4. Build and Start the App

```bash
# Build the Next.js application for production
npm run build

# Start the application with PM2
# This will run the `npm start` script defined in package.json
pm2 start npm --name "namanmahi-in" -- start

# Save the current process list to automatically restart on reboot
pm2 save
```

Your app is now running, but it's only accessible on `http://localhost:9002`. Nginx will make it accessible to the world.

---

## Step 3: Configure Nginx

Create an Nginx server block file for your domain.

```bash
sudo nano /etc/nginx/sites-available/your_domain.com
```

Paste the following configuration into the file. This tells Nginx to listen on port 80 and forward all requests to your Next.js app.

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name your_domain.com www.your_domain.com;
    root /var/www/namanmahi.in;

    location / {
        proxy_pass http://localhost:9002; # The port your Next.js app is running on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save the file (`Ctrl+X`, `Y`, `Enter`).

Now, enable this site by creating a symbolic link to the `sites-enabled` directory:

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/your_domain.com /etc/nginx/sites-enabled/

# Test the Nginx configuration for syntax errors
sudo nginx -t

# If the test is successful, restart Nginx to apply the changes
sudo systemctl restart nginx
```

At this point, if you have pointed your domain's DNS A record to your server's IP, you should be able to access your site at `http://your_domain.com`.

---

## Step 4: (Recommended) Set Up SSL with Let's Encrypt

It is highly recommended to secure your site with an SSL certificate (HTTPS).

```bash
# Install Certbot, the Let's Encrypt client
sudo apt install -y certbot python3-certbot-nginx

# Obtain and install the SSL certificate for your domain
sudo certbot --nginx -d your_domain.com -d www.your_domain.com
```

Certbot will automatically update your Nginx configuration for HTTPS and set up a cron job to renew the certificate before it expires.

Your website is now deployed and accessible at `https://your_domain.com`!

---

## Managing Your Application

- **View Logs**: `pm2 logs namanmahi-in`
- **Restart App**: `pm2 restart namanmahi-in`
- **Stop App**: `pm2 stop namanmahi-in`
- **List Apps**: `pm2 list`

To deploy updates, `cd` into your project directory, run `git pull`, `npm install`, `npm run build`, and finally `pm2 restart namanmahi-in`.
