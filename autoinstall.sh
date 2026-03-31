#!/bin/bash

PTERO_PATH="/var/www/pterodactyl"

echo "Installing Xelora Theme..."

cd $PTERO_PATH || exit

# Backup
cp -r resources/scripts resources/scripts_backup_$(date +%s)

# Download
rm -rf /tmp/ptero-theme
git clone https://github.com/XeloraCloud/pterodactyl.git /tmp/ptero-theme

# Copy ALL files (root → scripts)
cp /tmp/ptero-theme/*.tsx resources/scripts/
cp /tmp/ptero-theme/*.ts resources/scripts/
cp /tmp/ptero-theme/*.js resources/scripts/ 2>/dev/null

# Install + build
yarn install
yarn build

echo "Done!"
