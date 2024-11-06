git pull
npm install -f
npm run build
pm2 delete loundAdmin
pm2 start npm --name loundAdmin -- start
