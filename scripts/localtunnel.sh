localtunnel () {
  ngrok http -host-header=rewrite localhost:3000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
