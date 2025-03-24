git pull

pm2 stop LoundAdmin
npm install -f
npm run build

pm2 start LoundAdmin
