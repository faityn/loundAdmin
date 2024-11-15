git pull

pm2 stop loundAdmin
npm install -f
npm run build

pm2 start loundAdmin

