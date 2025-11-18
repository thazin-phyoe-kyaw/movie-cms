status_code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
echo $status_code

if [ $status_code -eq 200 ] || [ $status_code -eq 301 ] || [ $status_code -eq 302 ] || [ $status_code -eq 307 ]
        then
        echo "Success with $status_code"
else
    exit 1
fi