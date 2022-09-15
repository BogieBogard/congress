while true; do
    cd
    cd Documents/GitHub/congress 
    rm -r cache 
    python3 -m venv env 
    source env/bin/activate 
    usc-run votes 
    cd 
    cd Documents/GitHub/prod/congress 
    node automation_script.js 
    git add -A 
    git commit -m "Run automation"
    git push
    sleep 21600
done
