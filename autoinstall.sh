#!/bin/bash

echo "=== XeloraCloud Pterodactyl Theme Installer ==="

PTERO_PATH="/var/www/pterodactyl"

# 1. Check panel
if [ ! -d "$PTERO_PATH" ]; then
  echo "Pterodactyl not found at $PTERO_PATH"
  exit 1
fi

cd $PTERO_PATH || exit

# 2. Backup
echo "Creating backup..."
cp -r resources/scripts resources/scripts_backup_$(date +%s)

# 3. Download theme
echo "Downloading theme..."
rm -rf /tmp/ptero-theme
git clone https://github.com/XeloraCloud/pterodactyl.git /tmp/ptero-theme

# 4. Install theme files
echo "Copying theme files..."
cp -r /tmp/ptero-theme/theme/* resources/scripts/

# 5. Install dependency (chart lib)
echo "Installing dependencies..."
yarn add recharts

# 6. Build panel
echo "Building panel..."
yarn build

echo "=== INSTALL COMPLETE ==="
echo "If panel breaks, restore backup:"
echo "cp -r resources/scripts_backup_* resources/scripts"
