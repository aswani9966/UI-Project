@Echo off
CALL npm i typescript@3.1.6 --save-dev --save-exact
echo "Building the agnular tree library " 
CALL ng build --prod angular-d3-tree-lib
echo "Fixing the audit issues"
CALL npm audit fix --force
echo "Starting the server"
CALL ng serve --port 4200 --open
echo "Running server"
PAUSE