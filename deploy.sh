git pull
npm install -f
npm run build
pm2 delete admin
pm2 start npm --name admin -- start
