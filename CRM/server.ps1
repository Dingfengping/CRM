$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8080/')
$listener.Start()
Write-Host "Server started at http://localhost:8080" -ForegroundColor Green
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $path = $request.Url.LocalPath
    if ($path -eq '/') { $path = '/index.html' }
    $file = [System.IO.Path]::Combine($PSScriptRoot, $path.TrimStart('/'))
    $response = $context.Response
    if ([System.IO.File]::Exists($file)) {
        $content = [System.IO.File]::ReadAllBytes($file)
        $ext = [System.IO.Path]::GetExtension($file).ToLower()
        $contentType = 'text/html'
        if ($ext -eq '.css') { $contentType = 'text/css' }
        elseif ($ext -eq '.js') { $contentType = 'application/javascript' }
        elseif ($ext -eq '.png') { $contentType = 'image/png' }
        elseif ($ext -eq '.jpg') { $contentType = 'image/jpeg' }
        elseif ($ext -eq '.svg') { $contentType = 'image/svg+xml' }
        $response.ContentType = $contentType
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
        $response.Close()
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] $($request.HttpMethod) $path 200" -ForegroundColor Gray
    } else {
        $response.StatusCode = 404
        $response.Close()
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] $($request.HttpMethod) $path 404" -ForegroundColor Red
    }
}
