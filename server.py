import http.server
import socketserver
import os

PORT = 8765
os.chdir(r'c:\Users\96225\Documents\trae_projects\CRM')
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running at http://localhost:{PORT}")
    httpd.serve_forever()
